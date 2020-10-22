<template>
  <div class="options">
    <section>
      <h1>
        YAES - Configuration Page
      </h1>

      <ImportConfig @config-loaded="saveImportedConfig" />

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
          <transition name="fade">
            <span v-if="errorMessage" class="info">
              {{ errorMessage }} <CheckIcon width="16px" height="12px" />
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

      <button v-if="editorMode === 'form'" @click="editorMode = 'json'">
        Switch to json
      </button>
      <button v-if="editorMode === 'json'" @click="editorMode = 'form'">
        Switch to form
      </button>
    </section>

    <button class="save-btn" @click="forceSave">force save</button>
  </div>
</template>

<script>
import { getConfig, setConfig } from "./services/business/storage";
import CheckIcon from "./components/icons/CheckIcon";
import ImportConfig from "@/components/options/ImportConfig";
import EditorJsonConfig from "@/components/options/EditorJsonConfig";
import EditorFormConfig from "@/components/options/EditorFormConfig";

export default {
  name: "OptionsPage",
  data() {
    return {
      editorMode: "form",
      config: false,
      displaySaveInfo: false,
      loadingError: false,
      errorMessage: null
    };
  },
  components: { EditorFormConfig, EditorJsonConfig, ImportConfig, CheckIcon },
  async created() {
    this.config = await this.getOrInitConfig();
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

    forceSave() {
      const editor = this.$refs.editor.editor;
      this.saveConfig(editor.get(), true);
    },

    saveImportedConfig(data) {
      const editor = this.$refs.editor.editor;
      editor.set(data);
      editor.validate();
      if (editor.getMode() === "tree") {
        editor.expandAll();
      }
      setTimeout(() => {
        this.saveConfig(editor.get());
      }, 100);
    },

    async saveConfig(config, force) {
      if (!force && !config) {
        return;
      }

      this.displaySaveInfo = true;

      if (!(await setConfig(config, force))) {
        this.displaySaveInfo = false;
        this.errorMessage = "Save Failed";
        return;
      }
      this.config = config;

      setTimeout(() => {
        this.displaySaveInfo = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
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

  .info {
    display: inline-block;
    border-radius: 3px;
    color: var(--green);
    padding: 5px 10px;
    margin-top: 5px;
    font-weight: bold;
  }

  .save-btn {
    margin: 10px 0;
  }
}
</style>
