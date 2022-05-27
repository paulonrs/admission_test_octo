const routes = [
  { path: '/home', component: home },
  { path: '/pessoa', component: pessoa }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = Vue.createApp({})
app.use(router)

app.mount('#app')
