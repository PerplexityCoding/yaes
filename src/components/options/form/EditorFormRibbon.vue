<template>
  <fieldset>
    <label :class="{ defaulted: option.displayRibbon === undefined }">
      <input type="checkbox" v-model="displayRibbon" />
      Ribbon
    </label>
    <div>
      <label>
        Background Color
        <ColorPicker v-model:color="ribbonBgColor" />
      </label>
      <label>
        Text Color
        <ColorPicker v-model:color="ribbonColor" />
      </label>
      <label>
        Position
        <select v-model="ribbonPosition">
          <option value="left"> left </option>
          <option value="right"> right </option>
        </select>
      </label>
      <label>
        Type
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
    }
  }
};
</script>

<style scoped lang="scss">
label {
  display: block;
}
</style>
