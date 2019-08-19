<template>
	<div class="emptyCon">
		<image  class="emptyImg" :src="img"></image>
		<text class="tipsT">{{tips}}</text>
	</div>
</template>

<script>
	export default{
		props: {
			img:{
				default:"root:img/e_order.png"
			},
			tips:{
				default:""
			}
		},
	}
</script>

<style>
	.emptyCon{
	
		width: 750px;
		height: 600px;
		justify-content: center;
		align-items: center;
	}
	.emptyImg{
		width: 258px;
		height: 258px;
	}
	.tipsT{
		line-height: 40px;
		font-size: 28px;
		color: #999999;
	}
</style>
