import { Api } from "src/utils/swagger/Api";
import * as config from "../../script/utils/config.json";

class Fetch {
  api = new Api({
    customFetch: this.createCustomFetch(),
    baseUrl: config.serverSchemaAddress,
  });

  abortRequset = this.api.baseUrl;
  setSecurityData = this.api.setSecurityData;

  baseUrl = this.api.baseUrl;
  auth = this.api.auth;
  post = this.api.post;
  comment = this.api.comment;

  errorFilter(errInstances) {
    let shouldPass = true;

    if (errInstances?.path?.includes("me")) shouldPass = false;

    return shouldPass;
  }

  createCustomFetch() {
    function customFetch(input, init) {
      const token = localStorage.getItem("token"); // flow to get token
      init.headers = {
        ...init.headers,
        Authorization: `jwt ${token}`,
      };
      try {
        const response = fetch(input, init)
          .then(() => {
            if (!response.ok) {
              response
                .clone()
                .json()
                .then((err) => {
                  const errorMessage = err.translate;
                  if (errorMessage) this.onError(errorMessage, err);
                  else this.onServerError();
                });
            }
            return response.json();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.onConnectionError();
      }
    }
    return customFetch;
  }

  onServerError() {
    console.log("خطا در پردازش سرور");
  }

  onConnectionError() {
    console.log("خطا در ارتباط با سرور");
  }

  onError(errMessage = null, errInstance = null) {
    if (this.errorFilter(errInstance)) {
      console.log(errInstance);
    }
  }
}

export const fetchService = new Fetch();
