<template>
  <div>
    <div class="editor-form box-elevation">
      <div class="left-pane">
        <EditorFormConfigProjects
          :config="config"
          :selected-env-id="selectedEnvId"
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
      <div class="right-pane" :class="{ 'right-pane-empty': !selectedEnvId }">
        <EditorFormEnvConfig
          v-if="selectedEnvId != null"
          :env-id="selectedEnvId"
          :config="config"
          :focus="newEnv"
          @delete-env="deleteEnv"
          @clone-env="cloneEnv"
          @update-env="updateEnv"
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
      newEnv: false,
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
      const env = newEnv(this.config, {
        name: "New Env"
      });
      const config = addEnv(this.config, projectId, env);
      this.updateConfig(config, { noSave: true });
      this.selectEnv({ envId: env.id, newEnv: true });
      updateSortableEnvs();
    },
    updateEnv(env) {
      const config = updateEnv(this.config, env);
      this.updateConfig(config);
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
      const config = deleteEnv(this.config, envId);
      this.updateConfig(config);
      this.selectLastEnv(config);
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
    selectLastEnv(config) {
      const projectEnvs = getProjectEnvs(config, this.selectedProjectId);
      if (projectEnvs.length > 0) {
        this.selectEnv({
          envId: projectEnvs[projectEnvs.length - 1].id
        });
      }
    },
    selectEnv(data) {
      if (data != null) {
        const { envId, projectId, newEnv } = data;
        this.selectedEnvId = envId;
        if (projectId != null) {
          this.selectedProjectId = projectId;
        }
        this.newEnv = newEnv;
      } else {
        this.selectedEnvId = null;
        this.selectedProjectId = null;
        this.newEnv = false;
      }
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
