<template>
	<div class="wrapper">
		<head title="Order details"></head>
		<div class="tophead" v-if="goods_info.type==1||goods_info.type==2">
			<!-- type=1 2 	未支付 -->
			<!-- type=3  	已支付 -->
			<!-- type_2=1  	已支付 未发货-->
			<!-- type_2=2  	已发货 -->
			<!-- type_2=3   已收货 -->
			<text class="headTit">Payment pending</text>
			<text class="headdes">payment will be cancelled in 2 hours and 19 minutes</text>
		</div>
		<div class="tophead" v-if=" goods_info.type_2==1">
			<text class="headTit">Waiting for shipping</text>
			<text class="headdes"> </text>
		</div>
		<div class="tophead" v-if=" goods_info.type_2==2">
			<text class="headTit">Waiting for delivery</text>
			<text class="headdes">Seller has shipped</text>
		</div>
		<div class="tophead" v-if=" goods_info.type_2==3">
			<text class="headTit">Waiting for shipping</text>
			<text class="headdes"> </text>
		</div>
		<div class="section1">
			<div class="shipNow">
				<div class="wuliu">
					<text class="location">[Shanghai] Express has been sent from Shanghai center, ready to send to Hefei Transit
						Department.</text>
					<text class="time">2018-03-15 06:32</text>
				</div>
				<text class="iconfont">&#xe6a1;</text>

			</div>
			<div class="user">
				<text class="userName">{{goods_info.name}}</text>
				<text class="userPhone">{{goods_info.phone }}</text>
			</div>
			<text class="address">{{goods_info.address}}</text>
		</div>
		<div class="section2" v-for="item in goods_info.list"> 
			<div class="order_top">
				<image class="googPic" :src="item.thumb"></image>
				<div class="goods_info">
					<text class="goods_title"> {{item.title}}</text>
					<div class="goods_spec">
						<text class="priceInfo"> {{item.goods_option}} </text>
						<text class="specInfo"> X {{item.number}} </text>
					</div>
				</div>
			</div>
			<div class="priceBox">
				
				
				
			</div>

		</div>
		<div class="priceBox">
			
			<div class="orderPrice">
				<text class="titPrice">Total price</text>
				<text class="price">{{goods_info.total_price}}</text>
			</div>
			
			<div class="orderPrice">
				<text class="titPrice">Coupon price</text>
				<text class="price">-{{goods_info.coupon_price}}</text>
			</div>
			<div class="orderPrice">
				<text class="titPrice">GIV delivery</text>
				<text class="price">{{goods_info.total_postage}}</text>
			</div>
			<div class="orderPrice">
				<text class="titPrice">Pay Price</text>
				<text class=" realprice">{{goods_info.pay_price}}</text>
			</div>
		</div>
		<div class="section1">
			<text class="deTit">Order details</text>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">Order Number</text>
					<text class="detaInf">{{goods_info.id}}</text>
				</div>
				<text class="copy">copy</text>
			</div>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">Creation time</text>
					<text class="detaInf">{{goods_info.create_time }}</text>
				</div>
				<text class=""></text>
			</div>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">Payment time</text>
					<text class="detaInf">{{ goods_info.pay_time}}</text>
				</div>
				<text class=""></text>
			</div>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">View Invoice</text>
					<text class="detaInf viewBox" @click="gonext('root:app/user/order_list/invoice.js',{id:2})">View</text>
				</div>
				<text class=""></text>
			</div>
		</div>
		<div class="bottomBtn">
			<text class="btn">cancel</text>
			<text class="btn">Change address</text>
			<text class="btn blackBtn">Confirm and Pay</text>
		</div>
	</div>
</template>

<script>
	import asCore from "../../../mixin/core";
	import {
		upload,
		get_order_co_info
	} from "../../../mixin/ajax.js"
	export default {
		data() {
			return {
				goods_info: {
					"id": 300,
					"take_address": "",
					"logistic": "2",
					"send_time": "2019-07-30 18:04:04",
					"pay_price": "15.50",
					"type": 3,
					"address_id": 3,
					"total_price": "10.50",
					"number": 1,
					"address": "安徽 黄山路",
					"logistic_code": "2",
					"pay_time": "2019-07-16 14:09:50",
					"name": "tll-2",
					"total_postage": "6.00",
					"co_id": "8a572af162f643d0900391dc4a11599d",
					"create_time": "2019-07-12 17:06:23",
					"end_time": "1563243937",
					"coupon_price": "1.00",
					"phone": "13635697675",
					"take_type": 2,
					"shipper_code": "2",
					"type_2": 2,
					"list": [{
						"number": 1,
						"option_id": 0,
						"thumb": "",
						"price": "10.50",
						"title": "用户二手商品",
						"goods_option": "",
						"id": 133,
						"total_price": "10.50"
					}]
				}
			}
		},
		methods: {
			onLoad(param) {
				let type = 0;
				if (param && param.id) {
					this.orderId = param.id;
				}
				asCore.getBsessionid(userId => {
					this.userId = userId;
					this.getOrderDetail()
				});
			},
			getOrderDetail() {

				get_order_co_info({
					users_id: this.userId,
					co_order_id: this.orderId,
				}, (res, flag) => {
					this.log(res)
					if (flag) {
						if (res.code == 200) {
							this.goods_info = res.data;



						}
					}
				})
			},
			gonext(url, parma) {
				this.push(url, parma)

			}
		},
	}
