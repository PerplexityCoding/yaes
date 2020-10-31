<template>
  <div class="options-selector">
    <h2>
      Options
    </h2>

    <form class="box-elevation">
      <div class="left-col">
        <EditorFormBadge
          :option="mergedOptions"
          @update:option="updateComputed"
        />
        <EditorFormRibbon
          class="form-ribbon"
          :option="mergedOptions"
          @update:option="updateComputed"
        />
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
import { DEFAULT_OPTIONS } from "@/services/business/storage";

const computed = getComputedFactory("mergedOptions");

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
    displaySeeProjectsLink: computed("displaySeeProjectsLink"),
    mergedOptions() {
      const options = deepmerge(
        deepmerge({}, DEFAULT_OPTIONS),
        this.options || {}
      );
      return options;
    }
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
  form {
    display: flex;
  }

  .form-ribbon {
    margin-top: 8px;
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
