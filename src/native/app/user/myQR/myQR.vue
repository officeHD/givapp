<template>
	<div class="wrapper">
		<head title="Edit data" @rightClick="rightClick">
			<text slot="right" class="complete">complete</text>
		</head>
		<div class="userImg" @click="changePhoto">
			<image class="avator" :src="user.headimgurl" />
			<text class="changeHead">Change heads</text>
		</div>
		<div class="locationBox  bb   ">
			<text class="meth_title">Name</text>
			<div class="meth_right ">
				<input class="inputName" type="text" :value="user.nickname" @input="onChange" />
			</div>
		</div>
		<div class="locationBox bb " @click="changeAlert('show')">
			<text class="meth_title">Gender</text>
			<div class="meth_right ">
				<text class="cityName">{{user.sex=='1'?'Man':'Woman'}}</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div :class="[showMask?'maskAlert':'hidemask']" @click="changeAlert('hide')"></div>

		<!-- 性别弹出框 -->
		<div class="shopAlert" ref="shopAlert" @click="e=>e.stopPropagation()">
			<!-- <text class="alertTop">Shipping method</text> -->
			<div class="alertScroll">
				<div class="selectLi" @click="user.sex=1">
					<text class="liIcon" :class="[user.sex=='1'?'selected':'']">{{user.sex=="1"?"&#xe602;":"&#xe67f;"}}</text>
					<text class="liTxt" :class="[user.sex=='1'?'selected':'']">Man</text>
				</div>
				<div class="selectLi" @click="user.sex=2">
					<text class="liIcon" :class="[user.sex=='2'?'selected':'']">{{user.sex=="2"?"&#xe602;":"&#xe67f;"}}</text>
					<text class="liTxt" :class="[user.sex=='2'?'selected':'']">Woman</text>
				</div>

			</div>
			<text class="sureBtn" @click="confirm">confirm</text>
		</div>
		<div v-if="loading" class="mask" @click="event=> event.stopPropagation()">
			<floading class="indicator" color="#303030"> </floading>
		</div>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	const animation = weex.requireModule("animation");
	const photo = weex.requireModule("photo");
	import asCore from "../../../mixin/core";
	import {
		upload,
		edit_users_info
	} from "../../../mixin/ajax.js"


	export default {
		components: {},
		data() {
			return {
				loading: false,
				refreshing: false,
				showMask: false,
				user: {
					sex: "0",
					nickname: "",
					phone: "",
					headimgurl: "root:img/user.jpg",
					users_uuid: ""
				}
			};
		},
		created() {
			asCore.getContext(context => {
			 
				this.user = context;
			});
		},
		methods: {
			onChange(e) {
				this.user.nickname = e.value
			},
			changeAlert(type) {
				var testEl = this.$refs.shopAlert;
				let transform = "100%";
				this.showMask = false;

				if (type == "show") {
					transform = "-100%";
					this.showMask = true;
				}
				animation.transition(
					testEl, {
						styles: {
							transform: `translateY(${transform})`
						},
						duration: 400, //ms
						timingFunction: "ease",
						delay: 0 //ms
					},
					function() {}
				);
			},
			confirm() {
				this.changeAlert('hide')
			},
			changePhoto() {
				var self = this;
				photo.open(800, 800, "#000000", "#ffffff", "#ffffff", function(e) {
					self.src = e.path;
					upload({
						type: 0,
						file: e.path
					}, (res) => {
						self.log(res.res.data.file_url)
						if (res.res.message) {
							self.toast(res.res.message)
						}
						if (res.res.code == 200) {
							self.user.headimgurl = res.res.data.file_url;

						}
					})
				});


			},
			rightClick() {
				this.log(this.user.nickname)
				this.loading = true;
				edit_users_info({
					users_id: this.user.users_uuid,
					headimgurl: this.user.headimgurl,
					nickname: this.user.nickname,
					sex: this.user.sex,
				}, (res, flag) => {
					this.loading = false;
					if (flag) {
						this.toast(res.message)
						const updateImg = new BroadcastChannel("updateImg");
						updateImg.postMessage("update");
						this.log(res)
					}

				})
			}

		},
	}
</script>

<style>
	.userImg {
		width: 350px;
		height: 300px;
		margin-left: 200px;
		justify-content: center;
		align-items: center;
	}

	.complete {
		color: #FFFFFF;
		margin-right: 10px;
		font-size: 24px;

	}

	.complete:active {
		color: #EEEEEE;
	}

	.avator {
		width: 159px;
		height: 159px;
		border-radius: 80px;
		margin-bottom: 30px;
		background-color: #FFFFFF;
	}

	.mask {
		position: fixed;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, .2);
	}

	.indicator {
		width: 100px;
		height: 100px;
	}

	.changeHead {
		font-size: 28px;
		color: #333333;
	}

	.wrapper {
		background-color: #F5F5F5;
	}

	.bb {
		border-bottom-style: solid;
		border-bottom-color: #EDEDED;
		border-bottom-width: 1px;
	}

	.locationBox {
		width: 750px;

		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 104px;
		padding: 0 32px;
		/* margin-bottom: 20px; */
		background-color: #FFFFFF;
	}

	.meth_title {
		color: #323232;
		font-size: 30px;
		width: 230px;
	}

	.meth_right {
		flex: 1;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;

	}

	.cityName {

		margin-right: 30px;
		font-size: 28px;
		color: #999999;
		flex: 1;
	}

	.inputName {
		margin-right: 30px;
		font-size: 28px;
		color: #999999;
		flex: 1;
		/* background-color: #02993C; */
		height: 60px;
	}

	.rightIcon {
		font-family: iconfont;
		font-size: 26px;
		color: #999;
	}

	.hidemask {
		height: 0;
	}

	.maskAlert {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 400px;
		top: 0;
		/* background-color: rgba(0, 0, 0, 0); */
	}

	.shopAlert {
		position: fixed;
		left: 0;
		bottom: -400px;
		width: 750px;
		height: 400px;
		background-color: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		align-items: center;
		padding: 32px;
	}

	.alertTop {
		width: 686px;
		text-align: left;
		padding-bottom: 32px;
		font-size: 28px;
		color: #333333;
	}

	.alertScroll {
		flex: 1;
		flex-direction: row;
		width: 686px;
		align-items: center;

	}

	.selectLi {
		/* margin-bottom: 30px; */
		flex: 1;

		height: 70px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750px;
		;
		padding-left: 32px;
	}

	.liIcon {
		font-size: 40px;
		font-family: iconfont;
		color: #999999;
		margin-right: 10px;
	}

	.liTxt {
		color: #999999;
		font-size: 28px;
	}

	.selected {
		color: #BA8833;
	}

	.sureBtn {
		width: 686px;
		height: 80px;
		line-height: 80px;
		border-radius: 10px;
		margin-bottom: 14px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
