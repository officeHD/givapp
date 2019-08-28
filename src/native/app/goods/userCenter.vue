<!-- 卖家详情 -->
<template>
	<div class="wrapper">
		<head bgcolor="rgba(0,0,0,0)"></head>
		<image class="imgbg" :src="userInfo.headimgurl" resize="cover"></image>
		<div class="imgMask"> </div>


		<div class="userInfo">
			<image class="userAvator" :src="userInfo.headimgurl"></image>
			<div class="userCenter">
				<div class="row acenter">
					<text class="userName">{{userInfo.nickname}}</text>
					<text class="credit">Excellent credit</text>
				</div>
				<div class="row">
					<text class="row_title">ust released in Hefei</text>
					<!-- <text class="row_num">50</text> -->
				</div>
			</div>
		</div>
		<scroller class="scroller">
			<text class="mainTit">His release</text>

			<div class="recontent">
				<div class="reitem" v-for="item in secondList" :key="item">
					<image class="goodsImga" :src="item.thumb" @click="gonext('root:app/goods/goods2.js',{id:item.id})" />
					<view class="contentBox">
						<text class="goodsTitle2">{{item.title}}</text>
						<view class="priceInfo">
							<view class="leftInfo">
								<text class="symbol">$</text>
								<text class="money">{{item.price}}</text>
								<!-- <text class="reduce">80%</text> -->
								<!-- <text class="shopType">NEW</text> -->
							</view>
							<view class="leftInfo">
								<!-- <text class="iconfont shopIcon">&#xe64c;</text>
								<text class="iconfont shopIcon">&#xe634;</text>
								<text class="iconfont shopIcon">&#xe607;</text> -->
							</view>
						</view>
					</view>
				</div>
				<div class="reitemS"></div>
			</div>
		</scroller>

	</div>

</template>

<script>
	import {
		get_users_info,
		get_goods_list
	} from "../../mixin/ajax.js";
	import asCore from "../../mixin/core";
	export default {
		data() {
			return {
				page: 1,
				userId: "",
				userInfo: {
					"id": 27,
					"account": "10000000134",
					"status": 1,
					"phone_number": "13635697675",
					"headimgurl": "",
					"nickname": "tll",
					"email": "111111@qq.com",
					"sex": 2,
					"user_name": "檀玲玲",
					"users_uuid": "2cf751e717424373b99dc74c68927ee2",
					"refund_name": "檀",
					"refund_phone": "13635697675",
					"refund_address": "测试地址",
					"take_time": "每天8:00-10:00",
					"receive_time": "每天18:00-20:00",
					"take_address": "测试地址",
				},
				secondList: []
			}
		},
		methods: {
			onLoad(param) {
				let that = this;
				if (param && param.id) {
					this.userId = param.id;
					this.getList();
					//获取用户信息
					get_users_info({
						users_id: param.id,
					}, (res, flag) => {
						this.log("-----------------")
						this.log(res)
						this.log("-----------------")
						if (flag) {
							if (res.code == "200") {
								this.userInfo = res.data;
							} else {
								this.toast(res.message)
							}
						}
					})


				}
			},
			gonext(url, parmar) {
				this.push(url, parmar)

			},
			getList() {
				let that = this;
				//获取二手列表
				get_goods_list({
					users_id: this.userId,
					type: "1,2",
					status: "1",
					page: this.page,
					page_num: "10"
				}, (res, flag) => {

					if (flag) {
						this.log(res)
						if (res.code == "200") {
							that.secondList = res.data.list;
						} else {
							that.toast(res.message)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.iconfont {
		font-family: iconfont;
	}

	.wrapper {
		background-color: #F5F5F5;
		position: relative;
	}

	.mainTit {
		background-color: #FFFFFF;
		font-size: 32px;
		color: #1E1E1E;
		height: 109px;
		line-height: 109px;
		padding-left: 32px;
	}

	.recontent {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 30px;
		padding-bottom: 30px;
		width: 686px;
		margin-left: 32px;
	}

	.reitem {
		height: 516px;
		margin-top: 10px;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 10px;
		/* justify-content: space-between; */
	}

	.reitemS {
		width: 336px;
	}

	.goodsImga {
		width: 336px;
		height: 336px;
	}

	.contentBox {
		width: 336px;
		padding: 0 20px;
	}

	.goodsTitle {
		font-size: 20px;
		height: 56px;
		line-height: 28px;
		margin-top: 12px;
		color: #1E1E1E;
		text-overflow: ellipsis;
		lines: 2;
		word-wrap: break-word;
	}

	.goodsTitle2 {
		font-size: 26px;
		height: 74px;
		line-height: 37px;
		margin-top: 16px;
		color: #1E1E1E;
		text-overflow: ellipsis;
		lines: 2;
		word-wrap: break-word;
	}

	.priceInfo {
		margin-top: 20px;
		flex-direction: row;
		justify-content: space-between;
	}

	.leftInfo {
		flex-direction: row;
		align-items: flex-end;
	}

	.symbol {
		color: red;
		margin-bottom: 5px;
		margin-right: 5px;
	}

	.money {
		color: red;
		font-size: 32px;
		font-weight: bold;
		margin-right: 5px;
	}

	.reduce {
		color: red;
		margin-right: 5px;
	}

	.shopType {
		color: red;
	}

	.shopIcon {
		font-size: 32px;
		margin-left: 10px;
	}

	.imgbg {
		position: absolute;
		top: 0;
		left: 0;
		width: 750px;
		height: 400px;
	}

	.imgMask {
		position: absolute;
		left: 0;
		top: 0;
		width: 750px;
		height: 400px;
		/* margin-top: -400px; */
		background-color: rgba(0, 0, 0, .5);
	}

	.scroller {
		position: absolute;
		top: 400px;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.acenter {
		align-items: center;
	}

	.row {
		flex-direction: row;
	}

	.userName {
		color: #FFFFFF;
		font-size: 34px;
	}

	.credit {
		color: #41EFF2;
		margin-left: 20px;
	}

	.userInfo {
		width: 686px;
		height: 140px;
		flex-direction: row;
		padding: 20px 0;
		background-color: transparent;
		margin: 0 32px;
		margin-top: 90px;
		align-items: center;
		/* border-width: 1px; */
		/* 	border-style: solid;
		border-color: #E8E8E8;
		border-left-width: 0;
		border-right-width: 0; */
	}

	.userAvator {
		width: 94px;
		height: 94px;
		border-radius: 47px;
		background-color: #F2F2F2;
	}

	.userCenter {
		flex: 1;
		padding-right: 30px;
		padding-left: 20px;
		height: 80px;
		justify-content: space-between;
	}

	.row_title {
		color: #FFF;
		font-size: 26px;
		margin-right: 15px;
	}
</style>
