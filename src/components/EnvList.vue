<template>
  <ul class="env-list">
    <li v-for="env in envs" :key="env.url">
      <button
        :class="{ selected: equalsEnv(env, currentEnv) }"
        @click.middle="$emit('switch-env', { env, middle: true })"
        @click="$emit('switch-env', { env })"
      >
        <span class="env-name">
          <span v-if="env.shortName">
            {{ env.shortName }} <span v-if="env.name">-</span>
          </span>

          {{ env.name }}
          <div class="domain" v-if="env.displayDomain && env.url">
            {{ hostname(env) }}
          </div>
        </span>
        <span class="selected-pill" />
      </button>
    </li>
  </ul>
</template>

<script>
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
      required: true,
      validator: o => o.name != null || o.shortName != null
    }
  },
  emits: ["switch-env"],
  data() {
    return {};
  },
  methods: {
    equalsEnv(env1, env2) {
      const url1 = new URL(env1.url);
      const url2 = new URL(env2.url);
      return url1.hostname === url2.hostname;
    },
    hostname(env) {
      return new URL(env.url).hostname;
    }
  }
};
</script>

<style lang="scss" scoped>
.env-list {
  min-width: 250px;
}

.domain {
  font-style: italic;
  font-size: 0.75rem;
}

ul {
  padding: 10px 7px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  li {
    display: flex;
    list-style: none;
    padding: 0;

    + li {
      padding-top: 7px;
    }

    button {
      appearance: none;
      border-radius: 5px;
      border: 1px solid var(--border-grey);
      padding: 5px 8px 5px 13px;
      flex: 1;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: var(--bg-grey);
      transition: background-color 0.7s ease;

      &:hover {
        background-color: var(--bg-grey-hover);
      }

      > .env-name {
        flex: 1;
      }

      &.selected {
        border-left-color: var(--blue);
        border-left-width: 5px;
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
