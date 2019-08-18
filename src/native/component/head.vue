<template>
	<div class="layout" :style="{'background-color':bgcolor,'height':height+'px','padding-top':top}">
		<div style="flex-direction: row;align-items: center;flex: 1; justify-content:space-between ">
			<div class="backbg" v-if="!back&&hasleft" @click="letfClick" :style="{'height':height-top+'px','width':bgwidth+'px'}">
				<slot name="left"></slot>
			</div>
			<div class="leftIcon" v-if="back" @click="backTo" :style="{'height':height-top+'px','width':bgwidth+'px'}">
				<!-- <image src="root:img/back.png" style="width: 70px;height: 70px;  "></image> -->
				<text class="arricon" :style="{'color':titleColor}">&#xe603;</text>
			</div>
			<slot name="center"></slot>
			<text v-if="title" style="text-align: center;font-size: 36;" :style="{'color':titleColor}" @click="titleClick">{{title}}</text>

			<div class="rightBg" @click="rightClick" :style="{'height':height-top+'px','width':bgwidth+'px'}">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			bgwidth:{
				default:100
			},
			hasleft: {
				default: true
			},
			title: {
				default: ""
			},
			back: {
				default: true
			},
			titleColor: {
				default: "#ffffff"
			},
			hideBottomLine: {
				default: false
			},

			bgcolor: {
				default: "#303030"
			},
			autoback: {
				default: true
			},
			isloading: {
				default: false
			},
			disabled: {
				default: false
			},

			type: {
				type: String,
				default: "text"
			},
			font_size: {
				default: 20
			},
			height: {
				default: 140
			},
			top: {
				default: 50
			},
			titletop: {
				default: 10
			}
		},
		data() {
			return {};
		},
		methods: {
			titleClick() {
				this.$emit("titleClick");
			},
			letfClick() {
				this.$emit("letfClick");
			},
			rightClick() {
				this.$emit("rightClick");
			},
			backTo() {
				if (this.autoback) {
					var nav = weex.requireModule("navigator");
					nav.back();
					return;
				}
				this.$emit("backClick");
			},

			onclick() {
				if (!this.disabled) this.$emit("onclick");
			},

			adjust() {
				if (weex.config.env.platform == "android") {
					//                    if(weex.config.env.osVersion=)
					var p = weex.config.env.osVersion;
					p = p.replace(/\./g, "");
					if (p.length < 3) p = p + "0";
					if (p <= "440") {
						this.height = 108;
						this.top = 16;
						this.titletop = 4;
					}
				}
			}
		},

		created: function() {
			this.adjust();
		},
		ready: function() {}
	};
</script>
<style scoped>
	.backbg {
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.rightBg{
		flex-direction: row;
		justify-content: flex-end;;
		align-items: center;
		padding-right: 20px;
		/* background-color: #FFFFFF; */
	}

	.leftIcon {
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		padding-left: 20px;
	}

	.arricon {
		font-size: 40px;
		font-family: iconfont;
		color: #ffffff;
	}

	.layout {
		/*position: fixed;*/
		/*top: 0;*/
		/*left: 0;*/
		background-color: #02993c;
		height: 128;
		width: 750;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
