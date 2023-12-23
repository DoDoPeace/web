import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
import router from "@/router/index" // 引入router

app.use(pinia).use(router).mount('#app')
