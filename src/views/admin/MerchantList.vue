<template>
  <div class="merchant-list">
    <div class="filter-bar">
      <el-input v-model="keyword" placeholder="搜索商户名称" prefix-icon="Search" style="width: 240px" />
      <el-select v-model="categoryFilter" placeholder="品类" style="width: 120px">
        <el-option v-for="c in categories" :key="c" :label="c" :value="c === '全部' ? '' : c" />
      </el-select>
      <el-select v-model="statusFilter" placeholder="状态" style="width: 120px">
        <el-option label="全部" value="" />
        <el-option label="营业中" value="active" />
        <el-option label="已暂停" value="inactive" />
      </el-select>
    </div>

    <el-row :gutter="16">
      <el-col :span="8" v-for="merchant in filteredMerchants" :key="merchant.id">
        <div class="merchant-card">
          <div class="card-top">
            <div class="merchant-icon" :style="{ background: categoryColors[merchant.category] || '#909399' }">
              {{ merchant.name[0] }}
            </div>
            <div class="merchant-info">
              <h4>{{ merchant.name }}</h4>
              <el-tag size="small">{{ merchant.category }}</el-tag>
            </div>
            <el-tag :type="merchant.status === 'active' ? 'success' : 'info'" size="small">
              {{ merchant.status === 'active' ? '营业中' : '已暂停' }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="label">联系人</span>
              <span>{{ merchant.contact }}</span>
            </div>
            <div class="info-row">
              <span class="label">位置</span>
              <span>{{ merchant.address }}</span>
            </div>
            <div class="info-row">
              <span class="label">入驻时间</span>
              <span>{{ merchant.joinDate }}</span>
            </div>
            <div class="info-row">
              <span class="label">月GMV</span>
              <span class="gmv">¥{{ merchant.monthlyGMV.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { merchants, categories } from '../../mock/merchants'

const keyword = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

const categoryColors = {
  '餐饮': '#f56c6c',
  '服装': '#e6a23c',
  '电子': '#409eff',
  '日用': '#67c23a',
  '超市': '#909399',
  '生鲜': '#67c23a',
  '珠宝': '#e6a23c',
  '娱乐': '#f093fb',
  '母婴': '#4facfe'
}

const filteredMerchants = computed(() => {
  return merchants.filter(m => {
    if (keyword.value && !m.name.includes(keyword.value)) return false
    if (categoryFilter.value && m.category !== categoryFilter.value) return false
    if (statusFilter.value && m.status !== statusFilter.value) return false
    return true
  })
})
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
}

.merchant-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
}

.merchant-card:hover {
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.merchant-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
}

.merchant-info {
  flex: 1;
}

.merchant-info h4 {
  font-size: 15px;
  margin-bottom: 4px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  color: #606266;
  border-bottom: 1px solid #f5f7fa;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  color: #909399;
}

.info-row .gmv {
  font-weight: 600;
  color: #f56c6c;
}
</style>
