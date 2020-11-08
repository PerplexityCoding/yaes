<template>
  <button
    :class="{ [variation]: variation, elevation }"
    @click="(e) => $emit('click', e)"
  >
    <component v-if="iconName" :is="iconName" height="18px" width="18px" />
    <slot />
  </button>
</template>

<script>
import * as icons from "../icons";

export default {
  name: "CoreButton",
  props: {
    iconName: {
      type: String,
      default: null,
    },
    variation: {
      type: String,
      default: null,
      validator: (s) =>
        s.indexOf("negative") >= 0 || s.indexOf("positive") >= 0,
    },
    elevation: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  components: {
    ...icons,
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  background: none;
  padding: 6px 8px;
  border-radius: 4px;
  color: rgba(var(--fg-black));
  fill: rgba(var(--fg-black));

  @at-root .dark-mode & {
    color: rgba(var(--bg-white-off));
    fill: rgba(var(--bg-white-off));
  }

  &.elevation {
    border: 1px solid rgba(var(--black-2), 0.1);

    @at-root .dark-mode & {
      border: 1px solid rgba(var(--black-2));
    }
  }

  &.negative {
    color: rgba(var(--ruby));
    fill: rgba(var(--ruby));
  }

  &.positive {
    color: rgba(var(--green));
    fill: rgba(var(--green));
  }

  svg {
    margin-right: 4px;
  }

  &:hover {
    background: rgba(var(--bg-grey-hover));

    @at-root .dark-mode & {
      background-color: rgba(var(--black-2));
    }
  }
}
</style>
