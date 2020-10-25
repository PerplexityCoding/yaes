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
  padding: 0;

  > div {
    flex: 1;
  }

  .left-pane {
  }

  .right-pane {
    padding: 4px 12px 12px 12px;
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
