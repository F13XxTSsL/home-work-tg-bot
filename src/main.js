import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Index from "./views/Index.vue";
import RegistrationMember from "./views/RegistrationMember.vue";
import ListMembers from "./views/ListMembers.vue";



const router = createRouter({
    routes: [
        { path: '/', component: Index },
        { path: '/registration-member', component: RegistrationMember },
        { path: '/list-members', component: ListMembers },
    ],
    history: createWebHistory(),
    scrollBehavior(to, from) {
        if (to.path === '/list-members' || '/registration-member') {
            return { x: 0, y: 0 }
        }
    }
})

export const tg = window.Telegram.WebApp;

tg.expand();


const app = createApp(App)
app.use(router)
app.mount('#app')
