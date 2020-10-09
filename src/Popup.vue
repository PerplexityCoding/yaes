<template>
  <section class="popin" v-if="loaded">
    <header>
      <img src="assets/images/favicon-16x16.png" />
      <span> Yet Another Env Switcher </span>
    </header>
    <div v-if="currentEnv">
      <EnvList :envs="envs" :current-env="currentEnv" @switch-env="switchEnv" />
    </div>
    <div v-else class="info">
      No environment has been found with this domain name. Click on following
      link to continue.
    </div>
    <footer>
      <a href="#/options" @click="openOptionsPage"> Edit Configuration </a>
      <a href="https://github.com/ymenard-dev/yaes" target="_blank">
        Homepage
      </a>
    </footer>
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
      config: {},
      envs: [],
      currentEnv: null,
      loaded: false
    };
  },
  async created() {
    const currentTab = await getCurrentTab();
    const url = new URL(currentTab.url);
    const config = await storageGetValue("config");

    this.config = config && JSON.parse(config);
    this.envs = this.config && this.config.envs;
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

<style lang="scss">
@import "@/styles/variables.scss";
</style>

<style lang="scss" scoped>
.popin {
  min-width: 250px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
}

.info {
  padding: 7px;
  flex: 1;
}

header {
  border-bottom: 1px solid var(--border-grey);
  background-color: var(--bg-grey);
  padding: 7px;
  display: flex;

  span {
    flex: 1;
    text-align: center;
  }
}

footer {
  border-top: 1px solid var(--border-grey);
  background-color: var(--bg-grey);
  padding: 7px;
  display: flex;
  justify-content: space-between;

  a {
    color: var(--blue);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
