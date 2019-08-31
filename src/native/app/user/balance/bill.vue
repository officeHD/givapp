<template>
	<div class="wrapper">
		<head title="Bill"> </head>
		<div class="topTit">
			<text class="titName">Bill</text>
			<text class="titFil">fiter</text>
		</div>
		<scroller class="scroller">
			<div class="item" v-for="item in listArr">
				<div class="itemLeft">
					<text class="time">{{item.create_time.split(" ")[0]}}</text>
					<text class="itemName">{{item.remarks}}</text>
				</div>
				<text class="money">{{item.price}}</text>
			</div>
		</scroller>
	</div>
</template>

<script>
	import {
		get_withdraw_list
	} from "../../../mixin/ajax.js";
	import asCore from "../../../mixin/core";
	export default {
		data() {
			return {
				users_id: "",
				page: 1,
				balance: "",
				poundage: "",
				content: "",
				min_price: "",
				listArr:[]
			}
		},
		methods: {
			onLoad() {
				asCore.getBsessionid(userId => {
					this.users_id = userId;
					this.getList();
				})
			},
			getList() {
				get_withdraw_list({
					users_id: this.users_id,
					page: this.page,
					page_num: 10,

				}, (res, flag) => {
					this.log(res)
					if(flag){
						if(res.code==200){
							this.listArr=res.data.list;
						}
					}
				})
			},
			gonext(url, parmar) { 
				this.push(url, parmar)
			}
		}
	}
</script>

<style>
	.wrapper {
		background-color: #F5F5F5;
	}

	.topTit {
		/* background-color: #FFFFFF; */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 32px;
		height: 76px;
	}

	.titName {
		font-size: 32px;
		color: #333333;
	}

	.titFil {
		font-size: 28px;
		color: #666666;
	}

	.scroller {
		flex: 1;
		background-color: #FFFFFF;
	}

	.item {
		flex-direction: row;
		justify-content: space-between;
		margin-left: 32px;
		margin-right: 30px;
		align-items: center;
		height: 100px;
		background-color: #FFFFFF;
		border-bottom-width: 1px;
		border-bottom-color: #EAEAEA;
		border-bottom-style: solid;

	}

	.itemLeft {
		flex-direction: row;
	}

	.time {
		font-size: 28px;
		color: #999999;
		margin-left: 10px;
	}

	.itemName {
		font-size: 28px;
		margin-left: 20px;
		color: #1E1E1E;
	}
	.money{
		color:#1E1E1E ;
		font-size: 34px;
		margin-right: 10px;
	}
</style>
