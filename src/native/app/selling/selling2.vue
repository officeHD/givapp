<template>
	<div class="wrapper">
		<head title="Selling"> </head>
		<div class="locationBox     ">
			<text class="meth_title">Visit time</text>
			<div class="meth_right ">
				<text class="cityName">9 a.m-11 a.m. on September 1</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
		<div class="locationBox">
			<text class="meth_title">delivery time</text>
			<div class="meth_right ">
				<text class="cityName">Saturday and Sunday</text>
				<text class="rightIcon">&#xe6a1;</text>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.wrapper {
		background-color: #F5F5F5;
	}

	.locationBox {
		width: 750px;
		/* border-bottom-style: solid;
		border-bottom-color: #e6e6e6;
		border-bottom-width: 2px; */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 104px;
		padding: 0 32px;
		margin-bottom: 20px;
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

	.rightIcon {
		font-family: iconfont;
		font-size: 26px;
		color: #999;
	}
</style>
