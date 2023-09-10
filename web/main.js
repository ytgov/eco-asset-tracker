import App from "./App.vue";

import * as Sentry from "@sentry/browser";

import { createApp } from "vue";
// import { createWebHistory } from "vue-router";
import router from "@/router";
import { store } from "./store";
import axios from "axios";

axios.defaults.withCredentials = true;

// Plugins
import { registerPlugins } from "@/plugins";
import vuetify from "@/plugins/vuetify";

// const router = createRouter(createWebHistory());
// const pinia = createPinia();

const app = createApp(App);

Sentry.init({
  app,
  // dsn: "https://63758048871a4642a6f5112470a20c6c@app.glitchtip.com/3152",
  dsn: import.meta.env.VITE_SENTRY_DSN,
});

registerPlugins(app);

// app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(store);
app.mount("#app");
