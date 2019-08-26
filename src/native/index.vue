<template>
	<div class="layout">
		<x-tabbar :currentPage="currentPage">
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
	const loginBroad = new BroadcastChannel("login");
	import Utils from "./mixin/utils";
	import asCore from "./mixin/core";
	export default {
		components: {
			"x-tabbar": require("./component/mainpage.vue"),
			home: require("./app/main/home.vue"),
			category: require("./app/main/category.vue"),
			cart: require("./app/main/cart.vue"),
			user: require("./app/main/user.vue")
		},
		data() {
			return {
				currentPage: 0
			};
		},
		methods: {
			onLoad(param) {},
			gonext(url) {
				//this.push('test.js',{name:"ssss"})
				navigator.push(url);
			},
			searchClick() {
				this.toast("搜索跳转");
			},
			letfClick() {
				this.toast("左边按钮跳转");
			},
			onLoad() {
				// const page = weex.requireModule("page");
				// page.doubleBack();
			},
			rightClick() {
				this.toast("右边边按钮跳转");
			}
		},
		created() {
			
		},

		beforeCreate() {
			let navbar = weex.requireModule("navbar");
			navbar.setStatusBarStyle("white");
			let that = this;
			
			/* 判断是否登录过和是否超时(超时将自动从登) */
			asCore.getBsessionid(sessionid => {
				if (!sessionid) {
					this.log("判断是否登录了");
					navigator.push("root:app/login/login.js");
				} else {
					this.log("已登录获取数据");
					that.$refs.messageCom.loadData(sessionid);
					that.$refs.appcenterCom.loadData(sessionid);
					that.$refs.maillistCom.loadData(sessionid);
					that.$refs.myinfo.loadData(sessionid);
					// 目前不需要自动登录
					// asCore.autoLogin(() => {
					// 	/* 加载context */
					// 	that.$refs.myinfo.isLogin();
					// });
				}
			});
			/* 双击退出程序 */
 
			loginBroad.onmessage = function(event) {
				var data = event.data;
				if (data.success == 1) {
					page.reload();
				}
			};
		},
		created() {
			const tabPageHeight = Utils.env.getPageHeight();
			const {
				tabStyles
			} = this;
			this.contentStyle = {
				height: tabPageHeight + 10 + "px"
			};
			var globalEvent = weex.requireModule("globalEvent");
			globalEvent.addEventListener("onPageInit", function(e) {
				navigator.setRoot("A");
				navigator.setPageId("A");
			});
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
