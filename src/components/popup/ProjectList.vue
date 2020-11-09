<template>
  <ul class="project-list">
    <li v-for="project in projects" :key="project.id">
      <div class="project-btn-wrapper">
        <button
          @click="toggleAccordeon(project)"
          class="list-button"
          :class="{ 'is-opened': isOpened(project) }"
        >
          <span>
            {{ project.name || project.id }}
          </span>
          <ArrowRight height="14px" width="14px" />
        </button>
        <div class="project-envs" v-if="isOpened(project)">
          <EnvList
            :envs="projectEnvs(project)"
            @switch-env="(data) => $emit('redirect-env', data)"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import EnvList from "./EnvList";
import ArrowRight from "../icons/ArrowRight";

export default {
  name: "ProjectList",
  components: { EnvList, ArrowRight },
  emits: ["redirect-env", "update:openProjectId"],
  props: {
    openProjectId: {
      type: Number,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
      validator: (a) =>
        a.reduce((acc, o) => acc && (o.name != null || o.id != null), true),
    },
    envs: {
      type: Array,
      required: true,
      validator: (a) =>
        a.reduce(
          (acc, o) => acc && (o.name != null || o.shortName != null),
          true
        ),
    },
  },
  methods: {
    isOpened(project) {
      return this.openProjectId === project.id;
    },
    toggleAccordeon(project) {
      this.$emit(
        "update:openProjectId",
        this.openProjectId === project.id ? -1 : project.id
      );
    },
    projectEnvs(project) {
      return project.envs.map((envId) =>
        this.envs.find((env) => env.id === envId)
      );
    },
  },
};
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
    }

    .project-btn-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
