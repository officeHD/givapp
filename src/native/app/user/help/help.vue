<template>
	<div class="wrapper">
		<head title="Help"></head>
		<div class="bannerList">
			<div class="topBanner">
				<div class="itemTap bb br" @click="gonext('root:app/user/help/questionList.js',{type:0})">
					<image class="iconSold" src="root:img/iconSold.png"></image>
					<text class="icontit">Sold</text>
				</div>
				<div class="itemTap bb" @click="gonext('root:app/user/help/questionList.js',{type:0})">
					<image class="iconBuy" src="root:img/iconBuy.png"></image>
					<text class="icontit">Buy</text>
				</div>
			</div>
			<div class="topBanner">
				<div class="itemTap br" @click="gonext('root:app/user/help/questionList.js',{type:0})">
					<image class="iconBalance" src="root:img/iconBalance.png"></image>
					<text class="icontit">Balance</text>
				</div>
				<div class="itemTap" @click="gonext('root:app/user/help/questionList.js',{type:0})">
					<image class="iconDispute" src="root:img/iconDispute.png"></image>
					<text class="icontit">Dispute</text>
				</div>
			</div>
		</div>
		<text class="title">Other</text>
		<x-cell v-for="item in helpList" :title="item.title" :hasArrow="true" @cellClick="gonext('root:app/user/help/questionList.js',{id:item.id})">
		</x-cell>
		<!-- <x-cell title="问题1" @cellClick="gonext('root:app/user/help/question.js',{type:0})"> </x-cell>
		<x-cell title="问题1" @cellClick="gonext('root:app/user/help/question.js',{type:0})"> </x-cell> -->
	</div>
</template>

<script>
	import {
		get_help_type
	} from "../../../mixin/ajax";
	export default {
		components: {
			"x-cell": require("../../../component/cell.vue")
		},
		data() {
			return {
				helpList: []
			}
		},
		methods: {
			onLoad() {
				get_help_type({}, (res, flag) => {
					this.log(res)
					if (flag) {
						this.helpList = res.data;
					}
				})
			},
			gonext(url, parmar) {
				this.push(url, parmar);
			}
		}

	}
</script>

<style scoped="scoped">
	.wrapper {
		background-color: #F5F5F5;

	}

	.bannerList {
		background-color: #FFFFFF;
	}

	.topBanner {
		width: 750px;
		flex-direction: row;
		height: 122px;
	}

	.itemTap {
		flex: 1;
		padding-left: 92px;
		align-items: center;
		flex-direction: row;
		height: 122px;
	}

	.title {
		padding: 0 32px;
		height: 65px;
		line-height: 65px;
		font-size: 24px;
		color: #888888;
	}

	.icontit {
		font-size: 32px;
		color: #333333;
		margin-left: 24px;
	}

	.iconSold {
		width: 38px;
		height: 42px;

	}

	.br {
		border-right-style: solid;
		border-right-width: 1px;
		border-right-color: #DDDDDD;
	}

	.bb {
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #DDDDDD;
	}

	.iconBuy {
		width: 44px;
		height: 44px;

	}

	.iconBalance {
		width: 40px;
		height: 44px;
	}

	.iconDispute {
		width: 38px;
		height: 42px;

	}
</style>
