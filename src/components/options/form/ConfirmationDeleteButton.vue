<template>
  <div @mouseleave="hideDelay" @mouseenter="stopHide">
    <transition name="fade" mode="out-in">
      <div class="buttons-wrapper" v-if="!modelValue">
        <slot name="beforeButton" />

        <button
          class="delete-btn"
          @click="$emit('update:modelValue', !modelValue)"
        >
          <DeleteIcon height="18px" width="18px" />
          Delete
        </button>

        <slot name="afterButton" />
      </div>
      <div class="delete-confirm" v-else>
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
.delete-btn,
.delete-confirm-btn {
  fill: rgba(var(--ruby));
  color: rgba(var(--ruby));
}

.buttons-wrapper {
  display: flex;
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
    background: rgba(var(--bg-grey-hover));
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
