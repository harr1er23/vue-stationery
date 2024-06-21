<script setup>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

const bannersPhoto = [
  'https://mekka.spb.ru/upload/resize_cache/iblock/7e5/hd0j7yzjcfuvlolpwyea24zdhnrt141h/867_385_1/image_04_12_23_04_10.jpeg',
  'https://mekka.spb.ru/upload/resize_cache/iblock/37d/ktacjdtqvmddldk1hx8275qto77m9s9i/867_385_1/Tvorchestvo-_kraski_.JPG',
  'https://mekka.spb.ru/upload/resize_cache/iblock/d47/867_385_1/Raskraska_antistress.jpg'
]

defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination
  }
})
</script>

<template>
  <Carousel :autoplay="6000" :wrap-around="true">
    <Slide v-for="bannerPhoto in bannersPhoto" :key="bannerPhoto">
      <img class="rounded-3xl" :src="bannerPhoto" alt="Banner" />
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel__slide {
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
