<template>
  <div>
    <div
      class="editor-form box-elevation"
      data-intro="You can add, delete, drag&drop and edit your projects and environments here."
    >
      <div class="left-pane">
        <div v-if="!!newEnv" class="blocking-mask"></div>
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
      <div class="right-pane" :class="{ 'right-pane-empty': selectedEnvId == null && !newEnv }">
        <EditorFormConfigEnv
          v-if="selectedEnv != null || newEnv != null"
          :env="newEnv || selectedEnv"
          :key="`env-${(newEnv || selectedEnv).id}`"
          :config="config"
          :new-env="!!newEnv"
          :project-name="selectedProject.name"
          @delete-env="deleteEnv"
          @clone-env="cloneEnv"
          @update-env="updateEnv"
          @cancel-new-env="cancelNewEnv"
          @create-new-env="createNewEnv"
        />
        <div v-if="selectedEnvId == null && !newEnv" class="empty-env">
          No env currently selected. <br />
          Select one on the left side to edit
        </div>
      </div>
    </div>

    <EditorFormConfigGlobalOptions :options="config.options" @update:options="updateOptions" />
  </div>
</template>

<script>
import EditorFormConfigEnv from "@/components/options/envs/EditorFormConfigEnv.vue";
import EditorFormConfigProjects from "@/components/options/envs/EditorFormConfigProjects.vue";
import EditorFormConfigGlobalOptions from "@/components/options/EditorFormConfigGlobalOptions.vue";
import {
  deleteEnv as servicesDeleteEnv,
  updateEnv as servicesUpdateEnv,
  newEnv as servicesNewEnv,
  addEnv,
  getProjectEnvs,
  deleteProject as servicesDeleteProject,
  updateProject as servicesUpdateProject,
  newProject,
  addProject,
  getEnvById,
  getProjectById,
} from "@/services/business/bo/config";
import deepmerge from "deepmerge";
import { updateSortableEnvs, updateSortableProjects } from "@/services/business/ui";

import { defineComponent, onMounted, computed, ref } from "vue";

export default defineComponent({
  name: "EditorFormConfig",
  components: {
    EditorFormConfigGlobalOptions,
    EditorFormConfigProjects,
    EditorFormConfigEnv,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:config"],
  setup(props, context) {
    let newEnv = ref(null);
    let selectedEnvId = ref(null);
    let selectedProjectId = ref(null);

    onMounted(() => {
      const projects = props.config.projects;
      if (projects.length > 0) {
        const firstProject = projects[0];
        selectedProjectId.value = firstProject.id;
        if (firstProject.envs && firstProject.envs.length > 0) {
          selectedEnvId.value = firstProject.envs[0];
        }
      }
    });

    const addNewEnv = (projectId) => {
      const env = servicesNewEnv(props.config, {});
      selectEnv({ projectId, newEnv: env });
    };

    const cancelNewEnv = () => selectFirstEnv(props.config);

    const createNewEnv = (env) => {
      const config = addEnv(props.config, selectedProjectId.value, env);
      updateConfig(config);
      setTimeout(() => {
        selectEnv({ envId: env.id });
        updateSortableEnvs();
      }, 0);
    };

    const updateEnv = (env, options) => {
      if (newEnv.value) {
        newEnv.value = {
          ...newEnv.value,
          ...env,
        };
      } else {
        const config = servicesUpdateEnv(props.config, env);
        updateConfig(config, options);
      }
    };

    const cloneEnv = (envId) => {
      const env = getEnvById(props.config, envId);
      const clonedEnv = servicesNewEnv(props.config, deepmerge({}, env));
      const config = addEnv(props.config, selectedProjectId.value, clonedEnv);
      updateConfig(config);
      selectEnv({ envId: clonedEnv.id });
      updateSortableEnvs();
    };

    const deleteEnv = (envId) => {
      const projectEnvs = getProjectEnvs(props.config, selectedProjectId.value);
      const envIdx = projectEnvs.findIndex((env) => env.id === envId);

      const config = servicesDeleteEnv(props.config, envId);
      updateConfig(config);
      selectNextEnv(config, envIdx);
      updateSortableEnvs();
    };

    const dropEnv = ({ projectId, origin, destination }) => {
      const project = getProjectById(props.config, projectId);
      const { envs } = project;

      envs.splice(destination.index, 0, envs.splice(origin.index, 1)[0]);
      updateProject({
        projectId,
        data: {
          envs,
        },
      });
    };

    const addNewProject = () => {
      const project = newProject(props.config, {
        name: "New Project",
      });
      const config = addProject(props.config, project);
      updateConfig(config);
      updateSortableProjects();
    };

    const deleteProject = (projectId) => {
      const config = servicesDeleteProject(props.config, projectId);
      updateConfig(config);
      selectEnv(null);
      updateSortableProjects();
    };

    const dropProject = ({ origin, destination }) => {
      const { projects } = props.config;

      projects.splice(destination.index, 0, projects.splice(origin.index, 1)[0]);
      updateConfig({
        ...props.config,
        projects,
      });
    };

    const selectNextEnv = (config, envIdx) => {
      const projectEnvs = getProjectEnvs(config, selectedProjectId.value);
      if (projectEnvs.length > 0) {
        const env = projectEnvs[envIdx] || projectEnvs[projectEnvs.length - 1];

        selectEnv({
          envId: env.id,
        });
      } else {
        selectEnv(null);
      }
    };

    const selectFirstEnv = (config) => {
      const projectEnvs = getProjectEnvs(config, selectedProjectId.value);
      if (projectEnvs.length > 0) {
        const env = projectEnvs[0];

        selectEnv({
          envId: env.id,
        });
      } else {
        selectEnv(null);
      }
    };

    const selectEnv = (data) => {
      if (data != null) {
        const { envId, projectId, newEnv: newEnvData } = data;

        selectedEnvId.value = envId;
        if (projectId != null) {
          selectedProjectId.value = projectId;
        }
        newEnv.value = newEnvData;
      } else {
        selectedEnvId.value = null;
        selectedProjectId.value = null;
        newEnv.value = null;
      }
    };

    const updateProject = ({ projectId, data }) => {
      const project = getProjectById(props.config, projectId);
      const updatedProject = {
        ...project,
        ...data,
      };
      const config = servicesUpdateProject(props.config, updatedProject);
      updateConfig(config);
    };

    const updateOptions = (options) => updateConfig({ ...props.config, options });
    const updateConfig = (config, options) => context.emit("update:config", config, options);

    const selectedEnv = computed(() => getEnvById(props.config, selectedEnvId.value));
    const selectedProject = computed(() => getProjectById(props.config, selectedProjectId.value));

    return {
      newEnv,
      addNewEnv,
      cloneEnv,
      dropEnv,
      addNewProject,
      deleteProject,
      dropProject,
      cancelNewEnv,
      createNewEnv,
      deleteEnv,
      updateEnv,
      updateProject,
      updateOptions,
      updateConfig,
      selectEnv,
      selectedEnv,
      selectedProject,
      selectedEnvId,
      selectedProjectId,
    };
  },
});
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
    padding: 12px 16px 16px 20px;
    display: flex;
    background-color: rgba(var(--border-grey));
    border-radius: 0 4px 4px 0;
    box-shadow: inset 6px 0px 10px -10px rgba(0, 0, 0, 0.55);

    @at-root .dark-mode & {
      background-color: rgba(var(--black-1));
    }

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
