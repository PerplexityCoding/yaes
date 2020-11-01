<template>
  <div>
    <div class="editor-form box-elevation">
      <div class="left-pane">
        <div v-if="isNewEnv" class="blocking-mask"></div>
        <EditorFormConfigProjects
          :config="config"
          :selected-env-id="selectedEnvId"
          :selected-project-id="selectedProjectId"
          @select-env="selectEnv"
          @new-env="addNewEnv"
          @delete-env="deleteEnv"
          @drop-env="dropEnv"
          @new-project="addNewProject"
          @delete-project="deleteProject"
          @update-project="updateProject"
          @drop-project="dropProject"
          @update:config="updateConfig"
        />
      </div>
      <div
        class="right-pane"
        :class="{ 'right-pane-empty': !selectedEnvId && !newEnv }"
      >
        <transition name="slide-fade">
          <EditorFormEnvConfig
            v-if="selectedEnv != null || newEnv != null"
            :env="newEnv ? newEnv : selectedEnv"
            :config="config"
            :new-env="isNewEnv"
            :project-name="selectedProject.name"
            @delete-env="deleteEnv"
            @clone-env="cloneEnv"
            @update-env="updateEnv"
            @cancel-new-env="cancelNewEnv"
            @create-new-env="createNewEnv"
          />
        </transition>
        <div
          v-if="selectedEnvId == null && !transitioning && !newEnv"
          class="empty-env"
        >
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
  addEnv,
  getProjectEnvs,
  deleteProject,
  updateProject,
  newProject,
  addProject,
  getEnvById,
  getProjectById
} from "@/services/business/bo/config";
import deepmerge from "deepmerge";
import {
  updateSortableEnvs,
  updateSortableProjects
} from "@/services/business/ui";

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
      transitioning: false,
      newEnv: null,
      isNewEnv: false,
      selectedEnvId: null,
      selectedProjectId: null
    };
  },
  emits: ["update:config"],
  mounted() {
    const projects = this.config.projects;
    if (projects.length > 0) {
      const firstProject = projects[0];
      this.selectedProjectId = firstProject.id;
      if (firstProject.envs && firstProject.envs.length > 0) {
        this.selectedEnvId = firstProject.envs[0];
      }
    }
  },
  methods: {
    addNewEnv(projectId) {
      const env = newEnv(this.config, {});
      this.selectEnv({ projectId, newEnv: env });
    },
    cancelNewEnv() {
      this.selectFirstEnv(this.config);
    },
    createNewEnv(env) {
      const config = addEnv(this.config, this.selectedProjectId, env);
      this.updateConfig(config);
      setTimeout(() => {
        this.selectEnv({ envId: env.id });
        updateSortableEnvs();
      }, 0);
    },
    updateEnv(env) {
      if (this.newEnv) {
        this.newEnv = env;
      } else {
        const config = updateEnv(this.config, env);
        this.updateConfig(config);
      }
    },
    cloneEnv(envId) {
      const env = getEnvById(this.config, envId);
      const clonedEnv = newEnv(this.config, deepmerge({}, env));
      const config = addEnv(this.config, this.selectedProjectId, clonedEnv);
      this.updateConfig(config);
      this.selectEnv({ envId: clonedEnv.id });
      updateSortableEnvs();
    },
    deleteEnv(envId) {
      const projectEnvs = getProjectEnvs(this.config, this.selectedProjectId);
      const envIdx = projectEnvs.findIndex(env => env.id === envId);

      const config = deleteEnv(this.config, envId);
      this.updateConfig(config);
      this.selectNextEnv(config, envIdx);
      updateSortableEnvs();
    },
    dropEnv({ projectId, origin, destination }) {
      const project = getProjectById(this.config, projectId);
      const { envs } = project;

      envs.splice(destination.index, 0, envs.splice(origin.index, 1)[0]);
      this.updateProject({
        projectId,
        data: {
          envs
        }
      });
    },
    addNewProject() {
      const project = newProject(this.config, {
        name: "New Project"
      });
      const config = addProject(this.config, project);
      this.updateConfig(config);
      updateSortableProjects();
    },
    updateProject({ projectId, data }) {
      const project = getProjectById(this.config, projectId);
      const updatedProject = {
        ...project,
        ...data
      };
      const config = updateProject(this.config, updatedProject);
      this.updateConfig(config);
    },
    deleteProject(projectId) {
      const config = deleteProject(this.config, projectId);
      this.updateConfig(config);
      this.selectEnv(null);
      updateSortableProjects();
    },
    dropProject({ origin, destination }) {
      const { projects } = this.config;

      projects.splice(
        destination.index,
        0,
        projects.splice(origin.index, 1)[0]
      );
      this.updateConfig({
        ...this.config,
        projects
      });
    },
    updateOptions(options) {
      this.updateConfig({ ...this.config, options });
    },
    updateConfig(config, options) {
      this.$emit("update:config", config, options);
    },
    selectNextEnv(config, envIdx) {
      const projectEnvs = getProjectEnvs(config, this.selectedProjectId);
      if (projectEnvs.length > 0) {
        const env = projectEnvs[envIdx] || projectEnvs[projectEnvs.length - 1];

        this.selectEnv({
          envId: env.id
        });
      } else {
        this.selectEnv(null);
      }
    },
    selectFirstEnv(config) {
      const projectEnvs = getProjectEnvs(config, this.selectedProjectId);
      if (projectEnvs.length > 0) {
        const env = projectEnvs[0];

        this.selectEnv({
          envId: env.id
        });
      } else {
        this.selectEnv(null);
      }
    },
    selectEnv(data) {
      if (data != null) {
        const { envId, projectId, newEnv } = data;

        this.selectedEnvId = null;
        this.transitioning = true;

        setTimeout(() => {
          this.selectedEnvId = envId;
          if (projectId != null) {
            this.selectedProjectId = projectId;
          }
          this.newEnv = newEnv;
          this.transitioning = false;
        }, 0);

        setTimeout(() => {
          this.isNewEnv = !!this.newEnv;
        }, 10);
      } else {
        this.selectedEnvId = null;
        this.selectedProjectId = null;
        this.newEnv = null;
        this.isNewEnv = false;
      }
    }
  },
  computed: {
    selectedEnv() {
      return getEnvById(this.config, this.selectedEnvId);
    },
    selectedProject() {
      return getProjectById(this.config, this.selectedProjectId);
    }
  }
};
</script>

<style scoped lang="scss">
.editor-form {
  display: flex;
  flex-direction: row;
  padding: 0;
  min-height: 400px;

  .blocking-mask {
    background-color: #0000009c;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  > div {
    flex: 1;
  }

  .left-pane {
    position: relative;
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
