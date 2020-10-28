<template>
  <ul class="env-list">
    <li v-for="env in envs" :key="env.url">
      <button
        :class="{ selected: equalsEnv(env, currentEnv) }"
        @click.middle.exact="switchEnv(env, true)"
        @click.ctrl.exact="switchEnv(env, true)"
        @click.exact="switchEnv(env)"
      >
        <span class="env-name">
          {{ env.name || env.shortName }}
          <div class="domain" v-if="env.displayDomain && env.url">
            {{ hostname(env) }}
          </div>
        </span>
        <span v-if="equalsEnv(env, currentEnv)" class="selected-pill" />
        <ArrowRight v-else height="14px" width="14px" />
      </button>
    </li>
  </ul>
</template>

<script>
import ArrowRight from "../icons/ArrowRight";

export default {
  name: "EnvList",
  props: {
    envs: {
      type: Array,
      required: true,
      validator: a =>
        a.reduce(
          (acc, o) => acc && (o.name != null || o.shortName != null),
          true
        )
    },
    currentEnv: {
      type: Object,
      required: false,
      default: null,
      validator: o => !o || o.name != null || o.shortName != null
    }
  },
  components: { ArrowRight },
  emits: ["switch-env"],
  data() {
    return {};
  },
  methods: {
    equalsEnv(env1, env2) {
      if (!env1 || !env2) {
        return false;
      }
      return env1.id === env2.id;
    },
    hostname(env) {
      return new URL(env.url).hostname;
    },
    switchEnv(env, newTab) {
      this.$emit("switch-env", { env, newTab });
    }
  }
};
</script>

<style lang="scss" scoped>
.domain {
  font-style: italic;
  font-size: 0.75rem;
}

ul {
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
      padding-top: 11px;
    }

    button {
      appearance: none;
      border-radius: 5px;
      border: 1px solid var(--border-grey);
      padding: 5px 8px 5px 15px;
      flex: 1;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: var(--bg-grey);
      transition: background-color 0.7s ease;
      min-height: 37px;
      letter-spacing: 0.35px;
      color: var(--fg-black);
      outline-color: var(--blue);

      &:hover {
        background-color: var(--bg-grey-hover);
      }

      > .env-name {
        flex: 1;
      }

      &.selected {
        border-left-color: var(--blue);
        border-left-width: 7px;
        padding-left: 8px;
        font-weight: bold;
        background-color: var(--bg-yellow);

        .selected-pill {
          display: block;
          border-radius: 50px;
          height: 12px;
          width: 12px;
          background-color: var(--blue);
        }
      }
    }
  }
}
</style>
