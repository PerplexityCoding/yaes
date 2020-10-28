<template>
  <div>
    <div class="editor-form box-elevation">
      <div class="left-pane">
        <EditorFormConfigProjects
          :config="config"
          :selected-env="selectedEnv"
          @select-env="selectEnv"
          @update:config="updateConfig"
        />
      </div>
      <div class="right-pane" :class="{ 'right-pane-empty': !selectedEnv }">
        <EditorFormEnvConfig
          v-if="selectedEnv"
          :env="selectedEnv"
          :config="config"
          @delete-env="deleteEnv"
          @clone-env="cloneEnv"
          @update:env="updateConfigEnv"
        />
        <div v-else class="empty-env">
          No env currently selected. <br />
          Select one on the left side to edit
        </div>
      </div>
    </div>

    <EditorFormConfigGlobalOptions
      :options="config.options"
      @update:options="updateOptions"
    />
  </div>
</template>

<script>
import EditorFormEnvConfig from "@/components/options/EditorFormConfigEnv";
import EditorFormConfigProjects from "@/components/options/EditorFormConfigProjects";
import EditorFormConfigGlobalOptions from "@/components/options/EditorFormConfigGlobalOptions";
import {
  deleteEnv,
  updateEnv,
  newEnv,
  addEnv
} from "@/services/business/bo/config";
import deepmerge from "deepmerge";

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
      selectedEnv: null,
      selectedProject: null
    };
  },
  emits: ["update:config"],
  mounted() {},
  methods: {
    deleteEnv(env) {
      this.updateConfig(deleteEnv(this.config, env));
      this.selectEnv();
    },
    cloneEnv(env) {
      const clonedEnv = newEnv(this.config, deepmerge({}, env));
      const config = addEnv(this.config, this.selectedProject, clonedEnv);
      this.updateConfig(config);
      this.selectEnv({ env: clonedEnv, project: this.selectedProject });
    },
    updateConfigEnv(env) {
      const config = updateEnv(this.config, env);
      this.updateConfig(config);
      this.selectEnv({ env, selectedProject: this.selectedProject });
    },
    updateOptions(options) {
      this.updateConfig({ ...this.config, options });
    },
    updateConfig(config) {
      this.$emit("update:config", config);
    },
    selectEnv({ env, project } = {}) {
      this.selectedEnv = env;
      this.selectedProject = project;
    }
  }
};
</script>

<style scoped lang="scss">
.editor-form {
  display: flex;
  flex-direction: row;
  padding: 0;

  > div {
    flex: 1;
  }

  .left-pane {
  }

  .right-pane {
    padding: 4px 16px 12px 16px;
    display: flex;
    background-color: var(--border-grey);
    border-radius: 0 4px 4px 0;
    box-shadow: inset 6px 0px 10px -10px rgba(0, 0, 0, 0.55);

    &-empty {
      align-items: center;
    }

    .empty-env {
      margin: 0 auto;
      font-size: 14px;
    }
  }
}
</style>
