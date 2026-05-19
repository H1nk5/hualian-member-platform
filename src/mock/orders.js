const merchantIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return d.toISOString()
}

export const orders = Array.from({ length: 1000 }, (_, i) => {
  const merchantId = merchantIds[Math.floor(Math.random() * merchantIds.length)]
  const amount = Math.floor(Math.random() * 500) + 10
  const discount = Math.random() > 0.6 ? Math.floor(amount * (Math.random() * 0.3 + 0.05)) : 0

  return {
    id: i + 1,
    orderId: `HL${String(2026000000 + i).padStart(10, '0')}`,
    userId: Math.floor(Math.random() * 200) + 1,
    merchantId,
    amount,
    discount,
    paid: amount - discount,
    couponId: discount > 0 ? Math.floor(Math.random() * 26) + 1 : null,
    status: Math.random() > 0.05 ? 'completed' : 'refunded',
    createdAt: randomDate(new Date('2026-03-01'), new Date('2026-05-19'))
  }
})

// 按日统计
export function getDailyStats(days = 30) {
  const stats = []
  const now = new Date('2026-05-19')
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const dayOrders = orders.filter(o => o.createdAt.startsWith(dateStr))
    stats.push({
      date: dateStr,
      orderCount: dayOrders.length,
      GMV: dayOrders.reduce((sum, o) => sum + o.paid, 0),
      couponUsed: dayOrders.filter(o => o.couponId).length
    })
  }
  return stats
}

// 按商户统计
export function getMerchantStats() {
  const stats = {}
  orders.forEach(o => {
    if (!stats[o.merchantId]) {
      stats[o.merchantId] = { orderCount: 0, GMV: 0, couponUsed: 0 }
    }
    stats[o.merchantId].orderCount++
    stats[o.merchantId].GMV += o.paid
    if (o.couponId) stats[o.merchantId].couponUsed++
  })
  return stats
}
