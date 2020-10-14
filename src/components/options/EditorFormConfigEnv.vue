<template>
  <div class="side-panel">
    Side Panel edit <button @click="deleteEnv">delete</button>
    <form>
      <label> Name <input type="text" v-model="name" /> </label> <br />
      <label> Short name <input type="text" v-model="shortName" /> </label>
      <br />
      <label> Url <input type="text" v-model="url" /> </label> <br />

      <div>
        Overrides: Bellow options are defaulted to global option
        <button @click.prevent="resetToGlobalOptions">reset</button>

        <fieldset>
          <label :class="{ defaulted: env.displayBadge === undefined }">
            <input type="checkbox" v-model="displayBadge" />
            Badge
          </label>

          <div v-if="displayBadge">
            <label
              :class="{
                defaulted: env.badgeOptions?.backgroundColor === undefined
              }"
            >
              Background Color
              <ColorPicker v-model:color="badgeOptionsBgColor" />
            </label>
          </div>
        </fieldset>

        displayDomain ribbon
      </div>
    </form>
  </div>
</template>

<script>
import deepmerge from "deepmerge";
import ColorPicker from "@/components/core/ColorPicker";

function envComputed(key, subKey, usingDefault) {
  return {
    get() {
      return usingDefault
        ? this.defaultOptionsValue(key, subKey)
        : this.env[key];
    },
    set(value) {
      this.updateEnv(
        subKey ? { [key]: { [subKey]: value } } : { [key]: value }
      );
    }
  };
}

export default {
  name: "EditorFormConfigEnv",
  components: { ColorPicker },
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
    name: envComputed("name"),
    shortName: envComputed("shortName"),
    url: envComputed("url"),
    displayBadge: envComputed("displayBadge", true),
    badgeOptionsBgColor: envComputed("badgeOptions", "backgroundColor", true)
  },
  methods: {
    defaultOptionsValue(key, subKey) {
      const mergedObject = deepmerge(
        deepmerge({}, this.config.options),
        this.env
      );
      if (mergedObject[key] == null) {
        return null;
      }
      return subKey ? mergedObject[key][subKey] : mergedObject[key];
    },
    updateEnv(data) {
      this.$emit("update:env", deepmerge({ ...this.env }, data));
    },
    resetToGlobalOptions() {
      const { name, shortName, url, project } = this.env;

      this.$emit("update:env", {
        name,
        shortName,
        url,
        project
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
  background-color: lightgrey;
}
.defaulted {
  color: purple;
}
</style>
