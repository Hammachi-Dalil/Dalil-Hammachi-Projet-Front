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

console.log(post);

if (!post.value) {
    throw createError({statusCode: 404, statusMessage: 'le post est introuvable'});
}



</script>

<template>
  <main>
    <div v-if="post">
        Nom du slug : {{ route.params.slug }}
        <h1>{{ post.title }}</h1>

    
          <SanityContent :blocks="post.body" />
          <SanityImage v-if="post.image" :asset-id="post.image.asset._ref" alt="l'image"/>
          

        <div v-if="post.categories && post.categories.length > 0" class="categories">
          <h2>Catégories associées :</h2>
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