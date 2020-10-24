<template>
  <div>
    <div class="editor-form">
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
      const config = updateEnv(this.config, env);
      this.updateConfig(config);
      this.selectEnv(env);
    },
    updateOptions(options) {
      this.updateConfig({ ...this.config, options });
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
    padding: 4px;
  }

  .right-pane {
    display: flex;
    margin-left: 4px;
    background-color: var(--bg-grey);
    border-radius: 4px;

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
