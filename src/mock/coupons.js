export const coupons = [
  // 兰考烩面馆
  { id: 1, merchantId: 1, merchantName: '兰考烩面馆', name: '满50减10', type: '满减', discount: 10, minSpend: 50, total: 500, claimed: 328, used: 215, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '餐饮' },
  { id: 2, merchantId: 1, merchantName: '兰考烩面馆', name: '招牌烩面8折', type: '折扣', discount: 0.8, minSpend: 0, total: 300, claimed: 180, used: 120, status: 'active', startDate: '2026-05-10', endDate: '2026-06-10', category: '餐饮' },
  // 老王烧烤
  { id: 3, merchantId: 2, merchantName: '老王烧烤', name: '满100减25', type: '满减', discount: 25, minSpend: 100, total: 400, claimed: 256, used: 178, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '餐饮' },
  { id: 4, merchantId: 2, merchantName: '老王烧烤', name: '啤酒买一送一', type: '赠品', discount: 0, minSpend: 30, total: 200, claimed: 150, used: 98, status: 'active', startDate: '2026-05-05', endDate: '2026-06-05', category: '餐饮' },
  // 蜜雪冰城
  { id: 5, merchantId: 3, merchantName: '蜜雪冰城', name: '第二杯半价', type: '折扣', discount: 0.75, minSpend: 0, total: 1000, claimed: 678, used: 445, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '餐饮' },
  // 森马服饰
  { id: 6, merchantId: 7, merchantName: '森马服饰', name: '满200减50', type: '满减', discount: 50, minSpend: 200, total: 300, claimed: 189, used: 95, status: 'active', startDate: '2026-05-01', endDate: '2026-06-01', category: '服装' },
  { id: 7, merchantId: 7, merchantName: '森马服饰', name: '新品9折', type: '折扣', discount: 0.9, minSpend: 0, total: 500, claimed: 320, used: 180, status: 'active', startDate: '2026-05-10', endDate: '2026-06-10', category: '服装' },
  // 以纯
  { id: 8, merchantId: 8, merchantName: '以纯', name: '满300减80', type: '满减', discount: 80, minSpend: 300, total: 200, claimed: 145, used: 72, status: 'active', startDate: '2026-05-05', endDate: '2026-06-05', category: '服装' },
  // 鸿星尔克
  { id: 9, merchantId: 10, merchantName: '鸿星尔克', name: '全场85折', type: '折扣', discount: 0.85, minSpend: 0, total: 400, claimed: 267, used: 156, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '服装' },
  // 安踏
  { id: 10, merchantId: 12, merchantName: '安踏', name: '满500减120', type: '满减', discount: 120, minSpend: 500, total: 250, claimed: 178, used: 89, status: 'active', startDate: '2026-05-01', endDate: '2026-06-01', category: '服装' },
  // 华为授权店
  { id: 11, merchantId: 13, merchantName: '华为授权店', name: '配件满100减20', type: '满减', discount: 20, minSpend: 100, total: 300, claimed: 210, used: 135, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '电子' },
  // 小米之家
  { id: 12, merchantId: 14, merchantName: '小米之家', name: '手机壳9.9元', type: '特价', discount: 9.9, minSpend: 0, total: 500, claimed: 389, used: 267, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '电子' },
  // 名创优品
  { id: 13, merchantId: 17, merchantName: '名创优品', name: '满68减15', type: '满减', discount: 15, minSpend: 68, total: 600, claimed: 412, used: 278, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '日用' },
  // 屈臣氏
  { id: 14, merchantId: 18, merchantName: '屈臣氏', name: '面膜买3送1', type: '赠品', discount: 0, minSpend: 99, total: 300, claimed: 234, used: 156, status: 'active', startDate: '2026-05-05', endDate: '2026-06-05', category: '日用' },
  // 永辉超市
  { id: 15, merchantId: 19, merchantName: '永辉超市', name: '满100减10', type: '满减', discount: 10, minSpend: 100, total: 2000, claimed: 1456, used: 987, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '超市' },
  { id: 16, merchantId: 19, merchantName: '永辉超市', name: '蔬菜水果9折', type: '折扣', discount: 0.9, minSpend: 0, total: 1500, claimed: 1023, used: 756, status: 'active', startDate: '2026-05-10', endDate: '2026-06-10', category: '超市' },
  // 百果园
  { id: 17, merchantId: 20, merchantName: '百果园', name: '满30减5', type: '满减', discount: 5, minSpend: 30, total: 800, claimed: 567, used: 389, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '生鲜' },
  // 周大福
  { id: 18, merchantId: 21, merchantName: '周大福', name: '黄金每克减20', type: '满减', discount: 20, minSpend: 0, total: 100, claimed: 67, used: 34, status: 'active', startDate: '2026-05-01', endDate: '2026-06-01', category: '珠宝' },
  // 万达影城
  { id: 19, merchantId: 23, merchantName: '万达影城', name: '电影票立减5元', type: '满减', discount: 5, minSpend: 30, total: 1000, claimed: 734, used: 512, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '娱乐' },
  { id: 20, merchantId: 23, merchantName: '万达影城', name: '爆米花套餐半价', type: '折扣', discount: 0.5, minSpend: 0, total: 500, claimed: 345, used: 234, status: 'active', startDate: '2026-05-10', endDate: '2026-06-10', category: '娱乐' },
  // 孩子王
  { id: 21, merchantId: 25, merchantName: '孩子王', name: '奶粉满299减50', type: '满减', discount: 50, minSpend: 299, total: 200, claimed: 134, used: 78, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '母婴' },
  // 正新鸡排
  { id: 22, merchantId: 4, merchantName: '正新鸡排', name: '鸡排+饮品套餐15元', type: '特价', discount: 15, minSpend: 0, total: 500, claimed: 356, used: 234, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '餐饮' },
  // 华莱士
  { id: 23, merchantId: 5, merchantName: '华莱士', name: '满40减8', type: '满减', discount: 8, minSpend: 40, total: 600, claimed: 423, used: 289, status: 'active', startDate: '2026-05-01', endDate: '2026-05-31', category: '餐饮' },
  // 李宁
  { id: 24, merchantId: 30, merchantName: '李宁', name: '满400减100', type: '满减', discount: 100, minSpend: 400, total: 200, claimed: 145, used: 67, status: 'active', startDate: '2026-05-05', endDate: '2026-06-05', category: '服装' },
  // 已结束的券
  { id: 25, merchantId: 1, merchantName: '兰考烩面馆', name: '春节特惠满30减8', type: '满减', discount: 8, minSpend: 30, total: 300, claimed: 300, used: 267, status: 'expired', startDate: '2026-01-20', endDate: '2026-02-28', category: '餐饮' },
  { id: 26, merchantId: 19, merchantName: '永辉超市', name: '年货节满200减30', type: '满减', discount: 30, minSpend: 200, total: 1000, claimed: 1000, used: 876, status: 'expired', startDate: '2026-01-10', endDate: '2026-02-15', category: '超市' }
]

export const couponTypes = ['全部', '满减', '折扣', '赠品', '特价']
export const couponStatuses = ['全部', '进行中', '已结束']
