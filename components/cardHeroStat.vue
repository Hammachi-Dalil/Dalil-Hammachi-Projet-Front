<script setup lang="ts">
defineProps<{
    value: string;
    text: string;
}>();
</script>

<template>
  <div class="c-card-hero-stat"> 
    <h2 v-if="value">{{ value }}</h2>
    <p v-if="text">{{ text }}</p>
    </div>
</template>

<style lang="scss">
.c-card-hero-stat {
  padding: 2vh 4vh;
  background: $primaryColorClaire;
  border-radius: rem(8px);
  padding: 2vh 4vh;
  color: $titleColor;
  width: fit-content;
  max-width: 30vh;
}

</style>