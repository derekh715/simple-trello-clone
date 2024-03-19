import { render } from "@testing-library/vue";
import { Component, Plugin } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

export function renderWith(
  component: Component,
  plugins: Plugin[],
  props: object = {}
) {
  return render(component, {
    global: {
      plugins: [vuetify, ...plugins],
    },
    props,
  });
}
