<template>
  <ul class="env-list">
    <li v-for="env in envs" :key="env.url">
      <Env
        :env="env"
        :is-selected="equalsEnv(env, currentEnv)"
        @switch-env="(data) => $emit('switch-env', data)"
      />
    </li>
  </ul>
</template>

<script>
import Env from "./Env.vue";
import { defineComponent } from "vue";
import { equalsEnv, isValidEnv } from "@/services/business/bo/env";

export default defineComponent({
  name: "EnvList",
  props: {
    envs: {
      type: Array,
      required: true,
    },
    currentEnv: {
      type: Object,
      required: false,
      default: null,
      validator: isValidEnv,
    },
  },
  components: { Env },
  emits: ["switch-env"],
  setup() {
    return {
      equalsEnv,
    };
  },
});
</script>

<style lang="scss" scoped>
.domain {
  font-style: italic;
  font-size: 0.75rem;
}

.env-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @at-root .style-grid & {
    display: grid;
    grid-template-columns: repeat(3, 5rem);
    grid-template-rows: auto;
    row-gap: 8px;
    column-gap: 8px;
  }

  li {
    display: flex;
    list-style: none;
    padding: 0;

    @at-root {
      .style-grid & {
        justify-self: center;
        padding-left: 0;
        padding-top: 0;
      }
    }

    + li {
      padding-top: 10px;
    }
  }
}
</style>
