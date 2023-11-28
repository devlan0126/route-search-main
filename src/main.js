import Vue from 'vue'
import App from './App.vue'
import comsUI from "./components/index"
import router from './router'

Vue.config.productionTip = false
Vue.use(comsUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
