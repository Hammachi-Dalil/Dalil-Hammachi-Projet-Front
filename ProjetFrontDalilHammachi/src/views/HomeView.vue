<script setup lang="ts">
import Form from '../components/form/Form.vue';

</script>

<template>
  <main>
    <h1 class="title">Bienvenue sur la page d'accueil</h1>
    <h2 class="subtitle">Veuillez vous connecter</h2>
    <Form />
  </main>
</template>

<style lang="scss">
.title {
  text-align: center;
  color: $primaryColor;
}

.subtitle {
  text-align: center;
}
</style>
