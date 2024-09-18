<script setup>
import { ProductStore } from '@/stores/product';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Empty from '@/components/Empty.vue';
import Summary from '@/components/Summary.vue';

const cartStore = ProductStore(); 
const { getCountinCartPerItem } = storeToRefs(cartStore);
onMounted(() => {
    cartStore.getCartItem();
});

</script>

<template>
  <div>
    <nav class="sticky inset-0 z-50 bg-white mx-auto h-16 gap-6 w-full dark:bg-gray-900 dark:text-gray-100 transition-all duration-200 shadow-sm shadow-slate-500/30">
        <div class="w-full text-left px-4 py-4 flex items-center gap-4">
          <router-link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
          </router-link>
            <div class="font-bold text-xl tracking-normal mt-0.5">Kios Terbaik</div>
        </div>
    </nav>

    <div class="mb-12 pb-6" v-if="cartStore.getCountinCart > 0">
      <div class="bg-gray-100 px-4 text-gray-500 py-3 flex items-center gap-3"v-if="cartStore.getCountinCart > 0">

              <div>

                      <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="currentColor"class="size-5"><path d="M16 1C16.5523 1 17 1.44772 17 2V3H22V9H19.981L22.7271 16.5448C22.9033 16.9958 23 17.4866 23 18C23 30.2091 21.2091 22 19 22C17.1362 22 15.5701 20.7252 15.126 19H10.874C10.4299 20.7252 8.86384 22 7 22C5.05551 22 3.43508 20.6125 2.07474 18.7736C2.43596 18.4396 2 17.7707 2 17V7C2 6.44772 2.44772 6 3 6H10C10.5523 6 11 6.44772 11 7V12C11 12.5523 11.4477 13 12 13H14C14.5523 13 15 12.5523 15 12V3H12V1H16ZM19 16C17.8954 16 17 16.8954 17 18C17 19.1046 17.8954 20 19 20C20.1046 20 21 19.1046 21 18C21 17.7597 20.9576 17.5292 20.8799 17.3158L20.8635 17.2724C20.5725 16.5276 19.8479 16 19 16ZM7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16ZM9 8H4V10H9V8ZM20 5H17V7H20V5Z"></path></svg>

                            </div>

                                  Diantar ke Wisma Indocement</div>
        <div>
          <div class="flex flex-wrap divide-y divide-slate-200 divide-dashed md:gap-6">
              <div class="px-4 py-4 w-full" v-for="product in cartStore.cart" :key="product.id">
                  <div class="flex items-start justify-center text-left relative gap-4 mb-2">
                    <div class="max-w-[15svw]">
                        <img alt="team" class="flex-shrink-0 rounded-lg w-full object-cover object-center aspect-square h-auto bg-gray-300" :src="product.thumbnail">
                    </div>
                      <div class="flex-grow">
                          <h2 class="title-font font-semibold text-lg text-slate-900 leading-none mb-2">{{ product.title }}</h2>
                          <div class="">Rp. {{ cartStore.toCurrencyFormat(product.price) }}</div>
                      </div>
                  </div>
                  <div class="w-full flex items-center">
                      <div class="h-full py-2 flex items-center gap-2 text-gray-500 flex-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path d="M4 1V4H1V6H4V9H6V6H9V4H6V1H4ZM11 5C11 8.31371 8.31371 11 5 11C4.29873 11 3.62556 10.8797 3 10.6586V20.0066C3 20.5551 3.44694 21 3.99826 21H14V15C14 14.45 14.45 14 15 14H21V3.9985C21 3.44749 20.5552 3 20.0066 3H10.6586C10.8797 3.62556 11 4.29873 11 5ZM21 16L16 20.997V16H21Z"></path></svg>
                          Notes
                      </div>
                      <div class="relative w-36">
                        <div class="flex items-center w-full gap-2 bg-white rounded-full justify-between py-1.5 pl-1.5">
                          <button class="text-slate-800 border border-green-800/30 bg-white text-lg focus:outline-none hover:bg-red-800 hover:text-slate-50 rounded-full p-1" @click="cartStore.removeFromCart(product.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                          </button>
                          <div class="font-semibold leading-none">{{getCountinCartPerItem(product.id)}}</div>
                          <button class="text-slate-800 border border-green-800/30 bg-white text-lg focus:outline-none hover:bg-green-800 hover:text-slate-50 rounded-full p-1" @click="cartStore.addToCart(product.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                          </button>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="px-4 border-2 py-4 mt-2">
              <div class="flex items-center justify-between gap-10">
                  <div class="flex-1">
                      <div class="font-semibold">Mau nambah lagi?</div>
                      <div class="text-sm">Boleeh nambah kok</div>
                  </div>
                  <router-link :to="{name:'home'}">
                    <button class="flex items-center justify-center w-full text-green-800 border-green-800/30 bg-white border py-3 px-4 focus:outline-none shadow-sm hover:bg-green-800 hover:text-slate-50 rounded-full gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg> 
                      <div class="font-semibold mt-0.5">Tambah</div>
                    </button>
                  </router-link>
              </div>
          </div>
        </div>
    <Summary></Summary>  
      <div class="fixed bottom-0 left-0 w-full bg-white p-3">
        <router-link to="/cart">
          <div class="w-full border bg-green-700 flex py-4 px-6 rounded-full items-center justify-center gap-2 text-gray-50 text-lg font-semibold mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 -mt-1"><path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6H9ZM7 6H4C3.44772 6 3 6.44772 3 7V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V7C21 6.44772 20.5523 6 20 6H17C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"></path></svg>
            Bungkus
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <Empty></Empty>
    </div>
  </div>

</template>