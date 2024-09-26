<script setup>
import { ProductStore } from '@/stores/product';
import { UserStore } from '@/stores/user';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import EmptyCart from '@/components/Empty.vue';
import Summary from '@/components/Summary.vue';
import BuyMeCoffee from '@/components/BuyMeCoffee.vue';
import FloatingBottom from '@/components/FloatingBottom.vue';
import BottomModal from '@/components/BottomModal.vue';
import TextInput from '@/components/TextInput.vue';
import InputLabel from '@/components/InputLabel.vue';
import InputError from '@/components/InputError.vue';

const cartStore = ProductStore(); 
const userStore = UserStore(); 
const showBungkusButton = ref(false);
const { getCountinCartPerItem } = storeToRefs(cartStore);
onMounted(() => {
    cartStore.getCartItem();
    userStore.getUserFromStorage();
    if(cartStore.getCountinCart > 0){
      setTimeout(function() {
        showBungkusButton.value = true;
      }, 1000);
    }
});

const isiDataDulu = ref(false);
const userName = ref(userStore.getUserName);
const userNumber = ref(userStore.getUserNumber);

const submit = ()=>{
  if(!userStore.getUserAvaiable)
    isiDataDulu.value = true;
  else
  submitOrder();
};

const setUser = ()=>{
  if(userName.value != '' && userNumber.value != ''){
    userStore.setUser(userName.value, userNumber.value);
    submitOrder();
  }
}

const submitOrder = () => {
  alert('Hore Berhasil');
}

</script>

