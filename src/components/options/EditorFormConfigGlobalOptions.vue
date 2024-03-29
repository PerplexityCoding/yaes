<template>
  <div class="options-selector">
    <h2>Global Options</h2>

    <form
      class="box-elevation"
      data-intro="This is where you configure your global options. Some options can be overrode per environment."
    >
      <div class="left-col">
        <div class="label-set" display-style>
          <label :for="$id('display-style')">Display Style</label>
          <select :id="$id('display-style')" v-model="displayStyle">
            <option value="list">List</option>
            <option value="grid">Grid</option>
          </select>
        </div>
        <div class="label-set" display-domain>
          <input :id="$id('display-domain')" type="checkbox" v-model="displayDomain" />
          <label :for="$id('display-domain')"> Display domain </label>
        </div>
        <div class="label-set" display-header>
          <input :id="$id('display-header')" type="checkbox" v-model="displayHeader" />
          <label :for="$id('display-header')"> Display header </label>
        </div>
        <div class="label-set" display-footer>
          <input :id="$id('display-footer')" type="checkbox" v-model="displayFooter" />
          <label :for="$id('display-footer')"> Display footer </label>
        </div>
        <div class="label-set" display-projects-links>
          <input
            :id="$id('display-projects-links')"
            type="checkbox"
            v-model="displaySeeProjectsLink"
          />
          <label :for="$id('display-projects-links')">Display see projects link</label>
        </div>
        <div class="label-set" color-scheme>
          <label :for="$id('color-scheme')">Color Scheme</label>
          <select :id="$id('color-scheme')" v-model="colorScheme">
            <option value="system">System preferences</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div class="label-set" allow-tracking>
          <input :id="$id('allow-tracking')" type="checkbox" v-model="allowBugTrackerReporting" />
          <label :for="$id('allow-tracking')">
            Allow bugs to be reported <br />
            <i>No personal information are collected. Not now Not ever.</i>
            <br />
            <i
              >Please consider keeping it on, as it is every useful to improve the quality of this
              extension.</i
            >
          </label>
        </div>
        <div class="label-set" ping-url>
          <input :id="$id('ping-url')" type="checkbox" v-model="pingUrl" />
          <label :for="$id('ping-url')"> Check if environment url is up </label>
        </div>
        <div class="label-set" switch-env-projects>
          <input
            :id="$id('switch-env-projects')"
            type="checkbox"
            v-model="switchEnvBetweenProjects"
          />
          <label :for="$id('switch-env-projects')"> Switch environments between projects </label>
        </div>
      </div>

      <fieldset class="right-col">
        <EditorFormBadge :options="mergedOptions" @update:options="updateComputed" />
        <EditorFormRibbon
          v-if="ribbonEnabled"
          class="form-ribbon"
          :options="mergedOptions"
          @update:options="updateComputed"
        />
      </fieldset>

      <div class="third-col">
        <CoreButton
          v-show="hasOptions"
          elevation
          icon-name="GoBackIcon"
          @click.prevent="resetToDefaultOptions"
          data-hint="Reset all options with default global options"
        >
          Reset
        </CoreButton>
      </div>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { createComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon.vue";
import EditorFormBadge from "@/components/options/form/EditorFormBadge.vue";
import { DEFAULT_OPTIONS } from "@/services/business/storage/defaults";
import CoreButton from "@/components/options/core/Button.vue";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "EditorFormConfigGlobalOptions",
  components: { CoreButton, EditorFormBadge, EditorFormRibbon },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:options"],
  setup(props, context) {
    const ribbonEnabled = ref(!window.ENV || window.ENV.WITHOUT_RIBBON !== true);

    const updateComputed = (data) =>
      context.emit("update:options", deepmerge({ ...props.options }, data));

    const createComputed = createComputedFactory(updateComputed);

    const resetToDefaultOptions = () => context.emit("update:options", {});

    const mergedOptions = computed(() => {
      const options = deepmerge(deepmerge({}, DEFAULT_OPTIONS), props.options || {});
      return options;
    });

    const hasOptions = computed(() => {
      return Object.keys(props.options).length > 0;
    });

    const localOptions = [
      "displayDomain",
      "displayHeader",
      "displayFooter",
      "displaySeeProjectsLink",
      "colorScheme",
      "allowBugTrackerReporting",
      "pingUrl",
      "displayStyle",
      "switchEnvBetweenProjects",
    ].reduce((acc, key) => {
      acc[key] = createComputed(
        () => mergedOptions.value[key],
        (val) => ({ [key]: val })
      );
      return acc;
    }, {});

    return {
      mergedOptions,
      hasOptions,
      ribbonEnabled,
      ...localOptions,
      resetToDefaultOptions,
      updateComputed,
    };
  },
});
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
    flex: 3;
  }

  .left-col {
    flex: 4;
  }

  .third-col {
    flex: 1;
  }

  .right-col {
    border: none;
    display: flex;
    flex-direction: column;
  }

  .label-set {
    margin-bottom: 8px;

    select {
      margin-left: 8px;
    }
  }

  h2 {
    font-size: 0.9rem;
    font-weight: bold;
    padding: 4px 0;
  }

  button {
    float: right;
  }
}
</style>
