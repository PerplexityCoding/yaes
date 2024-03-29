<template>
  <div v-if="config" class="options">
    <section>
      <h1
        data-intro="Hello, this is Yaes Configuration page. Nobody like a tutorial, so let's get it over with."
      >
        <img src="/assets/images/favicon-32x32.png" />
        YAES - Configuration Page
      </h1>

      <div class="title">
        <h2>
          <span> Environments </span>
        </h2>

        <div v-if="loadingError">
          Oh oh it seems we had a little issue getting your configuration in a proper state.
        </div>

        <div>
          <transition name="fade">
            <span v-if="displaySaveInfo" class="info">
              Saved <CheckIcon width="16px" height="12px" />
            </span>
          </transition>
          <transition name="fade">
            <span v-if="errorMessage" class="info error">
              {{ errorMessage }} <DeleteIcon width="16px" height="12px" />
            </span>
          </transition>
        </div>
      </div>

      <EditorFormConfig :config="config" @update:config="saveConfig" />

      <h2>Import / Export</h2>

      <ImportConfig
        :options="config.options"
        :config="config"
        @update:options="updateConfigOptions"
        @config-loaded="saveConfig"
        @download-config="downloadAsJson"
      />
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { getFixConfig, setConfig } from "./services/business/storage";
import ImportConfig from "@/components/options/ImportConfig.vue";
import EditorFormConfig from "@/components/options/envs/EditorFormConfig.vue";
import { downloadAsJson } from "@/services/utils";
import { isDarkMode } from "@/services/business/utils";
import introJs from "intro.js";

async function useAsyncSetup(config, loadingError) {
  const { storedConfig, hasErrors } = await getOrInitConfig();
  config.value = storedConfig;
  loadingError.value = hasErrors;

  if (!hasErrors && storedConfig.envs.length === 0 && storedConfig.projects.length === 0) {
    setTimeout(() => {
      introJs().start();
    }, 0);
  }
}

async function getOrInitConfig() {
  const { config, errors } = await getFixConfig({
    mergeOptions: false,
    mergeDefault: false,
  });
  return {
    hasErrors: errors && (errors.migrationFailed || errors.validationFailed),
    storedConfig: config,
  };
}

function useSaveConfig({ config, errorMessage, displaySaveInfo }) {
  return async (savingConfig) => {
    if (!savingConfig) {
      return;
    }

    config.value = savingConfig;

    errorMessage.value = null;

    if (!(await setConfig(savingConfig))) {
      displaySaveInfo.value = false;
      errorMessage.value = "Save Failed";
      return;
    }
    displaySaveInfo.value = true;

    setTimeout(() => {
      displaySaveInfo.value = false;
    }, 3000);
  };
}

function useUpdateConfigOptions({ saveConfig, config }) {
  return (options) => {
    saveConfig({
      ...config.value,
      options: {
        ...config.value.options,
        ...options,
      },
    });
  };
}

function isConfigDarkMode(config) {
  return config.value && config.value.options
    ? isDarkMode(config.value.options.colorScheme)
    : false;
}

function updateBodyClassListDarkMode(darkMode) {
  const classList = window.document.body.classList;
  if (darkMode) {
    classList.add("dark-mode");
    classList.remove("light-mode");
  } else {
    classList.add("light-mode");
    classList.remove("dark-mode");
  }
}

function useDarkMode(config) {
  const darkMode = computed(() => isConfigDarkMode(config));
  watch(darkMode, (value) => updateBodyClassListDarkMode(value));
  return darkMode;
}

export default defineComponent({
  name: "OptionsPage",
  components: {
    EditorFormConfig,
    ImportConfig,
  },
  setup() {
    const config = ref(null);
    const loadingError = ref(false);
    const errorMessage = ref(null);
    const displaySaveInfo = ref(false);

    useAsyncSetup(config, loadingError);

    const darkMode = useDarkMode(config);

    const saveConfig = useSaveConfig({ config, errorMessage, displaySaveInfo });
    const updateConfigOptions = useUpdateConfigOptions({ config, saveConfig });

    return {
      displaySaveInfo,
      errorMessage,
      config,
      loadingError,
      darkMode,
      downloadAsJson: () => downloadAsJson(config.value),
      saveConfig,
      updateConfigOptions,
    };
  },
});
</script>

