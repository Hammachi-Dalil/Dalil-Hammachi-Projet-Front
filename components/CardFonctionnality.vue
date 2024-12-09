<script setup lang="ts">




defineProps<{
    variant?: "Blue" | "Yellow" | "Green";
    title: string;
    text: string;

}>();
</script>

<template>
    <main>
  <div :class="{'card': true,
                '-Blue': variant === 'Blue',
                '-Yellow': variant === 'Yellow',
                '-Green': variant === 'Green'}">
    <h2 v-if="title">{{ title }}</h2>
    <p v-if="text">{{ text }}</p>

  </div>
</main>

</template>

<style lang="scss">
.card {
  padding: 2vh 4vh;
  background: $primaryColorClaire;
  border-radius: rem(8px);
  margin: 0 2vh;
  padding: 2vh 4vh;
  color: $titleColor;
  width: fit-content;
  max-width: 30vh;

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }

  &.-Blue {
    background: #bcffff;
    color: $titleColor;
  }

  &.-Yellow {
    background: $yellowClaire;
    color: $titleColor;
  }

   &.-Green {
        background: $greenClaire;
        color: $titleColor;    
  }

}

</style>
