<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
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


    
    </div>
  </main>
</template>