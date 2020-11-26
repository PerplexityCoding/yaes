<template>
  <ul class="project-list">
    <li v-for="project in projects" :key="project.id">
      <Project
        :project="project"
        :envs="envs"
        v-model:open-project-id="openProjectId"
        @redirect-env="(data) => $emit('redirect-env', data)"
      />
    </li>
  </ul>
</template>

<script>
import { ref, defineComponent } from "vue";
import { isValidProject } from "@/services/business/bo/project";
import Project from "./Project";
import { isValidEnv } from "@/services/business/bo/env";
import { arrayValidator } from "@/services/utils";

export default defineComponent({
  name: "ProjectList",
  components: { Project },
  emits: ["redirect-env", "update:openProjectId"],
  props: {
    projects: {
      type: Array,
      required: true,
      validator: arrayValidator(isValidProject),
    },
    envs: {
      type: Array,
      required: true,
      validator: arrayValidator(isValidEnv),
    },
  },
  setup() {
    return {
      openProjectId: ref(-1),
    };
  },
});
</script>

<style lang="scss" scoped>
.project-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  li {
    display: flex;
    list-style: none;
    padding: 0;

    + li {
      padding-top: 10px;
    }

    .list-button {
      background-color: rgba(var(--bg-white-off-2));

      @at-root .dark-mode & {
        background-color: rgba(var(--black-1), 0.8);
      }

      > span {
        flex: 1;
      }

      svg {
        transform: rotate(90deg);
        transition: transform 0.8s ease;
        fill: rgba(var(--blue));
      }

      &.is-opened {
        svg {
          transform: rotate(-90deg);
        }

        border: 2px solid rgba(var(--blue));
      }
    }

    .project-envs {
      padding-top: 8px;
    }

    .project-btn-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
