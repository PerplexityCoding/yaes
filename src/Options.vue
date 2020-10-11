<template>
  <div class="options">
    <section>
      <h1>
        YAES - Configuration Page
        <span>
          <em> (All changes will be saved directly) </em>
        </span>
      </h1>

      <div class="title">
        Configuration:
      </div>

      <div ref="jsonEditor" class="config"></div>
    </section>
    <transition name="fade">
      <div v-if="displayInfo" class="info">
        {{ info }}
      </div>
    </transition>
  </div>
</template>

<script>
import { storageGetValue, storageSet } from "./services/chrome/storage";
import JSONEditor from "jsoneditor/dist/jsoneditor.js";
import { debounce } from "./services/utils";
import validateSchema from "./schema/config_schema.gen.js";

const SAVE_DELAY = 1500;

export const DEFAULT_CONFIG = {
  envs: [
    {
      name: "FR",
      url: "https://www.google.fr/",
      ribbon: {
        color: "#d74a59",
        position: "left"
      }
    }
  ],
  options: {
    ribbon: true,
    badge: true,
    displayDomain: true
  }
};

export default {
  name: "OptionsPage",
  data() {
    return {
      info: "Saved !",
      displayInfo: false,
      editor: null,
      errors: [],
    };
  },
  async created() {
    const originalConfig = await this.getOrInitConfig();

    this.editor = new JSONEditor(
      this.$refs.jsonEditor,
      {
        onChange: debounce(() => {
          try {
            const config = this.editor.get();
            if (config && this.errors.length === 0) {
              this.saveConfig(config);
            }
          } catch (e) {
            if (e.message.indexOf("Parse error on line") >= 0) {
              // contain invalid json data ignore
            } else {
              console.log(e);
            }
          }
        }, SAVE_DELAY),
        onValidationError: (errors) => {
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
      const configString = await storageGetValue("config");

      let config = null;
      if (configString) {
        config = JSON.parse(configString);
      } else {
        config = { ...DEFAULT_CONFIG };
        this.saveConfig(config);
      }

      return config;
    },

    saveConfig(config) {
      this.displayInfo = true;

      storageSet({
        config: JSON.stringify(config)
      });

      setTimeout(() => {
        this.displayInfo = false;
      }, 2000);
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
</style>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.options {
  max-width: 800px;
  margin: 0 auto;

  h1 {
    margin-bottom: 10px;

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
    font-size: 0.9rem;
    font-weight: bold;
    padding: 3px 0;
  }

  .config {
    flex: 1;
    height: 500px;
  }

  .info {
    display: inline-block;
    border-radius: 3px;
    background-color: var(--green);
    color: white;
    padding: 5px 10px;
    margin-top: 5px;
  }
}
</style>
