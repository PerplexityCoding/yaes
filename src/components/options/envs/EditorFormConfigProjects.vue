<template>
  <div :class="{ 'has-projects': hasProjects }">
    <div v-if="hasProjects">
      <ul class="project-sortable" @sortupdate="onDrop">
        <EditorFormConfigProject
          v-for="project of config.projects"
          :key="'project-' + project.id"
          :config="config"
          :project-id="project.id"
          :selected-env-id="selectedEnvId"
          :selected-project-id="selectedProjectId"
          @select-env="(data) => $emit('select-env', data)"
          @delete-project="(data) => $emit('delete-project', data)"
          @new-env="(data) => $emit('new-env', data)"
          @drop-env="(data) => $emit('drop-env', data)"
          @update-project="(data) => $emit('update-project', data)"
        />
      </ul>
    </div>
    <h3 v-else>
      There is currently no projects. <br />
      Create one by clicking on the create button.
    </h3>

    <footer>
      <CoreButton
        icon-name="AddIcon"
        variation="positive"
        class="new-project"
        @click="$emit('new-project')"
        data-hint="Add fresh empty project. You can add new env after."
      >
        Add new project
      </CoreButton>
    </footer>
  </div>
</template>

<script>
import EditorFormConfigProject from "@/components/options/envs/EditorFormConfigProject.vue";
import { updateSortableProjects } from "@/services/business/ui";
import CoreButton from "@/components/options/core/Button.vue";
import { defineComponent, onMounted, computed } from "vue";

export default defineComponent({
  name: "EditorFormConfigProjects",
  components: { CoreButton, EditorFormConfigProject },
  props: {
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
  emits: [
    "select-env",
    "new-env",
    "delete-project",
    "drop-env",
    "new-project",
    "update-project",
    "drop-project",
  ],
  setup(props, context) {
    onMounted(() => {
      setTimeout(() => {
        updateSortableProjects({
          handle: ".project-sortable-handle",
        });
      }, 100);
    });

    const hasProjects = computed(() => props.config.projects && props.config.projects.length > 0);

    const onDrop = (e) => {
      const { detail } = e;
      const { origin, destination } = detail;
      context.emit("drop-project", { origin, destination });
    };

    return {
      hasProjects,
      onDrop,
    };
  },
});
</script>

<style scoped lang="scss">
.project-sortable {
  padding: 0;
  margin: 0;

  li {
    display: block;
    list-style: none;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

h3 {
  padding: 32px 16px 8px 16px;
}

footer {
  padding: 4px;
}

.has-projects {
  footer {
    border-top: 1px solid rgba(var(--border-grey));

    @at-root .dark-mode & {
      border-color: rgba(var(--black-2), 1);
    }
  }
}
</style>
