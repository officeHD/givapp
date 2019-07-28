<template>
	<div>
		<div class="tabr" :style="{top:headerTop}">
			<div :class="{on:typeClass=='goods'}" @tap="switchType('goods')">商品({{goodsList.length}})</div>
			<div :class="{on:typeClass=='shop'}" @tap="switchType('shop')">店铺({{shopList.length}})</div>
			<div class="border" :class="typeClass"></div>
		</div>
		<div class="place"></div>
		<div class="list">
			<!-- 优惠券列表 -->
			<div class="sub-list goods" :class="subState">
				<div class="tis" v-if="goodsList.length==0">没有数据~</div>
				<div class="row" v-for="(row,index) in goodsList" :key="index">
					<!-- 删除按钮 -->
					<div class="menu" @tap.stop="deleteCoupon(row.id,goodsList)">
						<div class="icon shanchu"></div>
					</div>
					<!-- content -->
					<div class="carrier" :class="[typeClass=='goods'?theIndex==index?'open':oldIndex==index?'close':'':'']"
					 @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<div class="goods-info" @tap="toGoods(row)">
							<div class="img">
								<image :src="row.img"></image>
							</div>
							<div class="info">
								<div class="title">{{row.name}}</div>
								<div class="price-number">
									<div class="keep-num">
										905人收藏
									</div>
									<div class="price">￥{{row.price}}</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sub-list shop" :class="subState">
				<div class="tis" v-if="shopList.length==0">没有数据~</div>
				<div class="row" v-for="(row,index) in shopList" :key="index">
					<!-- 删除按钮 -->
					<div class="menu" @tap.stop="deleteCoupon(row.id,shopList)">
						<div class="icon shanchu"></div>
					</div>
					<!-- content -->
					<div class="carrier" :class="[typeClass=='shop'?theIndex==index?'open':oldIndex==index?'close':'':'']" @touchstart="touchStart(index,$event)"
					 @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<div class="left">
							<image :src="row.img"></image>
						</div>
						<div class="right">
							<div class="name">
								{{row.name}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [{
						id: 1,
						img: "/static/img/goods/p1.jpg",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: "/static/img/goods/p1.jpg",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 3,
						img: "/static/img/goods/p1.jpg",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					}
				],
				shopList: [

				],
				headerTop: 0,
				//控制滑动效果
				typeClass: "goods",
				subState: "",
				theIndex: null,
				oldIndex: null,
				isStop: false
			};
		},
		onPageScroll(e) {},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			//兼容H5下排序栏位置
			// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName("uni-page-head");
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + "px";
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		methods: {
			switchType(type) {
				if (this.typeClass == type) {
					return;
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.typeClass = type;
				this.subState = this.typeClass == "" ? "" : "show" + type;
				setTimeout(() => {
					this.oldIndex = null;
					this.theIndex = null;
					this.subState = this.typeClass == "goods" ? "" : this.subState;
				}, 200);
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150);
					}
				}
			},

			touchEnd(index, $event) {
				//解除禁止触发状态
				this.isStop = false;
			},

			//删除商品
			deleteCoupon(id, List) {
				let len = List.length;
				for (let i = 0; i < len; i++) {
					if (id == List[i].id) {
						List.splice(i, 1);
						break;
					}
				}
				this.oldIndex = null;
				this.theIndex = null;
			},

			discard() {
				//丢弃
			}
		}
	};
</script>
<style scoped>
	.place {
		width: 100%;
		height: 95px;
	}

	.tabr {
		background-color: #fff;
		width: 94%;
		height: 95px;
		padding: 0 3%;
		border-bottom: solid 1px #dedede;
		position: fixed;
		top: 0;
	}

	.on {
		color: #f06c7a;
	}

	.border {
		height: 4px;
		background-color: #f06c7a;
		transition: all 0.3s ease-out;
	}

	.shop {
		transform: translate3d(100%, 0, 0);
	}

	.tabr div {
		width: 50%;
		height: 90px;
		justify-content: center;
		align-items: center;
		font-size: 32px;
		color: #999;
	}

	.list {
		width: 100%;
		position: relative;
	}

	@keyframes showGoods {
		0% {
			transform: translateX(-100%);
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes showShop {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	.sub-list {
		width: 100%;
		padding: 20px 0 120px 0;
	}

	.shop {
		position: absolute;
		top: 0;
		left: 100%;
		display: none;
	}

	.showgoods {
		display: flex;
		animation: showGoods 0.2s linear both;
	}

	.showshop {
		display: flex;
		animation: showShop 0.2s linear both;
	}

	.tis {
		width: 100%;
		height: 60px;
		justify-content: center;
		align-items: center;
		font-size: 32px;
	}

	.row {
		height: 20vw;
	}

	.left {
		width: 20vw;
		height: 20vw;
		padding-left: 20px;
		align-items: center;
	}

	image {
		width: 18vw;
		height: 18vw;
		border-radius: 100%;
	}

	.right {
		height: 20vw;
		align-items: center;
		font-size: 32px;
	}

	.row {
		width: 100%;
		height: 30vw;
		align-items: center;
		position: relative;
		overflow: hidden;
		border-bottom: solid 1px #dedede;
	}

	.menu {
		position: absolute;
		width: 28%;
		height: 100%;
		right: 0;
		justify-content: center;
		align-items: center;
		background-color: red;
		color: #fff;
	}

	.icon {
		color: #fff;
		font-size: 50px;
	}

	.carrier {
		background-color: #fff;
		position: absolute;
		width: 100%;
		padding: 0 0;
		height: 100%;
		flex-wrap: nowrap;
	}

	@keyframes showMenu {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-28%);
		}
	}

	@keyframes closeMenu {
		0% {
			transform: translateX(-28%);
		}

		100% {
			transform: translateX(0);
		}
	}

	.open {
		animation: showMenu 0.25s linear both;
	}

	.close {
		animation: closeMenu 0.15s linear both;
	}

	.goods-info {
		width: calc(100% - 40px);
		padding: 20px;
		flex-wrap: nowrap;
	}

	.img {
		width: calc(30vw - 40px);
		height: calc(30vw - 40px);
		border-radius: 10px;
		overflow: hidden;
		margin-right: 20px;
	}

	.image {
		width: calc(30vw - 40px);
		height: calc(30vw - 40px);
	}

	.info {
		width: 100%;
		height: calc(30vw - 40px);
		overflow: hidden;
		flex-wrap: wrap;
		align-content: space-between;
		position: relative;
	}

	.title {
		width: 100%;
		font-size: 28px;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.price-number {
		width: 100%;
		justify-content: space-between;
		align-items: flex-end;
	}

	.keep-num {
		font-size: 26px;
		color: #999;
	}

	.price {
		font-size: 30px;
		color: #f06c7a;
	}
</style>
