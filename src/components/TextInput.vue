<script setup>
import { onMounted, ref } from "vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <input class="border ring-0 focus:ring-0 focus:border-gray-600/30 rounded-3xl py-4 px-6 "
    :class="{ 'border-primary-500': hasError, 'border-primary-600/30': modelValue && !hasError, 'border-gray-300 ': !modelValue }"
    :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" ref="input" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');"/>
</template>