<template>
  <div>
    <nav class="sticky inset-0 z-50 bg-white mx-auto h-16 gap-6 w-full dark:bg-slate-900 dark:text-gray-100 transition-all duration-200 shadow-sm shadow-slate-500/30">
        <div class="w-full text-left px-4 py-4 flex items-center gap-4">
          <router-link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
          </router-link>
            <div class="font-bold text-xl tracking-normal mt-0.5">Kios Terbaik</div>
        </div>
    </nav>

    <div class="mb-12 pb-6 min-h-screen bg-slate-100" v-if="cartStore.getCountinCart > 0">
      <div class="px-4 text-gray-700 py-4 flex items-center gap-3" v-if="cartStore.getCountinCart > 0">
        <div class="bg-primary-400/80 rounded-full p-3 text-white">
          <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="currentColor"class="size-7"><path d="M2 5.5V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5ZM0 10H5V12H0V10ZM0 15H8V17H0V15Z"></path></svg>
        </div>
        <div>
          <div class="font-semibold">Diantar ke Wisma Indocement</div>
          <div class="text-sm">pada 31 September 2024</div>
        </div>
      </div>
        <div class="pt-4 border-b-8 border-slate-100 bg-white">
          <div class="flex flex-wrap divide-y divide-slate-200 divide-dashed md:gap-6">
              <div class="px-4 py-4 w-full" v-for="product in cartStore.cart" :key="product.id">
                  <div class="flex items-start justify-center text-left relative gap-4">
                    <div class="max-w-[15svw]">
                        <img alt="team" class="flex-shrink-0 rounded-lg w-full object-cover object-center aspect-square h-auto bg-slate-300" :src="product.thumbnail">
                    </div>
                      <div class="flex-grow mt-1">
                          <h2 class="title-font font-semibold text-lg text-slate-900 leading-none mb-2">{{ product.title }}</h2>
                          <div class="">Rp. {{ cartStore.toCurrencyFormat(product.price) }}</div>
                      </div>
                  </div>
                  <div class="w-full flex items-center justify-end">
                      <!-- <div class="h-full py-2 flex items-center gap-2 text-gray-500 flex-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path d="M4 1V4H1V6H4V9H6V6H9V4H6V1H4ZM11 5C11 8.31371 8.31371 11 5 11C4.29873 11 3.62556 10.8797 3 10.6586V20.0066C3 20.5551 3.44694 21 3.99826 21H14V15C14 14.45 14.45 14 15 14H21V3.9985C21 3.44749 20.5552 3 20.0066 3H10.6586C10.8797 3.62556 11 4.29873 11 5ZM21 16L16 20.997V16H21Z"></path></svg>
                          Notes
                      </div> -->
                      <div class="relative w-36">
                        <div class="flex items-center w-full gap-2 bg-white rounded-full justify-between py-1.5 pl-1.5">
                          <button class="text-slate-800 border border-primary-600/30 bg-white text-lg focus:outline-none hover:bg-red-600 hover:text-slate-50 rounded-full p-1" @click="cartStore.removeFromCart(product.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                          </button>
                          <div class="font-semibold leading-none">{{getCountinCartPerItem(product.id)}}</div>
                          <button class="text-slate-800 border border-primary-600/30 bg-white text-lg focus:outline-none hover:bg-green-600 hover:text-slate-50 rounded-full p-1" @click="cartStore.addToCart(product.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                          </button>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="px-4 border-y-2 py-4 mt-2">
              <div class="flex items-center justify-between gap-10">
                  <div class="flex-1">
                      <div class="font-semibold">Mau nambah lagi?</div>
                      <div class="text-sm">Boleeh nambah kok</div>
                  </div>
                  <router-link :to="{name:'home'}">
                    <button class="flex items-center justify-center w-full text-primary-600 border-primary-600/30 bg-white border py-3 px-4 focus:outline-none shadow-sm hover:bg-primary-500 hover:text-slate-50 rounded-3xl gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg> 
                      <div class="font-semibold mt-0.5">Tambah</div>
                    </button>
                  </router-link>
              </div>
          </div>
        </div>
    <Summary></Summary>  
    <BuyMeCoffee></BuyMeCoffee>
    <FloatingBottom :isShow="showBungkusButton">
        <div @click="submit" class="w-full border bg-primary-500 flex py-4 px-6 rounded-3xl items-center justify-center gap-3 text-gray-50 text-lg font-semibold mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 -mt-0.5"><path d="M9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6H9ZM7 6H4C3.44772 6 3 6.44772 3 7V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V7C21 6.44772 20.5523 6 20 6H17C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"></path></svg>
          Bungkus {{ cartStore.getCountinCart }} item
        </div>
    </FloatingBottom>
    <BottomModal :show="isiDataDulu" @close="isiDataDulu = false" titlenya="Isi data dulu ya">
        <div class="h-full border-opacity-60 rounded-lg overflow-hidden relative space-y-6 px-2">
          <div class="space-y-1">
            <InputLabel for="Nama" value="Nama atau alias" />
            <TextInput id="Nama" type="text" class="block w-full uppercase" aria-required="true" required autofocus
             v-model="userName" />
          </div>
          <div class="space-y-1">
            <InputLabel for="phone" value="Nomor Whatsapp" />
            <div class="flex items-center gap-2 md:gap-4">
              <div class="rounded-3xl py-4 px-6 shadow-sm bg-slate-200 border border-gray-400/30">
                +62
              </div>
              <TextInput id="phone" ref="phone" type="text" class="block w-full" required inputmode="numeric" pattern="[0-9]*"
                onkeyup="this.value=this.value.replace(/[^\d]/,'')" min="8" max="15" v-model="userNumber"
                />
              </div>
          </div>
         
          <div @click="setUser" class="w-full border flex py-4 px-6 rounded-3xl items-center justify-center gap-3 text-gray-50 text-lg font-semibold mb-2 transition-colors ease-in-out" :class="{'bg-primary-500' : userName != '' && userNumber.length > 8, 'bg-gray-300' : userName == '' || userNumber.length <= 8}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7 -mt-0.5"><path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path></svg>
            Lanjut
          </div>
        </div>
    </BottomModal>
    </div>
    <div v-else>
      <EmptyCart></EmptyCart>
    </div>
  </div>

</template>
