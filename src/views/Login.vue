<template>
  <div class="login-container">
    <h2>登录</h2>
    <el-form :model="form" @submit.prevent="handleSubmit">
      <el-form-item label="用户名" required>
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密&nbsp;&nbsp;&nbsp码" required>
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="验证码" required>
        <div class="captcha-container">
          <el-input
            v-model="form.captchaInput"
            placeholder="请输入验证码"
          />
          <span class="captcha-code">{{ captcha }}</span>
          <el-button @click="generateCaptcha" link>更换验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const form = ref({
  username: '',
  password: '',
  captchaInput: ''
});

const captcha = ref('');
const router = useRouter(); // 使用 Vue Router

const generateCaptcha = () => {
  // 生成随机验证码
  captcha.value = Math.random().toString(36).slice(-6).toUpperCase();
};

const handleSubmit = () => {
  // 检查验证码
  if (form.value.captchaInput.toUpperCase() !== captcha.value) {
    ElMessage.error('验证码错误，请重试。');
    return;
  }
  // 处理登录逻辑（这里可以调用 Axios 发送请求）
//   ElMessage.success(`用户名: ${form.value.username}, 密码: ${form.value.password}, 验证码: ${captcha.value}`);
  
  // 假设登录成功（在这里可以添加实际的登录逻辑，比如使用 Axios 调用后端 API）
  ElMessage.success('登录成功！');

  // 登录成功后跳转到 Layout 页面
  router.push({ name: 'Layout' });
};

onMounted(generateCaptcha); // 组件挂载时生成初始验证码
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: auto;
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-code {
  margin-left: 10px;
  font-weight: bold;
  border: 1px solid #dcdfe6;
  padding: 5px;
  background-color: #f9f9f9;
  color: #409eff;
}
</style>
