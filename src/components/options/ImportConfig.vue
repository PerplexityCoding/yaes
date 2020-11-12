<template>
  <section
    class="import-config-section box-elevation"
    data-intro="This is where you can import and export your configuration. You can export and share them for instance on gist."
  >
    <div class="import-configuration">
      <strong class="import-title"> Import configuration </strong>
      <div class="import-methods">
        <div>
          <div class="label-set">
            <label :for="$id('import-url')"> Using Url </label>
            <input
              :id="$id('import-url')"
              type="url"
              placeholder="https://gist.githubusercontent.com/.../config.json"
              v-model="configurationUrl"
            />
          </div>
          <CoreButton elevation icon-name="Import" @click="importConfig">
            import
          </CoreButton>
          <span class="import-failed-message" v-if="importUrlStatus === false">
            Import from url failed
          </span>
          <span class="import-success-message" v-if="importUrlStatus === true">
            Import from url successful
          </span>
          <div v-if="importConfigLoader" class="lds-dual-ring loader" />
        </div>
        <div>
          <div class="label-set">
            <label :for="$id('import-file')"> Using File </label>
            <CoreButton elevation @click="$refs.importFileInput.click()">
              Choose File
            </CoreButton>
            <input
              ref="importFileInput"
              :id="$id('import-file')"
              type="file"
              accept=".json"
              @change="importFile"
            />

            <span
              class="import-failed-message"
              v-if="importFileStatus === false"
            >
              Import file failed
            </span>
            <span
              class="import-success-message"
              v-if="importFileStatus === true"
            >
              Import file successful
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="import-configuration">
      <strong> Export configuration </strong>
      <CoreButton elevation icon-name="Export" @click="downloadConfig">
        Export
      </CoreButton>
      <span>Tips:</span>
      <a href="https://gist.github.com/" target="_blank">Share it on gist</a>
    </div>
  </section>
</template>

<script>
import { migrateConfig } from "@/services/business/storage";
import CoreButton from "@/components/core/Button";

export default {
  name: "ImportConfig",
  data() {
    return {
      configurationUrl: null,
      importConfigLoader: false,
      importUrlStatus: null,
      importFileStatus: null,
    };
  },
  emits: ["config-loaded", "config-load-failed", "download-config"],
  components: { CoreButton },
  methods: {
    async importConfig() {
      if (this.configurationUrl) {
        this.resetErrors();
        this.importConfigLoader = true;

        const response = await fetch(this.configurationUrl);
        if (response) {
          const data = await response.text();
          const success = await this.saveConfig(data);
          this.importUrlStatus = success;
          this.configurationUrl = null;
          this.importConfigLoader = false;
        }
      }
    },
    downloadConfig() {
      this.$emit("download-config");
    },
    importFile(e) {
      this.resetErrors();

      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = async (event) => {
        const data = event.target.result;
        const success = await this.saveConfig(data);
        this.importFileStatus = success;
      };

      reader.onerror = () => {
        this.importFileStatus = true;
      };
    },
    async saveConfig(data) {
      try {
        const originalConfig = JSON.parse(data);

        const { errors, config } = await migrateConfig(originalConfig);

        if (!errors) {
          this.$emit("config-loaded", config);
          return true;
        }

        console.error(JSON.stringify(errors, null, 4));
      } catch (e) {
        console.error(e);
      }
      return false;
    },
    resetErrors() {
      this.importFileStatus = null;
      this.importUrlStatus = null;
    },
  },
};
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

      > div {
        flex: 1;
        display: flex;
        margin-bottom: 8px;

        .label-set {
          flex: 1;
        }

        input {
          flex: 1;
          margin-right: 8px;
        }

        input[type="file"] {
          display: none;
        }

        label {
          margin-right: 8px;
        }
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
