<template>
  <div @mouseleave="hideDelay" @mouseenter="stopHide">
    <transition name="fade" mode="out-in">
      <div class="buttons-wrapper" v-if="!modelValue">
        <slot name="beforeButton" />

        <CoreButton
          elevation
          class="delete-btn button"
          icon-name="Delete"
          variation="negative"
          @click="$emit('update:modelValue', !modelValue)"
        >
          Delete
        </CoreButton>

        <slot name="afterButton" />
      </div>
      <div class="delete-confirm" v-else>
        <span>
          Are you sure ?
        </span>
        <CoreButton
          class="delete-confirm-btn button"
          elevation
          variation="negative"
          @click="deleteConfirm"
        >
          Yes
        </CoreButton>
        <CoreButton class="button" elevation ref="no" @click="hide">
          No
        </CoreButton>
      </div>
    </transition>
  </div>
</template>

<script>
import CoreButton from "@/components/core/Button";

export default {
  name: "ConfirmationDeleteButton",
  emits: ["update:modelValue", "action"],
  components: {
    CoreButton
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hiding: false,
      hideTimer: null,
      deleting: false
    };
  },
  computed: {
    transitionName() {
      return this.deleting ? "fade" : "slide-fade-2";
    }
  },
  methods: {
    hideDelay() {
      if (!this.hideTimer) {
        this.hideTimer = setTimeout(() => {
          this.hide();
          this.hideTimer = null;
        }, 700);
      }
    },
    stopHide() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
      }
    },
    deleteConfirm() {
      this.hide(true, () => {
        this.$emit("action");
      });
    },
    hide(noTransition, cb) {
      if (noTransition) {
        this.deleting = 0;
        this.$emit("update:modelValue", false);
        setTimeout(() => {
          this.deleting = false;
          cb();
        }, 0);
      } else if (!this.hiding) {
        this.hiding = true;
        setTimeout(() => {
          this.$emit("update:modelValue", false);
          this.hiding = false;
        }, 700);
      }
    }
  }
};
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

  > span {
    margin-right: 4px;
  }
}
</style>
