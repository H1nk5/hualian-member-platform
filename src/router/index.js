import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // 平台管理端
  {
    path: '/admin',
    component: () => import('../components/AdminLayout.vue'),
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue')
      },
      {
        path: 'members',
        name: 'MemberList',
        component: () => import('../views/admin/MemberList.vue')
      },
      {
        path: 'merchants',
        name: 'MerchantList',
        component: () => import('../views/admin/MerchantList.vue')
      },
      {
        path: 'activities',
        name: 'ActivityList',
        component: () => import('../views/admin/ActivityList.vue')
      }
    ]
  },
  // 商户端
  {
    path: '/merchant',
    component: () => import('../components/MerchantLayout.vue'),
    redirect: '/merchant/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'MerchantDashboard',
        component: () => import('../views/merchant/MerchantDashboard.vue')
      },
      {
        path: 'coupons',
        name: 'CouponManage',
        component: () => import('../views/merchant/CouponManage.vue')
      },
      {
        path: 'customers',
        name: 'CustomerList',
        component: () => import('../views/merchant/CustomerList.vue')
      },
      {
        path: 'report',
        name: 'DataReport',
        component: () => import('../views/merchant/DataReport.vue')
      }
    ]
  },
  // 顾客端
  {
    path: '/customer',
    component: () => import('../components/CustomerLayout.vue'),
    redirect: '/customer/home',
    children: [
      {
        path: 'home',
        name: 'CustomerHome',
        component: () => import('../views/customer/Home.vue')
      },
      {
        path: 'coupons',
        name: 'CouponList',
        component: () => import('../views/customer/CouponList.vue')
      },
      {
        path: 'my-coupons',
        name: 'MyCoupons',
        component: () => import('../views/customer/MyCoupons.vue')
      },
      {
        path: 'profile',
        name: 'CustomerProfile',
        component: () => import('../views/customer/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
