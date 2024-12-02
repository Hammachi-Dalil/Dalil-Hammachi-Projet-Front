<script setup lang="ts">
import UneHabitude from '../components/CardHabit.vue';

const habitudes = [
  {
    title: "Coder des super sites en Vue JS",
    description: "Je code de super sites à l'aide du Framework Vuejs et d'autres outils comme le scss et le typescript"
  },
  {
    title: "Jouer au Football",
    description: "Jouer au football avec mes amis pour garder une bonne forme"
  },
  {
    title: "Apprendre à cuisiner",
    description: "J'apprends à cuisiner des plats sains pour ma santé"
  },
  {
    title: "Faire du yoga",
    description: "Je pratique le yoga pour améliorer ma flexibilité et ma relaxation"
  }
];

</script>

<template>
  <h1 class="title">Mes Habitudes</h1>
    <div class="parent">
      <UneHabitude
v-for="(habitude, index) in habitudes"
        :key="index"
        :title="habitude.title"
        :description="habitude.description"
      />
    </div>
</template>

<style lang="scss">

.parent {
  display: grid;
  gap: rem(16px);  // Espace entre les éléments du grid
  grid-template-columns: repeat(3, 1fr); // Par défaut, 3 colonnes (PC)

  // Mixin pour les petits écrans (mobile)
  @include large-down {
    grid-template-columns: repeat(1, 1fr);
    gap: rem(16px);

    margin: 3vh 0;
  }
}

</style>
