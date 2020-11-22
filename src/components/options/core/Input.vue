<template>
  <div class="core-input">
    <input
      class="input"
      ref="input"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      v-model="localeValue"
    />
    <DeleteIcon v-if="localeValue !== ''" class="icon" height="18px" width="18px" @click="erase" />
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";

export default defineComponent({
  name: "CoreInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    focusOnMounted: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
  },
  emits: ["update:modelValue", "erase"],
  setup(props, context) {
    const input = ref(null);
    const localeValue = computed({
      get: () => props.modelValue,
      set: (val) => {
        context.emit("update:modelValue", val);
      },
    });

    const erase = () => {
      localeValue.value = "";
      context.emit("erase");
    };

    onMounted(() => {
      if (props.focusOnMounted) {
        const inputEl = input.value;
        if (inputEl) {
          inputEl.focus();
          inputEl.setSelectionRange(0, inputEl.length);
        }
      }
    });

    return {
      erase,
      localeValue,
      input,
    };
  },
});
</script>

<style lang="scss" scoped>
.core-input {
  position: relative;
  display: flex;

  .input {
    padding-right: 24px;
    flex: 1;
  }

  .icon {
    cursor: pointer;
    position: absolute;
    right: 4px;
    top: 2px;

    &:hover {
      fill: rgba(var(--ruby));
    }
  }
}
</style>
