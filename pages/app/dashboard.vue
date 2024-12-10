<script setup lang="ts">
const response = await fetch(`http://localhost:4000/dashboard`, {
    method: 'GET',
    // on envoie la valeur du token dans le cookie de à la requête pour s'authentifier auprès de l'API express
    headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
    }
});

console.log('response : ', response);

const data = await response.json();


</script>

<template>
    <main>
    <h1>Dashboard</h1>
    <pre>
        {{ data }}
    </pre>

    <h2>Habitudes Globales</h2>
    <ul>
        <li v-for="(habit, index) in data.globalHabits" :key="index">{{ habit.title }} : {{ habit.description }}</li>
    
    </ul>

    <h2>Habitudes Personnelle</h2>
    <ul>
        <li v-for="(habit, index) in data.personalHabits" :key="index">{{ habit.title }} : {{ habit.description }}</li>
    
    </ul>

    <div><AddHabitForm /></div>
   
</main>
</template>


<style lang="scss">
</style>