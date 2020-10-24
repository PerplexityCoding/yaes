<template>
  <li class="project-item">
    <header>
      <span class="project-sortable-handle">
        <DragList height="16px" width="16px" />
      </span>

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
      </div>

      <button
        class="edit-project-name"
        @click="projectNameEditable = true"
        v-if="!projectNameEditable"
      >
        <EditText height="14px" width="14px" />
        Edit
      </button>

      <button class="delete-project" @click="deleteProject()">
        <DeleteIcon height="18px" width="18px" />
        Delete
      </button>
    </header>

    <ul class="env-sortable" @sortupdate="onDrop" @sortstart="onDrag">
      <li
        v-for="env of projectEnvs"
        :key="'env-' + env.id"
        class="project-env"
        :class="{
          'selected-env': selectedEnv ? env.id === selectedEnv.id : false
        }"
        @click="$emit('select-env', env)"
      >
        <span class="env-name">
          {{ env.name || env.shortName }}
        </span>
        <ArrowRight height="14px" width="14px" />
      </li>
    </ul>

    <div class="action-buttons">
      <button class="add-new-env" @click="addEnv()">
        <AddIcon height="18px" width="18px" /> Add new env
      </button>
    </div>
  </li>
</template>

<script>
import { getProjectEnvs } from "@/services/business/bo/config";
import sortable from "html5sortable/dist/html5sortable.cjs";
import DragList from "@/components/icons/DragList";
import EditText from "@/components/icons/EditText";
import ArrowRight from "@/components/icons/ArrowRight";
import AddIcon from "@/components/icons/Add";
import DeleteIcon from "@/components/icons/Delete";

export default {
  name: "EditorFormConfigProject",
  data() {
    return {
      projectNameEditable: false
    };
  },
  components: { AddIcon, DeleteIcon, DragList, EditText, ArrowRight },
  props: {
    project: {
      type: Object,
      default: () => {}
    },
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
    this.updateSortable();
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
    onDrag() {
      this.$emit("select-env", null);
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

<style lang="scss">
.sortable-placeholder {
  display: block;
  height: 32px;
  background-color: var(--bg-grey-hover);
  border-radius: 4px;
}
.sortable-dragging {
  background-color: red;
}
</style>

<style scoped lang="scss">
.project-item {
  display: block;

  &:first-child {
    > header {
      border-radius: 4px 0 0 0;
    }
  }

  > header {
    padding: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    background-color: var(--border-grey);

    .project-name {
      flex: 1;
      padding: 8px 0;
      cursor: default;
    }

    .delete-project {
      display: none;
      fill: var(--ruby);
      color: var(--ruby);
    }

    &:hover {
      .edit-project-name {
        display: flex;
      }

      .delete-project {
        display: flex;
      }
    }

    .edit-project-name {
      display: none;
      appearance: none;
      background: none;
      border: none;
      cursor: pointer;
    }

    .project-sortable-handle {
      margin: 0 8px 0 4px;
      cursor: grab;
      display: flex;
      fill: var(--blue);
      position: relative;
      top: 1px;
    }
  }

  .env-sortable {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid var(--border-grey);

    .project-env {
      padding: 12px 8px;
      cursor: pointer;
      display: flex;

      .env-name {
        flex: 1;
      }

      &:hover {
        background: var(--bg-grey-hover);
      }

      &:active {
        background: none;
      }
    }

    .selected-env {
      background: var(--bg-yellow);

      &:hover {
        background: var(--bg-yellow-hover);
      }
    }
  }

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    display: flex;
    align-items: center;
    background: none;
    padding: 8px;
    border-radius: 4px;

    svg {
      margin-right: 4px;
    }

    &:hover {
      background: var(--bg-grey-hover);
    }
  }

  .action-buttons {
    display: flex;
    padding: 4px;

    .add-new-env {
      fill: var(--green);
      color: var(--green);
    }
  }
}
</style>
