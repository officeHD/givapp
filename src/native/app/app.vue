<template>
	<div class="layout">
		<x-tabbar>
			<div class="item-container" :style="contentStyle">
				<home ref="messageCom"></home>
			</div>
			<div class="item-container" :style="contentStyle">
				<category ref="appcenterCom"></category>
			</div>
			<div class="item-container" :style="contentStyle">
				<cart ref="maillistCom"></cart>
			</div>
			<div class="item-container" :style="contentStyle">
				<user ref="myinfo"></user>
			</div>
		</x-tabbar>
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");
	import Utils from '../mixin/utils'
	export default {
		components: {
			"x-tabbar": require("../component/mainpage.vue"),
			"home": require("./main/home.vue"),
			"category": require("./main/category.vue"),
			"cart": require("./main/cart.vue"),
			"user": require("./main/user.vue")
		},

		methods: {
			onLoad(p) {},
			gonext(url) {
				//this.push('test.js',{name:"ssss"})
				this.log("jdksdjsk", "error");
				navigator.push(url);
			},

			searchClick() {
				this.toast("搜索跳转")
			},
			letfClick() {
				this.toast("左边按钮跳转")
			},
			rightClick() {
				this.toast("右边边按钮跳转")
			},
		},
		created() {
			const tabPageHeight = Utils.env.getPageHeight();
			const {
				tabStyles
			} = this;
			this.contentStyle = {
				height: tabPageHeight + 10 + "px"
			};
		}
	};
</script>
<style scoped>
	.layout {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.item-container {
		flex: 1;
		width: 750px;
		background-color: #f5f5f5;
	}
</style>
