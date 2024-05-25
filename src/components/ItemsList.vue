<script setup>
import Item from "./Item.vue";

defineProps({
    pageName: String,
})

const onClickAdd = () => {
    alert("Add to cart")
}

const onClickFavorite = () => {
    alert("Add to favorite")
}
</script>

<template>
    <div class="p-10">
        <h2 class="text-3xl font-bold mb-8">{{ pageName }}</h2>

        <div class="grid grid-cols-4 gap-4 mt-10">
            <Item
                image-url="https://ndc.book24.ru/resize/820x1180/iblock/6d5/6d5d5281181e725f255663ca536ca776/3ed6c0ab0a45f396033427ecca107bec.jpg"
                name="Закладка «Звёздная ночь»" price="25" :is-added="true" :is-favorite="true" :onClickAdd="onClickAdd"
                :onClickFavorite="onClickFavorite" />
        </div>
    </div>
</template>