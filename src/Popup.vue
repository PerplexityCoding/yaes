<template>
  <section class="popin" v-if="loaded" :class="{ 'dark-mode': darkMode }">
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
              (env) => (currentEnv ? switchEnv(env) : redirectEnv(env))
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
          v-model:openProjectId="openProjectId"
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
  openOptionsPage,
} from "./services/chrome/tabs";
import { switchBaseUrl, getCurrentEnv } from "./services/business/url";
import { getConfig } from "./services/business/storage/get";
import { isDarkMode } from "@/services/business/utils";

export default {
  name: "Popup",
  components: { EnvList, ProjectList, ArrowRight },
  data() {
    return {
      openProjectId: -1,
      envs: null,
      mode: null,
      projects: null,
      currentEnv: null,
      currentEnvs: null,
      loaded: false,
      options: {},
    };
  },
  async created() {
    const currentTab = await getCurrentTab();

    const { config } = await getConfig();
    if (config) {
      const { envs, projects, options } = config;

      const currentEnv = getCurrentEnv(currentTab.url, config);
      const mapEnvId = (localEnvs) => {
        return localEnvs.map((envId) => envs.find((env) => env.id === envId));
      };

      let currentEnvs = null;
      if (currentEnv) {
        const currentProject = projects.find(
          (project) =>
            project.envs.find((envId) => envId === currentEnv.id) != null
        );
        currentEnvs = mapEnvId(currentProject.envs);
      } else {
        if (projects && projects.length === 1) {
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
  computed: {
    darkMode() {
      return isDarkMode(this.options.colorScheme);
    },
  },
  methods: {
    async switchEnv({ env, newTab }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(currentTab.url, env.url, {
        appendUrlParams: env.appendUrlParams,
        removeUrlParams: env.removeUrlParams,
      });
      openChromeUrl(currentTab, newUrl, newTab);
    },
    async redirectEnv({ env, newTab }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(env.url, env.url, {
        appendUrlParams: env.appendUrlParams,
        removeUrlParams: env.removeUrlParams,
      });
      openChromeUrl(currentTab, newUrl, newTab);
    },
    openOptionsPage() {
      openOptionsPage();
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/icons.scss";

.list-button {
  appearance: none;
  border-radius: 5px;
  border: 1px solid rgba(var(--border-grey));
  padding: 5px 8px 5px 15px;
  flex: 1;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(var(--bg-grey));
  transition: background-color 0.7s ease;
  min-height: 40px;
  letter-spacing: 0.35px;
  color: rgba(var(--fg-black));
  outline-color: rgba(var(--blue));

  @at-root .dark-mode & {
    color: rgba(var(--bg-white-off));
    fill: rgba(var(--bg-white-off));
    border: 1px solid rgba(var(--black-1));
    background-color: rgba(var(--black-3));
  }

  &:hover {
    background-color: rgba(var(--bg-grey-hover));

    @at-root .dark-mode & {
      background-color: rgba(var(--black-3), 0.8);
    }
  }
}
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
  color: rgba(var(--fg-black));
  font-size: 0.75rem;
  outline-color: rgba(var(--blue));

  @at-root .dark-mode & {
    color: rgba(var(--bg-white-off));
  }

  &:hover {
    text-decoration: underline;
  }

  span {
    flex: 1;
    padding-right: 5px;
  }

  svg {
    transform: rotate(90deg);
    fill: rgba(var(--fg-black));
    margin-right: 5px;

    @at-root .dark-mode & {
      fill: rgba(var(--bg-white-off));
    }
  }

  .arrow {
    transform: rotate(180deg);
  }

  &.right {
    margin-left: auto;

    .arrow {
      transform: rotate(0deg);
    }

    svg {
      margin-right: 10px;
    }
  }
}

.header {
  border-bottom: 1px solid rgba(var(--border-grey));
  background-color: rgba(var(--bg-grey));
  color: rgba(var(--fg-black));
  padding: 7px;
  display: flex;

  @at-root .dark-mode & {
    border-bottom: 1px solid rgba(var(--black-3));
    background-color: rgba(var(--black-1));
    color: rgba(var(--bg-white-off));
  }

  span {
    flex: 1;
    text-align: center;
  }
}

.footer {
  border-top: 1px solid rgba(var(--border-grey));
  background-color: rgba(var(--bg-grey));
  padding: 7px;
  display: flex;
  justify-content: space-between;

  @at-root .dark-mode & {
    border-top: 1px solid rgba(var(--black-3));
    background-color: rgba(var(--black-1));
    color: rgba(var(--bg-grey));
  }

  a {
    color: rgba(var(--blue));
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
