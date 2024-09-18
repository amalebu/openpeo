<script setup>
import { onMounted } from 'vue';
import { ProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';


const productList = ProductStore(); 
const { getCountinCartPerItem } = storeToRefs(productList)
onMounted(()=>{
    productList.fetchProductList();
    productList.getCartItem();
});

const addToCart = (id) => {
  productList.addToCart(id);
};

</script>
<template>
    <div class="flex flex-wrap my-4 pb-24 gap-2 divide-y-8 divide-gray-200">
      <div class="px-5 py-4 w-full" v-for="item in productList.products" :key="item.id">
        <div class="font-bold mt-2 text-xl">
          {{ item.category }}
        </div>
        <div class="flex flex-wrap divide-y divide-slate-200 divide-dashed md:gap-6">
          <div class="h-full flex items-start justify-center text-left relative gap-4 py-4" v-for="product in item.lists" :key="product.id">
            <div class="flex-grow pt-2 flex-1 w-full">
                <div class="flex flex-wrap item-center gap-2 w-full mb-2">
                    <p class="bg-slate-200 text-slate-800 px-2 py-1 rounded-xl text-xs text-nowrap" v-for="tag in product.tags" :key="tag">
                        {{ tag }}
                    </p>
                  </div>
              <h2 class="title-font font-semibold text-lg text-slate-900 leading-none mb-2">{{ product.title }}</h2>
              <p class="mb-4 text-slate-600 text-sm">{{product.description.substring(0,72)}}</p>
              <div class="flex flex-grow items-center gap-4">
                <div class="font-semibold text-base " :class="{'text-green-700': product.discountPercentage > 0}">Rp. {{productList.toCurrencyFormat(product.price)}}</div>
                <div class="text-sm line-through text-gray-500/50" v-if="product.discountPercentage > 0">Rp. {{productList.toCurrencyFormat(product.basePrice)}}</div>
              </div>
            </div>
            <div class="max-w-[20svw] min-w-[115px] relative">
              <p class="absolute top-1 right-1 bg-red-500 text-slate-100 px-3 py-1 text-sm text-nowrap rounded-lg" v-if="product.discountPercentage > 0">
                - {{ product.discountPercentage }}%
              </p>
              <div class="rounded-lg aspect-square h-auto bg-gray-300 w-full">
                <img alt="team" class="w-full h-full object-cover object-center" :src="product.thumbnail">
              </div>
              <div class="relative w-full px-1 -mt-4">
                  <button class="flex items-center justify-center w-full text-green-800 border-green-800/30 bg-white border py-3 px-3 focus:outline-none shadow-sm hover:border-green-800 rounded-full gap-2" @click="addToCart(product.id)" v-if="getCountinCartPerItem(product.id) < 1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg> 
                    <div class="font-semibold mt-0.5">Pesan</div>
                  </button>
                  <div class="flex items-center gap-2 w-full bg-white border border-green-800/30 rounded-full justify-between p-2 shadow-sm" v-else>
                    <button class="text-slate-800 border border-green-800/30 bg-white text-lg focus:outline-none hover:bg-red-800 hover:text-slate-50 rounded-full p-1" @click="productList.removeFromCart(product.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                    </button>
                    <div class="font-semibold leading-none">{{getCountinCartPerItem(product.id)}}</div>
                    <button class="text-slate-800 border border-green-800/30 bg-white text-lg focus:outline-none hover:bg-green-800 hover:text-slate-50 rounded-full p-1" @click="productList.addToCart(product.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>
</template>
