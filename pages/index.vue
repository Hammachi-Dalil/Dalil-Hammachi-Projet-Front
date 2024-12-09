<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";


const { data: homepage } = await useSanityQuery<SanityDocument>(groq`
  *[_type == "homepage" ][0]`
);

console.log(homepage);
const {urlFor} = useSanityImage();
</script>

<template>
  <main class="homepage">
    {{ homepage }}
    <div class="homepage__hero">
      <div
        v-if="homepage?.image"
        class="homepage__hero-background"        
        :style="{ backgroundImage: `url(${urlFor(homepage?.image)?.url()})` }"
      >
        <h1 class="homepage__hero-title">{{ homepage?.title }}</h1>
      </div>
    </div>

    <div class="homepage__content">
      <p>{{ homepage?.hero.title }}</p>
      <p>{{ homepage?.hero.text }}</p>
    </div>

    <div class="homepage__stats">
      <ul class="homepage__stats-list">
        <li
          v-for="stat in homepage?.hero.stats"
          :key="stat._key"
          class="homepage__stats-item"         
        >
          <p class="homepage__stats-value">{{ stat.value }}</p>
          <p class="homepage__stats-text">{{ stat.text }}</p>
        </li>
      </ul>
    </div>

    <div class="homepage__fonctionnalitees">
      <h1>{{ homepage?.fonctionnalitees.title }}</h1>
      <p>{{ homepage?.fonctionnalitees.text }}</p>
    </div>


    <div class="homepage__cards">
      <div v-for="card in homepage?.fonctionnalitees.fonctionnalite" :key="card._key">
        <CardFonctionnality :title="card.title" :text="card.text" :variant="card.variant"/>
      </div>
    </div>
    
  </main>
</template>


<style lang="scss">
.homepage {
  &__hero {
    position: relative;
    text-align: center;
    color: white;

    &-background {
      position: relative;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 400px; // Ajustez la hauteur selon vos besoins
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-title {
      font-size: rem(96px);
      font-weight: bold;
      color: $primaryColorClaire;
    }
  }

  &__cards {
        display: flex;
        justify-content: center;
      }

  &__content {
    margin: rem(20px) auto;
    padding: 0 rem(15px);
    max-width: rem(800px);

    p {
      margin: 10px 0;
      font-size: 1.2rem;
    }
  }

  &__stats {
    margin: rem(20px) auto;
    max-width: rem(800px);
    display: flex;
    justify-content: center;

    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: rem(20px);
      list-style: none;
      padding: 0;
      width: fit-content;
    }

    &-item {
      flex: 1 1 calc(33.333% - 20px); // Trois colonnes avec un gap de 20px
      background: $white100;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;

      &:hover {
        transform: translateY(-5px);
        transition: transform 0.3s;
        background: $primaryColorClaire;
        cursor: none;
      }
      

      &-value {
        font-size: 2rem;
        font-weight: bold;
        color: $titleColor;
      }

      &-text {
        font-size: 1rem;
        color: #666;
      }

      
    }
  }

  &__fonctionnalitees h1 {
    text-align: center;
    font-weight: bold;    
  }

  &__fonctionnalitees p {
    text-align: center;
    font-size: rem(16px);
    margin: 4vh 0;
  }

}
</style>  
