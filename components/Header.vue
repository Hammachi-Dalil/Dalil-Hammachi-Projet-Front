<script setup lang="ts">

onUnmounted(() => {
  manageBodyScroll(false); // Réactive le scroll si le composant est démonté
});

// Gestion de l'état du menu pour la version mobile
const isMenuOpen = ref(false);

// Fonction pour basculer l'état du menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  manageBodyScroll(isMenuOpen.value);
};

const closeMenu = () => {
  isMenuOpen.value = false;
  manageBodyScroll(false);
}

const manageBodyScroll = (disableScroll: boolean) => {
  if (disableScroll) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};



</script>

<template>
  <div class="header">
    <!-- Bouton hamburger (visible uniquement en mobile) -->
    <button class="header__hamburger" @click="toggleMenu">
      ☰
    </button>

    <!-- Menu (toujours visible en PC, contrôlé par isMenuOpen en mobile) -->
    <div
      class="header__menu"
      :class="{ 'header__menu--mobile': isMenuOpen }"
    >

  <NuxtLink class="header__menu-item" to="/" @click="closeMenu">Accueil</NuxtLink>
      <NuxtLink class="header__menu-item" to="/inscription" @click="closeMenu">Inscription</NuxtLink>
      <NuxtLink class="header__menu-item" to="/MyHabits" @click="closeMenu">Mes Habitudes</NuxtLink> 


    </div>
  </div>
</template>

<style lang="scss">

/* Bloc principal */
.header {
  height: 7vh;
  background: linear-gradient(45deg, $primaryColor, $primaryColorClaire);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: $white;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }

  /* Bouton hamburger, caché par défaut */
  &__hamburger {
    display: none;
    background: none;
    border: none;
    font-size: 2rem;
    color: $white;
    cursor: pointer;
    z-index: 1001;
  }

  /* Menu en version PC */
  &__menu {
    display: flex;
    gap: 20px;

    &-item {
  font-size: 1rem;
  position: relative; // Nécessaire pour positionner le pseudo-élément

  // Ajout du pseudo-élément pour le soulignement
  &::before {
    content: ''; // Nécessaire pour afficher le pseudo-élément
    position: absolute;
    bottom: 0; // Place le soulignement sous le texte
    left: 0; // Commence à gauche
    width: 0; // Initialement, le soulignement est invisible
    height: 2px; // Épaisseur du soulignement
    background-color: currentColor; // Utilise la couleur du texte
    transition: width 0.3s ease; // Animation fluide
  }

  // Animation au survol
  &:hover::before {
    width: 100%; // Étend le soulignement sur toute la largeur
  }
}


    /* Styles spécifiques au menu mobile */
    &--mobile {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: linear-gradient(45deg, $primaryColor, $primaryColorClaire);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      transform: translateY(-100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1000;

      &.header__menu--mobile {
        transform: translateY(0);
      }

      a {
        font-size: 1.5rem;
        text-decoration: none;
        color: $white;
        font-weight: bold;
      }
    }
  }
}


@include large-down() {
  .header {
    height: 10vh;
    flex-direction: row; // Garder les éléments alignés horizontalement

    &__hamburger {
      display: block; // Bouton hamburger visible
      position: absolute; // Permet de positionner le bouton indépendamment
      right: 15px; // Place le bouton à droite avec un espace

    }

    &__menu {
      visibility: hidden; // Le menu est invisible par défaut
      opacity: 0; // Et transparent
      transform: translateX(100%); // Positionné en haut de l'écran hors de vue
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; // Transition fluide

      &--mobile {
        visibility: visible; // Le menu devient visible
        opacity: 1; // Il devient opaque
        transform: translateY(0); // Il apparaît au bon endroit
      }
    }
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh; /* Fixe la hauteur pour empêcher le défilement */
}



</style>
