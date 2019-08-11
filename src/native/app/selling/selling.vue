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
					<text class="newType">Heifei High-tech Zone,Anhui Province</text>
				</div>
			</div>
			<div class=" mt20">
				<div class="locationBox bb " @click="changeAlert('show')">
					<text class="meth_title">Price</text>
					<div class="meth_right ">
						<text class="cityName">Woman</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
				<div class="locationBox bb " @click="changeAlert('show')">
					<text class="meth_title">Categories</text>
					<div class="meth_right ">
						<text class="cityName">Categories </text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
				<div class="locationBox bb " @click="changeAlert('show')">
					<text class="meth_title">Trading method</text>
					<div class="meth_right ">
						<text class="cityName">Woman</text>
						<text class="rightIcon">&#xe6a1;</text>
					</div>
				</div>
			</div>
		</scroller>
		<div :class="[showMask?'maskAlert':'hidemask']" @click="changeAlert('hide')"></div>

		<!-- 性别弹出框 -->
		<div class="shopAlert" ref="shopAlert" @click="e=>e.stopPropagation()">
			<!-- <text class="alertTop">Shipping method</text> -->
			<div class="alertScroll">
				<div class="selectLi">
					<text class="liTit">Price</text>
					<input class="liInput" type="number" placeholder="">
				</div>
				<div class="selectLi">
					<text class="liTit">Original price</text>
				</div>
				<div class="selectLi">
					<text class="liTit">GIV delivery</text>
					<div class="liCon">
						<div class="radioL">
							<text class="liIcon" :class="[user.sex=='0'?'selected':'']">{{user.sex=="0"?"&#xe602;":"&#xe67f;"}}</text>
							<text class="liTxt" :class="[user.sex=='0'?'selected':'']">Free shipping</text>

						</div>
						<div class="radioL">
							<text class="liIcon" :class="[user.sex=='1'?'selected':'']">{{user.sex=="1"?"&#xe602;":"&#xe67f;"}}</text>
							<text class="liTxt" :class="[user.sex=='1'?'selected':'']">distance</text>

						</div>
					</div>
				</div>


			</div>
			<text class="sureBtn" @click="confirm">confirm</text>
		</div>
	</div>
</template>

<script>
	const navigator = weex.requireModule("navigator");
	const photo = weex.requireModule("photo");
	const net = weex.requireModule("net");
	const animation = weex.requireModule("animation");
	export default {
		data() {
			return {
				showMask: false,
				amount: 0,
				src: "",
				user: {
					sex: 1
				}
			};
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
		},
		methods: {
			returnpage() {
				navigator.backTo("A");
			},
			changeAlert(type) {
				var testEl = this.$refs.shopAlert;
				let transform = "100%";
				this.showMask = false;

				if (type == "show") {
					transform = "-100%";
					this.showMask = true;
				}
				animation.transition(
					testEl, {
						styles: {
							transform: `translateY(${transform})`
						},
						duration: 400, //ms
						timingFunction: "ease",
						delay: 0 //ms
					},
					function() {}
				);
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

	.bb {
		border-bottom-style: solid;
		border-bottom-color: #EDEDED;
		border-bottom-width: 1px;
	}

	.locationBox {
		width: 750px;

		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 104px;
		padding: 0 32px;
		/* margin-bottom: 20px; */
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
		text-align: right;
	}

	.rightIcon {
		font-family: iconfont;
		font-size: 26px;
		color: #999;
	}

	.hidemask {
		height: 0;
	}

	.maskAlert {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 500px;
		top: 0;
		/* background-color: rgba(0, 0, 0, 0); */
	}

	.shopAlert {
		position: fixed;
		left: 0;
		bottom: -500px;
		width: 750px;
		height: 500px;
		background-color: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		align-items: center;
		padding: 32px;
	}

	.alertTop {
		width: 686px;
		text-align: left;
		padding-bottom: 32px;
		font-size: 28px;
		color: #333333;
	}

	.alertScroll {
		flex: 1;
		width: 686px;

	}

	.selectLi {
		/* margin-bottom: 30px; */
		width: 686px;
		height: 100px;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

	}

	.liTit {
		width: 180px;
		font-size: 28px;
		color: #333333;
	}

	.liInput {
		flex: 1;
		text-align: right;
		/* background-color: #0088FB; */
		height: 80px;
	}

	.liCon {
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.radioL {
		flex-direction: row;
		margin-right: 20px;
	}

	.liIcon {
		font-size: 40px;
		font-family: iconfont;
		color: #999999;
		margin-right: 10px;
	}

	.liTxt {
		color: #999999;
		font-size: 28px;
	}

	.selected {
		color: #BA8833;
	}

	.sureBtn {
		width: 686px;
		height: 80px;
		line-height: 80px;
		border-radius: 10px;
		margin-bottom: 14px;
		background-color: #303030;
		color: #fff;
		text-align: center;
		font-size: 30px;
	}
</style>
