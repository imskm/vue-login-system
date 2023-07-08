import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	data() {
		return {
			isAuthed: false,
		}
	},

	actions: {
		login(email, password) {
			if (email === 'user@example.com' && password === '12345678') {
				this.isAuthed = true;
				return true;
			}

			return false;
		},

		isAuthenticated() {
			return this.isAuthed;
		},
	}
});
