<script setup lang="ts">

const email = ref<string>("");
const password = ref<string>("");

const onSubmit = (): void => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
};

defineProps({
  titre: {type: String,
          default: "Connexion"} 
})


</script>


<template>
  <div class="login-form">
    <h2 class="login-form__title">{{ titre }}</h2>
    <form class="login-form__form" @submit.prevent="onSubmit">
      <div class="login-form__group">
        <label for="email" class="login-form__label">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="login-form__input"
          placeholder="Entrez votre email"
          required
        >
      </div>

      <div class="login-form__group">
        <label for="password" class="login-form__label">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="login-form__input"
          placeholder="Entrez votre mot de passe"
          required
        >
      </div>

      <!-- Bouton pour valider -->
      <Button class="login-form__button" type="submit">{{ titre }}</Button>
    </form>
  </div>
</template>

<style lang="scss" >
/* Bloc principal */
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: $white100;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);


  &__title {
    text-align: center;
    margin-bottom: 20px;
    color: $titleColor;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__label {
    font-weight: bold;
    color: #555;
  }

  &__input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: $primaryColor;
      box-shadow: 0 0 5px $primaryColor;
    }
  }

  &__button {
    margin-top: 10px;
  }

  @include small-down() {
    margin: 2vh;
  }

  @include large-up() {
   width: 80%;
  }


}
</style>
