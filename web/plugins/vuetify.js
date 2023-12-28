/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { md2 } from "vuetify/blueprints";
// import { VDataTable } from "vuetify/labs/VDataTable";
// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md2,
  components: {
    // VDataTable,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#0097a9",
          secondary: "#512A44",
          // accent: "#00818f",
          // error: "#DC4405",
          // warning: "#F2A900",
          // info: "#00818f",
          // success: "#0097a9",
          // "on-background": "#F2A900",
          anchor: "#00818f",
          yg_moss: "#7A9A01",
          yg_blue: "#0097a9",
          yg_zinc: "#24405A",
          yg_twilight: "#512A44",
          yg_lichen: "#DC4405",
          yg_sun: "#F2A900",
        },
      },
    },
  },
});
