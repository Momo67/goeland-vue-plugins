import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/HelloWorld.vue').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/Test.vue').default
    },
    {
      path: '*',
      name: 'default',
      redirect: '/'
    }
  ]
})
