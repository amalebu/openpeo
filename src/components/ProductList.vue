<script setup>
import { onMounted, ref } from 'vue';
import { ProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import FloatingBottom from './FloatingBottom.vue';
import BottomModal from './BottomModal.vue';

const productList = ProductStore(); 
const productSelected = ref(null);
const { getCountinCartPerItem } = storeToRefs(productList)
onMounted(()=>{
    productList.fetchProductList();
    productList.getCartItem();
});

const addToCart = (id) => {
  productList.addToCart(id);
};
const showProductDetail = (product) =>{
  productSelected.value = product;
  if(productList.getCountinCartPerItem(product.id) < 1){
    addToCart(product.id);
  }
}

</script>
<template>
    <div class="flex flex-wrap my-4 pb-24 gap-2 divide-y-8 divide-slate-200">
      <div class="px-5 py-4 w-full" v-for="item in productList.products" :key="item.id">
        <div class="font-bold my-2 text-xl pl-2 pb-1">
          {{ item.category }}
        </div>
        <hr/>
        <div class="flex flex-wrap divide-y divide-slate-200 divide-dashed md:gap-6">
          <div class="h-full flex items-start justify-center text-left relative gap-4 py-4" v-for="product in item.lists" :key="product.id" >
            <div class="flex-grow pt-2 flex-1 w-full" @click="showProductDetail(product)">
                <div class="flex flex-wrap item-center gap-2 w-full mb-2">
                    <p class="bg-slate-200 text-slate-800 px-2 py-1.5 rounded-xl text-xs text-nowrap" v-for="tag in product.tags" :key="tag">
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
              <p class="absolute top-4 -right-1 bg-red-600 font-semibold text-white pl-3 pr-2 py-1 text-nowrap rounded-l-3xl" v-if="product.discountPercentage > 0">
                - {{ product.discountPercentage }}%
              </p>
              <div class="rounded-3xl overflow-hidden aspect-square h-auto bg-slate-300 w-full" @click="showProductDetail(product)">
                <img alt="team" class="w-full h-full object-cover object-center" :src="product.thumbnail">
              </div>
              <div class="relative w-full px-1 -mt-4 select-none">
                  <button class="flex items-center justify-center w-full text-primary border-primary-500/30 bg-white border py-3 px-3 focus:outline-none shadow-sm hover:bg-primary-400 hover:text-gray-100 rounded-3xl gap-2 transition-all duration-150 ease-in-out" @click="addToCart(product.id)" v-if="getCountinCartPerItem(product.id) < 1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg> 
                    <div class="font-semibold mt-0.5">Pesan</div>
                  </button>
                  <div class="flex items-center gap-2 w-full bg-white border border-primary-500/30 rounded-3xl justify-between py-2 px-1.5 shadow-sm transition-all duration-150 ease-in-out" v-else>
                    <button class="text-slate-800 border border-primary-500/30 bg-white text-lg focus:outline-none hover:bg-red-600 hover:text-slate-50 rounded-3xl p-1" @click="productList.removeFromCart(product.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                    </button>
                    <div class="font-semibold leading-none">{{getCountinCartPerItem(product.id)}}</div>
                    <button class="text-slate-800 border border-primary-500/30 bg-white text-lg focus:outline-none hover:bg-green-600 hover:text-slate-50 rounded-3xl p-1" @click="productList.addToCart(product.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>
    <BottomModal :show="productSelected != null" @close="productSelected = null">
      <div v-if="productSelected" class="min-h-[60svh]">
        <div class="h-full border-opacity-60 rounded-lg overflow-hidden relative">
          <img class="aspect-[4/3] w-full object-cover object-center rounded-3xl" :src="productSelected.thumbnail" alt="blog">
          <div class="mt-6 pt-2">
            <h2 class="title-font font-semibold text-xl text-slate-900 leading-none mb-2">{{ productSelected.title }}</h2>
              <p class="mb-4 text-slate-600">{{productSelected.description}}</p>
              <div class="flex flex-grow items-center gap-4 mb-6">
                <div class="font-semibold text-base " :class="{'text-green-700': productSelected.discountPercentage > 0}">Rp. {{productList.toCurrencyFormat(productSelected.price)}}</div>
                <div class="text-sm line-through text-gray-500/50" v-if="productSelected.discountPercentage > 0">Rp. {{productList.toCurrencyFormat(productSelected.basePrice)}}</div>
                <div class="flex-1 flex items-center justify-end">
                  <div class="flex items-center gap-2 w-full bg-white border border-primary-500/30 rounded-3xl justify-between py-2 px-1.5 shadow-sm max-w-36">
                    <button class="text-slate-800 border border-primary-500/30 bg-white text-lg focus:outline-none hover:bg-red-600 hover:text-slate-50 rounded-3xl p-1" @click="productList.removeFromCart(productSelected.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                    </button>
                    <div class="font-semibold leading-none">{{getCountinCartPerItem(productSelected.id)}}</div>
                    <button class="text-slate-800 border border-primary-500/30 bg-white text-lg focus:outline-none hover:bg-green-600 hover:text-slate-50 rounded-3xl p-1" @click="productList.addToCart(productSelected.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full bg-primary-500 border flex py-4 px-6 rounded-3xl items-center justify-center text-gray-100 text-lg font-semibold text-center" @click="productSelected = null">
                <span v-if="getCountinCartPerItem(productSelected.id) < 1">Liat-liat lagi dulu</span>
                <span v-else>Tambah ke keranjang</span>
              </div>
          </div>
        </div>
      </div>
    </BottomModal>
    <FloatingBottom :isShow="productList.getCountinCart > 0">
      <router-link to="/cart">
        <div class="w-full bg-primary-500 border flex pb-4 pt-5 px-6 rounded-3xl items-center justify-between text-gray-100 text-lg font-semibold mb-2 ">
          <div class="flex items-center justify-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 -mt-0.5"><path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10H7.00488V12C7.00488 14.7614 9.24346 17 12.0049 17C14.7663 17 17.0049 14.7614 17.0049 12V10H15.0049V12C15.0049 13.6569 13.6617 15 12.0049 15C10.348 15 9.00488 13.6569 9.00488 12V10Z"></path></svg>
            {{productList.getCountinCart}} item
          </div>
          <div>
            Rp. {{productList.getTotalinCart}}
          </div>
        </div>
      </router-link>
    </FloatingBottom>
</template>
