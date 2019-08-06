<template>
	<div class="wrapper">
		<head title="Order details"></head>
		<div class="tophead">
			<text class="headTit">Waiting for delivery</text>
			<text class="headdes">Seller has shipped</text>
		</div>
		<div class="section1">
			<div class="shipNow">
				<div>
					<text class="location">[ShangHai] Express has been sent from Shanghhai center,ready to sendto Hefei</text>
					<text class="time">2018-03-15 06:32</text>
				</div>
				<text class="iconfont">&#xe6a1;</text>
				
			</div>
			<div class="user">
				<trext class="userName">jajsd</trext>
				<trext class="userPhone">132626262622</trext>
			</div>
			<text>sdada sadasfsdf dgsf ada guide sdzsd</text>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.wrapper{
		background-color: #F5F5F5;
	}
	.tophead {
		width: 750px;
		padding: 32px;
		background-color: #FFFFFF;
	}

	.headTit {
		color: #333333;
		font-size: 30px;
	}

	.headdes {
		color: #666;
		font-size: 28px;
	}
	.section1{
		margin-top: 20px;
		padding: 32px;
		background-color: #FFFFFF;
	}
	.shipNow{
		flex-direction: row; 
		align-items: center;
	}
	.user{
		flex-direction: row; 
		align-items: center;
	}
</style>
