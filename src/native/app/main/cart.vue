<template>
	<div class="layout">
		<head :back="false" bgcolor="#303030" title="Cart"></head>
		<!-- 商品列表 -->
		<scroller class="goods-list">
			<div class="goods-tis" v-if="goodsList.length==0">购物车是空的哦~</div>
			<div class="goods-row" v-for="(row,index) in goodsList" :key="index">
				<!-- checkbox -->
				<div class="checkbox-box" @click="selected(index)">
					<text v-if="row.selected" class="iconfont selectIcon">&#xe602;</text>
					<text v-else class="iconfont noselect">&#xe67f;</text>
				</div>
				<!-- 商品信息 -->
				<div class="goods-info" @tap="toGoods(row)">
					<div class="imgbox">
						<image class="img" :src="row.img" />
					</div>
					<div class="info">
						<div class="title">{{row.name}}</div>
						<text class="infospec">{{row.spec}}</text>
						<div class="price-number">
							<text class="price">￥{{row.price}}</text>
							<div class="gnumber">
								<div class="numaction" @click="sub(index)">
									<text class="iconfont numIcon">&#xe630;</text>
								</div>
								<div class="numinputbox" @click="discard">
									<input class="numinput" type="number" v-model="row.number" @input="sum($event,index)" />
								</div>
								<div class="numaction" @click="add(index)">
									<text class="iconfont numIcon">&#xe601;</text>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</scroller>
		<!-- 脚部菜单 -->
		<div class="cartfooter">
			<div class="footerLeft" @click="allSelect">
				<div class="checkbox-box">
					<text v-if="isAllselected" class="iconfont selectIcon">&#xe602;</text>
					<text v-else class="iconfont noselect">&#xe67f;</text>
				</div>
				<text class="selecttext">Select all</text>
			</div>
			<text class="cardelBtn" @tap="deleteList" v-if="selectedList.length>0">删除</text>
			<div class="settlement">
				<div class="sum">
					合计:
					<text class="money">￥{{sumPrice}}</text>
				</div>
				<text class="cartbtn" @tap="toConfirmation">Pay</text>
			</div>
		</div>
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");

	export default {
		data() {
			return {
				sumPrice: "0.00",
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				selectedList: [],
				isAllselected: false,
				goodsList: [{
						id: 1,
						img: "../../static/img/goods/p1.jpg",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: "../../static/img/goods/p2.png",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 3,
						img: "../../static/img/goods/p3.png",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 4,
						img: "../../static/img/goods/p4.jpg",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 5,
						img: "../../static/img/goods/p5.jpg",
						name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					}
				],
				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false
			};
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + "px";
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {},
		methods: {
			//加入商品 参数 goods:商品数据
			joinGoods(goods) {
				/*
				 * 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				 * 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
				 * 一般商城购物车的增删改动作是由后端来完成的,
				 * 后端记录后返回前端更新前端缓存
				 */
				let len = this.goodsList.length;
				let isFind = false; //是否找到ID一样的商品
				for (let i = 0; i < len; i++) {
					let row = this.goodsList[i];
					if (row.id == goods.id) {
						//找到商品一样的商品
						this.goodsList[i].number++; //数量自增
						isFind = true; //找到一样的商品
						break; //跳出循环
					}
				}
				if (!isFind) {
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.goodsList[i].unshift(goods);
				}
			},

			//控制左滑删除效果-end

			//商品跳转
			toGoods(e) {
				uni.showToast({
					title: "商品" + e.id,
					icon: "none"
				});
				uni.navigateTo({
					url: "../goods/goods"
				});
			},
			//跳转确认订单页面
			toConfirmation() {
				let tmpList = [];
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (this.goodsList[i].selected) {
						tmpList.push(this.goodsList[i]);
					}
				}
				if (tmpList.length < 1) {
					uni.showToast({
						title: "请选择商品结算",
						icon: "none"
					});
					return;
				}
				uni.setStorage({
					key: "buylist",
					data: tmpList,
					success: () => {
						uni.navigateTo({
							url: "../order/confirmation"
						});
					}
				});
			},
			//删除商品
			deleteGoods(id) {
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (id == this.goodsList[i].id) {
						this.goodsList.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
				this.sum();
				this.oldIndex = null;
				this.theIndex = null;
			},
			// 删除商品s
			deleteList() {
				let len = this.selectedList.length;
				while (this.selectedList.length > 0) {
					this.deleteGoods(this.selectedList[0]);
				}
				this.selectedList = [];
				this.isAllselected =
					this.selectedList.length == this.goodsList.length &&
					this.goodsList.length > 0;
				this.sum();
			},
			// 选中商品
			selected(index) {
				this.goodsList[index].selected = this.goodsList[index].selected ?
					false :
					true;
				let i = this.selectedList.indexOf(this.goodsList[index].id);
				i > -1 ?
					this.selectedList.splice(i, 1) :
					this.selectedList.push(this.goodsList[index].id);
				this.isAllselected = this.selectedList.length == this.goodsList.length;
				this.sum();
			},
			//全选
			allSelect() {
				let len = this.goodsList.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.goodsList[i].selected = this.isAllselected ? false : true;
					arr.push(this.goodsList[i].id);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected =
					this.isAllselected || this.goodsList.length == 0 ? false : true;
				this.sum();
			},
			// 减少数量
			sub(index) {
				if (this.goodsList[index].number <= 1) {
					return;
				}
				this.goodsList[index].number--;
				this.sum();
			},
			// 增加数量
			add(index) {
				this.goodsList[index].number++;
				this.sum();
			},
			// 合计
			sum(e, index) {
				this.sumPrice = 0;
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (this.goodsList[i].selected) {
						if (e && i == index) {
							this.sumPrice =
								this.sumPrice + e.detail.value * this.goodsList[i].price;
						} else {
							this.sumPrice =
								this.sumPrice +
								this.goodsList[i].number * this.goodsList[i].price;
						}
					}
				}
				this.sumPrice = this.sumPrice.toFixed(2);
			},
			discard() {
				//丢弃
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
	}

	.goods-tis {
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32px;
	}

	.goods-menu {
		position: absolute;
		width: 30%;
		height: 100%;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
		color: #fff;
		z-index: 2;
	}

	.goods-icon {
		color: #fff;
	}

	.goodsopen {
		animation: showMenu 0.25s linear both;
	}

	.goodsclose {
		animation: closeMenu 0.15s linear both;
	}

	.goods-list {
		background-color: #fff;
		width: 750px;
		flex: 1;
		padding: 20px 0;
	}

	.goods-row {
		width: 710px;
		display: flex;
		flex-direction: row;
		padding-bottom: 20px;
		padding-top: 20px;
		margin-left: 20px;
		border-bottom-color: #e7e7e7;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.checkbox-box {
		width: 40px;
		height: 40px;
	}

	.selectIcon {
		font-size: 32px;
		color: #b98732;
	}

	.noselect {
		font-size: 32px;
	}

	.goods-info {
		flex: 1;
		flex-direction: row;
	}

	.info {
		flex: 1;
	}

	.imgbox {
		width: 120px;
	}

	.infospec {
		height: 60px;
		line-height: 60px;
	}

	.price-number {
		height: 80px;
		flex-direction: row;
		justify-content: space-between;
	}

	.price {
		color: #f06c7a;
	}

	.gnumber {
		flex-direction: row;
	}

	.numaction {
		width: 44px;
		height: 44px;
		background-color: #e7e7e7;
		justify-content: center;
		align-items: center;
	}

	.numinputbox {
		width: 100px;
		height: 44px;
		background-color: #fdfeff;
	}

	.numinput {
		width: 100px;
		height: 44px;
		text-align: center;
		font-size: 28px;
		color: #000;
	}

	.numIcon {
		color: #fff;
	}

	.delBtn {
		border: solid 1px #f06c7a;
		color: #f06c7a;
		padding: 0 30px;
		height: 50px;
		border-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.money {
		font-weight: 600;
		margin-right: 20px;
	}

	.sum {
		width: 50%;
		font-size: 28px;
		margin-right: 10px;
		display: flex;
		justify-content: flex-end;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28px;
		position: fixed;
		bottom: 0px;
		z-index: 5;
	}

	.settlement {
		height: 100px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.cartfooter {
		height: 100px;
		width: 750px;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.footerLeft {
		height: 100px;
		padding-left: 20px;

		flex-direction: row;
		align-items: center;
	}

	.selecttext {
		font-size: 30px;
		margin-left: 20px;
	}

	.cardelBtn {
		color: #f06c7a;
		margin-left: 20px;

	}

	.settlement {
		flex: 1;
		flex-direction: row;

		justify-content: flex-end;
		align-items: center;
	}

	.sum {
		flex-direction: row;
		flex: 1;
		justify-content: flex-end;
		align-items: center;
	}

	.cartbtn {
		width: 200px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		color: #fff;
		background-color: #9A9A9A;
	}
</style>
