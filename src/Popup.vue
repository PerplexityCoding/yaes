<template>
  <section v-if="loaded" class="popin" :class="{ 'dark-mode': darkMode }">
    <header v-if="config.options.displayHeader !== false" class="header">
      <img src="assets/images/favicon-16x16.png" />
      <span> Yet Another Env Switcher </span>
    </header>
    <section class="body">
      <div v-if="mode === 'envs'">
        <div v-if="config.currentEnvs && config.currentEnvs.length > 0">
          <EnvList
            :envs="config.currentEnvs"
            :current-env="config.currentEnv"
            @switch-env="(o) => changeBaseUrlEnv(o, !!config.currentEnv)"
          />

          <button
            v-if="
              config.projects &&
              config.projects.length > 1 &&
              config.options.displaySeeProjectsLink !== false
            "
            class="switch-env-btn right"
            @click="changeMode('projects')"
          >
            <span>See projects</span>
            <ArrowRightIcon class="arrow" height="12px" width="12px" />
          </button>
        </div>
      </div>
      <div v-else-if="mode === 'projects'">
        <ProjectList
          :projects="config.projects"
          :envs="config.envs"
          @redirect-env="(o) => changeBaseUrlEnv(o, false)"
        />

        <button v-if="config.currentEnv" class="switch-env-btn" @click="changeMode('envs')">
          <ArrowRightIcon class="arrow" height="12px" width="12px" />
          <span>See current env</span>
        </button>
      </div>
      <div v-else class="info">
        No environments has been configured yet. Click on edit configuration link.
      </div>
    </section>
    <footer v-if="config.options.displayFooter !== false" class="footer">
      <a href="#/options" @click="openOptionsPage"> Edit Configuration </a>
      <a href="https://github.com/ymenard-dev/yaes" target="_blank"> Homepage </a>
    </footer>
  </section>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import EnvList from "./components/popup/EnvList";
import ProjectList from "./components/popup/ProjectList";
import ArrowRightIcon from "./components/icons/ArrowRightIcon";

import { getCurrentTab, openChromeUrl, openOptionsPage } from "./services/chrome/tabs";
import { switchBaseUrl, getCurrentEnv } from "./services/business/url";
import { getConfig } from "./services/business/storage/get";
import { isDarkMode } from "@/services/business/utils";
import { findProjectByEnvId, mapProjectEnvs } from "@/services/business/bo/project";

function changeBaseUrlEnv(currentTab) {
  return async ({ env, newTab }, switchOption) => {
    const baseUrl = switchOption ? currentTab.value.url : env.url;
    const newUrl = switchBaseUrl(baseUrl, env.url, {
      appendUrlParams: env.appendUrlParams,
      removeUrlParams: env.removeUrlParams,
    });
    openChromeUrl(currentTab.value, newUrl, newTab);
  };
}

async function useCurrentTab() {
  const currentTab = await getCurrentTab();
  return currentTab;
}

async function useConfig(currentTabUrl) {
  const { config } = await getConfig();
  const { envs, projects, options } = config;
  const currentEnv = getCurrentEnv(currentTabUrl, config);

  let currentEnvs = null;
  if (currentEnv) {
    const currentProject = findProjectByEnvId(projects, currentEnv.id);
    currentEnvs = mapProjectEnvs(currentProject, envs);
  } else {
    if (projects && projects.length === 1) {
      currentEnvs = mapProjectEnvs(projects[0], envs);
    }
  }

  return {
    currentEnv: currentEnv,
    currentEnvs: currentEnvs,
    envs: envs,
    projects: projects,
    options: options || {},
  };
}

async function useAsyncSetup(config, currentTab, mode, loaded) {
  currentTab.value = await useCurrentTab();

  const localConfig = await useConfig(currentTab.value.url);
  Object.assign(config, localConfig);

  mode.value =
    config.currentEnv || (config.currentEnvs && config.currentEnvs.length > 0)
      ? "envs"
      : config.projects && config.projects.length > 0
      ? "projects"
      : "";

  loaded.value = true;
}

export default defineComponent({
  name: "Popup",
  components: { EnvList, ProjectList, ArrowRightIcon },
  setup() {
    const loaded = ref(false);
    const mode = ref("");
    const config = {};
    const currentTab = {};

    useAsyncSetup(config, currentTab, mode, loaded);

    return {
      darkMode: computed(() => isDarkMode(config.options.colorScheme)),
      openOptionsPage,
      changeBaseUrlEnv: changeBaseUrlEnv(currentTab),
      changeMode: (newMode) => (mode.value = newMode),
      loaded,
      config,
      mode,
    };
  },
});
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

  &:focus,
  &:active {
    box-shadow: 0 0 0 1px rgba(var(--blue));
    outline: none;
  }

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
  display: flex;
  flex-direction: column;
}

.info {
  flex: 1;
  color: rgba(var(--fg-black));

  @at-root .dark-mode & {
    color: rgba(var(--bg-white-off));
  }
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

  > img {
    width: 16px;
    height: 16px;
  }

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
