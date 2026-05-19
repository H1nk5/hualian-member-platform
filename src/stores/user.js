import { defineStore } from 'pinia'
import { ref } from 'vue'
import { users } from '../mock/users'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)
  const role = ref('') // admin / merchant / customer

  function loginAsAdmin() {
    currentUser.value = { name: '管理员', role: 'admin' }
    role.value = 'admin'
  }

  function loginAsMerchant(merchantId) {
    currentUser.value = { merchantId, role: 'merchant' }
    role.value = 'merchant'
  }

  function loginAsCustomer(userId) {
    const user = users.find(u => u.id === userId) || users[0]
    currentUser.value = user
    role.value = 'customer'
  }

  function logout() {
    currentUser.value = null
    role.value = ''
  }

  return { currentUser, role, loginAsAdmin, loginAsMerchant, loginAsCustomer, logout }
})
