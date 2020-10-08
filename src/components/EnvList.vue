<template>
  <ul class="env-list">
    <li v-for="env in envs" :key="env.url">
      <button
        :class="{ selected: equalsEnv(env, currentEnv) }"
        @click.middle="$emit('switch-env', { env, middle: true })"
        @click="$emit('switch-env', { env })"
      >
        {{ env.name }}
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
      validator: a => a.reduce((acc, o) => acc && o.name != null, true)
    },
    currentEnv: {
      type: Object,
      required: true,
      validator: o => o.name != null
    }
  },
  data() {
    return {};
  },
  methods: {
    equalsEnv(env1, env2) {
      const url1 = new URL(env1.url);
      const url2 = new URL(env2.url);
      return url1.hostname === url2.hostname;
    }
  }
};
</script>

<style lang="scss" scoped>
.env-list {
  min-width: 250px;
  min-height: 100px;
}

ul {
  padding: 0;

  li {
    display: flex;
    list-style: none;
    margin: 7px 5px;

    button {
      &.selected {
        border-color: #2677c9;
      }

      padding: 5px;
      flex: 1;
      text-align: left;
      cursor: pointer;
    }
  }
}
</style>
