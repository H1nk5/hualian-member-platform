import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { merchants } from '../mock/merchants'

export const useMerchantStore = defineStore('merchant', () => {
  const merchantList = ref(merchants)
  const currentMerchantId = ref(null)

  const currentMerchant = computed(() => {
    return merchantList.value.find(m => m.id === currentMerchantId.value)
  })

  const activeMerchants = computed(() => {
    return merchantList.value.filter(m => m.status === 'active')
  })

  function setCurrentMerchant(id) {
    currentMerchantId.value = id
  }

  return { merchantList, currentMerchant, activeMerchants, setCurrentMerchant }
})
