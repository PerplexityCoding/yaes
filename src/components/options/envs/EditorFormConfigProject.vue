<template>
  <li class="project-item" :class="{ 'selected-project': projectId === selectedProjectId }">
    <header>
      <span class="project-sortable-handle">
        <DragListIcon height="16px" width="16px" />
      </span>

      <div class="project-name">
        <input
          v-if="projectNameEditable"
          :value="projectName"
          @focusout="projectNameEditable = false"
          @input="(e) => updateProject({ name: e.target.value })"
        />
        <span v-else>
          {{ projectName }}
        </span>
      </div>

      <ConfirmationDeleteButton
        class="delete-project"
        v-model="deleteConfirm"
        @action="$emit('delete-project', projectId)"
      >
        <template #beforeButton>
          <CoreButton
            v-if="!projectNameEditable"
            elevation
            class="edit-project-name"
            icon-name="EditTextIcon"
            @click="projectNameEditable = true"
          >
            Edit
          </CoreButton>
        </template>
      </ConfirmationDeleteButton>
    </header>

    <ul v-if="projectEnvs.length > 0" class="env-sortable" @sortupdate="onDrop">
      <li
        v-for="env of projectEnvs"
        :key="'env-' + env.id"
        class="project-env"
        :class="{
          'selected-env': selectedEnvId != null ? env.id === selectedEnvId : false,
        }"
        @click="$emit('select-env', { envId: env.id, projectId })"
      >
        <span class="env-name">
          {{ env.name || env.shortName }}
        </span>
        <ArrowRightIcon height="14px" width="14px" />
      </li>
    </ul>
    <h3 v-else>
      There is currently no envs configured for this project. <br />
      Click on "Add new env" button to add one.
    </h3>

    <div class="action-buttons">
      <CoreButton
        icon-name="AddIcon"
        class="add-new-env"
        variation="positive"
        @click="$emit('new-env', projectId)"
        data-hint="Try to add a new env. It will be attached to the project."
      >
        Add new env
      </CoreButton>
    </div>
  </li>
</template>

<script>
import { getProjectById, getProjectEnvs } from "@/services/business/bo/config";
import { updateSortableEnvs } from "@/services/business/ui";
import ConfirmationDeleteButton from "@/components/options/form/ConfirmationDeleteButton";
import CoreButton from "@/components/options/core/Button";
import { defineComponent, computed, ref, onMounted } from "vue";

export default defineComponent({
  name: "EditorFormConfigProject",
  components: {
    CoreButton,
    ConfirmationDeleteButton,
  },
  props: {
    projectId: {
      type: [Number, String],
      default: () => {},
    },
    config: {
      type: Object,
      default: () => {},
    },
    selectedEnvId: {
      type: [Number, String],
      default: null,
    },
    selectedProjectId: {
      type: [Number, String],
      default: null,
    },
  },
  emits: ["select-env", "new-env", "drop-env", "delete-project", "update-project"],
  setup(props, context) {
    const deleteConfirm = ref(false);
    const projectNameEditable = ref(false);

    onMounted(() => {
      updateSortableEnvs();
    });

    const projectEnvs = computed(() => {
      return getProjectEnvs(props.config, props.projectId);
    });

    const projectName = computed(() => {
      const project = getProjectById(props.config, props.projectId);
      return project.name;
    });

    const updateProject = (data) => {
      context.emit("update-project", {
        projectId: props.projectId,
        data,
      });
    };

    const onDrop = (e) => {
      const { detail } = e;
      const { origin, destination } = detail;
      context.emit("drop-env", {
        projectId: props.projectId,
        origin,
        destination,
      });
    };

    return {
      projectEnvs,
      projectName,
      updateProject,
      onDrop,
      deleteConfirm,
      projectNameEditable,
    };
  },
});
</script>

<style lang="scss">
.sortable-placeholder {
  display: block;
  height: 40px;
  background-color: rgba(var(--bg-grey-hover));

  @at-root .dark-mode & {
    background-color: rgba(var(--black-2));
  }
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
    background-color: rgba(var(--bg-grey-2), 0.3);

    @at-root .dark-mode & {
      background-color: rgba(var(--black-2));
    }

    .project-name {
      flex: 1;
      padding: 8px 0;
      cursor: default;
    }

    .delete-project {
      display: none;
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
    }

    .project-sortable-handle {
      margin: 0 8px 0 4px;
      cursor: grab;
      display: flex;
      fill: rgba(var(--blue));
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
    border-bottom: 1px solid rgba(var(--border-grey));

    @at-root .dark-mode & {
      border-bottom: 1px solid rgba(var(--black-2));
    }

    .project-env {
      padding: 12px 8px;
      cursor: pointer;
      display: flex;

      .env-name {
        flex: 1;
      }

      &:hover {
        background: rgba(var(--bg-grey-hover));

        @at-root .dark-mode & {
          background-color: rgba(var(--black-1), 0.5);
        }
      }

      &:active {
        background: none;
      }
    }

    .selected-env {
      background: rgba(var(--border-grey));
      fill: rgba(var(--green));
      color: rgba(var(--green));

      @at-root .dark-mode & {
        background-color: rgba(var(--black-1));
        fill: rgba(var(--green-apple));
        color: rgba(var(--green-apple));
      }

      &:hover {
        background: rgba(var(--bg-grey-hover));

        @at-root .dark-mode & {
          background-color: rgba(var(--black-1), 0.5);
        }
      }
    }
  }

  &.selected-project {
    .project-sortable-handle {
      fill: rgba(var(--ruby));
    }

    .project-name {
      color: var(--blue-2);
    }

    header {
      background-color: rgba(var(--bg-grey-2), 0.8);

      @at-root .dark-mode & {
        background-color: rgba(var(--black-1), 0.8);
      }
    }
  }

  h3 {
    padding: 16px 8px;
  }

  .action-buttons {
    display: flex;
    padding: 4px;
  }
}
</style>
