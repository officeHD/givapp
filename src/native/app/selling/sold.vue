<template>
	<div>
		<head :back="true" bgcolor="#303030" title="Sold"></head>


	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	export default {
		data() {
			return {
				amount: 0
			};
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			returnpage() {
				navigator.backTo("A");
			}
		}
	};
</script>

<style scoped>
</style>
