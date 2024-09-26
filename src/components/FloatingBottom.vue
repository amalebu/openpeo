<script setup>
defineProps({
    isShow: {
    type: Boolean,
    default: false,
    }
});
</script>
<template>
    <transition enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 translate-y-32"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="ease-in duration-200"
    leave-from-class="transform opacity-200 translate-y-0"
    leave-to-class="transform opacity-0 translate-y-32" v-show="isShow" class="fixed bottom-0 left-0 w-full">
    <div>
        <div class="h-8 bg-gradient-to-t from-white from-20%"></div>
        <div class="bg-white px-3 pb-3">
            <slot></slot>
        </div>
    </div>    
    </transition>
</template>