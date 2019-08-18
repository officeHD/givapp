<template>
	<div>
		<head title="complete"></head>
		<div class="icon">
			<text class="iconfont">&#xe60d;</text>
			<text class="status">You have changed your mobile phone number to {{phone}}</text>
			<text class="tips">3s will automatically jump to the personal center page</text>
			<text class="btn">Back to home</text>

		</div>

	</div>
</template>

<script>
	const navigator = weex.requireModule('navigator');
	export default {
		data() {
			return {
				phone:"",
				amount: 0
			};
		},
		
		methods: {
			onLoad(parmar) {
				this.phone = parmar.phone;
				let that=this;
				setTimeout(()=>{
					that.returnpage();
				},4000)
			},
			returnpage() {
				navigator.backTo('A')
			}
		}
	};
</script>

<style scoped>
	.icon {
		width: 750px;
		flex: 1;
		justify-content: flex-start;
		padding-top: 120px;
		align-items: center;

	}

	.iconfont {
		font-family: iconfont;
		font-size: 200px;
		color: #BA8833;
	}

	.status {
		color: #333;
		font-size: 34px;
		margin-top: 50px;
	}

	.tips {
		color: #666666;
		width: 600px;
		text-align: center;
		font-size: 28px;
		margin-top: 20px;
		margin-bottom: 80px;
		line-height: 40px;
	}

	.btn {
		width: 400px;
		height: 80px;
		line-height: 80px;
		border-radius: 8px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
		margin-top: 88px;
	}
</style>
