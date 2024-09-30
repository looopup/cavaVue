# cavaVue

一个用vite搭建的vue3+TS系统前端框架，使用了Element Plus、Pinia、Vue Router、Axios、sass等组件。

第一步：确认使用哪些组件。  
第二步：用vite创建vue3+ts项目：
```
npm create vite@latest cavaVue -- --template vue-ts
```
第三步：安装依赖和其他组件：
```
cd cavaVue
npm install
npm install element-plus pinia vue-router axios sass
```
第四步：配置组件：
**配置 Vue Router**  
1、在 src 目录下创建一个 router 文件夹，并在其中创建 index.ts 文件，代码如下：
```
typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'), // 动态导入
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'), // 动态导入
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```
2、创建 views 文件夹并在其中创建 Home.vue 和 About.vue 组件：
Home.vue
```vue
<template>
    <div>
        <h1>Home Page</h1>
        <router-link to="/about">Go to About</router-link>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
```

About.vue
```vue
<template>
    <div>
        <h1>About Page</h1>
        <router-link to="/">Go to Home</router-link>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
```

**配置 Pinia**  
1、在 src 目录下创建一个 store 文件夹，并在其中创建 index.ts 文件，代码如下：
```typescript
// src/store/index.ts
import { createPinia } from 'pinia';

const pinia = createPinia();
export default pinia;
```
2、修改 src/main.ts 文件中引入 Pinia 和 Vue Router：
```typescript
// src/main.ts
import router from './router';
import pinia from './store';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
```
**配置 Axios**  
创建一个 src/services 目录，并创建一个简单的 Axios 实例配置文件axios.ts：
```typescript
// src/services/axios.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.xxxxxx.com', // 替换为你的 API 基础 URL
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求前做一些处理
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response.data; // 返回数据部分
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
```
**使用 Sass**  
如在 Home.vue 中，你可以把下面：
```vue
<style scoped>
</style>
```
改成（根据个人需要）
```vue
<style scoped lang="scss">
</style>
```
第五步：运行项目
```bash
npm run dev
```
在浏览器中访问 http://localhost:5173，可以看到 Vue 3 项目已经可以正常访问。

**FAQ：**  
第一次运行起来看到的页面可能不是满屏，这时需要调一下..\src\style.css，两个地方：
```css
body {
  margin: 0;
  /* display: flex; */  /* 把这个去掉 */
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  /* max-width: 1280px; */ /* 把这3个去掉 */
  /* margin: 0 auto; */
  /* padding: 2rem; */
  text-align: center;
}
```

---------------   到这里是第一阶段完成，下面是基于elementplus设计出系统框架  -----------------

第六步：登录页面（用户名、密码、登录按钮），从longin跳转到home  
1、在 src/views 目录下创建一个新的 Login.vue 文件，内容如下：
```vue
<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 注意引入路由

const username = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = () => {
  // 登录逻辑，调用 Axios 发送请求到后端
  alert(`登录成功`);
  // 登录成功后跳转到 home 页面
  router.push({ name: 'Home' });
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: auto;
}
.form-group {
  margin-bottom: 15px;
}
</style>
```
2、在../router/index.ts中添加路由：
```ts
{
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'), // 登录页面
    },
```
3、浏览器中访问：http://localhost:5173/login，然后直接点登录，然后跳转到home页面。

