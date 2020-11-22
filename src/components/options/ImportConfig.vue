<template>
  <section
    class="import-config-section box-elevation"
    data-intro="This is where you can import and export your configuration. You can export and share them for instance on gist."
  >
    <div class="import-configuration">
      <strong class="import-title"> Import configuration </strong>
      <div class="import-methods">
        <div>
          <div class="import-url-field">
            <div class="label-set">
              <label :for="$id('import-url')"> Using Url </label>
              <input
                :id="$id('import-url')"
                type="url"
                placeholder="https://gist.githubusercontent.com/.../config.json"
                v-model="configurationUrl"
              />
            </div>
            <CoreButton elevation icon-name="ImportIcon" @click="importConfig"> import </CoreButton>
            <span class="import-failed-message" v-if="importUrlStatus === false">
              Import from url failed
            </span>
            <span class="import-success-message" v-if="importUrlStatus === true">
              Import from url successful
            </span>
            <div v-if="importConfigLoader" class="lds-dual-ring loader" />
          </div>

          <div class="import-inline-options">
            <div>
              <label :for="$id('merge-options-mode')"> Merge options mode </label>
              <select
                :id="$id('merge-options-mode')"
                v-model="mergeOptionsMode"
                @change="updateImportOptions"
              >
                <option value="">Override</option>
                <option value="merge">Merge</option>
                <option value="keep">Keep</option>
              </select>
            </div>
          </div>

          <div class="import-inline-options">
            <div>
              <label :for="$id('auto-sync')"> Auto sync </label>
              <input
                :id="$id('auto-sync')"
                type="checkbox"
                v-model="autoSync"
                @change="updateImportOptions"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="label-set">
            <label :for="$id('import-file')"> Using File </label>
            <CoreButton elevation @click="$refs.importFileInput.click()"> Choose File </CoreButton>
            <input
              ref="importFileInput"
              :id="$id('import-file')"
              type="file"
              accept=".json"
              @change="importFile"
            />

            <span class="import-failed-message" v-if="importFileStatus === false">
              Import file failed
            </span>
            <span class="import-success-message" v-if="importFileStatus === true">
              Import file successful
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="import-configuration">
      <strong> Export configuration </strong>
      <CoreButton elevation icon-name="ExportIcon" @click="downloadConfig"> Export </CoreButton>
      <span>Tips:</span>
      <a href="https://gist.github.com/" target="_blank">Share it on gist</a>
    </div>
  </section>
</template>

<script>
import { importConfig as importConfigService, importFromUrl } from "@/services/business/storage";
import CoreButton from "@/components/options/core/Button";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ImportConfig",
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { CoreButton },
  emits: ["config-loaded", "download-config", "update:options"],
  setup(props, context) {
    const configurationUrl = ref(props.options.import ? props.options.import.url : "");
    const importUrlStatus = ref(null);
    const importFileStatus = ref(null);
    const importConfigLoader = ref(false);
    const mergeOptionsMode = ref(
      props.options.import ? props.options.import.mergeOptionsMode : false
    );
    const autoSync = ref(props.options.import ? props.options.import.sync : false);

    const importConfig = async () => {
      if (configurationUrl.value) {
        resetErrors();
        importConfigLoader.value = true;

        const config = await importFromUrl(configurationUrl.value, {
          url: configurationUrl.value,
          mergeOptionsMode: mergeOptionsMode.value,
          sync: autoSync.value,
        });
        if (config) {
          context.emit("config-loaded", config);
        }
        importUrlStatus.value = !!config;
        importConfigLoader.value = false;
      }
    };

    const importFile = (e) => {
      resetErrors();

      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = async (event) => {
        const data = event.target.result;
        const config = await importConfigService(data);
        if (config) {
          context.emit("config-loaded", config);
        }
        importFileStatus.value = !!config;
      };

      reader.onerror = () => {
        importFileStatus.value = false;
      };
    };

    const resetErrors = () => {
      importFileStatus.value = null;
      importUrlStatus.value = null;
    };

    const updateImportOptions = () => {
      setTimeout(() => {
        context.emit("update:options", {
          import: {
            url: configurationUrl.value,
            mergeOptionsMode: mergeOptionsMode.value,
            sync: autoSync.value,
          },
        });
      }, 0);
    };

    const downloadConfig = () => {
      context.emit("download-config");
    };

    return {
      importFile,
      importConfig,
      updateImportOptions,
      downloadConfig,
      configurationUrl,
      importUrlStatus,
      importFileStatus,
      importConfigLoader,
      mergeOptionsMode,
      autoSync,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.loader {
  margin-left: 4px;
}

.import-config-section {
  padding-top: 16px;

  a {
    color: rgba(var(--blue));
  }

  .import-configuration {
    display: flex;
    padding-bottom: 16px;
    align-items: center;

    .import-title {
      align-self: baseline;
    }

    &:last-child {
      padding-bottom: 0;
    }

    > * {
      margin-left: 0.5rem;
    }

    *:first-child {
      margin-left: 0;
    }

    .import-methods {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      top: -4px;

      .import-url-field {
        flex: 1;
        display: flex;
      }

      .import-inline-options {
        margin-bottom: 8px;
      }

      .import-inline-options:last-child {
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(var(--border-grey));

        @at-root .dark-mode & {
          border-color: rgba(var(--black-2), 1);
        }
      }

      .label-set {
        flex: 1;
      }

      input {
        flex: 1;
        margin-right: 8px;
      }

      label {
        margin-right: 8px;
      }

      input[type="file"] {
        display: none;
      }
    }

    .import-failed-message {
      color: rgba(var(--ruby));
      margin-left: 8px;
    }

    .import-success-message {
      color: rgba(var(--green));
      margin-left: 8px;

      @at-root .dark-mode & {
        color: rgba(var(--green-apple));
      }
    }
  }
}
</style>
