<template>
  <fieldset>
    <label
      display-ribbon
      :class="{ defaulted: env ? env.displayRibbon === undefined : false }"
    >
      <input type="checkbox" v-model="displayRibbon" />
      Ribbon
    </label>
    <div>
      <label
        class="color-selector"
        :class="{
          defaulted: isDefaulted('backgroundColor')
        }"
        ribbon-bg-color
      >
        <ColorPicker v-model:color="ribbonBgColor" />
        <span>Background Color</span>
      </label>
      <label
        class="color-selector"
        :class="{
          defaulted: isDefaulted('color')
        }"
        ribbon-text-color
      >
        <ColorPicker v-model:color="ribbonColor" />
        <span>Text Color</span>
      </label>
      <label
        class="input-selector"
        :class="{
          defaulted: isDefaulted('position')
        }"
        ribbon-position
      >
        <span>Position</span>
        <select v-model="ribbonPosition">
          <option value="left"> left </option>
          <option value="right"> right </option>
        </select>
      </label>
      <label
        class="input-selector"
        :class="{
          defaulted: isDefaulted('type')
        }"
        ribbon-type
      >
        <span>Type</span>
        <select v-model="ribbonType">
          <option value="corner-ribbon"> Corner </option>
          <option value="square-ribbon"> Square </option>
        </select>
      </label>
    </div>
  </fieldset>
</template>

<script>
import { getComputedFactory } from "@/services/business/ui";
import ColorPicker from "@/components/core/ColorPicker";

const computed = getComputedFactory("option");

export default {
  name: "EditorFormRibbon",
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
    displayRibbon: computed("displayRibbon"),
    ribbonColor: computed("ribbonOptions", "color", "white"),
    ribbonBgColor: computed("ribbonOptions", "backgroundColor", "#2f2f2f"),
    ribbonPosition: computed("ribbonOptions", "position", "right"),
    ribbonType: computed("ribbonOptions", "type", "corner-ribbon")
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:option", data);
    },
    isDefaulted(key) {
      return this.env
        ? this.env.ribbonOptions
          ? this.env.ribbonOptions[key] === undefined
          : true
        : false;
    }
  }
};
</script>

<style lang="scss">
.pcr-button {
  border: 2px solid var(--blue);
  border-radius: 4px;
}
</style>

<style scoped lang="scss">
label {
  display: flex;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.input-selector {
  margin: 8px 0 0 24px;
  display: flex;

  span {
    text-align: right;
    min-width: 42px;
    padding-right: 8px;
  }

  select {
    min-width: 100px;
  }
}

.color-selector {
  display: flex;
  align-items: center;
  margin: 4px 0 0 24px;

  & > span {
    margin-left: 4px;
  }
}
</style>
