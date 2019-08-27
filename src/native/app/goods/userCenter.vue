<!-- 卖家详情 -->
<template>
	<div class="userInfo">
		<image class="userAvator" :src="userInfo.headimgurl"></image>
		<div class="userCenter">
			<div class="row acenter">
				<text class="userName">{{userInfo.nickname}}</text>
				<text class="credit">Excellent credit</text>
			</div>
			<div class="row">
				<text class="row_title">ust released in Hefei</text>
				<!-- <text class="row_num">50</text> -->
			</div>
		</div>
	</div>
</template>

<script>
	import {
		get_users_info
	} from "../../mixin/ajax.js";
	import asCore from "../../mixin/core";
	export default {
		data() {
			return {
				userId: "",
				userInfo: {
					"id": 27,
					"account": "10000000134",
					"status": 1,
					"phone_number": "13635697675",
					"headimgurl": "",
					"nickname": "tll",
					"email": "111111@qq.com",
					"sex": 2,
					"user_name": "檀玲玲",
					"users_uuid": "2cf751e717424373b99dc74c68927ee2",
					"refund_name": "檀",
					"refund_phone": "13635697675",
					"refund_address": "测试地址",
					"take_time": "每天8:00-10:00",
					"receive_time": "每天18:00-20:00",
					"take_address": "测试地址",
				},
				secondList: []
			}
		},
		methods: {
			onLoad(param) {
				let that = this;
				if (param && param.id) {
					this.userId = param.id;
					//获取用户信息
					get_users_info({
						users_id: param.id,
					}, (res, flag) => {
						if (flag) {
							if (res.code == "200") {
								this.userInfo = res.data;
							} else {
								this.toast(res.message)
							}
						}
					})
					this.getList();

				}
			},
			getList() {
				let that = this;
				//获取二手列表
				get_goods_list({
					users_id: this.userId,
					type: "1,2",
					status: "1",
					page: this.page,
					page_num: "10"
				}, (res, flag) => {
					if (flag) {
						if (res.code == "200") {
							that.secondList = res.data.list;
						} else {
							that.toast(res.message)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.acenter {
		align-items: center;
	}

	.row {
		flex-direction: row;
	}

	.userName {
		font-size: 34px;
	}

	.credit {
		color: #41EFF2;
		margin-left: 20px;
	}

	.userInfo {
		width: 686px;
		flex-direction: row;
		padding: 20px 0;
		background-color: #fff;
		margin: 30px 32px;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: #E8E8E8;
		border-left-width: 0;
		border-right-width: 0;
	}

	.userAvator {
		width: 94px;
		height: 94px;
		border-radius: 47px;
		background-color: #F2F2F2;
	}

	.userCenter {
		flex: 1;
		padding-right: 30px;
		padding-left: 20px;
		height: 80px;
		justify-content: space-between;
	}

	.row_title {
		color: #9a9999;
		font-size: 26px;
		margin-right: 15px;
	}
</style>
