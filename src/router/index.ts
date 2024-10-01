// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/Layout.vue';
import Home from '../views/Home.vue';
// import SystemManagement from '../views/SystemManagement.vue';
import About from '../views/About.vue';
import UserManagement from '../views/UserManagement.vue';
import RoleManagement from '../views/RoleManagement.vue';
import PermissionManagement from '../views/PermissionManagement.vue';
import DictionaryManagement from '../views/DictionaryManagement.vue';
import LogicFlow from '../views/LogicFlow.vue';
import FlowQuery from '../views/FlowQuery.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home, // 动态导入
    },
    {
        path: '/about',
        name: 'About',
        component: About, // 动态导入
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
                path: 'flowinfo',
                name: 'FlowInfo',
                children: [
                    {path: 'flowquery', name: 'FlowQuery', component: FlowQuery},
                ]
            },
            // { path: 'system', name: 'SystemManagement', component: SystemManagement },
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
