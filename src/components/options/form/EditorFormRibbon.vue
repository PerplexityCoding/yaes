<template>
  <fieldset :class="{ 'has-env': !!env }">
    <div
      class="label-set"
      display-ribbon
      :class="{ defaulted: env ? env.displayRibbon === undefined : false }"
    >
      <input :id="$id('display-ribbon')" type="checkbox" v-model="displayRibbon" />
      <label :for="$id('display-ribbon')">Ribbon</label>
    </div>
    <div class="form-options">
      <div class="label-set" ribbon-bg-color>
        <label
          class="color-selector"
          :class="{
            defaulted: isDefaulted('backgroundColor'),
          }"
        >
          <ColorPicker v-model:color="ribbonBackgroundColor" />
          <span>Background Color</span>
        </label>
      </div>
      <div class="label-set" ribbon-text-color>
        <label
          class="color-selector"
          :class="{
            defaulted: isDefaulted('color'),
          }"
        >
          <ColorPicker v-model:color="ribbonColor" />
          <span>Text Color</span>
        </label>
      </div>
      <div
        class="label-set input-selector"
        :class="{
          defaulted: isDefaulted('position'),
        }"
        ribbon-position
      >
        <label :for="$id('ribbon-position')">Position</label>
        <select :id="$id('ribbon-position')" v-model="ribbonPosition">
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>
      <div
        class="label-set input-selector"
        :class="{
          defaulted: isDefaulted('type'),
        }"
        ribbon-type
      >
        <label :for="$id('ribbon-type')">Type</label>
        <select :id="$id('ribbon-type')" v-model="ribbonType">
          <option value="corner-ribbon">Corner</option>
          <option value="square-ribbon">Square</option>
        </select>
      </div>
    </div>
  </fieldset>
</template>

<script>
import ColorPicker from "@/components/options/core/ColorPicker";
import { defineComponent } from "vue";
import { createComputedFactory } from "@/services/business/ui";
import upperFirst from "lodash/upperFirst";

export default defineComponent({
  name: "EditorFormRibbon",
  components: { ColorPicker },
  props: {
    env: {
      type: Object,
      default: undefined,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:options"],
  setup(props, context) {
    const isDefaulted = (key) => {
      return props.env
        ? props.env.ribbonOptions
          ? props.env.ribbonOptions[key] === undefined
          : true
        : false;
    };

    const updateComputed = (data) => context.emit("update:options", data);

    const createComputed = createComputedFactory(updateComputed);
    const displayRibbon = createComputed(
      () => props.options.displayRibbon,
      (val) => ({ displayRibbon: val })
    );

    const ribbonOptions = ["color", "backgroundColor", "position", "type"].reduce((acc, key) => {
      acc[`ribbon${upperFirst(key)}`] = createComputed(
        () => props.options.ribbonOptions[key],
        (val) => ({ ribbonOptions: { [key]: val } })
      );
      return acc;
    }, {});

    return {
      displayRibbon,
      ...ribbonOptions,
      isDefaulted,
      updateComputed,
    };
  },
});
</script>

<style scoped lang="scss">
.input-selector {
  margin: 8px 0 0 24px;
  display: flex;
  align-items: center;

  label {
    text-align: right;
    min-width: 42px;
    padding-right: 8px;
  }

  select {
    min-width: 100px;
  }
}

.color-selector {
  display: inline-flex;
  align-items: center;
  margin: 4px 0 0 24px;

  & > span {
    margin-left: 4px;
  }
}

.has-env {
  font-weight: 500;
}
</style>
