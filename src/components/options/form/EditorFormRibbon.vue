<template>
  <fieldset :class="{ 'has-env': !!env }">
    <div
      class="label-set"
      display-ribbon
      :class="{ defaulted: env ? env.displayRibbon === undefined : false }"
    >
      <input
        :id="$id('display-ribbon')"
        type="checkbox"
        v-model="displayRibbon"
      />
      <label :for="$id('display-ribbon')">Ribbon</label>
    </div>
    <div class="form-options">
      <div class="label-set" ribbon-bg-color>
        <label
          class="color-selector"
          :class="{
            defaulted: isDefaulted('backgroundColor')
          }"
        >
          <ColorPicker v-model:color="ribbonBgColor" />
          <span>Background Color</span>
        </label>
      </div>
      <div class="label-set" ribbon-text-color>
        <label
          class="color-selector"
          :class="{
            defaulted: isDefaulted('color')
          }"
        >
          <ColorPicker v-model:color="ribbonColor" />
          <span>Text Color</span>
        </label>
      </div>
      <div
        class="label-set input-selector"
        :class="{
          defaulted: isDefaulted('position')
        }"
        ribbon-position
      >
        <label :for="$id('ribbon-position')">Position</label>
        <select :id="$id('ribbon-position')" v-model="ribbonPosition">
          <option value="left"> left </option>
          <option value="right"> right </option>
        </select>
      </div>
      <div
        class="label-set input-selector"
        :class="{
          defaulted: isDefaulted('type')
        }"
        ribbon-type
      >
        <label :for="$id('ribbon-type')">Type</label>
        <select :id="$id('ribbon-type')" v-model="ribbonType">
          <option value="corner-ribbon"> Corner </option>
          <option value="square-ribbon"> Square </option>
        </select>
      </div>
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
.pickr .pcr-button {
  &:after,
  &:before {
    border-radius: 4px;
  }
}
</style>

<style scoped lang="scss">
.input-selector {
  margin: 8px 0 0 24px;
  display: flex;
  align-items: center;

  label {
    text-align: right;
    min-width: 42px;
    padding-right: 8px;
  }

  select {
    min-width: 100px;
  }
}

.color-selector {
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
