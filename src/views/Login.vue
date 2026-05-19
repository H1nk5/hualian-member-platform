<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-circle c1"></div>
      <div class="bg-circle c2"></div>
      <div class="bg-circle c3"></div>
    </div>

    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <el-icon :size="40" color="#409eff"><Shop /></el-icon>
        </div>
        <h1>华联城会员营销平台</h1>
        <p class="subtitle">本地生活 · 智慧营销</p>
      </div>

      <div class="role-cards">
        <div
          v-for="role in roles"
          :key="role.key"
          class="role-card"
          :class="{ active: selectedRole === role.key }"
          @click="selectedRole = role.key"
        >
          <div class="role-icon" :style="{ background: role.bg }">
            <el-icon :size="32" color="#fff"><component :is="role.icon" /></el-icon>
          </div>
          <div class="role-info">
            <h3>{{ role.title }}</h3>
            <p>{{ role.desc }}</p>
          </div>
          <el-icon v-if="selectedRole === role.key" class="check-icon" color="#409eff"><CircleCheck /></el-icon>
        </div>
      </div>

      <el-button
        type="primary"
        size="large"
        class="login-btn"
        :loading="loading"
        @click="handleLogin"
      >
        演示模式进入
      </el-button>

      <p class="demo-tip">演示版，点击直接进入体验</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useMerchantStore } from '../stores/merchant'

const router = useRouter()
const userStore = useUserStore()
const merchantStore = useMerchantStore()

const selectedRole = ref('admin')
const loading = ref(false)

const roles = [
  { key: 'admin', title: '平台管理', desc: '商场运营数据总览', icon: 'DataAnalysis', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { key: 'merchant', title: '商户入驻', desc: '优惠券与顾客管理', icon: 'Shop', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { key: 'customer', title: '会员中心', desc: '领券消费享优惠', icon: 'User', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' }
]

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 500))

  if (selectedRole.value === 'admin') {
    userStore.loginAsAdmin()
    router.push('/admin')
  } else if (selectedRole.value === 'merchant') {
    userStore.loginAsMerchant(1)
    merchantStore.setCurrentMerchant(1)
    router.push('/merchant')
  } else {
    userStore.loginAsCustomer(1)
    router.push('/customer')
  }

  loading.value = false
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0c29;
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
}

.c1 {
  width: 400px;
  height: 400px;
  background: #667eea;
  top: -100px;
  left: -100px;
}

.c2 {
  width: 300px;
  height: 300px;
  background: #f5576c;
  bottom: -50px;
  right: -50px;
}

.c3 {
  width: 250px;
  height: 250px;
  background: #00f2fe;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px 40px;
  width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
}

.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.logo {
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #e8f0fe, #f0e8fe);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.subtitle {
  color: #909399;
  font-size: 14px;
}

.role-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.role-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: 2px solid #ebeef5;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.role-card:hover {
  border-color: #c0c4cc;
  transform: translateY(-1px);
}

.role-card.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.role-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 2px;
}

.role-info p {
  font-size: 13px;
  color: #909399;
}

.check-icon {
  position: absolute;
  right: 16px;
  font-size: 22px;
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 12px;
}

.demo-tip {
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
  color: #c0c4cc;
}
</style>
