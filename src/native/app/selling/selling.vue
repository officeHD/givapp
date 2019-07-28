<template>
	<div class="wrapper">
		<head :back="true" bgcolor="#303030" title="Selling"></head>
		<scroller class="scroller">
			<div class="selBox">
				<div class="bb"></div>
				<input class="titleInput" placeholder="Title" type="number" />
				<div class="bb"> </div>
				<textarea class="textarea"> </textarea>
				<div class="imgBox">
					<image class="clickPhoto" src="root:img/photo.png"></image>
				</div>
				<div class="bb"> </div>
				<div class="cellItem mt20">
					<text class="iconfont check">&#xe60d;</text>
					<text class="newType">brand new</text>
				</div>
				<div class="cellItem">
					<text class="iconfont location">&#xe648;</text>
					<text class="newType">brand new</text>
				</div>
			</div>
			<div class="selBox mt20"></div>
		</scroller>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	export default {
		data() {
			return {
				amount: 0
			};
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			returnpage() {
				navigator.backTo("A");
			}
		}
	};
</script>

<style scoped>
	.wrapper {
		background-color: #F2F2F2;
		flex: 1;
	}

	.iconfont {
		font-family: iconfont;
	}

	.scroller {
		flex: 1;
	}

	.mt20 {
		margin-top: 20px;
	}

	.check {
		color: #BD8C3B;
		font-size: 40px;
	}

	.location {
		color: #767676;
		font-size: 40px;
	}

	.bb {
		border-bottom-color: #333;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.selBox {
		width: 750px;
		padding: 15px 32px;
		background-color: #FFFFFF;
	}

	.titleInput {

		height: 100px;
		line-height: 100px;
	}

	.textarea {
		height: 250px;
		padding: 40px 0;
	}

	.imgBox {
		margin-bottom: 30px;
	}

	.clickPhoto {
		width: 63px;
		height: 50px;
	}

	.cellItem {
		flex-direction: row;
		align-items: center;
		height: 80px;
	}

	.newType {
		margin-left: 30px;
		font-size: 34px;
		color: #999999;
	}
</style>
