<template>
  <div>
    <div class="editor-form">
      <div>
        <EditorFormConfigProjects
          :config="config"
          @select-env="selectEnv"
          @update:config="updateConfig"
        />
      </div>
      <div v-if="selectedEnv">
        <EditorFormEnvConfig
          :env="selectedEnv"
          :config="config"
          @delete-env="deleteEnv"
          @update:env="updateConfigEnv"
        />
      </div>
    </div>

    <EditorFormConfigGlobalOptions
      :options="config.options"
      @update:options="options => updateConfig({ options })"
    />
  </div>
</template>

<script>
import EditorFormEnvConfig from "@/components/options/EditorFormConfigEnv";
import EditorFormConfigProjects from "@/components/options/EditorFormConfigProjects";
import EditorFormConfigGlobalOptions from "@/components/options/EditorFormConfigGlobalOptions";
import { deleteEnv, updateEnv } from "@/services/business/bo/config";

export default {
  name: "EditorFormConfig",
  components: {
    EditorFormConfigGlobalOptions,
    EditorFormConfigProjects,
    EditorFormEnvConfig
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedEnv: null
    };
  },
  emits: ["update:config"],
  mounted() {},
  methods: {
    deleteEnv(env) {
      this.updateConfig(deleteEnv(this.config, env));
      this.selectEnv(null);
    },
    updateConfigEnv(env) {
      this.updateConfig(updateEnv(this.config, env));
      this.selectEnv(env);
    },
    updateConfig(config) {
      this.$emit("update:config", config);
    },
    selectEnv(env) {
      this.selectedEnv = env;
    }
  }
};
</script>

<style scoped lang="scss">
.editor-form {
  display: flex;
  flex-direction: row;

  > div {
    flex: 1;
  }
}
</style>
