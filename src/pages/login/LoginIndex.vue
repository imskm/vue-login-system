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
			let ret = this.login(this.email, this.password);

			if (ret === true) {
				this.$router.push({name: "dashboard"});
			}

			this.message = "Invalid email or password.";

		},

	},

	computed: {
		...mapState(useAuthStore, ["login"]),
	}

}
</script>