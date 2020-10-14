<template>
  <div class="options-selector">
    Global options
    <form>
      <fieldset>
        <label>
          <input type="checkbox" v-model="displayBadge" />
          Badge
        </label>
        <div v-if="options.displayBadge && options.badgeOptions">
          <label>
            <ColorPicker v-model:color="badgeOptionsBgColor" />
            Background Color
          </label>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import ColorPicker from "@/components/core/ColorPicker";

function generateComputed(key, subKey) {
  return {
    get() {
      const firstOption = this.options[key];
      return subKey && firstOption != null ? firstOption[subKey] : firstOption;
    },
    set(value) {
      this.updateOptions(
        subKey ? { [key]: { [subKey]: value } } : { [key]: value }
      );
    }
  };
}

export default {
  name: "EditorFormConfigGlobalOptions",
  components: { ColorPicker },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  emits: ["update:options"],
  computed: {
    displayBadge: generateComputed("displayBadge"),
    badgeOptionsBgColor: generateComputed("badgeOptions", "backgroundColor")
  },
  methods: {
    updateOptions(data) {
      this.$emit("update:options", deepmerge({ ...this.options }, data));
    }
  }
};
</script>

<style scoped lang="scss"></style>
