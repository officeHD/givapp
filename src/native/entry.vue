<template>
	<div style="">
	</div>
</template>
<script>
	export default {
		props: {},
		data() {
			return {}
		},
		methods: {
			onLoad() {
				// const page = weex.requireModule("page");
				// page.doubleBack();
				let url = 'root:index.js'
				  this.goToMain(url)
			},
			goToMain(url) {
				let navigator = weex.requireModule('navigator')
				this.log(weex.config.env.platform)
				if (weex.config.env.platform != 'iOS') {
					navigator.pushFull({
						url: url,
						animated: false
					})
				} else {
					navigator.presentFull({
						url: url,
						animated: false
					})
				}
			}
		},
		created() {
			// this.goToMain('root:index.js')
		}
	}
</script>
<style scoped>
</style>
