import Options from "./Options.vue";
import { createApp } from "vue";
import uniqueId from "./utils/plugins/unique-id";
import { VuelidatePlugin } from "@vuelidate/core";

const app = createApp(Options);
app.use(uniqueId);
app.use(VuelidatePlugin);
app.mount("#app");
