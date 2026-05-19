<template>
  <div class="coupon-manage">
    <div class="filter-bar">
      <el-button type="primary" @click="showCreate = true">
        <el-icon><Plus /></el-icon> 创建优惠券
      </el-button>
      <el-radio-group v-model="statusFilter">
        <el-radio-button value="all">全部</el-radio-button>
        <el-radio-button value="active">进行中</el-radio-button>
        <el-radio-button value="expired">已结束</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 优惠券卡片列表 -->
    <el-row :gutter="16">
      <el-col :span="12" v-for="coupon in filteredCoupons" :key="coupon.id">
        <div class="coupon-card" :class="{ expired: coupon.status === 'expired' }">
          <div class="coupon-left">
            <div class="coupon-value">
              <template v-if="coupon.type === '满减'">
                <span class="currency">¥</span>
                <span class="amount">{{ coupon.discount }}</span>
              </template>
              <template v-else-if="coupon.type === '折扣'">
                <span class="amount">{{ coupon.discount * 10 }}</span>
                <span class="unit">折</span>
              </template>
              <template v-else-if="coupon.type === '特价'">
                <span class="currency">¥</span>
                <span class="amount">{{ coupon.discount }}</span>
              </template>
              <template v-else>
                <span class="amount gift">赠品</span>
              </template>
            </div>
            <div class="coupon-condition" v-if="coupon.minSpend">
              满{{ coupon.minSpend }}可用
            </div>
          </div>
          <div class="coupon-right">
            <div class="coupon-header">
              <h4>{{ coupon.name }}</h4>
              <el-tag :type="coupon.status === 'active' ? 'success' : 'info'" size="small">
                {{ coupon.status === 'active' ? '进行中' : '已结束' }}
              </el-tag>
            </div>
            <div class="coupon-stats">
              <div class="stat">
                <span class="stat-label">发放</span>
                <span class="stat-value">{{ coupon.claimed }}/{{ coupon.total }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">核销</span>
                <span class="stat-value">{{ coupon.used }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">核销率</span>
                <span class="stat-value">{{ Math.round(coupon.used / coupon.claimed * 100) }}%</span>
              </div>
            </div>
            <div class="coupon-time">
              {{ coupon.startDate }} ~ {{ coupon.endDate }}
            </div>
            <div class="coupon-actions">
              <el-button size="small" text type="primary">编辑</el-button>
              <el-button size="small" text type="primary">数据</el-button>
              <el-button size="small" text type="danger" v-if="coupon.status === 'active'">下架</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 创建优惠券弹窗 -->
    <el-dialog v-model="showCreate" title="创建优惠券" width="520px">
      <el-form label-width="100px">
        <el-form-item label="优惠券名称">
          <el-input placeholder="如：满50减10" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group>
            <el-radio value="满减">满减</el-radio>
            <el-radio value="折扣">折扣</el-radio>
            <el-radio value="赠品">赠品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠金额">
          <el-input-number :min="1" :max="500" />
        </el-form-item>
        <el-form-item label="使用门槛">
          <el-input-number :min="0" :max="1000" />
          <span style="margin-left: 8px; color: #909399">元（0为无门槛）</span>
        </el-form-item>
        <el-form-item label="发放数量">
          <el-input-number :min="1" :max="10000" />
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker type="daterange" start-placeholder="开始" end-placeholder="结束" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="showCreate = false; ElMessage.success('优惠券创建成功')">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCouponStore } from '../../stores/coupon'
import { useMerchantStore } from '../../stores/merchant'

const couponStore = useCouponStore()
const merchantStore = useMerchantStore()

const showCreate = ref(false)
const statusFilter = ref('all')

const merchantCoupons = computed(() => {
  return couponStore.getCouponsByMerchant(merchantStore.currentMerchantId || 1)
})

const filteredCoupons = computed(() => {
  if (statusFilter.value === 'all') return merchantCoupons.value
  return merchantCoupons.value.filter(c => c.status === statusFilter.value)
})
</script>

<style scoped>
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
}

.coupon-card {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
}

.coupon-card:hover {
  transform: translateY(-2px);
}

.coupon-card.expired {
  opacity: 0.6;
}

.coupon-left {
  width: 120px;
  background: linear-gradient(135deg, #f56c6c, #e6a23c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.coupon-value {
  display: flex;
  align-items: baseline;
}

.coupon-value .currency {
  font-size: 16px;
}

.coupon-value .amount {
  font-size: 36px;
  font-weight: 700;
}

.coupon-value .unit {
  font-size: 16px;
  margin-left: 2px;
}

.coupon-value .gift {
  font-size: 20px;
}

.coupon-condition {
  font-size: 12px;
  opacity: 0.85;
  margin-top: 4px;
}

.coupon-right {
  flex: 1;
  padding: 16px;
}

.coupon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.coupon-header h4 {
  font-size: 15px;
}

.coupon-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
  display: block;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
}

.coupon-time {
  font-size: 12px;
  color: #c0c4cc;
  margin-bottom: 8px;
}

.coupon-actions {
  display: flex;
  gap: 8px;
}
</style>
