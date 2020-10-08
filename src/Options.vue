<template>
  <div class="options">
    <section>
      <h1>
        YAES - Configuration Page
        <span> (* All changes will be saved directly *) </span>
      </h1>

      <div class="title">
        Environments Configuration:
      </div>
      <textarea class="envs" v-model="envs" @change="envsChanged" />
    </section>
    <div v-if="info" class="info">
      {{ info }}
    </div>
  </div>
</template>

<script>
import { storageGetValue, storageSet } from "@/services/chrome/storage";

export default {
  name: "OptionsPage",
  data() {
    return {
      info: null,
      envs: null
    };
  },
  async created() {
    this.envs = await storageGetValue("envs");

    if (!this.envs) {
      this.envs = JSON.stringify(
        [
          {
            name: "FR",
            url: "https://www.google.fr/sdfsdf"
          }
        ],
        null,
        4
      );
      this.save();
    }
  },
  methods: {
    envsChanged() {
      this.save();
      this.info = "Saved !";
      setTimeout(() => {
        this.info = null;
      }, 3000);
    },
    save() {
      storageSet({
        envs: this.envs
      });
    }
  }
};
</script>

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

  .envs {
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
