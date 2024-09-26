<script setup>
import { ProductStore } from '@/stores/product';
const cartStore = ProductStore();
const tips = [
  '1000',
  '2000',
  '5000',
  '10000',
  '20000',
  '50000',
];
</script>
<template>
  <div class="px-4 pb-8 pt-4 bg-slate-100">
      <h3 class="font-semibold text-lg">Berkah buat Penjual</h3>
      <div class="text-sm mb-3">Boleeh kasi tip biar tambah semangat jualan</div>
      <div class="flex flex-wrap gap-2 mb-6"  data-aos="fade-up" data-aos-delay="100">
          <div class="border border-green-800/30 px-5 py-3 rounded-3xl text-sm lg:text-lg" v-for="tip in tips" @click="cartStore.setTipValue(tip)" :key="tip" 
          :class="{'bg-primary-400 text-white' : cartStore.tip == tip, 'bg-white' : cartStore.tip != tip}">
            {{ cartStore.toCurrencyFormat(tip) }}
          </div>
      </div>
  </div>
</template>