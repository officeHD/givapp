<template>
	<div class="layout">
		<head :hasleft="false" title="mine"></head>
		<scroller class="scroller" :show-scrollbar="false">
			<div class="userhead" @click="gonext('root:app/user/myQR/myQR.js')">
				<div class="userTop">
					<div class="userImg">
						<image class="avator" :src="userData.headimgurl" />
					</div>
					<div class="userInfo">
						<text class="username">{{userData.user_name}}</text>
						<text class="userPhone">{{userData.phone_number}}</text>
					</div>
					<text class="iconfont righticon">&#xe6a1;</text>
				</div>
			</div>

			<x-cell title="My order" :hasArrow="true" class="list-margin" @cellClick="gonext('root:app/user/order_list/order_list.js',{type:0})">
				<text slot="value" style="color:#999;font-size:30px;">View my orders</text>
			</x-cell>
			<div class="orderBox">
				<div class="sectionItem" @click="gonext('root:app/user/order_list/order_list.js',{type:1})">
					<text class="iconfont itemIcon">&#xe626;</text>
					<text class="itemTitle">Unpaid</text>
				</div>
				<div class="sectionItem " @click="gonext('root:app/user/order_list/order_list.js',{type:2})">
					<text class="iconfont itemIcon">&#xe652;</text>
					<text class="itemTitle">Waiting shipping</text>
				</div>
				<div class="sectionItem " @click="gonext('root:app/user/order_list/order_list.js',{type:3})">
					<text class="iconfont itemIcon">&#xe668;</text>
					<text class="itemTitle">Shipped</text>
				</div>
				<div class="sectionItem " @click="gonext('root:app/user/order_list/order_list.js',{type:4})">
					<text class="iconfont itemIcon">&#xe616;</text>
					<text class="itemTitle">After sale</text>
				</div>
			</div>
			
			
			<x-cell title="Balance" :hasArrow="true" @cellClick="gonext('root:app/user/balance/balance.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe670;</text>
				</div>
			</x-cell>
			<x-cell title="Selling" :hasArrow="true" @cellClick="gonext('root:app/selling/selling.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe670;</text>
				</div>
			</x-cell>
			<x-cell title="Sold" :hasArrow="true" @cellClick="gonext('root:app/selling/sold.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe685;</text>
				</div>
			</x-cell>

			<x-cell title="Collection" :hasArrow="true" @cellClick="gonext('root:app/user/keep/keep.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe634;</text>
				</div>
			</x-cell>
			<x-cell title="Coupon" :hasArrow="true" @cellClick="gonext('root:app/user/coupon/coupon.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe617;</text>
				</div>
			</x-cell>


			<x-cell title="Help" :hasArrow="true"  @cellClick="gonext('root:app/user/help/help.js')"    >
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe6cf;</text>
				</div>
			</x-cell>
			<x-cell title="Setting" :hasArrow="true" @cellClick="gonext('root:app/user/setting/setting.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:38}">&#xe615;</text>
				</div>
			</x-cell>
			<x-cell title="appointment time" :hasArrow="true" @cellClick="gonext('root:app/user/appointment/index.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe63f;</text>
				</div>
			</x-cell>
			<x-cell title="Customer service" :hasArrow="true" @cellClick="gonext('root:app/msg/msg.js')">
				<div slot="label" class="list-icon">
					<text class="iconfont" :style="{fontSize:40}">&#xe605;</text>
				</div>
			</x-cell>


			<div style="margin-bottom:40px"></div>
		</scroller>
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");
	import asCore from "../../mixin/core";
	import {
		get_users_info
	} from "../../mixin/ajax";
	const updateImg = new BroadcastChannel("updateImg");

	export default {
		components: {
			"x-cell": require("../../component/cell.vue")
		},
		data() {
			return {
				users_id:"",
				refreshing: false,
				userData: {
					headimgurl: "",
					user_name: "",
					phone_number: ""
				}
			};
		},
		props: {},
		created() {
			updateImg.onmessage = this.updateImg;
			// this.loadData();
		},
		methods: {
			loadData(users_id) {
				this.users_id=users_id;
				get_users_info({
					users_id: users_id
				}, (res, flag) => {
					if (flag) {
						if (res.code == 200) {
							this.userData = res.data;
							asCore.setContext(res.data)
						}
					}
				})
			},
			/* 判断是否登录 */
			isLogin: function() {
				var s = this;
				asCore.getBsessionid(bid => {
					if (bid) {
						asCore.getContext(context => {
							this.userData = context; 
						});
					}
				});

			},
			/* 更新头像 */
			updateImg(event) {
				this.loadData(this.users_id);
			},
			onrefresh(event) {
				var s = this;
				s.refreshing = true;
				setTimeout(() => {
					s.refreshing = false;
				}, 1000);
			},
			gonext(url, parmar) {
				this.push(url, parmar);
			}
		}
	};
</script>
<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.layout {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background-color: #f2f2f2;
	}

	.scroller {
		flex: 1;
		background-color: #f2f2f2;
	}

	.userhead {
		width: 750px;
		padding: 20px 30px;
		background-color: #303030;
		justify-content: center;
	}

	.userTop {
		/* border-bottom-color: #f2f2f2;
  border-bottom-width: 2px;
  border-bottom-style: dashed; */
		flex-direction: row;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 20px;
	}

	.userImg {
		width: 100px;
		height: 100px;
		margin-left: 40px;
		margin-right: 20px;
	}

	.avator {
		width: 100px;
		height: 100px;
		border-radius: 50px;
		background-color: #F2F2F2;
	}

	.userInfo {
		flex: 1;
	}

	.username {
		font-size: 32px;
		font-weight: bold;
		margin-bottom: 10px;
		color: #ffffff;
	}

	.userPhone {
		font-size: 28px;
		color: #ffffff;
	}

	.righticon {
		font-size: 40px;
		color: #ffffff;
	}

	.orderBox {
		flex-direction: row;
		padding: 20px 0;
		background-color: #fff;
		margin-bottom: 20px;
	}

	.sectionItem {
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.itemNum {
		margin-bottom: 10px;
		color: #333;
	}

	.itemTitle {
		color: #666;
	}

	.itemIcon {
		text-align: center;
		line-height: 68px;
		width: 68px;
		height: 68px;
		font-size: 40px;
	}

	.list-icon {
		height: 65px;
		width: 65px;
		border-radius: 10px;
		margin-right: 20px;
		align-items: center;
		justify-content: center;
	}

	.list-margin {
		margin-top: 30px;
	}
</style>
