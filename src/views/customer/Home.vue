<template>
  <div class="customer-home">
    <!-- Banner -->
    <div class="banner">
      <div class="banner-content">
        <h2>华联城520心动季</h2>
        <p>全场满200减50</p>
        <div class="banner-btn">立即参与</div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-entry">
      <div class="entry-item" v-for="entry in entries" :key="entry.label" @click="$router.push(entry.path)">
        <div class="entry-icon" :style="{ background: entry.bg }">
          <el-icon :size="22" color="#fff"><component :is="entry.icon" /></el-icon>
        </div>
        <span>{{ entry.label }}</span>
      </div>
    </div>

    <!-- 热门优惠 -->
    <div class="section">
      <div class="section-header">
        <h3>热门优惠</h3>
        <span class="more" @click="$router.push('/customer/coupons')">更多 ></span>
      </div>
      <div class="coupon-scroll">
        <div class="coupon-card" v-for="coupon in hotCoupons" :key="coupon.id" @click="claimCoupon(coupon)">
          <div class="coupon-left" :style="{ background: couponColors[coupon.type] }">
            <div class="coupon-value">
              <template v-if="coupon.type === '满减'">¥{{ coupon.discount }}</template>
              <template v-else-if="coupon.type === '折扣'">{{ coupon.discount * 10 }}折</template>
              <template v-else-if="coupon.type === '特价'">¥{{ coupon.discount }}</template>
              <template v-else>赠品</template>
            </div>
            <div class="coupon-cond" v-if="coupon.minSpend">满{{ coupon.minSpend }}可用</div>
          </div>
          <div class="coupon-right">
            <div class="coupon-name">{{ coupon.name }}</div>
            <div class="coupon-merchant">{{ coupon.merchantName }}</div>
            <div class="coupon-btn">立即领取</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐商户 -->
    <div class="section">
      <div class="section-header">
        <h3>推荐商户</h3>
      </div>
      <div class="merchant-scroll">
        <div class="merchant-card" v-for="m in recommendMerchants" :key="m.id">
          <div class="merchant-avatar" :style="{ background: merchantColors[m.category] }">
            {{ m.name[0] }}
          </div>
          <div class="merchant-name">{{ m.name }}</div>
          <el-tag size="small">{{ m.category }}</el-tag>
        </div>
      </div>
    </div>

    <!-- 我的会员卡 -->
    <div class="member-card">
      <div class="member-info">
        <div class="member-level">{{ user?.level || '普通会员' }}</div>
        <div class="member-points">{{ user?.points || 0 }} 积分</div>
      </div>
      <div class="member-balance">
        <span class="balance-label">余额</span>
        <span class="balance-value">¥{{ user?.balance || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'
import { useCouponStore } from '../../stores/coupon'
import { merchants } from '../../mock/merchants'

const userStore = useUserStore()
const couponStore = useCouponStore()

const user = computed(() => userStore.currentUser)

const entries = [
  { label: '领券中心', icon: 'Ticket', bg: '#f56c6c', path: '/customer/coupons' },
  { label: '我的优惠券', icon: 'Document', bg: '#409eff', path: '/customer/my-coupons' },
  { label: '会员中心', icon: 'User', bg: '#67c23a', path: '/customer/profile' },
  { label: '消费记录', icon: 'List', bg: '#e6a23c', path: '/customer/profile' }
]

const hotCoupons = computed(() => couponStore.activeCoupons.slice(0, 6))

const recommendMerchants = merchants.slice(0, 8)

const couponColors = {
  '满减': 'linear-gradient(135deg, #f56c6c, #e6a23c)',
  '折扣': 'linear-gradient(135deg, #409eff, #667eea)',
  '赠品': 'linear-gradient(135deg, #67c23a, #38f9d7)',
  '特价': 'linear-gradient(135deg, #f093fb, #f5576c)'
}

const merchantColors = {
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

function claimCoupon(coupon) {
  ElMessage.success(`已领取「${coupon.name}」`)
}
</script>

<style scoped>
.customer-home {
  padding: 0 0 16px;
}

.banner {
  margin: 0 16px 16px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f56c6c, #e6a23c);
  padding: 24px;
  color: #fff;
}

.banner h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.banner p {
  opacity: 0.9;
  font-size: 14px;
  margin-bottom: 12px;
}

.banner-btn {
  display: inline-block;
  background: rgba(255, 255, 255, 0.25);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

.quick-entry {
  display: flex;
  justify-content: space-around;
  background: #fff;
  margin: 0 16px 16px;
  padding: 16px;
  border-radius: 12px;
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.entry-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.entry-item span {
  font-size: 12px;
  color: #606266;
}

.section {
  margin: 0 16px 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.section-header .more {
  font-size: 13px;
  color: #909399;
  cursor: pointer;
}

.coupon-scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.coupon-card {
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.coupon-left {
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.coupon-value {
  font-size: 22px;
  font-weight: 700;
}

.coupon-cond {
  font-size: 10px;
  opacity: 0.85;
}

.coupon-right {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coupon-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.coupon-merchant {
  font-size: 12px;
  color: #909399;
  margin-bottom: 6px;
}

.coupon-btn {
  font-size: 12px;
  color: #409eff;
  font-weight: 500;
}

.merchant-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.merchant-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 80px;
}

.merchant-avatar {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.merchant-name {
  font-size: 12px;
  color: #303133;
  text-align: center;
  white-space: nowrap;
}

.member-card {
  margin: 0 16px;
  background: linear-gradient(135deg, #1a1a2e, #2d2d44);
  border-radius: 14px;
  padding: 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-level {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.member-points {
  font-size: 13px;
  opacity: 0.7;
}

.balance-label {
  font-size: 12px;
  opacity: 0.7;
  display: block;
  text-align: right;
}

.balance-value {
  font-size: 22px;
  font-weight: 700;
}
</style>
