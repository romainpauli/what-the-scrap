import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import store from "./store";
import router from "./router/index"

import './assets/index.css'

const app = createApp(App);
app.use(store);
app.use(router)
app.use(MotionPlugin)
app.mount("#app");