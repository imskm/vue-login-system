import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
	data() {
		return {
			user: null,
			isAuthed: false,
		}
	},

	actions: {
		login(email, password) {
			if (email === 'user@example.com' && password === '12345678') {
				this.isAuthed = true;
				this.rememberAuthedUser(email);
				return true;
			}

			return false;
		},

		isAuthenticated() {
			// Look into localStorage
			if (! this.isAuthed) {
				this.loadAuthInfo();
			}
			return this.isAuthed;
		},

		rememberAuthedUser(userEmail) {
			const authInfo = {
				user: {
					email: userEmail,
					// ...
				},
				isAuthenticated: this.isAuthed,
			}

			let json = JSON.stringify(authInfo);
			localStorage.setItem("auth_info", json);
		},

		loadAuthInfo() {
			let authInfo = JSON.parse(localStorage.getItem("auth_info"));
			if (!authInfo) {
				this.isAuthed = false;
				this.user = null;
			} else {
				this.isAuthed = authInfo.isAuthenticated;
				this.user = authInfo.user;
			}
		},
	}
});
