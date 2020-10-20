<template>
  <fieldset>
    <label :class="{ defaulted: displayBadge === undefined }">
      <input type="checkbox" v-model="displayBadge" />
      Badge
    </label>

    <div>
      <label
        :class="{
          defaulted: badgeBgColor === undefined
        }"
      >
        Background Color
        <ColorPicker v-model:color="badgeBgColor" />
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
