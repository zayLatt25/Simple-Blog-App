import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Includes Node.js globals like __dirname and process
        query: true, // Assuming query is intended to be a global variable
        query_parameters: true, // Assuming query_parameters is intended to be a global variable
      },
    },
    plugins: {
      js: pluginJs,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "prettier/prettier": "error", // Ensure Prettier errors are shown in ESLint
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.browser, // Browser globals
    },
    plugins: {
      js: pluginJs,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "prettier/prettier": "error", // Ensure Prettier errors are shown in ESLint
    },
  },
  configPrettier,
];
