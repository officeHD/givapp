<template>
	<div class="wrapper">
		<head title="evaluation"></head>
		<div v-for="(listLi,liIndex) in list" :key="liIndex">
			<div class="order_top">
				<image class="googPic" :src="listLi.thumb"></image>
				<div class="goods_info">
					<text class="goods_title">{{listLi.title}}</text>
					<div class="goods_spec">
						<text class="priceInfo"> {{listLi.goods_option}} </text>
						<text class="specInfo"> {{listLi.number}} </text>
					</div>
				</div>
			</div>
			<div class="selBox">
				<textarea class="textarea" v-model="listLi.message"> </textarea>
				<div class="imgBox">
					<image v-if="listLi.imgList.length>0" class="clickPhoto reviewImg" resize="contain" v-for="(item,index) in listLi.imgList" :key="index"
					 :src="item.file_url"></image>
					<image @click="pickPhoto(listLi)" class="clickPhoto" resize="contain" src="root:img/photo.png"></image>
				</div>
			</div>
		</div>

		<text class="sureBtn" @click="confirm">publish</text>
	</div>
</template>

<script>
	const photo = weex.requireModule("photo");
	import asCore from "../../../mixin/core";
	import {
		upload,
		add_evaluation,
		get_order_co_info
	} from "../../../mixin/ajax.js"
	export default {
		data() {
			return {
				userId: "",
				orderId: "",
				list: [],
				message: "",
				imgList: []
			}
		},

		methods: {
			onLoad(param) {
				let type = 0;
				if (param && param.id) {
					this.orderId = param.id;
				}
				asCore.getBsessionid(userId => {

					this.userId = userId;
					this.getOrderDetail()
				});
			},
			getOrderDetail() {

				get_order_co_info({
					users_id: this.userId,
					co_order_id: this.orderId,
				}, (res, flag) => {
					this.log(res)
					if (flag) {
						if (res.code == 200) {
							this.list = res.data.list;

							this.list.forEach(item => {
								this.$set(item, 'message', "")
								this.$set(item, 'imgList', [])
							})

						}
					}
				})
			},
			confirm() {
				let that = this;
				that.list.forEach(item => {

					if (!item.message) {
						that.alert("Enter message")
					}
				})
				let eva = that.list.map(item => {
					return {
						order_id: item.id,
						goods_id: item.goods_id,
						option_id: item.option_id,
						message: item.message,
						file: item.imgList
					}
				})
				add_evaluation({
					users_id: this.userId,
					co_order_id: this.orderId,
					eva: eva

				}, (res, flag) => {
					this.log(eva)
					if (flag) {
						this.toast(res.message)
						if (res.code == 200) {
							setTimeout(() => {
								that.back()
							}, 2000)
						}
					}
				})
			},
			pickPhoto(list) {
				var self = this;
				photo.open(800, 800, "#000000", "#ffffff", "#ffffff", function(e) {
					self.src = e.path;
					upload({
						type: 0,
						file: e.path
					}, (res) => {

						if (res.res.message) {
							self.toast(res.res.message)
						}
						if (res.res.code == 200) {
							list.imgList.push({
								file_url: res.res.data.file_url,
								type: 1,
							});
							self.log(self.imgList)
						}
					})
				});


			},
		}
	}
</script>

<style scoped>
	.wrapper {
		background-color: #F5F5F5;
		position: relative;

	}

	.order_top {
		background-color: #fff;
		width: 750px;
		flex-direction: row;
		align-items: flex-start;
		/* border-bottom-style: solid;
		border-bottom-color: #E8E8E8;
		border-bottom-width: 1px; */
		padding: 30px 32px;

	}

	.googPic {
		width: 116px;
		height: 116px;
		background-color: #F5F5F5;
	}

	.goods_info {
		padding-left: 30px;
		flex: 1;
	}

	.goods_title {
		font-size: 22px;
		line-height: 30px;
		color: #666666;
	}

	.goods_spec {
		padding-top: 10px;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

	}

	.priceInfo {
		color: #666666;
		font-size: 20px;
	}

	.specInfo {
		color: #999999;
		font-size: 22px;
		/* background-color: #f2f22f; */
	}

	.selBox {
		width: 750px;
		padding: 15px 32px;
		background-color: #ffffff;
		margin-top: 20px;
	}

	.textarea {
		height: 250px;
		padding: 20px 0;
	}

	.imgBox {
		margin-bottom: 30px;
		flex-direction: row;
	}

	.clickPhoto {
		width: 63px;
		height: 63px;
		margin-right: 10px;
	}

	.reviewImg {
		background-color: #F5F5F5;
	}

	.sureBtn {
		width: 686px;
		height: 80px;
		line-height: 80px;
		border-radius: 10px;
		position: absolute;
		bottom: 16px;
		left: 32px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
