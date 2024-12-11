<script setup lang="ts">

const {data, refresh } = await useAsyncData('dashboard', async () => { 


const response = await fetch(`http://localhost:4000/dashboard`, {
    method: 'GET',
    // on envoie la valeur du token dans le cookie de à la requête pour s'authentifier auprès de l'API express
    headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
    }
});


console.log('response : ', response);

return await response.json();
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
    <main>
    <h1>Dashboard</h1>
    <h2>Habitudes Globales</h2>
    <ul class="parent">
        <li v-for="(habit, index) in data.globalHabits" :key="index"><CardHabit :id="habit.id" @click="onHabitDeleted"><h1>{{ habit.title }} </h1> <p>{{ habit.description }} </p></CardHabit></li>
    
    </ul>

    <h2>Habitudes Personnelle</h2>
    <ul class="parent">
        <li v-for="(habit, index) in data.personalHabits" :key="index"><CardHabit :id="habit.id"  @click="onHabitDeleted"><h1>{{ habit.title }}</h1> <p>{{ habit.description }}</p></CardHabit></li>
    
    </ul>

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

  // Mixin pour les petits écrans (mobile)
  @include large-down {
    grid-template-columns: repeat(1, 1fr);
    gap: rem(16px);

    margin: 3vh 0;
  }
}
</style>