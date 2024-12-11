<script setup lang="ts">



const {data, refresh } = await useAsyncData('dashboard', async () => { 


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


</script>

<template>
    <main v-if="data">
    <h1>Dashboard</h1>
    <h2>Habitudes Globales</h2>
    <div class="parent">
        <div v-for="(habit, index) in data.globalHabits" :key="index"><CardHabit :id="habit.id" @click="onHabitDeleted"><h1>{{ habit.title }} </h1> <p>{{ habit.description }} </p></CardHabit></div>
    
    </div>

    <h2>Habitudes Personnelle</h2>
    <div class="parent">
        <div v-for="(habit, index) in data.personalHabits" :key="index"><CardHabit :id="habit.id"  @click="onHabitDeleted"><h1>{{ habit.title }}</h1> <p>{{ habit.description }}</p></CardHabit></div>
    
    </div>

    <div>
        <AddHabitForm @habit:created="onHabitCreated"/>
    </div>
   
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