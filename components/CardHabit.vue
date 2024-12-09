<script setup lang="ts">

defineProps<{
  title: string;
  description: string;
}>();

</script>

<template>
  <div class="c-card-habit">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>

    <div class="c-card-habit__buttons">
    <Button variant="white">Ajouter</Button>
  </div>
  </div>

</template>

<style lang="scss">
.c-card-habit {
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
