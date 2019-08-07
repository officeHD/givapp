<template>
	<div class="wrapper">
		<head title="Order details"></head>
		<div class="tophead">
			<text class="headTit">Payment pending</text>
			<text class="headdes">payment will be cancelled in 2 hours and 19 minutes</text>
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
				<text class="userName">LILI</text>
				<text class="userPhone">86-18355091556</text>
			</div>
			<text class="address">Huangshan Road, Hefei High-tech Zone, Anhui Province</text>
		</div>
		<div class="section2">

			<div class="order_top">
				<image class="googPic" src="root:img/goods.png"></image>
				<div class="goods_info">
					<text class="goods_title"> AJOY SAHU Baggage Girls 2019 New Style Small Popular Design Baggage Girls with Skewed
						Skin and Single Shoulder Baggage Girls</text>
					<div class="goods_spec">
						<text class="priceInfo"> red </text>
						<text class="specInfo"> X 1 </text>
					</div>
				</div>
			</div>
			<div class="priceBox">
				<div class="orderPrice">
					<text class="titPrice">Item Price</text>
					<text class="price">$52.3</text>
				</div>
				<div class="orderPrice">
					<text class="titPrice">GIV delivery</text>
					<text class="price">$0.00</text>
				</div>
				<div class="orderPrice">
					<text class="titPrice">Total price</text>
					<text class="realprice">$ 52.3</text>
				</div>
			</div>

		</div>
		<div class="section1">
			<text class="deTit">Order details</text>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">Order Number</text>
					<text class="detaInf">75298783027290729679</text>
				</div>
				<text class="copy">copy</text>
			</div>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">Creation time</text>
					<text class="detaInf">June 18, 2019</text>
				</div>
				<text class=""></text>
			</div>
			<div class="detailItem">
				<div class="itemLeft">
					<text class="detaTit">Payment time</text>
					<text class="detaInf">09:45 on April 15, 2019</text>
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
	export default {
		methods: {
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
