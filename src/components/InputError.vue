<script setup>
defineProps({
    message: {
        type: String,
    },
});
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-primary-600 dark:text-primary-400">
            {{ message }}
        </p>
    </div>
</template>
