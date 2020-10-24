<template>
  <div class="options-selector">
    <h2>
      Options
    </h2>

    <form>
      <div class="left-col">
        <EditorFormBadge :option="options" @update:option="updateComputed" />
        <EditorFormRibbon :option="options" @update:option="updateComputed" />
      </div>

      <fieldset class="right-col">
        <label display-domain>
          <input type="checkbox" v-model="displayDomain" /> Display domain
        </label>
        <label display-header>
          <input type="checkbox" v-model="displayHeader" /> Display header
        </label>
        <label display-footer>
          <input type="checkbox" v-model="displayFooter" /> Display footer
        </label>
        <label display-projects-links>
          <input type="checkbox" v-model="displaySeeProjectsLink" />
          Display see projects link
        </label>
      </fieldset>
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

<style scoped lang="scss">
.options-selector {
  padding: 8px 4px 4px 4px;
  margin-bottom: 32px;

  form {
    background-color: var(--bg-grey);
    display: flex;
  }

  .right-col,
  .left-col {
    flex: 1;
  }

  .right-col {
    border: none;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
    }
  }

  h2 {
    font-size: 0.9rem;
    font-weight: bold;
    padding: 4px 0;
  }
}
</style>
