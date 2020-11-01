<template>
  <div @mouseleave="hideDelay" @mouseenter="stopHide">
    <button
      v-if="!modelValue"
      class="delete-btn"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <DeleteIcon height="18px" width="18px" />
      Delete
    </button>
    <transition name="slide-fade-2">
      <div class="delete-confirm" v-if="modelValue && !hiding">
        <span>
          Are you sure ?
        </span>
        <button class="delete-confirm-btn" @click="deleteConfirm">
          Yes
        </button>
        <button ref="no" @click="hide">
          No
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import DeleteIcon from "@/components/icons/Delete";

export default {
  name: "ConfirmationDeleteButton",
  emits: ["update:modelValue", "action"],
  components: {
    DeleteIcon
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
      hideTimer: null
    };
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
      this.hide();
      this.$emit("action");
    },
    hide() {
      if (!this.hiding) {
        this.hiding = true;
        setTimeout(() => {
          this.$emit("update:modelValue", false);
          this.hiding = false;
        }, 800);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.delete-btn,
.delete-confirm-btn {
  fill: var(--ruby);
  color: var(--ruby);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  display: flex;
  align-items: center;
  background: none;
  padding: 8px;
  border-radius: 4px;

  svg {
    margin-right: 4px;
  }

  &:hover {
    background: var(--bg-grey-hover);
  }
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
