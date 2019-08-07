<template>
	<div class="wrapper">
		<head title="evaluation"></head>
		<div class="detailItem">
			<div class="itemLeft">
				<text class="detaTit">Invoice status</text>
				<text class="detaInf">invoiced</text>
			</div>
			<div class="itemLeft mt20">
				<text class="detaTit">Order Number</text>
				<text class="detaInf">75298783027290729679</text>
			</div>
			<div class="itemLeft mt20">
				<text class="detaTit">Creation time</text>
				<text class="detaInf">June 18, 2019</text>
			</div>
			<div class="itemLeft mt20">
				<text class="detaTit">Invoice type</text>
				<text class="detaInf">Electronic ordinary invoice</text>
			</div>
			<div class="itemLeft mt20">
				<text class="detaTit">invoice title</text>
				<text class="detaInf">personal</text>
			</div>
			<div class="itemLeft mt20">
				<text class="detaTit">invoice control</text>
				<text class="detaInf">inventory list</text>
			</div>
			<div class="btnrow">
				<text class="deBtn">Download invoice</text>
				<text class="deBtn">Send email</text>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.wrapper{
		background-color: #F5F5F5;
	}
	.detailItem {
		padding: 32px;
		background-color: #FFFFFF;
	}
	
	.mt20 {
		margin-top: 20px;
	}
	
	.itemLeft {
		flex-direction: row;
		align-items: center;
	
	}
	
	.detaTit {
		color: #999999;
		font-size: 28px;
		width: 260px;
	}
	
	.detaInf {
		color: #333333;
		font-size: 28px;
		line-height: 40px;
	}
	
	.active {
		color: #BA8833;
	}
	.btnrow{
		flex-direction: row;
		justify-content: flex-end;
		padding-top: 20px;
		padding-bottom: 20px;
		margin-top: 40px;
		}
		.deBtn{
			height:44px;
			border-width: 1px;
			border-color: #333333;
			border-style: solid;
			color: #333333;
			font-size: 28px;
			text-align: center;
			padding-left: 10px;
			padding-right: 10px;
			line-height: 44px;
			margin-left: 20px;
		}
</style>
