/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserData {
  username: string;
  password: string;
  fullname: string;
  confirmPassword: string;
  email: string;
  /** @format date-time */
  birthday: string;
  role?: "Admin" | "Member";
}

export interface CreateUserInput {
  data: CreateUserData;
}

export interface UpdateUserData {
  fullname?: string;
  username?: string;
  email?: string;
  /** @format date-time */
  birthday?: string;
  role?: string;
  isActive?: boolean;
}

export interface UpdateUserInput {
  data: UpdateUserData;
  id: string;
}

export interface DeleteUserData {
  id: string;
}

export interface DeleteUserInput {
  data: DeleteUserData;
}

export interface ReadUserData {
  id?: string;
  fullname?: string;
  birthDay?: string;
  username?: string;
  email?: string;
  isActive?: boolean;
  role?: "Admin" | "Member";
}

export interface PaginationData {
  /** @default 50 */
  take?: number;
  /** @default 0 */
  skip?: number;
}

export interface SortByData {
  field?: string | null;
  descending?: boolean | null;
}

export interface ReadUserInput {
  data?: ReadUserData;
  pagination?: PaginationData;
  sortBy?: SortByData;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginInput {
  data: LoginData;
}

export interface CreatePostData {
  title: string;
  content: string;
  view: number;
  authorId: string;
}

export interface CreatePostInput {
  data: CreatePostData;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  view?: number;
  authorId?: string;
}

export interface UpdatePostInput {
  data: UpdatePostData;
  id: string;
}

export interface DeletePostData {
  id: string;
}

export interface DeletePostInput {
  data: DeletePostData;
}

export interface ReadPostData {
  id?: string;
  title?: string;
  content?: string;
  view?: number;
}

export interface ReadPostInput {
  data?: ReadPostData;
  pagination?: PaginationData;
  sortBy?: SortByData;
}

export interface CreateCommentData {
  content: string;
  authorId: string;
  relatedPostId: string;
}

export interface CreateCommentInput {
  data: CreateCommentData;
}

export interface UpdateCommentData {
  content?: string;
  authorId?: string;
  relatedPostId?: string;
}

export interface UpdateCommentInput {
  data: UpdateCommentData;
  id: string;
}

export interface ReadCommentData {
  id?: string;
  content?: string;
  authorId?: string;
  relatedPostId?: string;
}

export interface ReadCommentInput {
  data?: ReadCommentData;
  pagination?: PaginationData;
  sortBy?: SortByData;
}

export interface DeleteCommentData {
  id: string;
}

export interface DeleteCommentInput {
  data: DeleteCommentData;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Swagger APIs
 * @version 1.0
 * @contact
 *
 * The Swagger APIs description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @name CreateUser
     * @request POST:/auth/createUser
     */
    createUser: (data: CreateUserInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/createUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description hello
     *
     * @name UpdateUser
     * @request POST:/auth/updateUser
     */
    updateUser: (data: UpdateUserInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/updateUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteUser
     * @request POST:/auth/deleteUser
     */
    deleteUser: (data: DeleteUserInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/deleteUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ReadUser
     * @request GET:/auth/readUser
     */
    readUser: (data: ReadUserInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/readUser`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name Login
     * @request POST:/auth/login
     */
    login: (data: LoginInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  post = {
    /**
     * No description
     *
     * @name CreatePost
     * @request POST:/post/createPost
     */
    createPost: (data: CreatePostInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/createPost`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdatePost
     * @request POST:/post/updatePost
     */
    updatePost: (data: UpdatePostInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/updatePost`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeletePost
     * @request POST:/post/deletePost
     */
    deletePost: (data: DeletePostInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/deletePost`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ReadPost
     * @request GET:/post/readPost
     */
    readPost: (data: ReadPostInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/readPost`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  comment = {
    /**
     * No description
     *
     * @name CreateComment
     * @request POST:/comment/createComment
     */
    createComment: (data: CreateCommentInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comment/createComment`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateComment
     * @request POST:/comment/updateComment
     */
    updateComment: (data: UpdateCommentInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comment/updateComment`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ReadComment
     * @request GET:/comment/readComment
     */
    readComment: (data: ReadCommentInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comment/readComment`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteComment
     * @request POST:/comment/deleteComment
     */
    deleteComment: (data: DeleteCommentInput, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comment/deleteComment`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
