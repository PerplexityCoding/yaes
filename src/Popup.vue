<template>
  <section class="popin" v-if="loaded">
    <EnvList
      v-if="currentEnv"
      :envs="envs"
      :current-env="currentEnv"
      @switch-env="switchEnv"
    />
    <div v-else>
      No environment has been found with this domain name. <br />
      Manage your
      <a href="#/options" @click="openOptionsPage"> configuration </a>
    </div>
  </section>
</template>

<script>
import EnvList from "./components/EnvList";
import {
  getCurrentTab,
  openChromeUrl,
  openOptionsPage
} from "./services/chrome/tabs";
import { switchBaseUrl } from "./services/business/url";
import { storageGetValue } from "./services/chrome/storage";

export default {
  name: "Popup",
  components: { EnvList },
  data() {
    return {
      envs: [],
      currentEnv: null,
      loaded: false
    };
  },
  async created() {
    const currentTab = await getCurrentTab();
    const url = new URL(currentTab.url);
    const envsString = await storageGetValue("envs");

    this.envs = envsString && JSON.parse(envsString);
    this.currentEnv =
      this.envs &&
      this.envs.find(env => {
        return new URL(env.url).hostname === url.hostname;
      });

    this.loaded = true;
  },
  methods: {
    async switchEnv({ env, middle }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(currentTab.url, env.url);

      openChromeUrl(currentTab, newUrl, middle);
    },
    openOptionsPage() {
      openOptionsPage();
    }
  }
};
</script>

<style lang="scss" scoped>
.popin {
  min-width: 250px;
  min-height: 100px;
}
</style>
