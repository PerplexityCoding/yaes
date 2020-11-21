<template>
  <button
    class="list-button"
    :class="{
      selected: isSelected,
      'ping-ko': isStatusError === true,
      'ping-ok': isStatusError === false,
    }"
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
    <span v-if="isSelected || isStatusError === true" class="selected-pill" />
    <ArrowRight v-else height="14px" width="14px" />
  </button>
</template>

<script>
import ArrowRight from "../icons/ArrowRight";
import { defineComponent, ref } from "vue";
import { hostnameFromEnv, isValidEnv } from "@/services/business/bo/env";

function usePingUrl(url, isStatusError) {
  window.requestIdleCallback(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          isStatusError.value = res.status !== 200;
        })
        .catch(() => {
          isStatusError.value = true;
        });
    }, 500);
  });
}

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

    const isStatusError = ref(null);
    if (props.env.pingUrl) {
      usePingUrl(props.env.url, isStatusError);
    }

    return {
      hostname: hostnameFromEnv,
      switchEnv,
      isStatusError,
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

      &.ping-ok {
        fill: rgba(var(--green));

        @at-root .dark-mode & {
          fill: rgba(var(--green-apple));
        }
      }

      > .env-name {
        flex: 1;
      }

      &.selected,
      &.ping-ko {
        .selected-pill {
          display: block;
          border-radius: 50px;
          height: 12px;
          width: 12px;
        }
      }

      &.ping-ko {
        .selected-pill {
          background-color: rgba(var(--ruby));

          @at-root .dark-mode & {
            background-color: rgba(var(--ruby));
          }
        }
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
          background-color: rgba(var(--blue));
        }
      }
    }
  }
}
</style>
