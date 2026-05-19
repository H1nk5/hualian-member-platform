const surnames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '何', '林', '罗', '高']
const names = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '洋', '艳', '勇', '军', '杰', '娟', '涛', '明', '超', '秀兰', '霞']

function randomName() {
  return surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)]
}

function randomPhone() {
  const prefixes = ['138', '139', '137', '136', '135', '158', '159', '188', '187', '186']
  return prefixes[Math.floor(Math.random() * prefixes.length)] + '****' + String(Math.floor(Math.random() * 10000)).padStart(4, '0')
}

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return d.toISOString().split('T')[0]
}

const levels = ['普通会员', '银卡会员', '金卡会员', '钻石会员']
const levelWeights = [50, 30, 15, 5]

function getLevel() {
  const r = Math.random() * 100
  let sum = 0
  for (let i = 0; i < levelWeights.length; i++) {
    sum += levelWeights[i]
    if (r < sum) return levels[i]
  }
  return levels[0]
}

export const users = Array.from({ length: 200 }, (_, i) => {
  const level = getLevel()
  const points = level === '钻石会员' ? Math.floor(Math.random() * 50000) + 50000
    : level === '金卡会员' ? Math.floor(Math.random() * 30000) + 20000
    : level === '银卡会员' ? Math.floor(Math.random() * 15000) + 5000
    : Math.floor(Math.random() * 5000)

  return {
    id: i + 1,
    name: randomName(),
    phone: randomPhone(),
    level,
    points,
    balance: Math.floor(Math.random() * 2000),
    totalSpent: Math.floor(Math.random() * 50000) + 500,
    visitCount: Math.floor(Math.random() * 100) + 1,
    joinDate: randomDate(new Date('2024-01-01'), new Date('2026-05-01')),
    lastVisit: randomDate(new Date('2026-03-01'), new Date('2026-05-19')),
    tags: ['高频消费', '价格敏感', '品质追求', '新品尝鲜', '周末消费'].filter(() => Math.random() > 0.6)
  }
})

export const levelStats = {
  '普通会员': users.filter(u => u.level === '普通会员').length,
  '银卡会员': users.filter(u => u.level === '银卡会员').length,
  '金卡会员': users.filter(u => u.level === '金卡会员').length,
  '钻石会员': users.filter(u => u.level === '钻石会员').length
}
