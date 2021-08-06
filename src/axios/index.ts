import axios from "axios";
import Vue from "vue";
import store from "@/store/session.store.ts";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    /**
     * Save original request in order to perform the request after refreshing the access tokens
     */
    if (error.response.status == 401) {
      /**
       * If status is 401 unauthorized we assume that the access token is invalid so we
       * need to refresh the access token with the refresh token saved in the session.
       */
      let refreshToken = localStorage.getItem("refresh_token");
      console.info("Requesting new Access token");

      /**
       * TODO encapsulate in api.js
       */
      axios
        .post("http://localhost:18080/oauth/access_token", {
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        })
        .then((response) => {
          if (response.status == 401 || response.status == 403) {
            console.error(
              "Destroying session",
              localStorage.getItem("access_token")
            );
            store.dispatch("DESTROY_SESSION");
          }
          store.dispatch("REFRESH_SESSION", response);
          return axios(originalRequest);
        })
        .catch((error) => {});
    }
    return Promise.reject(error.response);
  }
);

export default axios;
