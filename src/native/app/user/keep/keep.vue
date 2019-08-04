<template>
	<div class="wrapper">
		<head title="My collection">
			<div slot="right">
				<text @click="showDel=false" v-if="showDel" class="complete">cancel</text>
				<text @click="showDel=true" v-else class="delIcon">&#xe6e4;</text>

			</div>
		</head>
		<div class="tabr">
			<div class="tabItem" @click="switchType('used')">
				<text :class="[typeClass=='used'?'on':'off']">used</text>
			</div>
			<div class="tabItem" @click="switchType('new')">
				<text :class="[typeClass=='new'?'on':'off']">new</text>
			</div>

		</div>
		<div v-if="typeClass=='used'" class="listBox">
			<scroller class="scroller">
				<div class="scrollerDiv">
					<div class="listCell" v-for="item in goodsList" @longpress="showDel=true" @click="toUrl">
						<img class="cellImg" src="root:img/goods.png">
						<div v-if="showDel" class="selectMask" @click="item.selected=!item.selected">
							<text v-if="item.selected" class="select selected">&#xe60d;</text>
							<text v-else class="select">&#xe67f;</text>

						</div>

					</div>
					<div class="empty"></div>
					<div class="empty"></div>
					<div class="empty"></div>
				</div>

			</scroller>
			<div class="bottomBar" v-if="showDel">
				<div class="checkAllBox" @click="selectedAll=!selectedAll">
					<text v-if="selectedAll" class="selectAll selected">&#xe60d;</text>
					<text v-else class="selectAll">&#xe67f;</text>
					<text>check all</text>
				</div>
				<text class="delBox">delete</text>
			</div>
		</div>
		<div v-if="typeClass=='new'">
			<scroller class="scroller">
				<div class="scrollerDiv">
					<div class="listCell" v-for="item in goodsList" @longpress="showDel=true" @click="toUrl">
						<img class="cellImg" src="root:img/goods.png">
						<div v-if="showDel" class="selectMask" @click="item.selected=!item.selected">
							<text v-if="item.selected" class="select selected">&#xe60d;</text>
							<text v-else class="select">&#xe67f;</text> 
						</div> 
					</div>
					<div class="empty"></div>
					<div class="empty"></div>
					<div class="empty"></div>
				</div>
			
			</scroller>
			<div class="bottomBar" v-if="showDel">
				<div class="checkAllBox" @click="selectedAll=!selectedAll">
					<text v-if="selectedAll" class="selectAll selected">&#xe60d;</text>
					<text v-else class="selectAll">&#xe67f;</text>
					<text>check all</text>
				</div>
				<text class="delBox">delete</text>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectedAll: false,
				showDel: false,
				show: true,
				goodsList: [{
						selected: false,
					},
					{
						selected: false,
					},
					{
						selected: false,
					},
					{
						selected: false,
					},
					{
						selected: false,
					},
					{
						selected: false,
					}
				],
				shopList: [

				],
				headerTop: 0,
				//控制滑动效果
				typeClass: "used",
				subState: "",
				theIndex: null,
				oldIndex: null,
				isStop: false
			};
		},
		created() {

		},

		methods: {
			switchType(type) {
				if (this.typeClass == type) {
					return
				}
				this.typeClass = type
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {},
			touchMove(index, event) {

			},

			touchEnd(index, $event) {

			},

			//删除商品
			toUrl() {
				this.toast("跳转")
			},

			discard() {
				//丢弃
			}
		}
	};
</script>
<style scoped>
	.tabr {
		height: 100px;
		width: 700px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.delIcon {
		font-family: iconfont;
		font-size: 38px;
		color: #FFFFFF;
	}

	.complete {
		font-size: 28px;
		color: #FFFFFF;
	}

	.tabItem {
		height: 60px;
		width: 180px;
		
		padding: 0 2px;
		justify-content: center;
		align-items: center;
	}

	.off {
		line-height: 60px;
		height: 60px;
		border-bottom-width: 4px;
		border-bottom-color: #FFF;
		border-bottom-style: solid;
		font-size: 30px;
	}

	.row {
		flex-direction: row;
	}



	.on {
		border-bottom-width: 4px;
		border-bottom-color: #BA8833;
		border-bottom-style: solid;
		color: #BA8833;
		line-height: 60px;
		font-size: 30px;
		height: 60px;
	}

	.wrapper {
		background-color: #FFF;
	}

	.bottomBar {
		width: 750px;
		height: 90px;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 32px;
		background-color: #fff;
		/* position: fixed; */
		/* bottom: -90px; */
	}

	.checkAllBox {
		flex-direction: row;
		flex: 1;
		align-items: center;
	}

	.selectAll {
		font-size: 40px;
		color: #000000;
		font-family: iconfont;
		margin-right: 10px;
	}

	.delBox {
		background-color: #2A2A2A;
		color: #FFFFFF;
		width: 228px;
		height: 70px;
		line-height: 70px;
		text-align: center;
		border-radius: 8px;
	}


	.listBox {
		flex: 1;
	}

	.scroller {
		width: 750px;
		flex: 1;

	}

	.scrollerDiv {
		flex-direction: row;
		flex-wrap: wrap;
		width: 750px;
		justify-content: space-around;
	}

	.listCell {
		width: 170px;
		height: 170px;
		margin: 5px;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: #E6E6E6;
		position: relative;

	}

	.selectMask {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}

	.select {
		font-family: iconfont;
		font-size: 40px;
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.selected {
		color: #BA8833;
	}

	.cellImg {
		width: 100px;
		height: 100px;
	}

	.empty {
		width: 170px;
		height: 0;
		margin: 5px;
	}

	.mask {
		position: fixed;
		left: 104px;
		width: 542px;
		height: 185px;
		top: 570px;
		background-color: rgba(31, 31, 31, 0.85);
		border-radius: 8px;
	}



	.inputDate {
		width: 300px;
		background-color: #999;
		height: 100px;
	}
</style>
