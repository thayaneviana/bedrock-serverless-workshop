import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView.vue'
import AboutView from './views/AboutView.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import { clearAuthToken, isLoggedIn } from './utils/auth'
import InternalRag from './views/InternalRag.vue'
import ExternalRag from './views/ExternalRag.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'internal-rag',
      component: InternalRag
    },
    {
      path: '/external-rag',
      name: 'external-rag',
      component: ExternalRag
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter(to, from, next) {
        clearAuthToken()
        next('/login')
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.name == 'login' && isLoggedIn()) {
    console.log('redirecting to /')
    next({ path: '/' })
  }
  else if (!to.meta.allowAnonymous && !isLoggedIn()) {

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  else {
    console.log('router next()')
    next()
  }
})

export default router
