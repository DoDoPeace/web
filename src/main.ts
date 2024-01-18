import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import Antd  from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

const pinia = createPinia()
import router from "@/router/index" // 引入router

app.use(pinia).use(router).use(Antd)
.mount('#app')
