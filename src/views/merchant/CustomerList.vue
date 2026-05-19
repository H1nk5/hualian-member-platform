<template>
  <div class="customer-list">
    <div class="filter-bar">
      <el-input v-model="keyword" placeholder="搜索顾客姓名/手机号" prefix-icon="Search" style="width: 260px" />
      <el-select v-model="tagFilter" placeholder="标签筛选" style="width: 140px" clearable>
        <el-option v-for="tag in allTags" :key="tag" :label="tag" :value="tag" />
      </el-select>
      <el-select v-model="sortby" placeholder="排序" style="width: 140px">
        <el-option label="最近消费" value="recent" />
        <el-option label="消费金额" value="amount" />
        <el-option label="到店次数" value="visits" />
      </el-select>
    </div>

    <!-- 顾客统计 -->
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="8">
        <div class="stat-card">
          <div class="stat-num">1,256</div>
          <div class="stat-label">累计顾客</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="stat-card">
          <div class="stat-num">328</div>
          <div class="stat-label">本月活跃</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="stat-card">
          <div class="stat-num">68%</div>
          <div class="stat-label">复购率</div>
        </div>
      </el-col>
    </el-row>

    <!-- 顾客列表 -->
    <el-table :data="filteredCustomers" style="width: 100%" stripe>
      <el-table-column prop="name" label="顾客" width="120">
        <template #default="{ row }">
          <div style="display: flex; align-items: center; gap: 8px">
            <el-avatar :size="32" style="background: #409eff; font-size: 12px">{{ row.name[0] }}</el-avatar>
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="130" />
      <el-table-column prop="level" label="等级" width="100">
        <template #default="{ row }">
          <el-tag size="small" :type="levelType[row.level]">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalSpent" label="累计消费" width="120" sortable>
        <template #default="{ row }">¥{{ row.totalSpent.toLocaleString() }}</template>
      </el-table-column>
      <el-table-column prop="visitCount" label="到店次数" width="100" sortable />
      <el-table-column prop="lastVisit" label="最近到店" width="120" />
      <el-table-column prop="tags" label="标签">
        <template #default="{ row }">
          <el-tag v-for="tag in row.tags" :key="tag" size="small" style="margin: 2px" type="info">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default>
          <el-button size="small" text type="primary">发券</el-button>
          <el-button size="small" text type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 16px; text-align: right">
      <el-pagination :page-size="15" :total="filteredCustomers.length" layout="total, prev, pager, next" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { users } from '../../mock/users'

const keyword = ref('')
const tagFilter = ref('')
const sortby = ref('recent')

const allTags = ['高频消费', '价格敏感', '品质追求', '新品尝鲜', '周末消费']

const levelType = {
  '普通会员': 'info',
  '银卡会员': '',
  '金卡会员': 'warning',
  '钻石会员': 'primary'
}

const filteredCustomers = computed(() => {
  return users.filter(u => {
    if (keyword.value && !u.name.includes(keyword.value) && !u.phone.includes(keyword.value)) return false
    if (tagFilter.value && !u.tags.includes(tagFilter.value)) return false
    return true
  }).sort((a, b) => {
    if (sortby.value === 'amount') return b.totalSpent - a.totalSpent
    if (sortby.value === 'visits') return b.visitCount - a.visitCount
    return b.lastVisit.localeCompare(a.lastVisit)
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

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #909399;
}
</style>
