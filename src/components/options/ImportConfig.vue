<template>
  <section class="import-config-section box-elevation">
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
      <a href="https://gist.github.com/" target="_blank">Share it on gist</a>
    </div>
  </section>
</template>

<script>
export default {
  name: "ImportConfig",
  data() {
    return {
      configurationUrl: null,
      importConfigLoader: false
    };
  },
  emits: ["config-loaded", "download-config"],
  methods: {
    async importConfig() {
      if (this.configurationUrl) {
        this.importConfigLoader = true;

        const response = await fetch(this.configurationUrl);
        if (response) {
          const data = await response.json();
          this.$emit("config-loaded", data);
          this.configurationUrl = null;
          this.importConfigLoader = false;
        }
      }
    },
    downloadConfig() {
      this.$emit("download-config");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.import-config-section {
  .import-configuration {
    display: flex;
    padding-bottom: 16px;

    &:last-child {
      padding-bottom: 0;
    }

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
}
</style>