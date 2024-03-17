/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { ThemeDefinition, createVuetify } from "vuetify";
import colors from "vuetify/util/colors";

const trelloTheme: ThemeDefinition = {
  colors: {
    background: colors.blue.darken4,
    surface: colors.grey.lighten5,
    primary: colors.blue.base,
    secondary: colors.amber.base,
    "on-background": colors.shades.white,
    "on-surface": colors.shades.black,
    "on-primary": colors.shades.white,
    "on-secondary": colors.shades.black,
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "trelloTheme",
    themes: {
      trelloTheme,
    },
  },
});
