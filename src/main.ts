// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引入 Element Plus 样式
import './style.css'
import * as Icons from '@element-plus/icons-vue';

const app = createApp(App);

// 全局注册所有图标
for (const [key, component] of Object.entries(Icons)) {
    // app.component(key, component);
    app.component('el-icon-'+key.toLowerCase(), component);
    console.log('el-icon-'+key.toLowerCase())
};


app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
