<template>
  <fieldset :class="{ 'has-env': !!env }">
    <div
      class="label-set"
      display-badge
      :class="{ defaulted: env ? env.displayBadge === undefined : false }"
    >
      <input
        :id="$id('display-badge')"
        type="checkbox"
        v-model="displayBadge"
      />
      <label :for="$id('display-badge')">Badge</label>
    </div>

    <div class="label-set" badge-bg-color>
      <label
        class="badge-bg-color"
        :class="{ defaulted: isBadgeDefaultBgColor }"
      >
        <ColorPicker v-model:color="badgeBgColor" />
        <span>Background Color</span>
      </label>
    </div>
  </fieldset>
</template>

<script>
import { getComputedFactory } from "@/services/business/ui";
import ColorPicker from "@/components/options/core/ColorPicker";

const computed = getComputedFactory("option");

export default {
  name: "EditorFormBadge",
  components: { ColorPicker },
  props: {
    env: {
      type: Object,
      default: undefined,
    },
    option: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:option"],
  computed: {
    displayBadge: computed("displayBadge"),
    badgeBgColor: computed("badgeOptions", "backgroundColor"),
    isBadgeDefaultBgColor() {
      const { env } = this;
      return env
        ? env.badgeOptions
          ? env.badgeOptions.backgroundColor === undefined
          : true
        : false;
    },
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:option", data);
    },
  },
};
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
