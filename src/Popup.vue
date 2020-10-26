<template>
  <section class="popin" v-if="loaded">
    <header v-if="options.displayHeader !== false" class="header">
      <img src="assets/images/favicon-16x16.png" />
      <span> Yet Another Env Switcher </span>
    </header>
    <section class="body">
      <div v-if="mode === 'envs'">
        <div v-if="currentEnvs && currentEnvs.length > 0">
          <EnvList
            :envs="currentEnvs"
            :current-env="currentEnv"
            @switch-env="
              env => (currentEnv ? switchEnv(env) : redirectEnv(env))
            "
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
            <span>See projects</span>
            <ArrowRight class="arrow" height="12px" width="12px" />
          </button>
        </div>
        <div v-else class="info">
          No environments has been configured yet. Click on edit configuration
          link.
        </div>
      </div>
      <div v-else-if="mode === 'projects'">
        <ProjectList
          :projects="projects"
          :envs="envs"
          @redirect-env="redirectEnv"
        />

        <button v-if="currentEnv" class="switch-env-btn" @click="mode = 'envs'">
          <ArrowRight class="arrow" height="12px" width="12px" />
          <span>See current env</span>
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
import EnvList from "./components/popup/EnvList";
import ProjectList from "./components/popup/ProjectList";
import ArrowRight from "./components/icons/ArrowRight";

import {
  getCurrentTab,
  openChromeUrl,
  openOptionsPage
} from "./services/chrome/tabs";
import { switchBaseUrl, getCurrentEnv } from "./services/business/url";
import { getConfig } from "./services/business/storage";

export default {
  name: "Popup",
  components: { EnvList, ProjectList, ArrowRight },
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

    const { config } = await getConfig({ mergeOptions: true });
    if (config) {
      const { envs, projects, options } = config;

      const currentEnv = getCurrentEnv(currentTab.url, config);
      const mapEnvId = localEnvs => {
        return localEnvs.map(envId => envs.find(env => env.id === envId));
      };

      let currentEnvs = null;
      if (currentEnv) {
        const currentProject = projects.find(
          project => project.envs.find(envId => envId === currentEnv.id) != null
        );
        currentEnvs = mapEnvId(currentProject.envs);
      } else {
        if (projects?.length === 1) {
          currentEnvs = mapEnvId(projects[0].envs);
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
    async switchEnv({ env, newTab }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(currentTab.url, env.url, {
        appendUrlParams: env.appendUrlParams,
        removeUrlParams: env.removeUrlParams
      });
      openChromeUrl(currentTab, newUrl, newTab);
    },
    async redirectEnv({ env, newTab }) {
      const currentTab = await getCurrentTab();
      openChromeUrl(currentTab, env.url, newTab);
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

  .arrow {
    transform: rotate(180deg);
  }

  &.right {
    margin-left: auto;

    .arrow {
      transform: rotate(0deg);
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
