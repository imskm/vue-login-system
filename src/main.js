import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from '@/stores/AuthStore.js';


// Set beforeEach hook (middleware)
router.beforeEach((to, from) => {
	const auth = useAuthStore();
	console.log("OK22", to.meta.requiresAuth);
	if (to.meta.requiresAuth === true) {
		console.log("OK23");
		// Check user is logged in or not
		// if user is logged in then let them in
		// otherwise redirect to /login page.
		if (auth.isAuthenticated()) {
			return true;
		} else {
			return { name: 'login' };
		}
	}

	return true;
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
