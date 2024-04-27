/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Routes
import { createMemoryHistory, createRouter } from 'vue-router'
import Login from "./pages/login.vue";
import Register from "./pages/register.vue";
import Applications from "./pages/applications.vue";
import Home from "./pages/home.vue";
/*const routes = [
  {path: '/', redirect: '/home'},
  {path: '/home', component: Home},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/applications', component: Applications}
]*/



const app = createApp(App)
// Add routes



registerPlugins(app)

app.mount('#app')
