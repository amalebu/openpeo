<script setup>
import { ProductStore } from '@/stores/product';
const cartStore = ProductStore();
</script>
<template>
    <transition enter-active-class="transition ease-out duration-300"
    enter-from-class="transform opacity-0 translate-y-32"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="ease-in duration-200"
    leave-from-class="transform opacity-200 translate-y-0"
    leave-to-class="transform opacity-0 translate-y-32" v-show="cartStore.getCountinCart > 0" class="fixed bottom-0 left-0 w-full bg-white p-3">
      <router-link to="/cart">
        <div class="w-full border bg-green-700 flex py-4 px-6 rounded-full items-center justify-between text-gray-50 text-lg font-semibold mb-2">
          <div class="flex items-center justify-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 -mt-0.5"><path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10H7.00488V12C7.00488 14.7614 9.24346 17 12.0049 17C14.7663 17 17.0049 14.7614 17.0049 12V10H15.0049V12C15.0049 13.6569 13.6617 15 12.0049 15C10.348 15 9.00488 13.6569 9.00488 12V10Z"></path></svg>
            {{cartStore.getCountinCart}} item
          </div>
          <div>
            Rp. {{cartStore.getTotalinCart}}
          </div>
        </div>
      </router-link>
    </transition>
</template>