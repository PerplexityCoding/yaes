<template>
  <section class="popin">
    <EnvList :envs="envs" @switch-env="switchEnv" />
  </section>
</template>

<script>
import EnvList from "./components/EnvList";
import { getCurrentTab, openChromeUrl } from "./services/chrome/tabs";
import { switchBaseUrl } from "./services/business/url";

export default {
  name: "Popup",
  components: { EnvList },
  data() {
    return {
      envs: [
        {
          id: 1,
          name: "FR",
          url: "https://www.google.fr/sdfsdf"
        },
        {
          id: 2,
          name: "DE",
          url: "https://www.google.de/sdfsdf"
        },
        {
          id: 3,
          name: "ES",
          url: "https://www.google.es/"
        }
      ]
    };
  },
  methods: {
    async switchEnv({ env, middle }) {
      const currentTab = await getCurrentTab();
      const newUrl = switchBaseUrl(currentTab.url, env.url);

      openChromeUrl(currentTab, newUrl, middle);
    }
  }
};
</script>

<style lang="scss" scoped>
.popin {
  min-width: 250px;
  min-height: 100px;
}
</style>
