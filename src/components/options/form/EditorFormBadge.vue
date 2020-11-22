<template>
  <fieldset :class="{ 'has-env': !!env }">
    <div
      class="label-set"
      display-badge
      :class="{ defaulted: env ? env.displayBadge === undefined : false }"
    >
      <input :id="$id('display-badge')" type="checkbox" v-model="displayBadge" />
      <label :for="$id('display-badge')">Badge</label>
    </div>

    <div class="label-set" badge-bg-color>
      <label class="badge-bg-color" :class="{ defaulted: isBadgeDefaultBgColor }">
        <ColorPicker v-model:color="badgeBgColor" />
        <span>Background Color</span>
      </label>
    </div>
  </fieldset>
</template>

<script>
import ColorPicker from "@/components/options/core/ColorPicker";

import { defineComponent } from "vue";
import { createComputedFactory } from "@/services/business/ui";

export default defineComponent({
  name: "EditorFormBadge",
  components: { ColorPicker },
  props: {
    env: {
      type: Object,
      default: undefined,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:options"],
  setup(props, context) {
    const isBadgeDefaultBgColor = () => {
      const { env } = props;
      const { badgeOptions } = env || {};
      return badgeOptions ? badgeOptions.backgroundColor === undefined : false;
    };

    const emitUpdate = (data) => context.emit("update:options", data);

    const createComputed = createComputedFactory(emitUpdate);

    const displayBadge = createComputed(
      () => props.options.displayBadge,
      (val) => ({ displayBadge: val })
    );

    const badgeBgColor = createComputed(
      () => props.options.badgeOptions.backgroundColor,
      (val) => ({ badgeOptions: { backgroundColor: val } })
    );

    return {
      isBadgeDefaultBgColor,
      displayBadge,
      badgeBgColor,
    };
  },
});
</script>

<style scoped lang="scss">
.badge-bg-color {
  display: inline-flex;
  align-items: center;
  margin: 4px 0 0 24px;

  & > span {
    margin-left: 4px;
  }
}

.has-env {
  font-weight: 500;
}
</style>
