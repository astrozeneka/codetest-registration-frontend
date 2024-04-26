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
const routes = [
  {path: '/login', component: Login},
  {path: '/register', component: Register}
]



const app = createApp(App)

registerPlugins(app)

app.mount('#app')
