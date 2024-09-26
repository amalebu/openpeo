<script setup>
import ProductList from '@/components/ProductList.vue';
import Header from '@/components/Header.vue';

</script>
<template>
    <div class="flex items-center justify-center">
      <div class="fixed inset-0 h-[calc(50svh)] w-full -z-50">
        <img src="https://awsimages.detik.net.id/community/media/visual/2018/12/08/525a5f7b-41ba-4013-9692-cc57f0319fcd.jpeg?w=600&q=90" alt="" class="w-full h-full object-cover">
      </div>
      <div class="mt-[17.5svh] max-w-screen-2xl">
        <Header></Header>
        <div class="z-50 bg-white pb-4 rounded-t-2xl">
          <ProductList></ProductList>
        </div>
      </div>
    </div>
</template>