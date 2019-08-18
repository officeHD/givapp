<template>
	<div class="wrapper">
		<head title="Retrieve password"> </head>

		<text class="title">Enter New Password</text>
		<div class="boxInput">
			<input type="password" v-model="password1" class="input" placeholder="Enter New Password" />

			<text class="line"></text>
		</div>

		<div class="boxInput">

			<input type="password" v-model="password2" class="input" placeholder="Repeat the new password" />
		</div>

		<text class="sureBtn" :class="[flagShow?'active':'']" @click="confirm">confirm modification</text>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	import {
		reset_password
	} from "../../../mixin/ajax.js";
	import asCore from "../../../mixin/core";
	export default {
		data() {
			return {
				password: "",
				password1: "",
				password2: "",
				usersData: {
					users_uuid: "",
					phone_number: ""
				},
			}
		},
		created() {
			asCore.getContext(userId => {
				this.usersData = userId
			})
		},
		computed: {
			flagShow() {
				let flagShow = false;
				flagShow = this.password && this.password1 && this.password2;
				return flagShow
			}
		},
		methods: {
			confirm() { 
				if(!flagShow){
					this.toast("Enter new password")
					return false;
				}
				if (this.password1 !== this.password2) {
					this.toast("两次密码不一样")
					return false;
				}
				reset_password({
					users_id: this.usersData.users_uuid,
					password: this.password1,
					repassword: this.password2,
				}, (res, flag) => {
					if (flag) {
						this.toast(res.message);
						if (res.code == 200) {
							setTimeout(() => {
								navigator.push("root:app/user/setting/changePw4.js");
							}, 1000)
						}

					}
				})

			},
			gonext(url) {
				navigator.push(url);
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		background-color: #F2F2F2;
	}

	.title {
		font-size: 28px;
		color: #666666;
		padding: 32px;
		width: 750px;
	}

	.line {
		position: absolute;
		width: 686px;
		left: 32px;
		bottom: 1px;
		border-bottom-width: 2px;
		border-bottom-color: #CCCCCC;
		border-bottom-style: solid;
	}

	.boxInput {
		width: 750px;
		height: 90px;
		background-color: #FFFFFF;
		position: relative;
	}

	.input {
		flex: 1;
		padding-left: 37px;
	}

	.tips {
		widows: 750px;
		padding: 32px;
		color: #BA8833;
		text-align: right;
	}

	.sureBtn {
		margin-left: 32px;
		margin-top: 40px;
		width: 686px;
		height: 80px;
		background-color: rgba(200, 200, 200, 1);
		border-radius: 8px;
		text-align: center;
		line-height: 80px;
		color: #999999;
		font-size: 34px;
	}

	.active {
		background-color: #303030;
		color: #FFFFFF;
	}
</style>
