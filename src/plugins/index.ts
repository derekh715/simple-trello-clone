/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from "../router";
import vuetify from "./vuetify";

// Types
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import type { App } from "vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

export function registerPlugins(app: App) {
  app.use(pinia).use(vuetify).use(router);
}
