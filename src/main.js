import { createApp } from 'vue'
import '@/style.css'
import router from '@/router/router.js'
import App from '@/App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
