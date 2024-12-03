<script setup lang="ts">
import type {NuxtError} from '#app';

defineProps({
    error: {
        type: Object as () => NuxtError,
        default: null
    }
})

const handleError = () => {
    clearError({redirect: '/'});
}
</script>

<template>  
    <main>
        <div v-if="error">
            <H1>Template d'erreur personnalisé</H1>
            <h2>Erreur {{ error.statusCode }}</h2>
            <br>
            <p>{{ error.message }}</p>
            <br>
            <Button @click="handleError">Retour à l'accueil</Button>
        </div>
        
    </main>
</template>

<style>
</style>