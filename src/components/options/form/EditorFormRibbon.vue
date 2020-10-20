<template>
  <fieldset>
    <label :class="{ defaulted: option.displayRibbon === undefined }">
      <input type="checkbox" v-model="displayRibbon" />
      Ribbon
    </label>
    <div>
      <label>
        <ColorPicker v-model:color="ribbonColor" />
        Text Color
      </label>
      <label>
        <ColorPicker v-model:color="ribbonBgColor" />
        Background Color
      </label>
      <label>
        <select v-model="ribbonPosition">
          <option value="left"> left </option>
          <option value="right"> right </option>
        </select>
      </label>
      <label>
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
    ribbonColor: computed("ribbonOptions", "color"),
    ribbonBgColor: computed("ribbonOptions", "backgroundColor"),
    ribbonPosition: computed("ribbonOptions", "position"),
    ribbonType: computed("ribbonOptions", "type")
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:option", data);
    }
  }
};
</script>
