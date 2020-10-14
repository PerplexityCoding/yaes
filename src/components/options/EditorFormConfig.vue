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
import { updateArray } from "@/services/utils";

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
      const envs = this.config.envs;
      const projects = this.config.projects;

      this.updateConfig({
        projects: projects.map(project => ({
          ...project,
          envs: project.envs.filter(envId => envId !== env.id)
        })),
        envs: updateArray(envs, env, () => null)
      });
      this.selectedEnv = null;
    },
    updateConfigEnv(env) {
      this.updateConfig({
        envs: updateArray(this.config.envs, this.selectedEnv, () => env)
      });
      this.selectedEnv = env;
    },
    updateConfig(data) {
      this.$emit("update:config", {
        ...this.config,
        ...data
      });
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
