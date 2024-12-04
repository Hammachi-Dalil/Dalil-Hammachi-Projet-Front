<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const filter = ref('');




function onCategoryClick(categorIES: SanityDocument) {
    filter.value = categorIES.slug.current
    console.log(filter.value)
}


const page = ref<number>(1);
const perPage= 2;

const start = computed(() => (page.value - 1) * perPage);
const end = computed(() => page.value * perPage);


function onPageClick (index: number) {
    page.value = index;
}

const nbMaxPages = computed(() => {
    if (!AllPosts.value) return 1;
    return Math.ceil(AllPosts.value / perPage);
})

const { data: posts } = await useSanityQuery<SanityDocument[]>( groq`*[
  _type == "post"
  && defined(slug.current)
  && ($filter == '' || $filter in (categories[]->slug.current))
]|order(publishedAt desc)[0...12][$start...$end]{_id, title, image, "categories": categories[]->{_id,title, slug}, publishedAt, slug}`, {filter, start: start, end: end});

const { data: AllPosts } = await useSanityQuery<number>( groq`count(*[
  _type == "post"
  && defined(slug.current)
  && ($filter == '' || $filter in (categories[]->slug.current))
])`, {filter});

const { data: category } = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "category"
  && defined(slug.current)
]{ title, image, slug}`);








const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

definePageMeta({
    layout: 'minimal'
})
</script>

<template>
    <main>
        <div>
            <h1 class="title">Blog</h1>
                <p class="subtitle">Retrouvez ici les derniers articles de notre blog</p>

                    filter : {{ filter }}

                    <div class="category">
                        <div v-for="(categorIES, index) in  category" :key="index"  @click="onCategoryClick(categorIES)" >
                                <button :class="['category__button', {'is-active': filter == categorIES.slug.current}]"> {{  categorIES.title }}</button>
                        </div>
                    </div>

                <ul class="blog">
                    <li v-for="post in posts" :key="post._id">
                        <div class="blog__card">
                            <NuxtLink class="blog__card__title" :to="`/blog/${post.slug.current}`">
                                <h1>{{ post.title }}</h1>
                                <div v-for="(categories, index) in post.categories" :key="index">
                                    <p class="blog__card__categories">{{ categories.title }}</p>
                                </div>
                                <img v-if="post.image" :src="urlFor(post.image)?.url()" alt="" >
                            </NuxtLink>    
                        </div>         
                    </li>
                </ul>


                on affiche la page {{ page }}
                <div>
                    <div v-for="n in nbMaxPages" :key="n" class="blog__pagination" @click="onPageClick(n)"> page {{ n }} </div> 
                </div>
        </div>
    </main>
    
</template> 

<style lang = "scss">
.blog {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    &__card {
        background: linear-gradient(45deg, $primaryColor, $primaryColorClaire);
        border-radius: rem(8px);
        margin: 2vh 2vh;
        color: $white;
        padding: 2vh 4vh;
        text-align: center;

        &:hover {
        transform: scale(1.05);
        transition: ease-in 0.2s;
        cursor: pointer;
        box-shadow: 0 0 rem(10px) rgba(0, 0, 0, 0.5);
    }

        &__title {
            color: $white;
            text-decoration: none;
            font-size: rem(12px);
            
        }

        &__categories {
            color: $white;
            font-size: rem(12px);
            text-decoration: none;
            background: $white;
            color: $primaryColor;
            border-radius: rem(8px);
            width: fit-content;
            padding: 1vh 2vh;    
            &:hover {
                transform: translate(0, -5px);
                transition: ease-in 0.2s;
                cursor: pointer;
            }
        }
        
    }

    &__pagination {
        border: 1px solid $primaryColor;
        border-radius: rem(8px);
        padding: 1vh 2vh;
        margin: 1vh 1vh;
        width: fit-content;
        &:hover {
            transform: translate(0, -5px);
            transition: ease-in 0.2s;
            cursor: pointer;
        }
    }
   

ul, li{
    list-style-type: none;
    padding: 0;
}
}

.category {
  
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2vh 0;    
    &__button {
        border: none;
        border-radius: rem(8px);
        padding: 1vh 2vh;
        margin: 0 1vh;
        &:hover {
            transform: translate(0, -5px);
            transition: ease-in 0.2s;
            cursor: pointer;
        }
        &.is-active {
            background: $primaryColor;
            color: $white;
        }


    }

    .title {
        text-align: center;
        font-size: rem(48px);
        color: $primaryColor;
    }

    .subtitle {
        text-align: center;
        font-size: rem(16px);
        color: $primaryColor;
    }
}
</style>