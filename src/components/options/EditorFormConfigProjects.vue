<template>
  <div>
    <ul class="project-sortable" @sortupdate="onDrop">
      <EditorFormConfigProject
        v-for="project of config.projects"
        :key="'project-' + project.id"
        :config="config"
        :project="project"
        @select-env="env => $emit('select-env', env)"
        @delete-project="deleteProject"
        @add-new-env="addNewProjectEnv"
        @update:project="updateProject"
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
  newProject,
  updateProject
} from "@/services/business/bo/config";
import sortable from "html5sortable/dist/html5sortable.cjs";

export default {
  name: "EditorFormConfigProjects",
  components: { EditorFormConfigProject },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    sortable(".project-sortable", {
      handle: ".project-sortable-handle"
    });
  },
  beforeUpdate() {
    sortable(".project-sortable");
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
    updateProject(project) {
      this.$emit("update:config", updateProject(this.config, project));
      this.$emit("select-env", null);
    },
    addNewProject() {
      const project = newProject(this.config, {
        name: "New Project"
      });
      this.$emit("update:config", addProject(this.config, project));
    },
    onDrop(e) {
      const { detail } = e;
      const { origin, destination } = detail;
      const { projects } = this.config;

      projects.splice(
        destination.index,
        0,
        projects.splice(origin.index, 1)[0]
      );
      this.$emit("update:config", {
        ...this.config,
        ...projects
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