第七步：系统布局  
1、login后跳转到home页面，home页面一般理解为首页，它应该是嵌入显示在一个页面布的局中。  
我们把这个布局页面叫做layout，布局：左边菜单栏，右边又分上中下。  
创建文件 src/views/layout.vue，内容如下：
```vue
<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px" class="aside-menu">
    <div class="system-name">CAVAVUE</div>
      <el-menu :default-active="activeMenu" @select="handleMenuSelect" class="el-menu-vertical">
        <el-menu-item index="home">
          <el-icon><el-icon-house/></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-sub-menu index="system">
          <template #title>
            <el-icon><el-icon-setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="user" @click="handleSubMenuSelect('user')">用户管理</el-menu-item>
          <el-menu-item index="role" @click="handleSubMenuSelect('role')">角色管理</el-menu-item>
          <el-menu-item index="permission" @click="handleSubMenuSelect('permission')">权限管理</el-menu-item>
          <el-menu-item index="dictionary" @click="handleSubMenuSelect('dictionary')">字典管理</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="about">
          <el-icon><el-icon-infofilled /></el-icon>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧区域 -->
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header height="60px" class="header-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>当前页面</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="user-info">
          <el-avatar icon="el-icon-user" />
          <el-button link>退出登录</el-button>
        </div>
      </el-header>

      <!-- 中间内容区域 -->
      <el-main class="main-content">
        <div class="content-area">
          <router-view /> <!-- 用于动态渲染不同的页面内容 -->
        </div>
      </el-main>

      <!-- 底部版权区域 -->
      <el-footer height="26px" class="footer-container">
        © 2024 cavaVue. All Rights Reserved.
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeMenu = ref('home'); // 默认选中首页

// 路由
const handleMenuSelect = (index: string) => {
  if (index === 'home') {
    router.push({ name: 'Home' });
  } else if (index === 'system') {
    router.push({ name: 'SystemManagement' });
  } else if (index === 'about') {
    router.push({ name: 'About' });
  }
};

// 默认打开home页面
handleMenuSelect('home')

// 子菜单
const handleSubMenuSelect = (subIndex: string) => {
    console.log(subIndex.charAt(0).toUpperCase() + subIndex.slice(1));
    router.push({ name: subIndex.charAt(0).toUpperCase() + subIndex.slice(1) + 'Management' });
};

</script>

<style scoped>
.layout-container {
  height: 100vh; /* 满屏 */
}

.aside-menu {
  background-color: #8499b4;
  color: #fff;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
}

.main-content {
  padding: 10px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 100px);
}

.content-area {
  padding: 0;
  background-color: #ffffff;
  border-radius: 4px; /* 圆角 */
}


.footer-container {
  text-align: center;
  color: #909399;
  background-color: #f5f5f5;
}

.system-name {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  background-color: #1f2c3e;
}

.el-menu-item.is-active {
    color: var(--el-menu-text-color);
    background-color: #409eff66; 
}

</style>
```
2、根据菜单改路由，/src/router/index.ts，改为如下：
```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/Layout.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import UserManagement from '../views/UserManagement.vue';
import RoleManagement from '../views/RoleManagement.vue';
import PermissionManagement from '../views/PermissionManagement.vue';
import DictionaryManagement from '../views/DictionaryManagement.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home, 
    },
    {
        path: '/login', // 添加登录路由
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },{
        path: '/main', // 添加登录路由
        name: 'Layout',
        component: Layout,
        children: [
            { path: 'home', name: 'Home', component: Home },
            { path: 'flow', name: 'LogicFlow' , component: LogicFlow},
            {
                path: 'system',
                name: 'SystemManagement',
                // component: SystemManagement, 设置了子菜单，就不要再显示系统管理的页面，否则子页面将无法显示
                children: [
                  { path: 'user', name: 'UserManagement', component: UserManagement },
                  { path: 'role', name: 'RoleManagement', component: RoleManagement },
                  { path: 'permission', name: 'PermissionManagement', component: PermissionManagement },
                  { path: 'dictionary', name: 'DictionaryManagement', component: DictionaryManagement },
                ],
              },
            { path: 'about', name: 'About', component: About },
          ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```
3、设计的菜单中有一个 系统管理 的一级菜单，下面有4个二级菜单：用户管理、角色管理、权限管理、字典管理。  
添加4个菜单对应的页面：
../views/UserManagement.vue
```vue
<template>
  <div>
    <h2>用户管理</h2>
  </div>
</template>
<script setup lang="ts"></script>
```

../views/RoleManagement.vue
```vue
<template>
  <div>
    <h2>角色管理</h2>
  </div>
</template>
<script setup lang="ts"></script>
```
../views/PermissionManagement.vue
```vue
<template>
  <div>
    <h2>权限管理</h2>
  </div>
</template>
<script setup lang="ts"></script>
```
../views/DictionaryManagement.vue
```vue
<template>
  <div>
    <h2>字典管理</h2>
  </div>
</template>
<script setup lang="ts"></script>
```
![image](https://github.com/user-attachments/assets/5fdc38c2-456a-45e8-9b18-3f6e5f117b4b)

------------------ 到此第2阶段，系统框架搭完成，下面填充页面内容 -----------------




