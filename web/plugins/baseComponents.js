const components = import.meta.glob("@/components/base/*.vue", { eager: true });
import JsonCSV from "vue-json-csv";

const register = (app) => {
  app.component("downloadCsv", JsonCSV);
  Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    const componentName = path
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");
    app.component(componentName, definition.default);
  });
};

export default {
  register,
};
