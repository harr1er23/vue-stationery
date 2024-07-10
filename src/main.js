import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

import App from './App.vue'

import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(VueAwesomePaginate)

app.use(autoAnimatePlugin)

app.mount('#app')
