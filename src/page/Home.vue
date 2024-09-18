<script setup>
import ProductList from '@/components/ProductList.vue';
import Header from '@/components/Header.vue';
import BottomCart from '@/components/BottomCart.vue';

</script>
<template>
    <div class="flex items-center justify-center">
      <div class="fixed inset-0 h-[calc(50svh)] w-full -z-50">
        <img src="https://assets.promediateknologi.id/crop/36x715:681x1116/750x500/webp/photo/2022/12/15/3210744714.jpg" alt="" class="w-full h-full object-cover rotate-180">
      </div>
      <div class="mt-[17.5svh] max-w-screen-2xl">
        <Header></Header>
        <div class="z-50 bg-white pb-4 rounded-t-2xl">
          <ProductList></ProductList>
        </div>
      </div>
      <BottomCart></BottomCart>
    </div>
</template>