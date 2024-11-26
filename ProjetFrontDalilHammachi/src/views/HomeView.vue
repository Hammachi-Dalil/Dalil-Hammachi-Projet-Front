<script setup lang="ts">
import Form from '../components/form/Form.vue';
</script>

<template>
  <main class="home">
    <div class="home__content">
      <div class="home__image">
        <img src=" C:\Users\grifd\Documents\GitHub\Dalil-Hammachi-Projet-Front\ProjetFrontDalilHammachi\src\img\ObiWanCitation.png" alt="Illustration" />
      </div>
      <div class="home__form">
        <h1 class="title">Bienvenue sur la page d'accueil</h1>
        <h2 class="subtitle">Veuillez vous connecter</h2>
        <Form />
      </div>
    </div>
  </main>
</template>

<style lang="scss">

.home {
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column; // Par défaut, affichage en colonne
    gap: 20px;

    @include large-up() {
      flex-direction: row; // Affichage en ligne pour les grands écrans
    }
  }

  &__form {
    flex: 0.67; // Le formulaire occupe 2/3 de l'espace horizontal
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    @include small-down() {
      padding: rem(20px);
      border-radius: rem(8px);
      z-index: 1; // S'assure que le formulaire reste au-dessus de l'image de fond
    }
  }

  &__image {
    flex: 0.33; // L'image occupe 1/3 de l'espace horizontal
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // L'image s'étend sur toute la hauteur visible
    margin: 0; // Supprime les marges inutiles

    img {
      width: 100%; // L'image occupe toute la largeur du conteneur
      height: 100%; // L'image occupe toute la hauteur visible
      object-fit: cover; // Ajuste l'image au conteneur sans déformation
    }

    @include large-down() {
      display: none; // Masque l'image en mode mobile
    }
  }

  @include large-down() {
    background: url('C:/Users/grifd/Documents/GitHub/Dalil-Hammachi-Projet-Front/ProjetFrontDalilHammachi/src/img/Obi.png')
      no-repeat center center;
    background-size: cover; // S'assure que l'image occupe tout l'arrière-plan
    min-height: 100vh; // Le conteneur prend toute la hauteur de l'écran
    color: $white;
    h1,{
      color: $primaryColorMobile;
    }
  }
}

.title {
  text-align: center;
  color: $primaryColor;
}

.subtitle {
  text-align: center;
}

</style>
