<script setup>
import { nextTick, onMounted, ref } from 'vue';

const navBgActive = ref(false);
const showDetail = ref(true);

const handleScroll = () => {
    navBgActive.value = (window.scrollY > 100) ? true : false;
    showDetail.value = false;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

</script>
<template>
    <nav class="sticky inset-0 z-50 bg-white mx-auto min-h-16 gap-6"
    :class="{ 'w-full dark:bg-gray-900 dark:text-gray-100 transition-all duration-200 shadow-sm shadow-slate-500/30': navBgActive, 'w-11/12 rounded-t-2xl' : !navBgActive }">
        <div class="w-full text-left px-4 py-4">
            <div class="font-bold text-2xl tracking-normal">Kios Terbaik</div>
            <div class="text-sm">Daging Asap Asli Kupang (Non-halal)</div>
        </div>
    </nav>
    <hr class="w-11/12 border-gray-300 mx-auto">
    <div class="w-11/12 rounded-b-2xl mx-auto text-left px-4 py-2  transition-all duration-1000 bg-gray-100 mb-12">
        <div class="font-semibold">Periode PO</div>
        <div class="text-sm">1 - 18 September 2024</div>
    </div>
</template>