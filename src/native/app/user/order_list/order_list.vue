<template>
	<div class="content">
		<head title="My order"></head>
		<scroller class="navbar" scroll-direction="horizontal">
			<text v-for="(item, index) in navList" :key="index" class="nav-item" :ref="'item'+index" @click="tabClick(index)"
			 :class="[tabCurrentIndex === index?'current':'']">{{ item.text }}</text>
		</scroller>
		<slider class="slider" @change="slideChange">
			<list class="listScroll" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				 <cell class"listItem" v-for="(item,inedx) in tabItem.orderList">
					 <div class="listCenter">
						 <text>sss</text>
					 </div>
				 </cell>
			</list>

		</slider>
		<!-- <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData()">
					<view v-for="(item, index) in tabItem.orderList" :key="index" class="order-item">
						<view @click="navToDetail(item)">
							<view class="i-top b-b">
								<text class="time">{{ item.group_name }}</text>
								<text class="state" :style="{ color: item.stateTipColor }">{{ item.type==2?"待付款":item.type_2==1?"待发货":item.type_2==2?"待收货":"已完成" }}</text>
							</view>
							<scroll-view v-if="item.list.length > 0" class="goods-box" scroll-x>
								<view v-for="(goodsItem, goodsIndex) in item.list" :key="goodsIndex" class="goods-item">
									<image class="goods-img" :src="goodsItem.thumb||defaultImg" mode="aspectFill" @error="imageError(tabIndex,index,goodsIndex)"></image>
								</view>
							</scroll-view>
							<view class="price-box">
								<text class="num">{{item.list.length}}</text>
								件宝贝
								合计
								<text class="price">{{item.pay_price}}</text>
							</view>
						</view>
						<view class="action-box b-t" v-if="item.type == 2">
							<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
							<button class="action-btn recom" @click="payOrder(item)">立即支付</button>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper> -->


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
						orderList: [1,1,1,1,1
							 
						]
					},
					{
						hasMore: true,
						state: 1,
						page: 1,
						text: 'Unpaid',
						loadingType: 'more',
						total: 0,
						orderList: []
					},
					{
						hasMore: true,
						state: 2,
						text: 'Waiting for shipping',
						page: 1,
						loadingType: 'more',
						total: 0,
						orderList: []
					},
					{
						hasMore: true,
						state: 3,
						text: 'Shipped',
						page: 1,
						loadingType: 'more',
						total: 0,
						orderList: []
					},
					{
						hasMore: true,
						state: 4,
						text: '已完成',
						page: 1,
						loadingType: 'more',
						total: 0,
						orderList: []
					}
				]
			};
		},

		methods: {

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
				dom.scrollToElement(el, {offset:-30})

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
		/* height: 140px; */
	}

	.listScroll {
		width: 750px;
		flex: 1;
	}
	.listItem{
		width: 750px;
		padding: 10px 0;
		/* background-color: #FFFFFF; */
		background-color: #F06C7A;

	}
	.listCenter{
		width: 750px;
		height: 180px;
		background-color: #F06C7A;
	}
</style>
