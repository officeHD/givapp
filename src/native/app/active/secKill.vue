<template>
	<div>
		 <text>秒杀列表</text>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	export default {
		data() {
			return {
				passwd: "",
				loginType: "email"
			};
		},

		methods: {
			next() {
				navigator.push("root:app/login/vertifyCode.js");
			}
		}
	};
</script>

<style scoped>
	 
</style>
