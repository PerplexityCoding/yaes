<template>
  <button
    class="list-button"
    :class="{ selected: isSelected }"
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
    <span v-if="isSelected" class="selected-pill" />
    <ArrowRight v-else height="14px" width="14px" />
  </button>
</template>

<script>
import ArrowRight from "../icons/ArrowRight";
import { defineComponent } from "vue";
import { hostnameFromEnv, isValidEnv } from "@/services/business/bo/env";

export default defineComponent({
  name: "Env",
  props: {
    env: {
      type: Object,
      required: true,
      validator: isValidEnv,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  components: { ArrowRight },
  emits: ["switch-env"],
  setup(props, context) {
    const switchEnv = (env, newTab) => {
      context.emit("switch-env", { env, newTab });
    };

    return {
      hostname: hostnameFromEnv,
      switchEnv,
    };
  },
});
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
      padding-top: 10px;
    }

    .list-button {
      &:hover {
        @at-root .dark-mode & {
          background-color: rgba(var(--black-1), 0.8);
        }
      }

      > .env-name {
        flex: 1;
      }

      &.selected {
        border-left-color: rgba(var(--blue));
        border-left-width: 7px;
        padding-left: 8px;
        font-weight: bold;
        background-color: rgba(var(--bg-grey));

        @at-root .dark-mode & {
          background-color: rgba(var(--black-3));
        }

        .selected-pill {
          display: block;
          border-radius: 50px;
          height: 12px;
          width: 12px;
          background-color: rgba(var(--blue));
        }
      }
    }
  }
}
</style>
