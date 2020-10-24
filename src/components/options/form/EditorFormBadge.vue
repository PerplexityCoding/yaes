<template>
  <fieldset>
    <label
      display-badge
      :class="{ defaulted: env ? env.displayBadge === undefined : false }"
    >
      <input type="checkbox" v-model="displayBadge" />
      Badge
    </label>

    <div>
      <label
        class="badge-bg-color"
        badge-bg-color
        :class="{
          defaulted: env
            ? env.badgeOptions
              ? env.badgeOptions.backgroundColor === undefined
              : true
            : false
        }"
      >
        <ColorPicker v-model:color="badgeBgColor" />
        <span>Background Color</span>
      </label>
    </div>
  </fieldset>
</template>

<script>
import { getComputedFactory } from "@/services/business/ui";
import ColorPicker from "@/components/core/ColorPicker";

const computed = getComputedFactory("option");

export default {
  name: "EditorFormBadge",
  components: { ColorPicker },
  props: {
    env: {
      type: Object,
      default: undefined
    },
    option: {
      type: Object,
      required: true
    }
  },
  emits: ["update:option"],
  computed: {
    displayBadge: computed("displayBadge"),
    badgeBgColor: computed("badgeOptions", "backgroundColor", "#FF00FF")
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:option", data);
    }
  }
};
</script>

<style scoped lang="scss">
fieldset {
  border: none;
  margin: 0;
  padding: 0;

  label {
    display: flex;
    align-items: center;
  }
}

.badge-bg-color {
  display: flex;
  align-items: center;
  margin: 4px 0 0 24px;

  & > span {
    margin-left: 4px;
  }
}
</style>
