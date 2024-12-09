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
        <div v-for="stat in homepage?.hero.stats" :key="stat._key" class="homepage__stats-item">      
          <CardHeroStat :value="stat.value" :text="stat.text" />
        </div>   
        
   
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

main {
  margin-bottom: 4vh;
}
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


  &__stats {
    margin: 2vh;
    display: flex;
    justify-content: center;
    gap: rem(20px);

      &-item {
        border-radius: rem(8px);
        &:hover {
        transform: translateY(-5px);
        transition: transform 0.3s;
        background: $primaryColorClaire;
        cursor: none;
      }
      }

      h2 {
        font-weight: bold;
        text-align: center;
        margin: 0;
      }

      p {
        text-align: center;
        margin: 0;
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

@include small-down() {
  .homepage {
    &__hero {
      &-background {
        height: rem(200px);
      }

      &-title {
        font-size: rem(48px);
      }
    }

  

    &__cards {
      flex-direction: column;
      align-items: center;
    }
  }
  
}
</style>  
