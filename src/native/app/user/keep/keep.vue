<template>
	<div>
		<head title="My collection"> </head>
		<div class="tabr">
			<text class="tabItem" :class="[typeClass=='used'?'on':'']"   @click="switchType('used')">used</text>
			<text class="tabItem" :class="[typeClass=='new'?'on':'']" @click="switchType('new')">new</text>

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
						name: "",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: "/static/img/goods/p1.jpg",
						name: "",
						spec: "规格:S码",
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 3,
						img: "/static/img/goods/p1.jpg",
						name: "",
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
				typeClass: "used",
				subState: "",
				theIndex: null,
				oldIndex: null,
				isStop: false
			};
		},

		methods: {
			switchType(type) {
				if(this.typeClass==type){
					return
				}
				this.typeClass=type
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
			},
			touchMove(index, event) {
			 
			},

			touchEnd(index, $event) {
				 
			},

			//删除商品
			deleteCoupon(id, List) {
		 
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

	.tabItem {
		height: 60px;
		line-height: 60px;
		margin: 0 90px;
		font-size: 30px;
		padding: 0 2px;
	}
	.on{
		border-bottom-width: 4px;
		border-bottom-color:#BA8833 ;
		border-bottom-style: solid;
		color: #BA8833;
		 
	}
</style>
