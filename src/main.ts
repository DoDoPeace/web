import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import Antd  from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

const pinia = createPinia()
import router from "@/router/index" // 引入router
import Vant from 'vant';
import Vue3EmojiPicker from 'vue3-emoji-picker';
app.component('Vue3EmojiPicker', Vue3EmojiPicker);

import 'vant/lib/index.css';

import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css'
app.component('EmojiPicker', EmojiPicker);

app.use(Vant).use(pinia).use(router).use(Antd)
.mount('#app')
