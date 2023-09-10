/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import { loadFonts } from "./webfontloader";
import BaseComponents from "./baseComponents";
import Auth from "./auth";
// import registerAuth0 from "./auth0";

export function registerPlugins(app) {
  loadFonts();
  BaseComponents.register(app);
  Auth.register(app);
}
