<template>
  <div class="member-list">
    <!-- 筛选栏 -->
    <div class="filter-bar">
      <el-input v-model="keyword" placeholder="搜索会员姓名/手机号" prefix-icon="Search" style="width: 280px" />
      <el-select v-model="levelFilter" placeholder="会员等级" style="width: 140px">
        <el-option label="全部" value="" />
        <el-option v-for="l in levels" :key="l" :label="l" :value="l" />
      </el-select>
      <el-button type="primary" @click="exportData">
        <el-icon><Download /></el-icon> 导出
      </el-button>
    </div>

    <!-- 等级统计 -->
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="6" v-for="(count, level) in levelStats" :key="level">
        <div class="level-card" :style="{ borderLeftColor: levelColors[level] }">
          <div class="level-name">{{ level }}</div>
          <div class="level-count">{{ count }}</div>
        </div>
      </el-col>
    </el-row>

    <!-- 会员表格 -->
    <el-table :data="filteredUsers" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="phone" label="手机号" width="130" />
      <el-table-column prop="level" label="等级" width="100">
        <template #default="{ row }">
          <el-tag :color="levelColors[row.level]" style="color: #fff; border: none">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="points" label="积分" width="100" sortable />
      <el-table-column prop="balance" label="余额" width="100">
        <template #default="{ row }">¥{{ row.balance }}</template>
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
    </el-table>

    <div style="margin-top: 16px; text-align: right">
      <el-pagination
        v-model:current-page="page"
        :page-size="20"
        :total="filteredUsers.length"
        layout="total, prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { users, levelStats } from '../../mock/users'

const keyword = ref('')
const levelFilter = ref('')
const page = ref(1)

const levels = ['普通会员', '银卡会员', '金卡会员', '钻石会员']
const levelColors = {
  '普通会员': '#909399',
  '银卡会员': '#c0c4cc',
  '金卡会员': '#e6a23c',
  '钻石会员': '#409eff'
}

const filteredUsers = computed(() => {
  return users.filter(u => {
    if (keyword.value && !u.name.includes(keyword.value) && !u.phone.includes(keyword.value)) return false
    if (levelFilter.value && u.level !== levelFilter.value) return false
    return true
  })
})

function exportData() {
  ElMessage.success('导出功能演示')
}
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

.level-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  border-left: 4px solid;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.level-name {
  font-size: 13px;
  color: #909399;
  margin-bottom: 4px;
}

.level-count {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
}
</style>
