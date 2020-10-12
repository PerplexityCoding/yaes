<template>
  <section class="popin" v-if="loaded">
    <header class="header">
      <img src="assets/images/favicon-16x16.png" />
      <span> Yet Another Env Switcher </span>
    </header>
    <section class="body">
      <div v-if="currentEnv && mode === 'envs'">
        <EnvList
          :envs="currentEnvs"
          :current-env="currentEnv"
          @switch-env="switchEnv"
        />

        <button
          class="switch-env-btn right"
          @click="mode = 'projects'"
          v-if="projects"
        >
          <span>See projects</span> <ArrowDown height="8px" width="8px" />
        </button>
      </div>
      <div v-else-if="projects && mode === 'projects'">
        <ProjectList
          :projects="projects"
          :envs="envs"
          @redirect-url="redirectUrl"
        />

        <button class="switch-env-btn" @click="mode = 'envs'" v-if="currentEnv">
          <ArrowDown height="8px" width="8px" /> <span>See current env</span>
        </button>
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
import ArrowDown from "./components/icons/ArrowDown";

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
  components: { EnvList, ProjectList, ArrowDown },
  data() {
    return {
      envs: null,
      mode: null,
      projects: null,
      currentEnv: null,
      currentEnvs: null,
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
        this.currentEnvs = this.currentEnv?.project
          ? config.envs.filter(env => env.project === this.currentEnv.project)
          : config.envs;
        this.mode = "envs";
      } else {
        this.mode = "projects";
      }
      this.envs = config.envs;
      this.projects = config.projects;
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

.switch-env-btn {
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px 0 0 5px;
  display: flex;
  justify-content: center;
  margin-top: 6px;
  align-items: center;
  color: var(--fg-black);
  font-size: 0.75rem;
  outline-color: var(--blue);

  &:hover {
    text-decoration: underline;
  }

  span {
    flex: 1;
    padding-right: 5px;
  }

  svg {
    transform: rotate(90deg);
    fill: var(--fg-black);
    margin-right: 5px;
  }

  &.right {
    margin-left: auto;

    svg {
      transform: rotate(270deg);
    }
  }
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
