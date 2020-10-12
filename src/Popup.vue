<template>
  <section class="popin" v-if="loaded">
    <header class="header">
      <img src="assets/images/favicon-16x16.png" />
      <span> Yet Another Env Switcher </span>
    </header>
    <section class="body">
      <div v-if="currentEnv && envs">
        <EnvList
          :envs="envs"
          :current-env="currentEnv"
          @switch-env="switchEnv"
        />
      </div>
      <div v-else-if="projects && envs">
        <ProjectList
          :projects="projects"
          :envs="envs"
          @redirect-url="redirectUrl"
        />
      </div>
      <div v-else class="info">
        No environment has been found with this domain name. Click on following
        link to continue.
      </div>
    </section>
    <footer class="footer">
      <a href="#/options" @click="openOptionsPage"> Edit Configuration </a>
      <a href="https://github.com/ymenard-dev/yaes" target="_blank">
        Homepage
      </a>
    </footer>
  </section>
</template>

<script>
import EnvList from "./components/EnvList";
import ProjectList from "./components/ProjectList";

import {
  getCurrentTab,
  openChromeUrl,
  openOptionsPage
} from "./services/chrome/tabs";
import {
  switchBaseUrl,
  getCurrentEnv,
  mergeOptions
} from "./services/business/url";
import { storageGetValue } from "./services/chrome/storage";

export default {
  name: "Popup",
  components: { EnvList, ProjectList },
  data() {
    return {
      envs: null,
      projects: null,
      currentEnv: null,
      loaded: false
    };
  },
  async created() {
    const currentTab = await getCurrentTab();
    const configString = await storageGetValue("config");

    let config = null;
    try {
      config = configString && mergeOptions(JSON.parse(configString));
    } catch (e) {
      console.error(e);
    }

    if (config) {
      this.currentEnv = getCurrentEnv(currentTab.url, config);
      if (this.currentEnv) {
        this.envs = this.currentEnv?.project
          ? config.envs.filter(env => env.project === this.currentEnv.project)
          : config.envs;
      } else {
        this.projects = config.projects;
        this.envs = config.envs;
      }
    }

    this.loaded = true;
  },
  methods: {
    async switchEnv({ env, middle }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(currentTab.url, env.url);
      openChromeUrl(currentTab, newUrl, middle);
    },
    async redirectUrl({ url, middle }) {
      const currentTab = await getCurrentTab();
      openChromeUrl(currentTab, url, middle);
    },
    openOptionsPage() {
      openOptionsPage();
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/icons.scss";
</style>

<style lang="scss" scoped>
.popin {
  min-width: 270px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
}

.info {
  flex: 1;
}

.body {
  padding: 11px 7px;
}

.header {
  border-bottom: 1px solid var(--border-grey);
  background-color: var(--bg-grey);
  color: var(--fg-black);
  padding: 7px;
  display: flex;

  span {
    flex: 1;
    text-align: center;
  }
}

.footer {
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
