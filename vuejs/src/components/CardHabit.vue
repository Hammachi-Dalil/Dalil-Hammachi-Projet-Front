<script setup lang="ts">

import MyButton from './Button/Button.vue';

defineProps<{
  title: string;
  description: string;
}>();

</script>

<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>

    <div class="card__buttons">
    <MyButton variant="white">Ajouter</MyButton>
  </div>
  </div>

</template>

<style lang="scss">
.card {
  padding: 2vh 4vh;
  background: linear-gradient(45deg, $primaryColor, $primaryColorClaire);
  border-radius: rem(8px);
  margin: 0 2vh;
  color: $white;

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}

</style>