<style lang="scss">
@import "./styles/variables.css";
@import "./styles/transition.css";
@import "./styles/loader.css";

body {
  &.dark-mode {
    background-color: #0e0e0e !important;
  }

  &.light-mode {
    background-color: #fdfbf8 !important;
  }
}

input[type="url"],
input[type="text"] {
  outline: none;
  padding: 3px 4px 4px 4px;
  border: 1px solid rgba(var(--bg-grey-2));
  border-radius: 4px;
  color: rgba(var(--fg-black));
  background-color: rgba(var(--bg-white-off));

  &:active,
  &:hover,
  &:focus {
    box-shadow: 0px 0px 1px 1px rgba(var(--blue));
  }
}

input[type="checkbox"] {
  margin: 0 8px 0 0;
  position: relative;
  top: 1px;
}

input::placeholder {
  font-weight: lighter;
  font-style: oblique;
  color: rgba(var(--fg-black-disabled));
  opacity: 0.7;
}

.error {
  color: rgba(var(--ruby));
}

input.error {
  border-color: rgba(var(--ruby));
  color: rgba(var(--fg-black));

  &:active,
  &:hover,
  &:focus {
    box-shadow: 0px 0px 1px 1px rgba(var(--ruby));
  }
}

button,
select {
  color: rgba(var(--fg-black));
}

select {
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(var(--bg-white-off));
  border: 1px solid rgba(var(--bg-grey-2));
}

.label-set {
  display: flex;
  align-items: baseline;
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.defaulted {
  font-style: oblique;
  font-weight: normal;

  &::after {
    margin-left: 4px;
    content: "*";
    color: rgba(var(--blue));
  }
}

.box-elevation {
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  background-color: rgba(var(--bg-grey));
  border-radius: 4px;
  padding: 12px;

  @at-root .dark-mode & {
    background-color: #2b2b2b;
  }
}

/* fade-in */

.fade-in-enter-active {
  transition: opacity 2s ease;
}

.fade-in-enter-from {
  opacity: 0;
}

/* slide fade */

.slide-fade-enter-active {
  transition: all 0.35s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/* slide fade 2 */

.slide-fade-2-enter-active {
  transition: all 0.35s ease-out;
}

.slide-fade-2-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-2-enter-from,
.slide-fade-2-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.pickr .pcr-button {
  transition: none;

  &:after,
  &:before {
    border-radius: 4px;
  }
}

#check-color {
  fill: rgba(var(--green)) !important;

  @at-root .dark-mode & {
    fill: rgba(var(--green-apple));
  }
}
</style>

<style lang="scss" scoped>
.options {
  color: rgba(var(--fg-black));
  max-width: 800px;
  margin: 0 auto;

  @at-root .dark-mode & {
    color: rgba(var(--bg-white-off), 0.8);
    background-color: #0e0e0e;
  }

  a {
    color: rgba(var(--blue));
  }

  h1 {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    img {
      height: 32px;
      width: 32px;
      margin-right: 16px;
    }

    span {
      font-size: 0.8rem;
      font-weight: normal;
      display: block;
    }
  }

  section {
    display: flex;
    flex-direction: column;
  }

  .title {
    display: flex;
    align-items: center;

    h2 {
      display: flex;

      button {
        margin: 0;
      }

      span {
        flex: 1;
      }
    }
  }

  h2 {
    flex: 1;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 3px 0;
  }

  .info {
    display: inline-block;
    border-radius: 3px;
    color: rgba(var(--green));
    padding: 5px 10px;
    margin-top: 5px;
    font-weight: bold;

    @at-root .dark-mode & {
      color: rgba(var(--green-apple));
      fill: rgba(var(--green-apple));
    }
  }

  .error {
    color: rgba(var(--ruby));
    fill: rgba(var(--ruby));
  }

  .dev-buttons {
    button {
      visibility: hidden;
    }

    &:hover {
      button {
        visibility: visible;
      }
    }
  }
}
</style>
