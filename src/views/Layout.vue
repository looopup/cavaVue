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

        <el-menu-item index="flow">
          <el-icon><el-icon-connection /></el-icon>
          <span>流程图</span>
        </el-menu-item>

        <el-sub-menu index="flowinfo">
          <template #title>
            <el-icon><el-icon-finished /></el-icon>
            <span>流程数据</span>
          </template>
          <el-menu-item index="flowquery" @click="handleSubMenuSelect('flowquery')">流程图查询</el-menu-item>
        </el-sub-menu>

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

// 处理菜单选择事件，切换路由
const handleMenuSelect = (index: string) => {
  if (index === 'home') {
    router.push({ name: 'Home' });
  } else if (index === 'system') {
    router.push({ name: 'SystemManagement' });
  } else if (index === 'about') {
    router.push({ name: 'About' });
  } else if (index === 'flow') {
    router.push({ name: 'LogicFlow' });
  }
};

// 默认打开home页面
handleMenuSelect('home')

// 处理子菜单选择事件
const handleSubMenuSelect = (subIndex: string) => {
  if(subIndex === 'flowquery'){
    router.push({name: 'FlowQuery'})
  }
  else {
    console.log(subIndex.charAt(0).toUpperCase() + subIndex.slice(1));
    router.push({ name: subIndex.charAt(0).toUpperCase() + subIndex.slice(1) + 'Management' });
  }
};

</script>

<style scoped>
.layout-container {
  height: 100vh; /* 布局占满整个屏幕 */
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
  padding: 10px; /* 移除默认内边距 */
  background-color: #f5f5f5;
  min-height: calc(100vh - 100px); /* 计算高度以适应 header 和 footer */
}

.content-area {
  padding: 0; /* 距离四周4px */
  background-color: #ffffff; /* 设置内容区域的背景颜色 */
  border-radius: 4px; /* 可以添加圆角 */
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
  background-color: #1f2c3e; /* 设置系统名称背景颜色 */
}

/* 第1种菜单配色*/
.el-menu-item.is-active {
    /*color: var(--el-menu-active-color);*/
    color: var(--el-menu-text-color);
    background-color: #409eff66; /*var(--el-menu-active-color);*/
}
/*-------- 1 --------*/

/* 第2种菜单配色  * /
.el-menu-item, .el-submenu {
  color: #bfcbd9; /* 子菜单默认颜色 * /
}

.el-menu-item:hover, .el-submenu:hover {
  background-color: #4a5966; /* 鼠标悬停时的背景颜色 * /
}

.el-menu-item.is-active {
  background-color: #409EFF; /* 选中菜单项的背景颜色 * /
  color: #fff; /* 选中菜单项的文字颜色 * /
}
/ * ------------2------------ */

/* 第3种菜单配色 * /
.menu-item {
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.el-menu-item.is-active {
  background-color: #1f7bff !important; /* 选中项的背景色 * /
}
/ *------3-----*/
</style>
