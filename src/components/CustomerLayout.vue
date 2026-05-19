<template>
  <div class="mobile-layout">
    <div class="mobile-frame">
      <div class="status-bar">
        <span>9:41</span>
        <span class="status-icons">
          <el-icon><Wifi /></el-icon>
          <el-icon><Battery /></el-icon>
        </span>
      </div>

      <div class="mobile-header">
        <h2>{{ pageTitle }}</h2>
      </div>

      <div class="mobile-content">
        <router-view />
      </div>

      <div class="tab-bar">
        <div
          v-for="tab in tabs"
          :key="tab.path"
          class="tab-item"
          :class="{ active: activeTab === tab.path }"
          @click="$router.push(tab.path)"
        >
          <el-icon :size="22"><component :is="tab.icon" /></el-icon>
          <span>{{ tab.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { path: '/customer/home', label: '首页', icon: 'HomeFilled' },
  { path: '/customer/coupons', label: '领券', icon: 'Ticket' },
  { path: '/customer/my-coupons', label: '我的券', icon: 'Document' },
  { path: '/customer/profile', label: '我的', icon: 'User' }
]

const titleMap = {
  '/customer/home': '华联城',
  '/customer/coupons': '领券中心',
  '/customer/my-coupons': '我的优惠券',
  '/customer/profile': '个人中心'
}

const activeTab = computed(() => route.path)
const pageTitle = computed(() => titleMap[route.path] || '华联城')
</script>

<style scoped>
.mobile-layout {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.mobile-frame {
  width: 375px;
  height: 812px;
  background: #fff;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  border: 8px solid #1a1a2e;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  background: #fff;
}

.status-icons {
  display: flex;
  gap: 4px;
}

.mobile-header {
  padding: 8px 20px 16px;
  background: #fff;
}

.mobile-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
}

.mobile-content {
  flex: 1;
  overflow-y: auto;
  background: #f5f7fa;
}

.tab-bar {
  display: flex;
  background: #fff;
  border-top: 1px solid #ebeef5;
  padding: 8px 0;
  padding-bottom: 20px;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  color: #909399;
  font-size: 11px;
  transition: color 0.2s;
}

.tab-item.active {
  color: #409eff;
}
</style>
