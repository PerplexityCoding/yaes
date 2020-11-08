<template>
  <ul class="project-list">
    <li v-for="project in projects" :key="project.id">
      <div class="project-btn-wrapper">
        <button
          @click="toogleAccordeon(project)"
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
            @switch-env="data => $emit('redirect-env', data)"
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
  emits: ["redirect-env"],
  props: {
    projects: {
      type: Array,
      required: true,
      validator: a =>
        a.reduce((acc, o) => acc && (o.name != null || o.id != null), true)
    },
    envs: {
      type: Array,
      required: true,
      validator: a =>
        a.reduce(
          (acc, o) => acc && (o.name != null || o.shortName != null),
          true
        )
    }
  },
  data() {
    return {
      openProjectId: null
    };
  },
  methods: {
    isOpened(project) {
      return this.openProjectId === project.id;
    },
    toogleAccordeon(project) {
      this.openProjectId =
        this.openProjectId === project.id ? null : project.id;
    },
    projectEnvs(project) {
      return project.envs.map(envId => this.envs.find(env => env.id === envId));
    }
  }
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

    button {
      appearance: none;
      border-radius: 5px;
      border: 1px solid rgba(var(--border-grey));
      padding: 5px 8px 5px 10px;
      flex: 1;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: rgba(var(--bg-grey));
      transition: background-color 0.7s ease;
      min-height: 40px;
      letter-spacing: 0.35px;
      color: rgba(var(--fg-black));
      outline-color: rgba(var(--blue));

      @at-root .dark-mode & {
        color: rgba(var(--bg-white-off));
        border: 1px solid rgba(var(--black-1));
        background-color: rgba(var(--black-3));
      }

      &:hover {
        background-color: rgba(var(--bg-grey-hover));

        @at-root .dark-mode & {
          background-color: rgba(var(--black-3), 0.8);
        }
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
