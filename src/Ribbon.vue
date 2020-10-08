<template>
  <div class="corner-ribbon" :class="[ribbonPosition || 'right']" :style="ribbonStyle">
    {{ env.name }}
  </div>
</template>

<script>
import { getContrast } from "./services/utils";

export default {
  name: "RibbonEnv",
  data() {
    return {
      env: {}
    };
  },
  computed: {
    ribbonPosition() {
      return this.env?.ribbon?.position;
    },
    ribbonStyle() {
      const backgroundColor = this.env?.ribbon?.color || '#2f2f2f';
      return {
        backgroundColor,
        color: getContrast(backgroundColor)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.corner-ribbon {
  width: 250px;
  color: #fff;
  position: fixed;
  text-align: center;
  top: 50px;
  line-height: 40px;
  z-index: 99999;
  font-weight: bold;
  box-shadow: 8px 2px 5px #2f2f2f;

  &.left {
    left: -75px;
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  &.right {
    right: -75px;
    left: auto;
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
