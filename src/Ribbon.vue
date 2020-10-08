<template>
  <div class="ribbon">
    {{ env }} R
  </div>
</template>

<script>
export default {
  name: "RibbonEnv",
  data() {
    return {
      env: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.ribbon {
}
</style>
