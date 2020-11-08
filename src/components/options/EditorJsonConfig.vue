<template>
  <div>
    <div ref="jsonEditor" class="config"></div>
  </div>
</template>

<script>
import { debounce } from "../../services/utils";
import validateSchema from "../../schemas/config.schema.gen.js";

const SAVE_DELAY = 500;

export default {
  name: "EditorJsonConfig",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      displaySaveInfo: false,
      editor: null,
      errors: [],
    };
  },
  emits: ["update:config"],
  async mounted() {
    const JSONEditor = (await import("jsoneditor/dist/jsoneditor.js")).default;
    this.editor = new JSONEditor(
      this.$refs.jsonEditor,
      {
        onChange: debounce(() => {
          try {
            this.saveConfig(this.editor.get());
          } catch (e) {
            if (e.message.indexOf("Parse error on line") >= 0) {
              // contain invalid json data ignore
            } else {
              console.error(e);
            }
          }
        }, SAVE_DELAY),
        onValidationError: (errors) => {
          this.errors = errors;
        },
        onModeChange: () => {
          if (this.editor) {
            this.editor.validateSchema = validateSchema;
          }
        },
        modes: ["tree", "code"],
      },
      this.config
    );
    this.editor.validateSchema = validateSchema;
    this.editor.validate();
    if (this.editor.getMode() === "tree") {
      this.editor.expandAll();
    }
  },
  methods: {
    saveConfig(config) {
      if (!config || (this.errors && this.errors.length > 0)) {
        return;
      }

      this.$emit("update:config", config);
    },
  },
};
</script>

<style src="jsoneditor/dist/jsoneditor.css">
/* global styles */
</style>

<style lang="scss">
#check-color {
  fill: rgba(var(--green)) !important;
}
</style>

<style scoped lang="scss">
.config {
  flex: 1;
  min-height: 400px;
  height: calc(100vh - 200px);
}
</style>
