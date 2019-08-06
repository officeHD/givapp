<template>
	<div class="content">
		<head title="My order"></head>
		<scroller class="navbar" scroll-direction="horizontal">
			<text v-for="(item, index) in navList" :key="index" class="nav-item" :ref="'item'+index" @click="tabClick(index)"
			 :class="[tabCurrentIndex === index?'current':'']">{{ item.text }}</text>
		</scroller>
		<slider class="slider" @change="slideChange">
			<scroller class="listScroll" v-for="(item, index) in navList">
				<div v-for="(list, index) in item.orderList" class="listItem" @click="goDetail">
					<div class="titList">
						<div class="titLeft">
							<text class="titname">{{list.nickname}}</text>
							<text class="iconfont titIcon">&#xe6a1;</text>
						</div>
						<text class="status">{{ list.type==2?"Unpaid":list.type_2==1?"Waiting for shipping":list.type_2==2?"Waiting for Shipped":"Shipped" }}</text>
					</div>
					<div class="titList">
						<image class="imgList" src="root:img/goods.png"></image>
						<text class="iconfont imgIcon">&#xe6a1;</text>
					</div>
					<div class="bottomList">
						<text class="num">{{list.number}} item</text>
						<text class="total">Total</text>
						<text class="symbol">$</text>
						<text class="money">{{list.pay_price}}</text>
					</div>
					<div class="actionBox">
						<text class="actionItem">Delivery tracking</text>
						<text  class="actionItem">Item received</text>
					</div>

				</div>
			</scroller>
		</slider>
	</div>
</template>

<script>
	const dom = weex.requireModule('dom')
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				page: 1,
				navList: [{
						hasMore: true,
						state: 0,
						text: 'orders',
						page: 1,
						loadingType: 'more',
						total: 0,
						orderList: [{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						},{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						},{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						}]
					},
					{
						hasMore: true,
						state: 1,
						page: 1,
						text: 'Unpaid',
						loadingType: 'more',
						total: 0,
						orderList: [{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						}]
					},
					{
						hasMore: true,
						state: 2,
						text: 'Waiting for shipping',
						page: 1,
						loadingType: 'more',
						total: 0,
						orderList: [{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						}]
					},
					{
						hasMore: true,
						state: 3,
						text: 'Shipped',
						page: 1,
						loadingType: 'more',
						total: 0,
						orderList: [{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						},{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						},{
							"id": 161,
							"co_id": "2",
							"number": 5,
							"total_price": "13.00",
							"pay_price": "27.00",
							"type": 3,
							"type_2": 1,
							"nickname": "指点村1",
							"headimgurl": "http://xxyweeds.top:8181/iff/img/img/sythetic/20190423/71982ebeb97244a794629f021ffee34d.png",
							"list": [{
								"id": 51,
								"goods_id": 24,
								"option_id": 0,
								"goods_option": "",
								"thumb": "123.jpg",
								"title": "模板标题1",
								"number": 5,
								"price": "13.00",
								"total_price": "13.00",
							}]
						}]
					}
				]
			};
		},

		methods: {
			goDetail() {
				 this.push('root:app/user/order_list/order_details.js',{name:"ssss"})

				 
			},
			tabClick(index) {
				if (this.tabCurrentIndex == index) {
					return false;
				}
				this.tabCurrentIndex = index;
			},
			slideChange(index) {
				if (this.tabCurrentIndex == index.index) {
					return false;
				}
				this.tabCurrentIndex = index.index;
				const ref = this.$refs["item" + index.index]
				const el = ref ? ref[0] : null;
				dom.scrollToElement(el, {
					offset: -250
				})

			}
		}
	};
</script>

<style scoped>
	.content {
		background-color: #F5F5F5;
		flex: 1;
	}

	.navbar {
		height: 90px;
		width: 750px;
		flex-direction: row;
	}

	.nav-item {
		height: 90px;
		padding: 0 20px;
		margin: 0 30px;
		line-height: 90px;
		font-size: 30px;
		color: #333333;
	}

	.current {

		border-bottom-color: #BA8833;
		border-bottom-width: 4px;
		border-bottom-style: solid;
		color: #BA8833;
	}

	.slider {
		flex: 1;
	}

	.listScroll {
		flex: 1;
		background-color: #F5F5F5;
	}

	.listItem {
		margin-top: 20px;
		background-color: #FFFFFF;
		padding: 32px;
	}
	.listItem:active{
		background-color: #F2F2F2;
	}

	.titList {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.titLeft {
		flex-direction: row;
		align-items: center;
	}

	.imgList {
		width: 120px;
		height: 120px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.titname {
		font-size: 28px;
		color: #333;
		margin-right: 20px;
	}

	.iconfont {
		font-family: iconfont;
	}

	.titIcon {
		font-size: 24px;
		color: #999999;
	}

	.imgIcon {
		font-size: 32px;
		color: #999999;
	}

	.status {
		font-size: 28px;
		color: #EC414D;
	}

	.bottomList {
		flex-direction: row;
		align-items: center;
		padding-bottom: 20px;
		border-bottom-color: #E6E6E6;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.num {
		margin-right: 40px;
		font-size: 22px;
		color: #8E8E93;
	}

	.total {
		font-size: 22px;
		color: #8E8E93;
	}

	.symbol {
		font-size: 22px;
		color: #EC414D;
		margin: 0 10px;
	}

	.money {
		font-size: 22px;
		color: #EC414D;
	}
	.actionBox{
		flex-direction: row;
		justify-content: flex-end;
		padding-top: 20px;
	}
	.actionItem{
		font-size: 28px;
		color: #333333;
		padding: 5px 10px;
		line-height: 40px;
		border-width: 1px ;
		border-style: solid;
		border-color: #333333;
		margin-left: 10px;
	}
	.actionItem:active{
		border-color: #CCCCCC;
		background-color: #CCCCCC;
	}
</style>
