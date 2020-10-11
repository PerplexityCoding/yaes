<template>
  <div class="options">
    <section>
      <h1>
        YAES - Configuration Page
        <span>
          <em> (All changes will be saved directly) </em>
        </span>
      </h1>

      <div class="title">
        Configuration:
      </div>

      <div ref="jsonEditor" class="config"></div>
    </section>
    <transition name="fade">
      <div v-if="displayInfo" class="info">
        {{ info }}
      </div>
    </transition>
  </div>
</template>

<script>
import { storageGetValue, storageSet } from "@/services/chrome/storage";
import JSONEditor from "jsoneditor";
import { debounce } from "./services/utils";

export default {
  name: "OptionsPage",
  data() {
    return {
      info: "Saved !",
      displayInfo: false,
      config: null,
      editor: null
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
              color: "#d74a59",
              position: "left"
            }
          }
        ]
      };
      this.save();
    }

    this.editor = new JSONEditor(this.$refs.jsonEditor, {
      onChange: () => {
        try {
          const config = this.editor.get();
          if (config) {
            this.configChanged(config);
          }
        } catch (e) {
          if (e.message.indexOf("Parse error on line") >= 0) {
            // contain invalid json data ignore
          } else {
            console.log(e);
          }
        }
      },
      modes: ["tree", "code"]
    });
    this.editor.set(this.config);
    this.editor.expandAll();
  },
  methods: {
    configChanged: debounce(function(config) {
      console.log("saved");
      this.displayInfo = true;
      this.save(config);
      setTimeout(() => {
        this.displayInfo = false;
      }, 2000);
    }, 1000),
    save(config) {
      storageSet({
        config: JSON.stringify(config)
      });
    }
  }
};
</script>

<style src="jsoneditor/dist/jsoneditor.css">
/* global styles */
</style>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/transition.scss";
</style>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

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
    height: 500px;
  }

  .info {
    display: inline-block;
    border-radius: 3px;
    background-color: var(--green);
    color: white;
    padding: 5px 10px;
    margin-top: 5px;
  }
}
</style>
