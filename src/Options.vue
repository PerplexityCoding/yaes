<template>
  <div class="options">
    <section>
      <h1>
        YAES - Configuration Page
      </h1>

      <section class="import-config-section">
        <div class="import-configuration">
          <strong>
            Import configuration
          </strong>
          <input
            type="url"
            placeholder="https://gist.githubusercontent.com/.../config.json"
            v-model="configurationUrl"
          />
          <button @click="importConfig">import</button>
          <div v-if="importConfigLoader" class="lds-dual-ring loader" />
        </div>

        <div class="import-configuration">
          <strong>
            Export configuration
          </strong>
          <button @click="downloadConfig">download</button>
          <a href="https://gist.github.com/" target="_blank"
            >Share it on gist</a
          >
        </div>
      </section>

      <div class="title">
        <h2>
          Configuration:
        </h2>

        <div v-if="loadingError">
          Oh oh it seems we had a little issue getting your configuration in a
          proper state.
        </div>

        <div>
          <transition name="fade">
            <span v-if="displaySaveInfo" class="info">
              Saved <CheckIcon width="16px" height="12px" />
            </span>
          </transition>
        </div>
      </div>

      <div ref="jsonEditor" class="config"></div>

      <button @click="saveConfig(editor.get(), true)">force save</button>
    </section>
  </div>
</template>

<script>
import { getConfig, setConfig } from "./services/business/storage";
import JSONEditor from "jsoneditor/dist/jsoneditor.js";
import { debounce, downloadAsJson } from "./services/utils";
import validateSchema from "./schemas/config.schema.gen";
import CheckIcon from "./components/icons/CheckIcon";

const SAVE_DELAY = 500;

export default {
  name: "OptionsPage",
  data() {
    return {
      configurationUrl: null,
      importConfigLoader: false,
      displaySaveInfo: false,
      editor: null,
      loadingError: false,
      errors: []
    };
  },
  components: { CheckIcon },
  async created() {
    const originalConfig = await this.getOrInitConfig();

    this.editor = new JSONEditor(
      this.$refs.jsonEditor,
      {
        onChange: debounce(() => {
          try {
            this.saveConfig(this.editor.get());
          } catch (e) {
            if (e.message.indexOf("Parse error on line") >= 0) {
              // contain invalid json data ignore
            } else {
              console.log(e);
            }
          }
        }, SAVE_DELAY),
        onValidationError: errors => {
          this.errors = errors;
        },
        onModeChange: () => {
          if (this.editor) {
            this.editor.validateSchema = validateSchema;
          }
        },
        modes: ["tree", "code"]
      },
      originalConfig
    );
    this.editor.validateSchema = validateSchema;
    this.editor.validate();
    this.editor.expandAll();
  },
  methods: {
    async getOrInitConfig() {
      const { config, errors } = await getConfig();
      if (errors && (errors.migrationFailed || errors.validationFailed)) {
        console.error(errors);
        this.loadingError = true;
      }
      return config;
    },

    saveConfig(config, force) {
      if (!force && (!config || this.errors?.length > 0)) {
        return;
      }

      this.displaySaveInfo = true;

      setConfig(config, force);

      setTimeout(() => {
        this.displaySaveInfo = false;
      }, 2000);
    },

    async importConfig() {
      if (this.configurationUrl) {
        this.importConfigLoader = true;

        const response = await fetch(this.configurationUrl);
        if (response) {
          const data = await response.json();
          this.editor.set(data);
          this.editor.validate();
          this.editor.expandAll();
          setTimeout(() => {
            this.saveConfig(this.editor.get());
            this.configurationUrl = null;
            this.importConfigLoader = false;
          }, 100);
        }
      }
    },

    downloadConfig() {
      downloadAsJson(this.editor.get());
    }
  }
};
</script>

<style src="jsoneditor/dist/jsoneditor.css">
/* global styles */
</style>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/transition.scss";
@import "@/styles/loader.scss";

#check-color {
  fill: var(--green) !important;
}
</style>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.options {
  max-width: 800px;
  margin: 0 auto;

  a {
    color: var(--blue);
  }

  h1 {
    margin-bottom: 10px;

    span {
      font-size: 0.8rem;
      font-weight: normal;
      display: block;
    }
  }

  .import-config-section {
    background-color: var(--bg-grey);
    padding: 0.5rem;
    border-radius: 3px;
  }

  .import-configuration {
    display: flex;
    padding: 5px 0;

    > * {
      margin-left: 0.5rem;
    }

    *:first-child {
      margin-left: 0;
    }

    input {
      flex: 1;
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
      flex: 1;
      font-size: 0.9rem;
      font-weight: bold;
      padding: 3px 0;
    }
  }

  .config {
    flex: 1;
    min-height: 400px;
    height: calc(100vh - 200px);
  }

  .info {
    display: inline-block;
    border-radius: 3px;
    color: var(--green);
    padding: 5px 10px;
    margin-top: 5px;
    font-weight: bold;
  }
}
</style>
