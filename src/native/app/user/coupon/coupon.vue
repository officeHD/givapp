<template>
	<div>
		<div class="tabr" :style="{top:headerTop}">
			<text :class="{on:typeClass=='valid'}" @tap="switchType('valid')">可用({{couponValidList.length}})</text>
			<text :class="{on:typeClass=='invalid'}" @tap="switchType('invalid')">已失效</text>
			<div class="border" :class="typeClass"></div>
		</div>
		<div class="place"></div>
		<div class="list">
			<!-- 优惠券列表 -->
			<div class="sub-list valid" :class="subState">
				<text class="tis" v-if="couponValidList.length==0">没有数据~</text>
				<div class="row" v-for="(row,index) in couponValidList" :key="index">
					<!-- 删除按钮 -->
					<div class="menu" @tap.stop="deleteCoupon(row.id,couponValidList)">
						<text class="icon shanchu"></text>
					</div>
					<!-- content -->
					<div class="carrier" :class="[typeClass=='valid'?theIndex==index?'open':oldIndex==index?'close':'':'']"
					 @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<div class="left">
							<text class="title"> {{row.title}} </text>
							<text class="term"> {{row.termStart}} ~ {{row.termEnd}} </text>
							<div class="gap-top"></div>
							<div class="gap-bottom"></div>
						</div>
						<div class="right">
							<div class="ticket">
								<text class="num"> {{row.ticket}} </text>
								<text class="unit"> 元 </text>
							</div>
							<text class="criteria"> {{row.criteria}} </text>
							<text class="use"> 去使用 </text>
						</div>
					</div>
				</div>
			</div>
			<div class="sub-list invalid" :class="subState">
				<text class="tis" v-if="couponinvalidList.length==0">没有数据~</text>
				<div class="row" v-for="(row,index) in couponinvalidList" :key="index">
					<!-- 删除按钮 -->
					<div class="menu" @tap.stop="deleteCoupon(row.id,couponinvalidList)">
						<div class="icon shanchu"></div>
					</div>
					<!-- content -->
					<div class="carrier" :class="[typeClass=='invalid'?theIndex==index?'open':oldIndex==index?'close':'':'']"
					 @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
						<div class="left">
							<text class="title"> {{row.title}} </text>
							<text class="term"> {{row.termStart}} ~ {{row.termEnd}} </text>
							<div class="icon shixiao"> </div>
							<div class="gap-top"></div>
							<div class="gap-bottom"></div>
						</div>
						<div class="right invalid">
							<div class="ticket">
								<text class="num"> {{row.ticket}} </text>
								<text class="unit"> 元 </text>
							</div>
							<text class="criteria"> {{row.criteria}} </text>
							<text class="use"> 去查看 </text>
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
				couponValidList: [{
						id: 1,
						title: "日常用品立减10元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "10",
						criteria: "满50使用"
					},
					{
						id: 2,
						title: "家用电器立减100元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "100",
						criteria: "满500使用"
					},
					{
						id: 3,
						title: "全场立减10元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "10",
						criteria: "无门槛"
					},
					{
						id: 4,
						title: "全场立减50元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "50",
						criteria: "满1000使用"
					}
				],
				couponinvalidList: [{
						id: 1,
						title: "日常用品立减10元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "10",
						criteria: "满50使用"
					},
					{
						id: 2,
						title: "家用电器立减100元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "100",
						criteria: "满500使用"
					},
					{
						id: 3,
						title: "全场立减10元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "10",
						criteria: "无门槛"
					},
					{
						id: 4,
						title: "全场立减50元",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "50",
						criteria: "满1000使用"
					}
				],
				headerTop: 0,
				//控制滑动效果
				typeClass: "valid",
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
					this.subState = this.typeClass == "valid" ? "" : this.subState;
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
	div {
		flex-wrap: wrap;
	}

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

	.tabr div {
		width: 50%;
		height: 90px;
		justify-content: center;
		align-items: center;
		font-size: 32px;
		color: #999;
	}

	.on {
		color: #f06c7a;
	}

	.border {
		height: 4px;
		background-color: #f06c7a;
		transition: all 0.3s ease-out;
	}

	.invalid {
		transform: translate3d(100%, 0, 0);
	}

	.list {
		width: 100%;
		position: relative;
	}

	@keyframes showValid {
		0% {
			transform: translateX(-100%);
		}

		100% {
			transform: translateX(0);
		}
	}

	@keyframes showInvalid {
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

	.showvalid {
		animation: showValid 0.2s linear both;
	}

	.showinvalid {
		animation: showInvalid 0.2s linear both;
	}

	.tis {
		width: 100%;
		height: 60px;
		justify-content: center;
		align-items: center;
		font-size: 32px;
	}

	.row {
		width: 92%;
		height: 24vw;
		margin: 20px auto 10px auto;
		border-radius: 8px;
		align-items: center;
		position: relative;
		overflow: hidden;
		border: 0;
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

	.left {
		width: 100%;

		position: relative;
	}

	.title {
		padding-top: 3vw;
		width: 90%;
		margin: 0 5%;
		font-size: 36px;
	}

	.term {
		width: 90%;
		margin: 0 5%;
		font-size: 26px;
		color: #999;
	}

	.gap-top,
	.gap-bottom {
		position: absolute;
		width: 20px;
		height: 20px;
		right: -10px;
		border-radius: 100%;
		background-color: #f5f5f5;
	}

	.gap-top {
		top: -10px;
	}

	.gap-bottom {
		bottom: -10px;
	}

	.shixiao {
		position: absolute;
		right: 20px;
		font-size: 150px;
		color: rgba(153, 153, 153, 0.2);
	}

	.right {
		width: 28%;
		color: #fff;
		background: linear-gradient(to right, #ec625c, #ee827f);
		justify-content: center;
	}

	.invalid {
		background: linear-gradient(to right, #aaa, #999);
	}

	.use {
		color: #aaa;
	}

	.ticket,
	.criteria {
		width: 100%;
	}

	.ticket {
		padding-top: 1vw;
		justify-content: center;
		align-items: flex-end;
		height: 6vw;
	}

	.num {
		font-size: 42px;
		font-weight: 600;
	}

	.unit {
		font-size: 24px;
	}

	.criteria {
		justify-content: center;

		font-size: 28px;
	}

	.use {
		width: 50%;
		height: 40px;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		background-color: #fff;
		color: #ee827f;
		border-radius: 40px;
		padding: 0 10px;
	}
</style>
