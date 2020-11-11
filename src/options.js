import {
  loadSentry,
  queueVueGlobalErrorHandler,
} from "@/services/sentry/loader";
import Options from "./Options.vue";
import { createApp } from "vue";
import uniqueId from "./utils/plugins/unique-id";
import { VuelidatePlugin } from "@vuelidate/core";

loadSentry();

const app = createApp(Options);

queueVueGlobalErrorHandler(app);

app.use(uniqueId);
app.use(VuelidatePlugin);
app.mount("#app");
