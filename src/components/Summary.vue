<script setup>
import { ProductStore } from '@/stores/product';
const cartStore = ProductStore(); 
</script>
<template>
    <div class="px-4 py-8 shadow border-b-2 bg-white">
        <h2 class="font-semibold mb-2 text-lg">Rincian</h2>
        <div class="border border-primary-600/30 rounded-2xl p-4">
          <div class="flex items-center justify-between">
              <div>Harga</div>
              <div>{{cartStore.getTotalinCart}}</div>
          </div>
          <div class="flex items-center justify-between" v-if="cartStore.tip > 0">
            <div>Tip</div>
            <div>{{cartStore.getTipValue}}</div>
          </div>
          <div class="flex items-center justify-between">
            <div>Biaya Layanan <span class="text-primary-400">*</span></div>
            <div>{{cartStore.getBiayaLayanan}}</div>
          </div>
          <div class="flex items-center justify-between">
            <div>Kode Unik</div>
            <div>{{cartStore.uniqueCode}}</div>
          </div>
          <hr class="mt-4 mb-2">
          <p class="text-primary-400 text-xs">*Biaya layanan 2% dari harga dengan minimal disesuaikan.</p>
          <hr class="mb-4 mt-2">
          <div class="flex items-center justify-between font-semibold text-lg">
            <div>Total</div>
            <div>{{cartStore.getTotalBelanja}}</div>
          </div>
        </div>
      </div>
</template>