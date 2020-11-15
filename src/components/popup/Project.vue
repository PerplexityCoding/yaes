<template>
  <div class="project-btn-wrapper">
    <button
      @click="toggleAccordeon(project.id)"
      class="list-button"
      :class="{ 'is-opened': isOpened }"
    >
      <span>
        {{ project.name || project.id }}
      </span>
      <ArrowRight height="14px" width="14px" />
    </button>
    <div class="project-envs" v-if="isOpened">
      <EnvList
        v-if="projectEnvs(project).length"
        :envs="projectEnvs(project)"
        @switch-env="(data) => $emit('redirect-env', data)"
      />
      <div v-else class="info">
        No environments has been configured for this project yet.
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import EnvList from "./EnvList";
import ArrowRight from "../icons/ArrowRight";
import { isValidProject, mapProjectEnvs } from "@/services/business/bo/project";
import { isValidEnv } from "@/services/business/bo/env";
import { arrayValidator } from "@/services/utils";

export default defineComponent({
  name: "Project",
  components: { EnvList, ArrowRight },
  emits: ["redirect-env", "update:openProjectId"],
  props: {
    envs: {
      type: Array,
      required: true,
      validator: arrayValidator(isValidEnv),
    },
    project: {
      type: Object,
      required: true,
      validator: isValidProject,
    },
    openProjectId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpened = (projectId) => props.openProjectId === projectId;
    const toggleAccordeon = (projectId) => {
      emit("update:openProjectId", isOpened(projectId) ? -1 : projectId);
    };
    const projectEnvsCache = {};

    return {
      isOpened: computed(() => isOpened(props.project.id)),
      toggleAccordeon,
      projectEnvs: (project) => {
        if (projectEnvsCache[project.id] === undefined) {
          projectEnvsCache[project.id] = mapProjectEnvs(project, props.envs);
        }
        return projectEnvsCache[project.id];
      },
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
      padding-top: 11px;

      .info {
        padding: 0 4px;
      }
    }

    .project-btn-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
