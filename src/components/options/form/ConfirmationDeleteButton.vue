<template>
  <div>
    <button
      v-if="!modelValue"
      class="delete-btn"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <DeleteIcon height="18px" width="18px" />
      Delete
    </button>
    <div class="delete-confirm" v-else>
      <span>
        Are you sure ?
      </span>
      <button
        class="delete-btn"
        @click="$emit('update:modelValue', !modelValue) || $emit('action')"
      >
        Yes
      </button>
      <button @click="$emit('update:modelValue', !modelValue)">
        No
      </button>
    </div>
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
  }
};
</script>

<style scoped lang="scss">
.delete-btn {
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
