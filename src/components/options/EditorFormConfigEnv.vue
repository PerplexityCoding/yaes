<template>
  <div class="side-panel">
    Side Panel edit
    <form>
      <label> Name <input type="text" v-model="name" /> </label> <br />
      <label> Short name <input type="text" v-model="shortName" /> </label>
      <br />
      <label> Url <input type="text" v-model="url" /> </label> <br />

      <div>
        Overrides: Bellow options are defaulted to global option
        <button @click.prevent="resetToGlobalOptions">reset</button>

        <EditorFormBadge :option="mergedEnv" @update:option="updateComputed" />

        <EditorFormRibbon :option="mergedEnv" @update:option="updateComputed" />

        <fieldset>
          <label :class="{ defaulted: env.displayDomain === undefined }">
            <input type="checkbox" v-model="displayDomain" /> Display domain
          </label>
        </fieldset>
      </div>

      Danger zone
      <button @click="deleteEnv">delete</button>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import { getComputedFactory } from "@/services/business/ui";
import EditorFormRibbon from "@/components/options/form/EditorFormRibbon";
import EditorFormBadge from "@/components/options/form/EditorFormBadge";

const computed = getComputedFactory("mergedEnv");

export default {
  name: "EditorFormConfigEnv",
  components: { EditorFormBadge, EditorFormRibbon },
  props: {
    env: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  emits: ["update:env", "delete-env"],
  computed: {
    mergedEnv() {
      return deepmerge(deepmerge({}, this.config.options), this.env);
    },
    name: computed("name"),
    shortName: computed("shortName"),
    url: computed("url"),
    displayDomain: computed("displayDomain", null, true)
  },
  methods: {
    updateComputed(data) {
      this.$emit("update:env", deepmerge(deepmerge({}, this.env), data));
    },
    resetToGlobalOptions() {
      const { id, name, shortName, url } = this.env;

      this.$emit("update:env", {
        id,
        name,
        shortName,
        url
      });
    },
    deleteEnv() {
      this.$emit("delete-env", this.env);
    }
  }
};
</script>

<style scoped lang="scss">
.side-panel {
  width: 100%;
}
.defaulted {
  color: purple;
}
</style>
