<script setup lang="ts">
// Définir les props avec le type attendu
const props = defineProps({
  id: {
    type: Number,
    required: true,
  }
});

// Définir les événements émis
const emit = defineEmits(['habit:delete']);

// Gestionnaire de message de retour
const feedbackMessage = ref('');

// Fonction pour supprimer une habitude
async function deleteHabit() {
  try {
    // Appeler l'API pour supprimer l'habitude
    const response = await fetch(`http://localhost:4000/habits/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    });

    // Gérer les erreurs HTTP
    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }

    // Réponse API
    const deletedHabit = await response.json();
    feedbackMessage.value = `Habitude supprimée`;

    // Émettre l'événement avec l'habitude supprimée
    emit('habit:delete', deletedHabit);

  } catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}







</script>

<template>
  <div class="card-habit">
   <slot/>
    <div class="card-habit__buttons">
    <Button variant="white" @click="deleteHabit">Supprimer</Button>
    </div>
  </div>

</template>

<style lang="scss">
.card-habit {
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
