<template>
  <section class="popin" v-if="loaded">
    <EnvList v-if="currentEnv" :envs="envs" @switch-env="switchEnv" />
    <div v-else>
      No environment has been found with this domain name. <br />
      Manage your <a href="#/options" @click="openOptionsPage"> configuration </a>
    </div>
  </section>
</template>

<script>
import EnvList from "./components/EnvList";
import { getCurrentTab, openChromeUrl, openOptionsPage } from "./services/chrome/tabs";
import { switchBaseUrl } from "./services/business/url";

export default {
  name: "Popup",
  components: { EnvList },
  data() {
    return {
      envs: [
        {
          id: 1,
          name: "FR",
          url: "https://www.google.fr/sdfsdf"
        },
        {
          id: 2,
          name: "DE",
          url: "https://www.google.de/sdfsdf"
        },
        {
          id: 3,
          name: "ES",
          url: "https://www.google.es/"
        }
      ],
      currentEnv: null,
      loaded: true
    };
  },
  async created() {
    const currentTab = await getCurrentTab();
    const url = new URL(currentTab.url);
    this.currentEnv = this.envs.find(env => {
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
