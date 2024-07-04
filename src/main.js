import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueAwesomePaginate)

app.use(autoAnimatePlugin)

app.mount('#app')
