import Vue from 'vue'
import VueRouter from 'vue-router'
import About from './components/About.vue'
import Home from './components/HelloWorld.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About}
    ]
})
