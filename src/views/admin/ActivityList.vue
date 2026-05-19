<template>
  <div class="activity-list">
    <div class="filter-bar">
      <el-button type="primary" @click="showCreate = true">
        <el-icon><Plus /></el-icon> 创建活动
      </el-button>
      <el-select v-model="typeFilter" placeholder="活动类型" style="width: 140px">
        <el-option label="全部" value="" />
        <el-option label="秒杀" value="秒杀" />
        <el-option label="拼团" value="拼团" />
        <el-option label="满减" value="满减" />
        <el-option label="折扣" value="折扣" />
      </el-select>
    </div>

    <el-row :gutter="16">
      <el-col :span="8" v-for="activity in filteredActivities" :key="activity.id">
        <div class="activity-card" :style="{ borderTopColor: activity.color }">
          <div class="activity-header">
            <el-tag :type="activity.statusType">{{ activity.statusText }}</el-tag>
            <span class="activity-type">{{ activity.type }}</span>
          </div>
          <h3>{{ activity.name }}</h3>
          <p class="activity-desc">{{ activity.desc }}</p>
          <div class="activity-meta">
            <div>
              <span class="meta-label">参与商户</span>
              <span class="meta-value">{{ activity.merchantCount }}家</span>
            </div>
            <div>
              <span class="meta-label">领取量</span>
              <span class="meta-value">{{ activity.claimed }}</span>
            </div>
            <div>
              <span class="meta-label">核销率</span>
              <span class="meta-value">{{ activity.rate }}%</span>
            </div>
          </div>
          <div class="activity-time">
            {{ activity.startDate }} ~ {{ activity.endDate }}
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 创建活动弹窗 -->
    <el-dialog v-model="showCreate" title="创建活动" width="500px">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select placeholder="选择类型" style="width: 100%">
            <el-option label="秒杀" value="秒杀" />
            <el-option label="拼团" value="拼团" />
            <el-option label="满减" value="满减" />
            <el-option label="折扣" value="折扣" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%" />
        </el-form-item>
        <el-form-item label="活动说明">
          <el-input type="textarea" :rows="3" placeholder="请输入活动说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="showCreate = false; ElMessage.success('活动创建成功')">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showCreate = ref(false)
const typeFilter = ref('')

const activities = ref([
  { id: 1, name: '华联城520心动季', type: '满减', desc: '全场满200减50，多品类参与', merchantCount: 18, claimed: 2456, rate: 68, startDate: '2026-05-18', endDate: '2026-05-22', statusType: 'success', statusText: '进行中', color: '#f56c6c' },
  { id: 2, name: '周末美食节', type: '折扣', desc: '餐饮商户全场8折起', merchantCount: 8, claimed: 1234, rate: 72, startDate: '2026-05-17', endDate: '2026-05-19', statusType: 'success', statusText: '进行中', color: '#e6a23c' },
  { id: 3, name: '数码焕新季', type: '满减', desc: '手机配件满100减20', merchantCount: 4, claimed: 567, rate: 58, startDate: '2026-05-15', endDate: '2026-05-25', statusType: 'success', statusText: '进行中', color: '#409eff' },
  { id: 4, name: '母婴特卖周', type: '秒杀', desc: '每日10点限量秒杀', merchantCount: 3, claimed: 890, rate: 82, startDate: '2026-05-12', endDate: '2026-05-18', statusType: 'warning', statusText: '即将结束', color: '#67c23a' },
  { id: 5, name: '五一狂欢节', type: '满减', desc: '全场满300减80', merchantCount: 25, claimed: 5678, rate: 75, startDate: '2026-05-01', endDate: '2026-05-07', statusType: 'info', statusText: '已结束', color: '#909399' },
  { id: 6, name: '春季服装清仓', type: '折扣', desc: '春装全场5折起', merchantCount: 6, claimed: 3456, rate: 65, startDate: '2026-04-15', endDate: '2026-04-30', statusType: 'info', statusText: '已结束', color: '#909399' }
])

const filteredActivities = computed(() => {
  if (!typeFilter.value) return activities.value
  return activities.value.filter(a => a.type === typeFilter.value)
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

.activity-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border-top: 4px solid;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.activity-type {
  font-size: 12px;
  color: #909399;
  background: #f5f7fa;
  padding: 2px 8px;
  border-radius: 4px;
}

.activity-card h3 {
  font-size: 16px;
  margin-bottom: 6px;
}

.activity-desc {
  font-size: 13px;
  color: #909399;
  margin-bottom: 16px;
}

.activity-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.meta-label {
  font-size: 12px;
  color: #909399;
  display: block;
}

.meta-value {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.activity-time {
  font-size: 12px;
  color: #c0c4cc;
  padding-top: 12px;
  border-top: 1px solid #f5f7fa;
}
</style>
