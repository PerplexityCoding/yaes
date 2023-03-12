<template>
  <button
    class="list-button env-button"
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
      {{ envName }}
      <div class="domain" v-if="env.displayDomain && env.url">
        {{ hostname(env) }}
      </div>
    </span>
    <span v-if="isSelected || isStatusError === true" class="selected-pill" />
    <ArrowRightIcon v-else height="14px" width="14px" />
  </button>
</template>

<script>
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
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
  components: { ArrowRightIcon },
  emits: ["switch-env"],
  setup(props, context) {
    const switchEnv = (env, newTab) => {
      context.emit("switch-env", { env, newTab });
    };

    const isStatusError = ref(null);
    if (props.env.pingUrl) {
      usePingUrl(props.env.url, isStatusError);
    }

    const shortName = (props.env.shortName || props.env.name).substring(0, 4);
    return {
      hostname: hostnameFromEnv,
      envName: props.env.displayStyle === "grid" ? shortName : props.env.name || shortName,
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

.list-button.env-button {
  @at-root .style-grid & {
    min-width: 5rem;
    min-height: 4.5rem;
    max-width: 5rem;
    max-height: 4.5rem;
    justify-content: space-evenly;
    padding: 4px;
  }

  &.ping-ok {
    fill: rgba(var(--green));

    @at-root .dark-mode & {
      fill: rgba(var(--green-apple));
    }
  }

  > .env-name {
    flex: 1;

    @at-root .style-grid & {
      flex: initial;
    }
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
    font-weight: bold;
    background-color: rgba(var(--bg-grey));
    border-left-width: 6px;

    @at-root {
      .style-grid & {
        border-left-width: 1px;
        border-left-color: rgba(var(--border-grey));
        border-bottom-width: 6px;
        border-bottom-color: rgba(var(--blue));
      }

      .dark-mode.style-grid & {
        border-left-color: rgba(var(--black-1));
      }
    }

    @at-root .dark-mode & {
      background-color: rgba(var(--black-3));
    }

    .selected-pill {
      background-color: rgba(var(--blue));
    }
  }
}
</style>
