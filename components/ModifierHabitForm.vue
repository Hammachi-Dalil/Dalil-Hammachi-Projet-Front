<script setup lang="ts">
import { ref, watch } from 'vue';

// Déclaration des props
const props = defineProps({
  habit: {
    type: Object as () => { id: number; title: string; description: string },
    required: true,
  },
});

// Déclaration des événements émis
const emit = defineEmits(['habit:modified']);

// Champs du formulaire
const updatedHabitTitle = ref('');
const updatedHabitDescription = ref('');

// Initialiser les champs avec les valeurs actuelles de l'habitude
watch(
  () => props.habit,
  (newValue) => {
    if (newValue) {
      updatedHabitTitle.value = newValue.title;
      updatedHabitDescription.value = newValue.description;
    }
  },
  { immediate: true } // Exécuter dès l'initialisation
);

// Fonction pour soumettre les modifications
async function modifyHabit() {
  if (!updatedHabitTitle.value || !updatedHabitDescription.value) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/habits/${props.habit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
      body: JSON.stringify({
        title: updatedHabitTitle.value,
        description: updatedHabitDescription.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Erreur : ${error.message}`);
      console.error('Erreur API :', error);
      return;
    }

    alert('Habitude modifiée avec succès.');
    emit('habit:modified'); // Émet un événement pour informer le parent
  } catch (error) {
    alert("Erreur réseau ou interne.");
    console.error('Erreur réseau ou interne :', error);
  }
}
</script>

<template>
  <form @submit.prevent="modifyHabit">
    <h2>Modifier l'habitude</h2>
    
    <label for="title">Titre de l'habitude :</label>
    <input
      id="title"
      v-model="updatedHabitTitle"
      type="text"
      placeholder="Titre de l'habitude"
    />

    <label for="description">Description :</label>
    <textarea
      id="description"
      v-model="updatedHabitDescription"
      placeholder="Description de l'habitude"
    ></textarea>

    <div class="form-actions">
      <button type="submit">Enregistrer les modifications</button>
    </div>
  </form>
</template>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;

  label {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }

  input,
  textarea {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;

    button {
      padding: 12px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;

      &:hover {
        background-color: #0056b3;
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
}
</style>
