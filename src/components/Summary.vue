<script setup>
import { ProductStore } from '@/stores/product';
const cartStore = ProductStore(); 
</script>
<template>
    <div class="px-4 my-4 pb-8">
        <h2 class="font-semibold mb-2">Ringkasan Pembayaran</h2>
        <div class="border border-green-800/30 rounded-2xl p-4">
          <div class="flex items-center justify-between">
              <div>Harga</div>
              <div>{{cartStore.getTotalinCart}}</div>
          </div>
          <div class="flex items-center justify-between">
            <div>Lain-lain</div>
            <div>{{cartStore.getBiayaLayanan}}</div>
          </div>
          <div class="flex items-center justify-between">
            <div>Biaya Layanan*</div>
            <div>{{cartStore.getBiayaLayanan}}</div>
          </div>
          <p class="text-green-600/50 text-xs">*2% dari harga. Minimal 5k.</p>
          <hr class="my-4">
          <div class="flex items-center justify-between font-semibold text-lg">
            <div>Total</div>
            <div>{{cartStore.getTotalinCart}}</div>
          </div>
        </div>
      </div>
</template>