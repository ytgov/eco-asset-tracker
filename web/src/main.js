import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "./store";
import "./plugins/base";
import axios from "axios";
import JsonCSV from "vue-json-csv";
import vuetify from "./plugins/vuetify";
import VueCurrencyInput from "vue-currency-input";

import Notifications from "./components/Notifications";

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

Vue.component("downloadCsv", JsonCSV);
Vue.component("notifications", Notifications);

Vue.use(VueCurrencyInput, { globalOptions: { currency: "USD", locale: "en" } });

import { Auth0Plugin } from "@/auth/auth0-plugin";

Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH_DOMAIN,
  client_id: process.env.VUE_APP_AUTH_CLIENTID,
  audience: process.env.VUE_APP_AUTH_AUDIENCE,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
