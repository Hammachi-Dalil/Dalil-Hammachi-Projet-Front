<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    image,
    "categories": categories[]->{
      title,
      slug,
      image
    }
  }`;
const route = useRoute();


const {data: post} = await useSanityQuery<SanityDocument>(POST_QUERY, {slug: route.params.slug});

if (!post.value) {
    throw createError({statusCode: 404, statusMessage: 'le post est introuvable'});
}




console.log(post);

const {urlFor} = useSanityImage();

  useSeoMeta({
    title: `${post.value.title} | Tracker`,
    description: 'Vous retrouverez ici tous les articles de notre blog qui concernent les nouveautés de notre application',
    ogImage: post.value.image && urlFor(post.value.image) ? urlFor(post.value.image)?.url() : '/img/Meta-default.jpg'

});


</script>

<template>
  <main>
    <div v-if="post" class="post">
        <h1 class="post__title">{{ post.title }}</h1>

          <p class="post__content">
          <SanityContent :blocks="post.body" />
          </p>
          <SanityImage v-if="post.image" :asset-id="post.image.asset._ref" alt="l'image"/>
          

        <div v-if="post.categories && post.categories.length > 0" class="categories">
          <h2 class="categories__title">Catégories associées :</h2>
            <ul>
              <li v-for="category in post.categories" :key="category.slug.current">
                <h3>{{ category.title }}</h3>
                <SanityImage v-if="category.image" :asset-id="category.image.asset._ref" alt="Image de la catégorie" />
              </li>
            </ul>
        </div>
    </div>
  </main>
</template>

<style lang="scss">
  .post {
    &__title {
      font-size: 2rem;
      margin-bottom: 1rem;
      text-align: center; 
      color: $primaryColor;
    }
    &__content {
      margin-left: rem(20px);
    }
  }

  .categories {
    &__title {
      margin-left: rem(8px);
      color: $primaryColor; 
    }
  }
  
</style>