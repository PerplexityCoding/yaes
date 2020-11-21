<template>
  <div ref="pickrElem">
    <div class="dummyPickr" :style="{ backgroundColor: color }" />
  </div>
</template>

<script>
import { defineComponent, watch, ref, onMounted, onBeforeUnmount } from "vue";
import { createColorPicker } from "@/components/options/core/color-picker";

function useColorPicker(pickr, pickrElem, colorValue, context) {
  if (pickrElem.value != null && pickr.value == null) {
    pickr.value = createColorPicker({
      elem: pickrElem.value,
      defaultColor: colorValue,
      updateColor(color) {
        const colorValue = color.toHEXA().toString();
        pickr.value.setColor(colorValue);
        context.emit("update:color", color.toHEXA().toString());
      },
    });
  }
}

export default defineComponent({
  name: "ColorPicker",
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  emits: ["update:color"],
  setup(props, context) {
    const pickr = ref(null);
    const pickrElem = ref(null);

    onMounted(() => {
      window.requestIdleCallback(
        () => {
          useColorPicker(pickr, pickrElem, props.color, context);
        },
        { timeout: 500 }
      );
    });

    onBeforeUnmount(() => {
      if (pickr.value) {
        pickr.value._root.app.remove();
        pickr.value.destroy();
        pickr.value = null;
      }
    });

    watch(
      () => props.color,
      (val) => {
        pickr.value.setColor(val);
      }
    );

    return {
      pickrElem,
    };
  },
});
</script>

<style src="@simonwep/pickr/dist/themes/nano.min.css">
/* global styles */
</style>

<style lang="scss" scoped>
.dummyPickr {
  appearance: none;
  width: 26.66px;
  height: 26.66px;
  border-radius: 4px;
}
</style>
