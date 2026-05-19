import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { coupons as mockCoupons } from '../mock/coupons'

export const useCouponStore = defineStore('coupon', () => {
  const coupons = ref(mockCoupons)

  const activeCoupons = computed(() => {
    return coupons.value.filter(c => c.status === 'active')
  })

  function getCouponsByMerchant(merchantId) {
    return coupons.value.filter(c => c.merchantId === merchantId)
  }

  function addCoupon(coupon) {
    coupons.value.push({
      ...coupon,
      id: Date.now(),
      createdAt: new Date().toISOString()
    })
  }

  return { coupons, activeCoupons, getCouponsByMerchant, addCoupon }
})
