<template>
	<div>
		<image class="bgimg" src="root:img/bg.png"> </image>
		<scroller class="wrapper">
			<text class="emailtitle">Verification code</text>
			<div class="inputBox bb">
				<input type="text" v-model="vertify" class="input" maxlength="6" placeholder="Please enter vertify"
				 placeholder-color="#F2f2f2" />
			</div>
			<text class="singnIn" @click="next">Next step</text>
		</scroller>
		<div v-if="loading" class="mask" @click="event=> event.stopPropagation()">
			<floading class="indicator" color="#303030"> </floading>
		</div>
	</div>
</template>

<script>
	const pref = weex.requireModule("storage")
	const navigator = weex.requireModule("navigator");
	import {
		bind_mobile
	} from "../../mixin/ajax.js";
	export default {
		data() {
			return {
				loading: false,
				vertify: "",
				loginType: "email"
			};
		},
		created() {
			let that = this;
			pref.getItem("users_id", res => {
				if (res.result == "success") {
					that.users_id = res.data;
				}
			})
		},
		methods: {
			onLoad(parmars) {
				this.log(parmars)
				if (parmars && parmars.phone) {
					this.phone = parmars.phone;
				}
			},
			next() {
				if (!this.vertify) {
					this.toast("Enter vertify");
					return false;
				}
				this.loading = true;
				bind_mobile({
					users_id: this.users_id,
					phone_number: this.phone,
					verify: this.vertify
				}, (res, flag) => {
					this.loading = false;
					this.log(res)
					if (flag) {
						this.toast(res.message);
						if (res.code == 200) {
							setTimeout(() => {
								navigator.backTo("A");
							}, 1000)
						}
					}
				})

			}
		}
	};
</script>

<style scoped>
	.bgimg {
		width: 750px;
		height: 1334px;
	}

	.iconfont {
		font-family: iconfont;
	}

	.inputIcon {
		font-size: 30px;
		color: #FFFFFF;
		width: 60px;
		text-align: left;
	}

	.wrapper {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		color: #FFFFFF;
		justify-content: flex-start;
		align-items: center;

	}

	.emailtitle {
		color: #FFFFFF;
		font-size: 48px;
		margin-top: 167px;
		height: 200px;
		width: 556px;
		text-align: left;
	}


	.input {
		flex: 1;
		height: 60px;
		padding-left: 5px;
		color: #FFFFFF;
		font-size: 30px;
	}

	.inputBox {
		margin-top: 40px;
		height: 80px;
		width: 556px;
		flex-direction: row;
		align-items: flex-end;
		padding-bottom: 2px;

	}

	.phoneType {
		height: 60px;
		color: #FFFFFF;
		line-height: 60px;
		font-size: 30px;
		margin-right: 20px;
	}

	.codeBtn {
		height: 60px;
		color: #FFFFFF;
		line-height: 60px;
		font-size: 30px;
	}

	.radioBox {
		flex-direction: row;
		margin-top: 32px;
		justify-content: flex-start;
		align-items: center;
		width: 556px;
		height: 40px;
	}

	.radio {
		color: #FFFFFF;
		font-size: 34px;
		margin-right: 20px;

	}

	.loginType {
		color: #FFFFFF;
		font-size: 26px;
	}

	.logintip {
		font-size: 22px;
		margin-top: 32px;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		margin-bottom: 220px;
	}

	.logintiphone {
		font-size: 22px;
		margin-top: 32px;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		margin-bottom: 100px;
	}

	.singnIn {
		width: 580px;
		height: 80px;
		border-radius: 40px;
		background-color: #FFFFFF;
		color: #303030;
		text-align: center;
		line-height: 80px;
		font-size: 28px;
		margin-top: 102px;
	}

	.singnIn:active {
		background-color: #f3f3f3;
	}

	.rowBox {
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.br {
		border-right-color: #FFFFFF;
		border-right-width: 1px;
		border-right-style: solid;
	}

	.bb {
		border-bottom-color: #FFFFFF;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.boxItem {

		font-size: 32px;
		color: #FFFFFF;
		text-align: center;
	}

	.ccc {
		color: #CCCCCC;
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
</style>
