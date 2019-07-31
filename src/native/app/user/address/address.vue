<template>
	<div class="wrapper">
		<head title="My receipt address" @rightClick="add">
			<text class=" addIcon" slot="right">&#xe601;</text>
		</head>
		<div class="contentList">
			<div class="listrow" v-for="(row,index) in addressList" :key="index" @click="select(row)" bubble="true">
				<div class="left">
					<text class="head"> {{row.name[0]}} </text>
				</div>
				<div class="listCenter">
					<div class="name-tel">
						<text class="name">{{row.name}}</text>
						<text class="tel">{{row.phone}}</text>
					</div>
					<div class="defaulAdd">
						<text class="default" v-if="row.is_default=='2'"> default </text>
						<text class="address">{{row.province}} {{row.city}} {{row.area}} {{row.address}} </text>
						<div class="right" @click="edit(row)">
							<text class="bianji">edit</text>
						</div>
					</div>
				</div>
			</div>
		</div> 
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");
	export default {
		data() {
			return {
				isSelect: false,
				addressList: [{
						"id": 10,
						"name": "LiLi", 
						"phone": "15145112434",
						"province": "Anhui Province ",
						"city": "Hefei City",
						"area": "Shushan District",
						"address": " Huangshan Road, Science Avenue",
						"is_default": 2,
						"create_time": "2019-04-18 15:09:22"
					},
					{
						"id": 11,
						"name": "LiLi",
						"phone": "15145112434",
						"province": "Anhui Province ",
						"city": "Hefei City",
						"area": "Shushan District",
						"address": " Huangshan Road, Science Avenue",
						"is_default": 1,
						"create_time": "2019-04-18 15:09:22"
					}
				]
			};
		},

		methods: {
			edit(row) {
				navigator.push("root:app/user/address/edit.js");
			},
			add() {
				navigator.push("root:app/user/address/edit.js");
			},
			select(row) {
				const selectAddress = new BroadcastChannel("selectAddress");
				selectAddress.postMessage(row);
				navigator.back();
			}
		}
	};
</script>

<style scoped>
	.wrapper {

		width: 750px;
		background-color: #F5F5F5;
	}


	.contentList {
		width: 750px;
	}

	.addIcon {
		font-size: 40px;
		color: #FFFFFF;
		font-family: iconfont;
	}



	.icon {
		height: 80px;
		color: #fff;
		font-size: 30px;
		justify-content: center;
		align-items: center;
	}


	.listrow {
		margin-bottom: 20px;
		width: 750px;
		padding: 32px;
		/* height: 240px; */
		flex-direction: row;
		align-items: flex-start;
		background-color: #FFFFFF;
	}

	.left {
		width: 90px;
		flex-direction: row;

	}

	.head {
		width: 45px;
		height: 45px;
		background-color: #EBDEC8;
		color: #333333;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		font-size: 28px;
	}

	.listCenter {
		flex: 1;

	}

	.name-tel {
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
	}

	.name {
		font-size: 28px;
		color: #666666;
	}

	.tel {
		margin-left: 28px;
		font-size: 24px;
		color: #999;
	}

	.defaulAdd {
		flex-direction: row;
		flex: 1;
		padding-top: 5px;
	}

	.default {
		font-size: 20px;
		background-color: #FCF3E9;
		color: #ED6A38;
		padding: 5px 10px;
		margin-right: 15px;

	}

	.address {
		flex: 1;
		font-size: 24px;
		line-height: 33px;
		color: #666666;
		lines: 4;
		text-overflow: ellipsis;
	}

	.right {
		width: 90px;
		padding: 20px 0 30px;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;

	}

	.bianji {
		justify-content: center;
		align-items: center;
		font-size: 24px;
		color: #999999;
	}
</style>
