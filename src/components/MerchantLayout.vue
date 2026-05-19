<template>
  <el-container class="layout">
    <el-aside width="220px" class="aside">
      <div class="logo-area">
        <el-icon :size="28" color="#f5576c"><Shop /></el-icon>
        <span class="logo-text">商户中心</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        router
        class="side-menu"
      >
        <el-menu-item index="/merchant/dashboard">
          <el-icon><Odometer /></el-icon>
          <span>经营概览</span>
        </el-menu-item>
        <el-menu-item index="/merchant/coupons">
          <el-icon><Ticket /></el-icon>
          <span>优惠券管理</span>
        </el-menu-item>
        <el-menu-item index="/merchant/customers">
          <el-icon><User /></el-icon>
          <span>我的顾客</span>
        </el-menu-item>
        <el-menu-item index="/merchant/report">
          <el-icon><TrendCharts /></el-icon>
          <span>经营报表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-tag type="success" effect="plain">营业中</el-tag>
          <span class="merchant-name">{{ merchantName }}</span>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" style="background: #f5576c">商</el-avatar>
              <span class="user-name">{{ merchantName }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useMerchantStore } from '../stores/merchant'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const merchantStore = useMerchantStore()

const merchantName = computed(() => merchantStore.currentMerchant?.name || '商户')

const activeMenu = computed(() => route.path)

function handleCommand(cmd) {
  if (cmd === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.layout {
  height: 100vh;
}

.aside {
  background: #1a1a2e;
  overflow: hidden;
}

.logo-area {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo-text {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.side-menu {
  border: none;
  background: transparent;
}

.side-menu .el-menu-item {
  color: rgba(255, 255, 255, 0.65);
  height: 50px;
  margin: 4px 8px;
  border-radius: 8px;
}

.side-menu .el-menu-item:hover,
.side-menu .el-menu-item.is-active {
  background: rgba(245, 87, 108, 0.15);
  color: #f5576c;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.merchant-name {
  font-weight: 600;
  color: #303133;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #606266;
}

.user-name {
  font-size: 14px;
}

.main {
  background: #f5f7fa;
  padding: 20px;
  overflow-y: auto;
}
</style>
