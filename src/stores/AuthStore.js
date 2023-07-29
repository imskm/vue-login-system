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
			const url = 'http://auth-demo/auth/login/authenticate';
			const form = new FormData();
			form.append("email", email);
			form.append("password", password);

			const option = {
				method: "POST",
				body: form,
			};

			return new Promise((resolve, reject) => {
				fetch(url, option).then((res) => {
					return res.json();
				}).then((data) => {
					//
					console.log(data);
					if (data.status == "error") {
						reject(data.errors);
					} else {
						console.log("OK");

						// Handle successful login

						this.isAuthed = true;
						this.rememberAuthedUser(email);
						resolve(true);
						
					}

				});
			});

			

			// OLD code
			// if (email === 'user@example.com' && password === '12345678') {
			// 	this.isAuthed = true;
			// 	this.rememberAuthedUser(email);
			// 	return true;
			// }

			// return false;
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
