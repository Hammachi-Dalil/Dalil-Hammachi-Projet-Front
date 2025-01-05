<script setup lang="ts">
import type { DashboardPayload, PersonalHabit } from '~/@types/dashboard';

const habitToEdit = ref<Habit|null>(null);
interface Habit {
    id: number;
    title: string;
    description: string;
}

const {data, refresh } = await useAsyncData<DashboardPayload>('dashboard', async () => { 


    return await useTrackingApi('/dashboard', {method: 'GET'});
});

function onHabitCreated() {
    console.log('une nouvelle habitude a été créée');
    refresh();
}

function onHabitDeleted() {
    console.log('une habitude a été supprimée');
    refresh();
}


// function onHabitEdit(habitId) {
//   selectedHabit.value = data.personalHabits.find(habit => habit.id === habitId);
// }

const toggleEditHabit = (habit: Habit) => {
    if  (habitToEdit.value?.id === habit.id) {
        habitToEdit.value = null;
    } else {
        habitToEdit.value = habit;
    }
};

function onHabitModified() {
  console.log('une habitude a été modifiée');
  refresh();
  selectedHabit.value = null; // Réinitialiser après modification
}
const selectedHabit = ref<PersonalHabit|null>(null); // Habitude actuellement sélectionnée pour modification

</script>

<template>
    <main v-if="data">
      <h1>Dashboard</h1>
  
      <h2>Habitudes Globales</h2>
      <div class="parent">
        <div v-for="(habit, index) in data.globalHabits" :key="index">
          <CardHabit :id="habit.id" @habit:delete="onHabitDeleted" @habit:edit="onHabitEdit">
            <h1>{{ habit.title }}</h1>
            <p>{{ habit.description }}</p>
          </CardHabit>
        </div>
      </div>
  
      <h2>Habitudes Personnelles</h2>
      <div class="parent">
        <div v-for="(habit, index) in data.personalHabits" :key="index">
          <CardHabit :id="habit.id" @habit:delete="onHabitDeleted" @habit:edit="onHabitEdit">
            <h1>{{ habit.title }}</h1>
            <p>{{ habit.description }}</p>
          </CardHabit>
        </div>
      </div>
  
      <div>
        <AddHabitForm @habit:created="onHabitCreated" />
      </div>
  
      <!-- Affichage du formulaire de modification si une habitude est sélectionnée -->
      <div v-if="selectedHabit">
        <ModifierHabitForm :habit="selectedHabit" @habit:modified="toggleEditHabit" />
      </div>

      <ModifierHabitForm v-if="habitToEdit" :habit="habitToEdit" @habit:modified="toggleEditHabit" />

    </main>
  </template>
  


<style lang="scss">
.parent {
  display: grid;
  gap: rem(16px);  // Espace entre les éléments du grid
  grid-template-columns: repeat(3, 1fr); // Par défaut, 3 colonnes (PC)
  list-style: none;
  padding: none;

  // Mixin pour les petits écrans (mobile)
  @include large-down {
    grid-template-columns: repeat(1, 1fr);
    gap: rem(16px);

    margin: 3vh 0;
  }
}
</style>