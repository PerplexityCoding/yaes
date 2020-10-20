<template>
  <div>
    <ul>
      <EditorFormConfigProject
        v-for="project of config.projects"
        :key="'project-' + project.id"
        :config="config"
        :project="project"
        @select-env="env => $emit('select-env', env)"
        @delete-project="deleteProject"
        @add-new-env="addNewProjectEnv"
      />
    </ul>

    <button @click="addNewProject">Add new Project</button>
  </div>
</template>

<script>
import EditorFormConfigProject from "@/components/options/EditorFormConfigProject";

import {
  addEnv,
  addProject,
  deleteProject,
  newEnv,
  newProject
} from "@/services/business/bo/config";

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
    addNewProjectEnv(project) {
      const env = newEnv(this.config, {
        name: "New Env",
        url: "https://www.exemple.com"
      });
      this.$emit("update:config", addEnv(this.config, project, env));
      this.$emit("select-env", env);
    },
    deleteProject(project) {
      this.$emit("update:config", deleteProject(this.config, project));
      this.$emit("select-env", null);
    },
    addNewProject() {
      const project = newProject(this.config, {
        name: "New Project"
      });
      this.$emit("update:config", addProject(this.config, project));
    }
  }
};
</script>

<style scoped lang="scss"></style>
