<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  titlenya: String,
  rounded: {
    type: Boolean,
    default: true,
  },
  biji: {
    type: Boolean,
    default: true,
  },
});

const testitle = ref(props.titlenya);
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const closeOnEscape = (e) => {
  if (e.key === "Escape" && props.show) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("keydown", closeOnEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", closeOnEscape);
  document.body.style.overflow = null;
});
</script>

<template>
  <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-show="show" class="fixed inset-0 transform transition-all z-50 h-screen" @click="close">
      <div class="fixed inset-0 bg-slate-600 md:bg-slate-300/50 opacity-75 h-screen" />
    </div>
  </transition>
  <div v-show="show" class="fixed bottom-0 left-0 z-50 w-full flex items-center">
    <transition enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 translate-y-32"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="ease-in duration-500"
    leave-from-class="transform opacity-100 translate-y-0"
    leave-to-class="transform opacity-10 translate-y-32">
      <div v-show="show" :class="{ 'rounded-t-3xl': rounded }"
        class="z-50 bg-white bottom-modal absolute bottom-0 select-none w-full">
        <div class="flex items-center pt-2 justify-center" v-if="props.biji">
          <div class="h-1.5 w-10 rounded-full bg-slate-300"></div>
        </div>
        <div v-if="props.titlenya" class="pl-6 pr-6 py-4 font-semibold text-gray-800 text-2xl">
          {{ props.titlenya }}
        </div>
        <div class="px-4 pb-4">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
