<template>
	<div>
		<head title="complete"></head>
		<div class="icon">
			<text class="iconfont">&#xe60d;</text>
			<text class="status">Password modified successfully</text>
			<text class="tips" >After 3s, it will be automatically transferred to the login page</text>
			<text class="btn">Return to login</text>

		</div>

	</div>
</template>

<script>
	const navigator = weex.requireModule('navigator');
	export default {
		data() {
			return {
				amount: 0
			};
		},
		created() {
			let that=this;
			setTimeout(()=>{
				this.returnpage()
			},4000)
		},
		methods: {
			returnpage() {
				this.push("root:app/login/login.js")
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
	.tips{
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
