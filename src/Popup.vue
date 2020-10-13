<template>
  <section class="popin" v-if="loaded">
    <header v-if="options.displayHeader !== false" class="header">
      <img src="assets/images/favicon-16x16.png" />
      <span> Yet Another Env Switcher </span>
    </header>
    <section class="body">
      <div v-if="mode === 'envs'">
        <EnvList
          :envs="currentEnvs"
          :current-env="currentEnv"
          @switch-env="switchEnv"
        />

        <button
          v-if="
            projects &&
              projects.length > 1 &&
              options.displaySeeProjectsLink !== false
          "
          class="switch-env-btn right"
          @click="mode = 'projects'"
        >
          <span>See projects</span> <ArrowDown height="8px" width="8px" />
        </button>
      </div>
      <div v-else-if="mode === 'projects'">
        <ProjectList
          :projects="projects"
          :envs="envs"
          @redirect-env="redirectEnv"
        />

        <button v-if="currentEnv" class="switch-env-btn" @click="mode = 'envs'">
          <ArrowDown height="8px" width="8px" /> <span>See current env</span>
        </button>
      </div>
      <div v-else class="info">
        No environment has been found with this domain name. Click on following
        link to continue.
      </div>
    </section>
    <footer v-if="options.displayFooter !== false" class="footer">
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
      loaded: false,
      options: {}
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
      const currentEnv = getCurrentEnv(currentTab.url, config);
      const { envs, projects, options } = config;

      let currentEnvs = null;
      if (currentEnv) {
        currentEnvs = currentEnv?.project
          ? envs.filter(env => env.project === currentEnv.project)
          : envs;
      } else {
        if (projects?.length === 1) {
          currentEnvs = envs.filter(env => env.project === projects[0].id);
        } else if (!projects) {
          currentEnvs = envs;
        }
      }

      this.mode = currentEnv || currentEnvs ? "envs" : "projects";
      this.currentEnv = currentEnv;
      this.currentEnvs = currentEnvs;
      this.envs = envs;
      this.projects = projects;
      this.options = options || {};
    }

    this.loaded = true;
  },
  methods: {
    async switchEnv({ env, middle }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(currentTab.url, env.url);
      openChromeUrl(currentTab, newUrl, middle);
    },
    async redirectEnv({ env, middle }) {
      const currentTab = await getCurrentTab();
      openChromeUrl(currentTab, env.url, middle);
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
