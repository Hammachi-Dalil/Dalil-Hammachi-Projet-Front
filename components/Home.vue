<script setup lang="ts">

import Form from './Form.vue';


const props = defineProps<{
    variant?: "inscription" | "connexion";
}>();

function getImage() {
  if (props.variant === 'inscription') {
    return ('/img/lukeCitation.png');
  }

  else if (props.variant === 'connexion') {
    return ('/img/ObiWanCitation.png');
  }

}

function getTitreBouton() {
  if (props.variant === 'inscription') {
    return ('Inscription');
  }

  else if (props.variant === 'connexion') {
    return ('Connexion');
  }

}

function getText()  {
  if (props.variant === 'inscription') {
    return ('Bienvenue sur la page inscription');}

  else if (props.variant === 'connexion') {
    return ('Bienvenue sur la page connexion');
  }
  }

  function getRedirectText()  {
    if (props.variant === 'inscription') {
      return ('Vous avez déjà un compte ? connectez-vous ');}
    else if (props.variant === 'connexion')
      {return ('Vous n\'avez pas de compte ? inscrivez-vous ');
    }
  }

  function getRedirectLink()  {
    if (props.variant === 'inscription') {
      return ('/connexion');}
    else if (props.variant === 'connexion')
      {return ('/inscription');
    }
  }


</script>

<template>
  <main
:class="{'home': true,
                '-connexion': variant === 'connexion',
                '-inscription': variant === 'inscription'}">

    <div class="home__content">
      <div class="home__image">
        <img  :src="getImage()" alt="Illustration" >
      </div>

      <div class="home__form">
        <h1
:class="{'title': true,
                '-connexion': variant === 'connexion',
                '-inscription': variant === 'inscription'}">
          {{ getText() }}
        </h1>
        <Form :titre="getTitreBouton()"/>
        <p
:class="{'redirect': true,
                '-connexion': variant === 'connexion',
                '-inscription': variant === 'inscription'}">{{ getRedirectText() }} <NuxtLink :to="getRedirectLink()" class="home__link">ici</NuxtLink>.
        </p>
      </div>
    </div>
  </main>
</template>

<style lang="scss">

.home {
  display: flex;
  flex-direction: column;

  &.-connexion{
    @include large-down() {
    background: url('@/assets/img/Obi.png')
      no-repeat center center;
    background-size: cover;
    min-height: 100vh;
    color: $white;
    h1{
      color: $primaryColorClaire;
    }
  }
  }

  &.-inscription{
    @include large-down() {
    background: url('@/assets/img/lukeBienvenue.jpg')
      no-repeat center center;
    background-size: cover;
    min-height: 100vh;
    color: $white;
    h1{
      color: $primaryColorClaire;
    }
  }
  }

  &__content {
    display: flex;
    flex-direction: column;

    @include large-up() {
      flex-direction: row;
    }
  }

  &__form {
    flex: 0.67;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: url('@/assets/img/marbre.jpg')
    no-repeat center center;
    background-size: cover;


    @include small-down() {
      padding: rem(20px);
      border-radius: rem(8px);
      z-index: 1;
    }
  }

  &__image {
    flex: 0.33;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;


    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include large-down() {
      display: none;
    }
  }

  @include large-down() {
    background: url('@/assets/img/connexion.png')
      no-repeat center center;
    background-size: cover;
    min-height: 100vh;
    color: $white;
    h1{
      color: $primaryColorClaire;
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

.redirect {
  color: $gray800;
  background-color: $white100;
  padding: 2vh 4vh;
  border-radius: rem(8px);
  font-size: small;
}

</style>
