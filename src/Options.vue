<template>
  <div class="options">
    <section>
      <h1>
        <img src="/assets/images/favicon-32x32.png" />
        YAES - Configuration Page
      </h1>

      <div class="title">
        <h2>
          <span @click="envClick++">
            Environments
          </span>
          <div class="dev-buttons" v-if="envClick > 5">
            <button class="save-btn" @click="forceSave">force save</button>

            <button v-if="editorMode === 'form'" @click="editorMode = 'json'">
              Switch to json
            </button>
            <button v-if="editorMode === 'json'" @click="editorMode = 'form'">
              Switch to form
            </button>
          </div>
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
          <transition name="fade">
            <span v-if="errorMessage" class="info error">
              {{ errorMessage }} <DeleteIcon width="16px" height="12px" />
            </span>
          </transition>
        </div>
      </div>

      <EditorJsonConfig
        v-if="config && editorMode === 'json'"
        ref="editor"
        :config="config"
        @update:config="saveConfig"
      />

      <EditorFormConfig
        v-if="config && editorMode === 'form'"
        :config="config"
        @update:config="saveConfig"
      />

      <h2>
        Import / Export
      </h2>

      <ImportConfig
        @config-loaded="saveImportedConfig"
        @download-config="downloadConfig"
      />
    </section>
  </div>
</template>

<script>
import { getConfig, setConfig } from "./services/business/storage";
import CheckIcon from "./components/icons/CheckIcon";
import DeleteIcon from "./components/icons/Delete";
import ImportConfig from "@/components/options/ImportConfig";
import EditorJsonConfig from "@/components/options/EditorJsonConfig";
import EditorFormConfig from "@/components/options/EditorFormConfig";
import { downloadAsJson } from "@/services/utils";

export default {
  name: "OptionsPage",
  data() {
    return {
      envClick: 0,
      editorMode: "form",
      config: false,
      displaySaveInfo: false,
      loadingError: false,
      errorMessage: null
    };
  },
  components: {
    EditorFormConfig,
    EditorJsonConfig,
    ImportConfig,
    CheckIcon,
    DeleteIcon
  },
  async created() {
    this.config = await this.getOrInitConfig();
  },
  methods: {
    async getOrInitConfig() {
      const { config, errors } = await getConfig({
        mergeOptions: false,
        mergeDefault: false
      });
      if (errors && (errors.migrationFailed || errors.validationFailed)) {
        console.error(errors);
        this.loadingError = true;
      }
      return config;
    },

    forceSave() {
      const editor = this.$refs.editor.editor;
      this.saveConfig(editor.get(), { force: true });
    },

    saveImportedConfig(data) {
      this.saveConfig(data);
    },

    async saveConfig(config, { force, noSave } = {}) {
      if (noSave) {
        this.config = config;
        return;
      }

      if (!force && !config) {
        return;
      }

      this.errorMessage = null;

      if (!(await setConfig(config, force))) {
        this.displaySaveInfo = false;
        this.errorMessage = "Save Failed";
        return;
      }
      this.displaySaveInfo = true;
      this.config = config;

      setTimeout(() => {
        this.displaySaveInfo = false;
      }, 2000);
    },

    downloadConfig() {
      downloadAsJson(this.config);
    }
  }
};
</script>

<style lang="scss">
input[type="url"],
input[type="text"] {
  outline: none;
  padding: 3px 4px 4px 4px;
  border: 1px solid var(--bg-grey-2);
  border-radius: 4px;
  color: var(--fg-black);
  background-color: var(--bg-white-off);

  &:active,
  &:hover,
  &:focus {
    box-shadow: 0px 0px 1px 1px var(--blue);
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
  color: var(--fg-black-disabled);
  opacity: 0.7;
}

button,
select {
  color: var(--fg-black);
}

select {
  padding: 4px;
  border-radius: 4px;
  background-color: var(--bg-white-off);
  border: 1px solid var(--bg-grey-2);
}

.label-set {
  display: flex;
  align-items: center;
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
    color: var(--blue);
  }
}

.box-elevation {
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  background-color: var(--bg-grey);
  border-radius: 4px;
  padding: 12px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.options {
  max-width: 800px;
  margin: 0 auto;
  color: var(--fg-black);

  a {
    color: var(--blue);
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
    color: var(--green);
    padding: 5px 10px;
    margin-top: 5px;
    font-weight: bold;
  }

  .error {
    color: var(--ruby);
    fill: var(--ruby);
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
