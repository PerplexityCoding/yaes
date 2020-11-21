<template>
  <fieldset :class="{ 'has-env': !!env }">
    <div class="label-set" display-badge :class="{ defaulted: env ? env.displayBadge === undefined : false }">
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

import { defineComponent, watch, ref } from "vue";

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
  emits: ["update:option"],
  setup(props, context) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const options = props.options;
    const displayBadge = ref(options.displayBadge);
    const badgeBgColor = ref(options.badgeOptions.backgroundColor);

    const isBadgeDefaultBgColor = () => {
      const { env } = props;
      const { badgeOptions } = env || {};
      return badgeOptions ? badgeOptions.backgroundColor === undefined : false;
    };

    watch(displayBadge, (value) => emitUpdate({ displayBadge: value }));
    watch(badgeBgColor, (value) => emitUpdate({ badgeOptions: { backgroundColor: value } }));

    const emitUpdate = (data) => context.emit("update:option", data);

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
