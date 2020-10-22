<template>
  <li>
    <b class="project-sortable-handle"> handle </b>

    <input
      v-if="projectNameEditable"
      :value="project.name"
      @focusout="projectNameEditable = false"
      @input="e => updateProject({ name: e.target.value })"
    />
    <span v-else @click="projectNameEditable = true"> {{ project.name }} </span>

    <ul class="env-sortable" @sortupdate="onDrop">
      <li
        v-for="env of projectEnvs"
        :key="'env-' + env.id"
        @click="$emit('select-env', env)"
      >
        {{ env.name || env.shortName }}
      </li>
    </ul>

    <button @click="addEnv()">Add new Env</button>
    <button @click="deleteProject()">Delete Project</button>
  </li>
</template>

<script>
import { getProjectEnvs } from "@/services/business/bo/config";
import sortable from "html5sortable/dist/html5sortable.cjs";

export default {
  name: "EditorFormConfigProject",
  data() {
    return {
      projectNameEditable: false
    };
  },
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    sortable(".env-sortable");
  },
  emits: ["select-env", "add-new-env", "delete-project", "update:project"],
  methods: {
    addEnv() {
      this.$emit("add-new-env", this.project);
    },
    deleteProject() {
      this.$emit("delete-project", this.project);
    },
    updateProject(data) {
      this.$emit("update:project", {
        ...this.project,
        ...data
      });
    },
    onDrop(e) {
      const { detail } = e;
      const { origin, destination } = detail;
      const { envs } = this.project;

      envs.splice(destination.index, 0, envs.splice(origin.index, 1)[0]);
      this.updateProject({
        envs
      });
    }
  },
  computed: {
    projectEnvs() {
      return getProjectEnvs(this.config, this.project);
    }
  }
};
</script>

<style scoped lang="scss"></style>
