module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vuetify/base",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "vue/valid-v-slot": ["error", { allowModifiers: true }],
    "vue/html-closing-bracket-newline": 0, // ingnore new line because it fights with prettier
  },
};
