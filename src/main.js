import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  ArrowDown, ArrowRight, Cellphone, CircleCheck, Connection, DataAnalysis, Document,
  Download, Money, Odometer, Plus, Promotion, Shop, Ticket, TrendCharts, User
} from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'

const app = createApp(App)

const icons = {
  ArrowDown, ArrowRight, Cellphone, CircleCheck, Connection, DataAnalysis, Document,
  Download, Money, Odometer, Plus, Promotion, Shop, Ticket, TrendCharts, User
}
for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.mount('#app')
