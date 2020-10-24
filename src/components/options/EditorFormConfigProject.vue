<template>
  <li>
    <b class="project-sortable-handle"> handle </b>

    <div class="project-name">
      <input
        v-if="projectNameEditable"
        :value="project.name"
        @focusout="projectNameEditable = false"
        @input="e => updateProject({ name: e.target.value })"
      />
      <span v-else>
        {{ project.name }}
      </span>
      <button
        class="edit-project-name"
        @click="projectNameEditable = true"
        v-if="!projectNameEditable"
      >
        Edit
      </button>
    </div>

    <ul class="env-sortable" @sortupdate="onDrop">
      <li
        v-for="env of projectEnvs"
        :key="'env-' + env.id"
        class="project-env"
        @click="$emit('select-env', env)"
      >
        {{ env.name || env.shortName }}
      </li>
    </ul>

    <button class="add-new-env" @click="addEnv()">Add new Env</button>
    <button class="delete-project" @click="deleteProject()">
      Delete Project
    </button>
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
    this.updateSortable({
      hoverClass: "toto"
    });
  },
  emits: ["select-env", "add-new-env", "delete-project", "update:project"],
  methods: {
    addEnv() {
      this.updateSortable();
      this.$emit("add-new-env", this.project);
    },
    deleteProject() {
      this.$emit("delete-project", this.project);
    },
    updateProject(data) {
      this.updateSortable();
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
    },
    async updateSortable(options) {
      setTimeout(() => {
        sortable(".env-sortable", options);
      }, 0);
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
