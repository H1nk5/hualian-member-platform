<div align="center">

# 🏬 Hualian Member Platform

**华联城会员营销平台 · 本地生活智慧营销系统**

<br>

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Element Plus](https://img.shields.io/badge/Element_Plus-409EFF?style=for-the-badge&logo=element&logoColor=white)
![ECharts](https://img.shields.io/badge/ECharts-AA344D?style=for-the-badge&logo=apacheecharts&logoColor=white)

<br>

三端合一 · 会员管理 · 优惠券营销 · 数据分析 · 县域商超解决方案

[系统概述](#系统概述) · [功能特性](#功能特性) · [技术栈](#技术栈) · [快速启动](#快速启动)

</div>

---

## 系统概述

华联城会员营销平台是一套面向县域商超的本地生活智慧营销系统，覆盖**平台管理、商户中心、会员中心**三端，提供统一会员体系、优惠券营销和数据分析能力。

### 三端架构

| 角色 | 功能 |
|------|------|
| 🏢 **平台管理** | 数据看板、会员管理、商户管理、活动管理 |
| 🏪 **商户中心** | 经营概览、优惠券管理、顾客列表、经营报表 |
| 👤 **会员中心** | 领券中心、我的优惠券、个人中心 |

---

## 功能特性

- **统一会员体系** — 积分、等级、储值一体化管理
- **优惠券营销** — 满减、折扣、赠品、特价四种类型
- **数据分析** — 销售趋势、核销统计、复购率分析
- **多角色权限** — 平台 / 商户 / 会员三级权限控制

### 演示数据

| 数据 | 规模 |
|------|------|
| 商户 | 30 家（餐饮、服装、电子、日用、超市等） |
| 会员 | 200 个（普通 / 银卡 / 金卡 / 钻石四级） |
| 优惠券 | 26 张（满减、折扣、赠品、特价） |
| 订单 | 1,000 条 |

---

## 技术栈

| 技术 | 职责 |
|------|------|
| Vue 3 | 前端框架 |
| Vite | 构建工具 |
| Element Plus | UI 组件库 |
| Pinia | 状态管理 |
| Vue Router | 路由管理 |
| ECharts | 数据可视化 |

---

## 快速启动

```bash
git clone https://github.com/H1nk5/hualian-member-platform.git
cd hualian-member-platform
npm install
npm run dev
```

---

## 项目结构

```
src/
├── components/                # 布局组件
│   ├── AdminLayout.vue
│   ├── MerchantLayout.vue
│   └── CustomerLayout.vue
├── views/                     # 页面
│   ├── Login.vue
│   ├── admin/                 # 管理端
│   ├── merchant/              # 商户端
│   └── customer/              # 顾客端
├── stores/                    # Pinia 状态管理
├── mock/                      # Mock 数据
├── router/                    # 路由配置
└── styles/                    # 全局样式
```

---

## 商业模式

### SaaS 订阅

| 版本 | 月费 | 功能 |
|------|------|------|
| 基础版 | ¥299 | 会员管理 + 基础优惠券 |
| 标准版 | ¥599 | + 数据分析 + 营销工具 |
| 高级版 | ¥999 | + 多门店 + API 对接 |

### 按效果付费

- 优惠券核销：¥0.1-0.3/张
- 新增会员：¥0.5/人

---

## 开源许可

MIT © [H1nk5](https://github.com/H1nk5)