</script>

<style scoped>
	.wrapper {
		background-color: #F5F5F5;
	}

	.tophead {
		width: 750px;
		padding: 30px 32px;
		background-color: #FFFFFF;
	}

	.headTit {
		color: #333333;
		font-size: 28px;
	}

	.headdes {
		color: #666;
		font-size: 24px;
		margin-top: 20px;
	}

	.section1 {
		margin-top: 20px;
		padding: 32px;
		background-color: #FFFFFF;
	}

	.shipNow {
		flex-direction: row;
		align-items: center;
		margin-bottom: 5px;
	}

	.wuliu {
		flex: 1;
	}

	.location {
		color: #BA8833;
		font-size: 24px;
	}

	.time {
		color: #B5B5B5;
		font-size: 20px;
	}

	.iconfont {
		font-family: iconfont;
	}

	.user {
		flex-direction: row;
		align-items: center;
		padding: 10px 0;
	}

	.userName {
		font-size: 24px;
		color: #333333;
		margin-right: 20px;
	}

	.userPhone {
		font-size: 24px;
		color: #999;
	}

	.address {
		font-size: 24px;
		color: #333333;
	}

	.orderDetail {
		padding: 30px;

	}

	.section2 {
		margin-top: 20px;
	}

	.order_top {
		background-color: #fff;
		width: 750px;
		flex-direction: row;
		align-items: flex-start;
		border-bottom-style: solid;
		border-bottom-color: #E8E8E8;
		border-bottom-width: 1px;
		padding: 30px 32px;

	}

	.googPic {
		width: 116px;
		height: 116px;
		background-color: #F5F5F5;
	}

	.goods_info {
		padding-left: 30px;
		flex: 1;
	}

	.goods_title {
		font-size: 22px;
		line-height: 30px;
		color: #666666;
	}

	.goods_spec {
		padding-top: 10px;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

	}

	.priceInfo {
		color: #666666;
		font-size: 20px;
	}

	.specInfo {
		color: #999999;
		font-size: 22px;
		/* background-color: #f2f22f; */
	}

	.priceBox {
		padding: 20px 32px;
		background-color: #FFFFFF;
	}

	.orderPrice {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 3px 0;
	}

	.titPrice {
		font-size: 20px;
		color: #999999;
	}

	.price {
		font-size: 20px;
		color: #666;
	}

	.realprice {
		font-size: 28px;
		color: #EC414D;
		font-weight: 600;
	}

	.deTit {
		font-size: 26px;
		color: #494949;
		margin-bottom: 20px;
	}

	.detailItem {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}

	.itemLeft {
		flex-direction: row;
		align-items: center;
		flex: 1;
	}

	.detaTit {
		color: #999999;
		font-size: 20px;
		width: 190px;
	}

	.detaInf {
		color: #333333;
		font-size: 20px;
	}

	.viewBox {
		border-width: 1px;
		border-color: #979797;
		border-style: solid;
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		padding-right: 20px;
		text-align: center;
		margin-top: 10px;
	}

	.copy {
		background-color: #303030;
		color: #FFFFFF;
		font-size: 18px;
		border-radius: 5px;
		line-height: 44px;
		padding: 0 20px;
	}

	.copy:active {
		background-color: #CCCCCC;
	}

	.bottomBtn {
		height: 90px;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750px;
		background-color: #F5F5F5;
		flex-direction: row;
		justify-content: flex-end;
	}

	.btn {
		height: 68px;
		line-height: 68px;
		border-width: 1px;
		border-style: solid;
		border-color: #303030;
		border-radius: 8px;
		margin: 0 10px;
		padding: 0 15px;
		min-width: 150px;
		text-align: center;
		font-size: 28px;
		color: #333333;
	}

	.blackBtn {
		background-color: #303030;
		color: #FFFFFF;
	}

	.blackBtn:active {
		background-color: #EEEEEE;
	}
</style>
