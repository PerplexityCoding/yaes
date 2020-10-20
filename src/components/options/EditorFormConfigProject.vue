<template>
  <li>
    {{ project.name }}

    <ul>
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

export default {
  name: "EditorFormConfigProject",
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
  emits: ["select-env", "add-new-env", "delete-project"],
  methods: {
    addEnv() {
      this.$emit("add-new-env", this.project);
    },
    deleteProject() {
      this.$emit("delete-project", this.project);
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
