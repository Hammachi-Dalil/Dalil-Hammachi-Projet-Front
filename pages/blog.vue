<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

definePageMeta({
    layout: 'minimal'
})
</script>

<template>
    <main>
        <div>
            <h1>Blog</h1>
            <p>{{ posts }}</p>
        </div>
    </main>
    
</template> 

<style lang = "scss">
</style>