<template>
  <div>
    <ul class="project-sortable" @sortupdate="onDrop">
      <EditorFormConfigProject
        v-for="project of config.projects"
        :key="'project-' + project.id"
        :config="config"
        :project="project"
        :selected-env="selectedEnv"
        @select-env="env => $emit('select-env', env)"
        @delete-project="deleteProject"
        @add-new-env="addNewProjectEnv"
        @update:project="updateProject"
      />
    </ul>

    <footer>
      <button class="new-project" @click="addNewProject">
        <AddIcon height="18px" width="18px" />
        Add new project
      </button>
    </footer>
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
import AddIcon from "@/components/icons/Add";

export default {
  name: "EditorFormConfigProjects",
  components: { EditorFormConfigProject, AddIcon },
  data() {
    return {
      collapsed: false
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    selectedEnv: {
      type: Object,
      default: null
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
        projects
      });
      this.collapsed = false;
    }
  }
};
</script>

<style scoped lang="scss">
.project-sortable {
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 8px;
    display: block;
    list-style: none;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

footer {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid var(--bg-grey);

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    display: flex;
    align-items: center;
    background: none;
    padding: 8px;
    line-height: 20px;
    border-radius: 4px;

    svg {
      margin-right: 4px;
    }

    &:hover {
      background: var(--bg-grey-hover);
    }
  }

  .new-project {
    fill: var(--green);
    color: var(--green);
  }
}
</style>
