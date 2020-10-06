<template>
  <div class="options">
    <textarea v-model="envs" />
    <button @click="save">save</button>
  </div>
</template>

<script>
import { storageGetValue, storageSet } from "@/services/chrome/storage";

export default {
  name: "OptionsPage",
  data() {
    return {
      envs: null
    };
  },
  async created() {
    this.envs = await storageGetValue("envs");

    if (!this.envs) {
      this.envs = JSON.stringify(
        [
          {
            id: 1,
            name: "FR",
            url: "https://www.google.fr/sdfsdf"
          }
        ],
        null,
        4
      );
    }
  },
  methods: {
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
}
</style>
