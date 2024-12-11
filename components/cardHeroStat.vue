<script setup lang="ts">
defineProps<{
    value: string;
    text: string;
}>();
</script>

<template>
  <div class="card-hero-stat"> 
    <h2 v-if="value" class="card-hero-stat__title">{{ value }}</h2>
    <p v-if="text" class="card-hero-stat__text">{{ text }}</p>
    </div>
</template>

<style lang="scss">
.card-hero-stat {
  padding: 2vh 4vh;
  background: $primaryColorClaire;
  border-radius: rem(8px);
  padding: 2vh 4vh;
  color: $titleColor;
  width: fit-content;
  max-width: 30vh;

  &__title {
    font-weight: bold;
    text-align: center;
    margin: 0;
  }

  &__text {
    text-align: center;
    margin: 0;
  }
}

</style>