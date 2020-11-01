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
        <div class="label-set" display-domain>
          <input
            :id="$id('display-domain')"
            type="checkbox"
            v-model="displayDomain"
          />
          <label :for="$id('display-domain')"> Display domain </label>
        </div>
        <div class="label-set" display-header>
          <input
            :id="$id('display-header')"
            type="checkbox"
            v-model="displayHeader"
          />
          <label :for="$id('display-header')"> Display header </label>
        </div>
        <div class="label-set" display-footer>
          <input
            :id="$id('display-footer')"
            type="checkbox"
            v-model="displayFooter"
          />
          <label :for="$id('display-footer')"> Display footer </label>
        </div>
        <div class="label-set" display-projects-links>
          <input
            :id="$id('display-projects-links')"
            type="checkbox"
            v-model="displaySeeProjectsLink"
          />
          <label :for="$id('display-projects-links')"
            >Display see projects link</label
          >
        </div>
      </fieldset>

      <div class="third-col">
        <button @click.prevent="resetToDefaultOptions" v-show="hasOptions">
          <GoBack height="18px" width="18px" />
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { getComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon";
import EditorFormBadge from "@/components/options/form/EditorFormBadge";
import { DEFAULT_OPTIONS } from "@/services/business/storage";
import GoBack from "@/components/icons/GoBack";

const computed = getComputedFactory("mergedOptions");

export default {
  name: "EditorFormConfigGlobalOptions",
  components: { EditorFormBadge, EditorFormRibbon, GoBack },
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
    },
    hasOptions() {
      return Object.keys(this.options).length > 0;
    }
  },
  methods: {
    resetToDefaultOptions() {
      this.$emit("update:options", {});
    },
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

  .right-col {
    flex: 2;
  }

  .left-col {
    flex: 3;
  }

  .third-col {
    flex: 1;
  }

  .right-col {
    border: none;
    display: flex;
    flex-direction: column;

    .label-set {
      margin-bottom: 8px;
    }
  }

  h2 {
    font-size: 0.9rem;
    font-weight: bold;
    padding: 4px 0;
  }

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    display: flex;
    align-items: center;
    background: none;
    padding: 8px;
    border-radius: 4px;
    float: right;

    svg {
      margin-right: 4px;
    }

    &:hover {
      background: var(--bg-grey-hover);
    }
  }
}
</style>
