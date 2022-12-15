/**
 *  External Modules
 */

import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
import { secureGet, securePut, securePost } from "@/store/jwt";
import { getAuthConfig } from "./getAuthConfig";
import { apiConfigUrl } from "@/config";

/**
 *  Vue.js Instance Definition
 */

let instance;

export const getInstance = () => instance;

/**
 *  Vue.js Instance Initialization
 */

export const useAuth0 = ({
  onRedirectCallback = () =>
    window.history.replaceState({}, document.title, window.location.pathname),
  redirectUri = window.location.origin,
  ...pluginOptions //eslint-disable-line no-unused-vars
}) => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: {},
        error: null,
      };
    },
    methods: {
      async handleRedirectCallback() {
        console.log("In handle redirect");
        this.isLoading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        } catch (error) {
          this.error = error;
        } finally {
          this.isLoading = false;
        }
      },

      loginWithRedirect(options) {
        return this.auth0Client.loginWithRedirect(options);
      },

      logout(options) {
        return this.auth0Client.logout(options);
      },

      getTokenSilently(o) {
        // console.log("In get token silently");
        // console.log(o);
        // let result;
        // try {
        //   result = this.auth0Client.getTokenSilently(o);
        // } catch (error) {
        //   if (error.error !== "login_required") {
        //     console.log("Boom! Something bad happend in auth");
        //     throw error;
        //   }
        // }
        // return result;
        return this.auth0Client.getTokenSilently(o);
      },

      get(url) {
        return secureGet(url);
      },
      put(url, body) {
        return securePut(url, body);
      },
      post(url, body) {
        return securePost(url, body);
      },
    },

    async created() {
      /*
      Pull auth configuation from the server to get around a Vue production build issue
      where VUE_APP build variables are not available at build runtime.
      */

      this.options = await getAuthConfig(apiConfigUrl);
      console.log(apiConfigUrl);
      console.log(this.options);
      this.auth0Client = await createAuth0Client({
        ...this.options,
        redirect_uri: redirectUri,
      });

      try {
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          const { appState } = await this.auth0Client.handleRedirectCallback();

          onRedirectCallback(appState);
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        //set the access token in the auth store
        // await this.getTokenSilently(); //enabled for testing
        //store.commit("auth/setToken", token);
        this.isLoading = false;
      }
    },
  });

  return instance;
};

/**
 *  Vue.js Plugin Definition
 */

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  },
};
