<template>
	<form action="">
		<p v-if="message">{{ message }}</p>
		<input v-model="email" type="email"><br>
		<input v-model="password" type="password"><br>
		<button @click.prevent="onLogin" type="submit" >Login</button>
	</form>
</template>


<script>
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore.js';

export default {
	data() {
		return {
			email: "",
			password: "",
			message: "",
		}
	},

	methods: {
		onLogin() {
			// console.log("OK");
			this.login(this.email, this.password).then((isAuth) => {

				this.$router.push({name: "dashboard"});

			}).catch((error) => {

				// console.log(error.errors);
				// this.message = error.errors.email;
				// console.log(this.message);

			});

			// if (ret === true) {
			// 	this.$router.push({name: "dashboard"});
			// }

			// this.message = "Invalid email or password.";

		},

	},

	computed: {
		...mapState(useAuthStore, ["login"]),
	}

}
</script>