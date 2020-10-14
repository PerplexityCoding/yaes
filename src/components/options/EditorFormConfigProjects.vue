<template>
  <div>
    <ul>
      <EditorFormConfigProject
        v-for="project of config.projects"
        :key="'project-' + project.id"
        :envs="config.envs"
        :project="project"
        @select-env="env => $emit('select-env', env)"
        @delete-project="deleteProject"
        @add-new-env="addNewProjectEnv"
        @update:envs="updateEnvs"
      />
    </ul>

    <button @click="addNewProject">Add new Project</button>
  </div>
</template>

<script>
import EditorFormConfigProject from "@/components/options/EditorFormConfigProject";
import { getNextEnvId, getNextProjectId } from "@/services/business/ids";
import { updateArray } from "@/services/utils";

export default {
  name: "EditorFormConfigProjects",
  components: { EditorFormConfigProject },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  emits: ["select-env", "update:config"],
  methods: {
    updateEnvs(envs) {
      this.$emit("update:config", {
        ...this.config,
        envs
      });
    },
    addNewProjectEnv(project) {
      const configEnvs = this.config.envs;
      const newEnv = {
        id: getNextEnvId(configEnvs),
        name: "New Env",
        url: "https://www.exemple.com"
      };
      const projects = updateArray(this.config.projects, project, () => ({
        ...project,
        envs: [...project.envs, newEnv.id]
      }));
      const envs = [...configEnvs, newEnv];

      this.$emit("update:config", {
        ...this.config,
        projects,
        envs
      });
      this.$emit("select-env", newEnv);
    },
    deleteProject(project) {
      const envs = this.config.envs.filter(
        env => project.envs.indexOf(env.id) < 0
      );
      const projects = updateArray(this.config.projects, project, () => null);
      this.$emit("update:config", {
        ...this.config,
        envs,
        projects
      });
    },
    addNewProject() {
      const newProject = {
        id: getNextProjectId(this.config.projects),
        name: "New Project",
        envs: []
      };
      this.$emit("update:config", {
        ...this.config,
        projects: [...this.config.projects, newProject]
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
