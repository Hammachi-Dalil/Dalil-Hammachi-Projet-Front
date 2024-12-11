<script setup lang="ts">
const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGloable = ref(false);
const feedbackMessage = ref('');


const emit = defineEmits(['habit:created']);
async function addHabit() {
  try {
    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: habitTitle.value,
        description: habitDescription.value,
        is_global: habitIsGloable.value

      })
    });

    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message};`
      console.error('Erreur:', error);
      return;
    }

    

    const data = await response.json();
    feedbackMessage.value = `Habitude ajoutée : ${data.title};`
    console.log('Succès:', data);

    // Réinitialiser les champs du formulaire
    habitTitle.value = '';
    habitDescription.value = '';

    emit ('habit:created');
    } 
    catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
}
}



</script>

<template>
    <div class="add-habit-form">
        <h2 class="add-habit-form__title">Ajouter une Habitude</h2>
        <form @submit.prevent="addHabit">
            <div class="add-habit-form__group">
                <label for="title">Titre </label>
                <input id="title" v-model="habitTitle" class="add-habit-form__input" type="text" placeholder="Entrez le titre">
            </div>
            <div class="add-habit-form__group">
                <label for="description">Description </label>
                <input id="description" v-model="habitDescription" class="add-habit-form__input" type="text"  placeholder="Entrez la description">
            </div>
            <Button >Ajouter</Button>
        </form>
    </div>
</template>

<style lang="scss">
.add-habit-form {
    margin: 3vh 0;
    padding: 1rem;
    background-color: $primaryColorClaire;
    border-radius: 5px;

    &__title {
        font-size: rem(36px);
        
    }

    &__group {
        margin: 1rem 0;
    }

    &__input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        
    }

    &__input:focus {
    border-color: $primaryColorClaire; // Utilisez border-color pour cibler uniquement la bordure
    outline: none; // Facultatif, pour supprimer le contour par défaut
}

}
</style>