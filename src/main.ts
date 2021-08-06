import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import AOS from "aos";
import "aos/dist/aos.css";

import VueRouter from "vue-router";
import { router } from "@/routes/index.ts";
import axios from "@/axios/index.ts";

import store from "@/store/session.store.ts";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


import VueAxios from "vue-axios";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const isProduction = process.env.NODE_ENV === "production";

Vue.use(VueRouter);
Vue.use(Buefy, {
  defaultIconPack: "fas",
});

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

store.dispatch("INIT_SESSION").then(() => {
  console.info("Initialize session from local storage");
});
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue'));
new Vue({
  router,
  store,
  created() {
    AOS.init();
  },
  render: (h) => h(App),
}).$mount("#app");
