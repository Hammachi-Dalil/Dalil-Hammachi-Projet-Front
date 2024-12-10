<script setup lang="ts">
defineProps<{
    title: string;
    text: string;
}>(); 
</script>

<template>
    <div class="c-card-price">
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
    </div>
</template>

<style lang="scss">
</style>