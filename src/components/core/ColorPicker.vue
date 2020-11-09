<template>
  <div ref="pickr">
    <div class="dummyPickr" :style="{ backgroundColor: color }" />
  </div>
</template>

<script>
import Pickr from "@simonwep/pickr";

export default {
  name: "ColorPicker",
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  emits: ["update:color"],
  data() {
    return {
      pickrShown: false,
    };
  },
  watch: {
    color(val) {
      this.pickr.setColor(val);
    },
  },
  mounted() {
    window.requestIdleCallback(
      () => {
        this.createPicker();
      },
      { timeout: 300 }
    );
  },
  beforeUnmount() {
    if (this.pickr) {
      this.pickr._root.app.remove();
      this.pickr.destroy();
    }
  },
  methods: {
    createPicker() {
      this.pickr = Pickr.create({
        el: this.$refs.pickr,
        theme: "nano",
        default: this.color,
        swatches: [
          "rgba(244, 67, 54, 1)",
          "rgba(233, 30, 99, 0.95)",
          "rgba(156, 39, 176, 0.9)",
          "rgba(103, 58, 183, 0.85)",
          "rgba(63, 81, 181, 0.8)",
          "rgba(33, 150, 243, 0.75)",
          "rgba(3, 169, 244, 0.7)",
          "rgba(0, 188, 212, 0.7)",
          "rgba(0, 150, 136, 0.75)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(139, 195, 74, 0.85)",
          "rgba(205, 220, 57, 0.9)",
          "rgba(255, 235, 59, 0.95)",
          "rgba(255, 193, 7, 1)",
        ],
        components: {
          // Main components
          preview: true,
          opacity: true,
          hue: true,

          // Input / output Options
          interaction: {
            hex: true,
          },
        },
      })
        .on("changestop", (instance) => {
          this.updateColor(instance.getColor());
        })
        .on("swatchselect", (color) => {
          this.updateColor(color);
        });
    },
    updateColor(color) {
      this.$emit("update:color", color.toHEXA().toString());
    },
  },
};
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
