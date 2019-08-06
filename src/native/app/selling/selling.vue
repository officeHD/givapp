<template>
	<div class="wrapper">
		<head title="Selling"></head>
		<scroller class="scroller">
			<div class="selBox">
				<div class="bb"></div>
				<input class="titleInput" placeholder="Title" type="number" />
				<div class="bb"></div>
				<textarea class="textarea"> </textarea>
				<div class="imgBox">
					<image class="clickPhoto" :src="src" v-if="src"></image>
					<image @click="pickPhoto" class="clickPhoto" src="root:img/photo.png"></image>
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
	const photo = weex.requireModule("photo");
	const net = weex.requireModule("net");

	export default {
		data() {
			return {
				amount: 0,
				src: ""
			};
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			returnpage() {
				navigator.backTo("A");
			},
			pickPhoto() {
				var self = this;
				photo.open(500, 800, "#000000", "#ffffff", "#ffffff", function(e) {
					self.src = e.path;
					var param = {};
					var header = {};
					var path = {};
					path.file = e.path;
					net.postFile(
						"http://xxx/upload",
						param,
						header,
						path,
						() => {
							//start
						},
						e => {
							//succcess
							var modal = weex.requireModule("modal");
							modal.toast({
								message: "上传成功！"
							});
						},
						() => {
							//compelete
						},
						() => {
							//exception
							var modal = weex.requireModule("modal");
							modal.toast({
								message: "上传异常！"
							});
						}
					);
				});
			}
		}
	};
</script>

<style scoped>
	.wrapper {
		background-color: #f2f2f2;
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
		color: #bd8c3b;
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
		background-color: #ffffff;
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
		flex-direction: row;
	}

	.clickPhoto {
		width: 63px;
		height: 50px;
		margin-right: 10px;
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
