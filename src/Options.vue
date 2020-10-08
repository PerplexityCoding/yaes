<template>
  <div class="options">
    <section>
      <h1>
        YAES - Configuration Page
        <span> (* All changes will be saved directly *) </span>
      </h1>

      <div class="title">
        Configuration:
      </div>

      <div ref="jsonEditor"></div>
    </section>
    <div v-if="info" class="info">
      {{ info }}
    </div>
  </div>
</template>

<script>
import { storageGetValue, storageSet } from "@/services/chrome/storage";
import JSONEditor from "jsoneditor";

export default {
  name: "OptionsPage",
  data() {
    return {
      info: null,
      config: null
    };
  },
  async created() {
    const config = await storageGetValue("config");

    if (config) {
      this.config = JSON.parse(config);
    } else {
      this.config = {
        envs: [
          {
            name: "FR",
            url: "https://www.google.fr/",
            ribbon: {
              color: "FF1234",
              position: "left"
            }
          }
        ]
      };
      this.save();
    }

    const editor = new JSONEditor(this.$refs.jsonEditor, {
      onBlur: () => {
        this.config = editor.get();
        this.configChanged();
      },
      modes: ["tree", "form", "code"]
    });
    editor.set(this.config);
    editor.expandAll();
  },
  methods: {
    configChanged() {
      this.info = "Saved !";
      this.save();
      setTimeout(() => {
        this.info = null;
      }, 3000);
    },
    save() {
      storageSet({
        config: JSON.stringify(this.config)
      });
    }
  }
};
</script>

<style src="jsoneditor/dist/jsoneditor.css">
/* global styles */
</style>

<style lang="scss" scoped>
.options {
  max-width: 800px;
  margin: 0 auto;

  h1 {
    margin-bottom: 10px;

    span {
      font-size: 0.8rem;
      font-weight: normal;
      display: block;
    }
  }

  section {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 0.9rem;
    font-weight: bold;
    padding: 3px 0;
  }

  .config {
    flex: 1;
    min-height: 300px;
  }

  .info {
    display: inline-block;
    border-radius: 3px;
    background-color: #057705;
    color: white;
    padding: 5px 10px;
    margin-top: 5px;
  }
}
</style>
