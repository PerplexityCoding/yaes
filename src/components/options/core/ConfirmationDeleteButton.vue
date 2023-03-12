<template>
  <div @mouseleave="hideDelay" @mouseenter="stopHide">
    <transition name="fade" mode="out-in">
      <div class="buttons-wrapper" v-if="!modelValue">
        <slot name="beforeButton" />

        <CoreButton
          elevation
          class="delete-btn button"
          icon-name="DeleteIcon"
          variation="negative"
          @click="show"
        >
          Delete
        </CoreButton>

        <slot name="afterButton" />
      </div>
      <div class="delete-confirm" v-else>
        <span class="confirm-title"> Are you sure ? </span>
        <CoreButton
          class="delete-confirm-btn button"
          elevation
          variation="negative"
          @click="deleteConfirm"
        >
          Yes
        </CoreButton>
        <CoreButton class="button" elevation ref="no" @click="hide"> No </CoreButton>
      </div>
    </transition>
  </div>
</template>

<script>
import CoreButton from "@/components/options/core/Button.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmationDeleteButton",
  emits: ["update:modelValue", "action"],
  components: {
    CoreButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let hideTimer = null;
    const hideDelayInSecond = 5000;

    const hideDelay = () => {
      if (!hideTimer) {
        hideTimer = setTimeout(() => {
          hide();
          hideTimer = null;
        }, hideDelayInSecond);
      }
    };

    const stopHide = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    };

    const deleteConfirm = () => {
      hide();
      setTimeout(() => {
        context.emit("action");
      });
    };

    const show = () => emitUpdate(true);
    const hide = () => emitUpdate(false);
    const emitUpdate = (value) => context.emit("update:modelValue", value);

    return {
      show,
      hide,
      hideDelay,
      stopHide,
      deleteConfirm,
    };
  },
});
</script>

<style scoped lang="scss">
.buttons-wrapper {
  display: flex;
}

.button {
  margin-left: 8px;
}

.delete-confirm {
  display: flex;
  align-items: baseline;
  min-height: 34px;

  .confirm-title {
    margin-right: 4px;
  }
}
</style>
