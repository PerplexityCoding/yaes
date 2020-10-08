import { createApp } from 'vue';
import Ribbon from "./Ribbon.vue";

function addComponent(componentId, Component, rootData) {
  const elem = document.createElement("div");
  elem.setAttribute("id", componentId);
  document.body.prepend(elem);
  createApp({
    ...Component,
    data() {
      return {
        ...Component.data(),
        ...rootData
      };
    }
  }).mount("#" + componentId);
}

export { addComponent, Ribbon };
