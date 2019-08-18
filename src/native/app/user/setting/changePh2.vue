<template>
	<div class="wrapper">
		<head title="Message authentication"> </head>
		<text class="title">After changing your mobile phone number, your account number will become a new mobile phone number. Next time you log in, use the new mobile phone number to log in. Current mobile phone number: {{phone}}</text>
		<div class="boxInput">
			<div class="row" @click="gonext('root:app/login/selectArea.js')">
				<text class="location">+86 </text><text class="icondown">&#xe609;</text>
			</div>
			<input class="input" v-model="phone_number" maxlength="11" placeholder="Enter your phonenumber" />
		</div>
		<div class="boxInput mt20">
			<input class="input" v-model="verify" placeholder="Enter your vertify" />
			<!-- <text class="getCode">get code</text> -->
			<text class="getCode" v-if=" state">{{ currentTime }} s</text>
			<text class="getCode" v-if=" !state" @click="send_verify_code">get code</text>

		</div>

		<text class="sureBtn" @click="checkVertify">confirm modification</text>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	import asCore from "../../../mixin/core";
	import {
		send_verify,
		verifyMobile,
		editMobile
	} from "../../../mixin/ajax.js";

	export default {
		data() {
			return {
				phone: "",
				phone_number: "",
				users_id:"",
				verify:"",
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
			}
		},
		created() { 
			asCore.getBsessionid(userId=>{
				this.users_id=userId
			})
		},
		methods: {
			send_verify_code() {
				let that = this;
				if (!that.phone_number) {
					that.toast("Enter your phoneNumber");
					return false
				}
				this.loading = true;
				send_verify({
					mobile: that.phone_number,
					type: "4" //修改手机号
				}, (res, flag) => {
					this.loading = false;
					if (flag) {
						if (res.code == "200") {
							that.toast(res.message)
							//把显示时间设为总时间
							that.currentTime = this.totalTime;
							//开始倒计时
							that.state = true;
							//执行倒计时
							that.checkingTime();
						} else {
							that.toast(res.message)
						}
					}

				})

			},
			checkingTime() {
				let that = this;
				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},
			checkVertify(){
				let that=this;
				if (!that.phone_number) {
					that.toast("Enter your phoneNumber");
					return false
				}
				if (!that.verify) {
					that.toast("Enter verify");
					return false
				}
				verifyMobile({
					phone_number:this.phone_number,
					verify:this.verify,
				},(res,flag)=>{
						
					if(flag){ 
						if(res.code==200){
							that.changePhone()
						}else{
							that.toast(res.message)
						}
						
					}
				})
			},
			changePhone(){
				if (!that.phone_number) {
					that.toast("Enter your phoneNumber");
					return false
				}
				editMobile({
					users_id:this.users_id,
					phone_number:this.phone_number,
					old_phone_number:this.phone,
				},(res,flag)=>{
						
					if(flag){
						this.toast(res.message)
						if(res.code==200){
							gonext('root:app/user/setting/changePh3.js',{phone:this.phone_number})
						}
					}
				})
			},
			onLoad(parmas) {
				this.log(parmas);
				if (parmas && parmas.phone) {
					this.phone = parmas.phone;
				}
			},
			gonext(url,parmar) {
				this.push(url,parmar);
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		background-color: #F2F2F2;
	}

	.title {
		font-size: 26px;
		color: #999999;
		padding: 32px;
		width: 750px;
		line-height: 37px; -moz-animation: .25s, 100ms; 
	}

	.row {
		flex-direction: row;
		align-items: center;
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

	.location {
		margin-left: 34px;
		font-size: 32px;
		color: #666666;
		margin-right: 10px;
	}

	.icondown {
		color: #666666;
		font-family: iconfont;
		font-size: 24px;
	}

	.mt20 {
		margin-top: 20px;
	}

	.boxInput {
		width: 750px;
		height: 90px;
		background-color: #FFFFFF;
		position: relative;
		align-items: center;
		flex-direction: row;
		;

	}

	.input {
		flex: 1;
		padding-left: 32px;
		height: 60px;
		line-height: 60px;
	}

	.getCode {
		padding: 0 34px;
		height: 80px;
		line-height: 80px;
		color: #BA8833;
		text-align: center;
		font-size: 32px;
	}

	.sureBtn {
		margin-left: 32px;
		margin-top: 40px;
		width: 686px;
		height: 80px;
		background-color: #303030;
		border-radius: 8px;
		text-align: center;
		line-height: 80px;
		color: #FFFFFF;
		font-size: 34px;
	}
</style>
