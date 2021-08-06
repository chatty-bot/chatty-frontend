import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
/**
 *
 */
export default new Vuex.Store({
  state: {
    session: {
      isLoggedIn: false,
    },
  },
  mutations: {
    /**
     *
     * @param {*} state
     * @param {*} response
     */
    createSession(state, response) {
      state.session.isLoggedIn = true;

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;
    },
    /**
     *
     * @param {*} state
     */
    destroySession(state) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      Vue.prototype.$http.defaults.headers.common["Authorization"] = "";
      state.session.isLoggedIn = false;
    },
    /**
     *
     * @param {*} state
     */
    initSession(state) {
      if (localStorage.getItem("access_token")) {
        state.session.isLoggedIn = true;
        Vue.prototype.$http.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
      } else {
        state.session.isLoggedIn = false;
      }
    },
    /**
     *
     * @param {*} state
     * @param {*} response
     */
    refreshSession(state, response) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("access_token", response.data.access_token);
      Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;
    },
  },
  actions: {
    /**
     *
     * @param {*} param0
     * @param {*} response
     */
    CREATE_SESSION({ commit }, response) {
      return new Promise((resolve) => {
        commit("createSession", response);
        resolve();
      });
    },
    /**
     *
     * @param {*} param0
     */
    DESTROY_SESSION({ commit }) {
      return new Promise((resolve) => {
        commit("destroySession");
        resolve();
      });
    },
    /**
     *
     * @param {*} param0
     */
    INIT_SESSION({ commit }) {
      return new Promise((resolve) => {
        commit("initSession");
        resolve();
      });

      //Vue.prototype.$log.debug("Initialize existing session");
    },
    /**
     *
     * @param {*} param0
     * @param {*} response
     */
    REFRESH_SESSION({ commit }, response) {
      return new Promise((resolve) => {
        commit("refreshSession", response);
        resolve();
      });
    },
  },
  /**
   *
   */
  getters: {
    isLoggedIn(state) {
      return state.session.isLoggedIn;
    },
  },
});
