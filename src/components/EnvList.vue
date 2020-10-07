<template>
  <ul class="env-list">
    <li v-for="env in envs" :key="env.id">
      <button
        :class="{ selected: env.id === currentEnv.id }"
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
      validator: a =>
        a.reduce((acc, o) => acc && o.name != null && o.id != null, true)
    },
    currentEnv: {
      type: Object,
      required: true,
      validator: o => o.name != null && o.id != null
    }
  },
  data() {
    return {};
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
