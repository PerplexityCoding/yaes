<template>
  <div class="options-selector">
    Global options
    <form>
      <EditorFormBadge :option="options" @update:option="updateComputed" />

      <EditorFormRibbon :option="options" @update:option="updateComputed" />

      <label>
        <input type="checkbox" v-model="displayDomain" /> Display domain
      </label>
      <label>
        <input type="checkbox" v-model="displayHeader" /> Display header
      </label>
      <label>
        <input type="checkbox" v-model="displayFooter" /> Display footer
      </label>
      <label>
        <input type="checkbox" v-model="displaySeeProjectsLink" />
        Display see projects link
      </label>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { getComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon";
import EditorFormBadge from "@/components/options/form/EditorFormBadge";

const computed = getComputedFactory("options");

export default {
  name: "EditorFormConfigGlobalOptions",
  components: { EditorFormBadge, EditorFormRibbon },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  emits: ["update:options"],
  computed: {
    displayDomain: computed("displayDomain"),
    displayHeader: computed("displayHeader"),
    displayFooter: computed("displayFooter"),
    displaySeeProjectsLink: computed("displaySeeProjectsLink")
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:options", deepmerge({ ...this.options }, data));
    }
  }
};
</script>

<style scoped lang="scss"></style>
