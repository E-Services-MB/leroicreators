import { defineNuxtModule, addImportsDir } from "@nuxt/kit";
import { resolve } from "node:path";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "custom-db",
    configKey: "customDb",
  },
  defaults: {},
  async setup(options, nuxt) {
    // Extend NuxtHub schema scanning to server/database/
    nuxt.hook("hub:db:schema:extend", ({ paths }) => {
      const databasePath = resolve(nuxt.options.rootDir, "server/database");
      paths.push(databasePath);
      console.log(
        "✅ Added server/database/ to NuxtHub schema paths:",
        databasePath,
      );
    });

    // Auto-import schema files for composables
    addImportsDir(resolve(nuxt.options.rootDir, "server/database"));
  },
});
