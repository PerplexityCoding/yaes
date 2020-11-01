import Options from "./Options.vue";
import { createApp } from "vue";
import uniqueId from "./utils/plugins/unique-id";

const app = createApp(Options);
app.use(uniqueId);
app.mount("#app");
