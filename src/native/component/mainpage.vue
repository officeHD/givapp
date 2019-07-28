<template>
	<div class="wxc-tab-page" :style="{backgroundColor:wrapBgColor }">
		<div class="tab-page-wrap" ref="tab-page-wrap">
			<div ref="tab-container" class="tab-container">
				<slot></slot>
			</div>
		</div>
		<div class="tab-title-list" :style="{ height: (tabStyles.height + (isIPhoneX ? 78 : 0))+'px', paddingBottom:isIPhoneX?'88px':'10px'}">
			<div class="tabItem" @click="setPage(0)" ref="wxc-tab-title-0">
				<text :class="[currentPage==0 ? 'active' : '','iconfont']">&#xe63e;</text>
				<text :class="[currentPage==0 ? 'active' : '']">Home</text>
			</div>
			<div class="tabItem" @click="setPage(1)" ref="wxc-tab-title-1">
				<text :class="[currentPage==1 ? 'active' : '','iconfont']">&#xe64a;</text>
				<text :class="[currentPage==1 ? 'active' : '']">Categories</text>
			</div>
			<div class="tabItem">

			</div>
			<div class="tabItem" @click="setPage(2)" ref="wxc-tab-title-2">
				<text :class="[currentPage==2 ? 'active' : '','iconfont']">&#xe64c;</text>
				<text :class="[currentPage==2 ? 'active' : '']">Cart</text>
			</div>
			<div class="tabItem" @click="setPage(3)" ref="wxc-tab-title-3">
				<text :class="[currentPage==3? 'active' : '','iconfont']">&#xe782;</text>
				<text :class="[currentPage==3? 'active' : '']">My GIV</text>
			</div>
			<div class="centerNav" @click="toSeling()">
				<text class="iconfont centerIcon">&#xe601;</text>
				<text>Post</text>
			</div>
		</div>
	</div>
</template>

<script>
	const dom = weex.requireModule("dom");
	const animation = weex.requireModule("animation");
	const navigator = weex.requireModule("navigator");
	import Utils from "../mixin/utils";
	export default {
		props: {
			currentPage: {
				type: Number,
				default: 0
			},
			tabTitles: {
				type: Array,
				default: () => []
			},
			tabStyles: {
				type: Object,
				default: () => ({
					bgColor: "#FFFFFF",
					height: 120,
					width: 140
				})
			},
			titleType: {
				type: String,
				default: "icon"
			},
			titleUseSlot: {
				type: Boolean,
				default: false
			},
			isTabView: {
				type: Boolean,
				default: true
			},
			duration: {
				type: [Number, String],
				default: 300
			},
			timingFunction: {
				type: String,
				default: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
			},
			wrapBgColor: {
				type: String,
				default: "#f2f2f2"
			}
		},
		data: () => ({
			translateX: 0
		}),
		created() {
			const {
				titleType,
				tabStyles
			} = this;

			this.isIPhoneX = Utils.env.isIPhoneX();
			this.isIphone = Utils.env.isIOS();
			if (this.isIphone == true) {}
		},
		mounted() {
			this.setPage(this.currentPage);
		},
		methods: {
			toSeling() {
				navigator.push("root:app/selling/selling.js");
			},
			next() {
				let page = this.currentPage;
				if (page < this.tabTitles.length - 1) {
					page++;
				}
				this.setPage(page);
			},
			prev() {
				let page = this.currentPage;
				if (page > 0) {
					page--;
				}
				this.setPage(page);
			},
			setPage(page, url = null, animated = true) {
				if (!this.isTabView) {
					this.jumpOut(url);
					return;
				}
				const previousPage = this.currentPage;
				const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];
				const {
					width
				} = this.tabStyles;
				const appearNum = parseInt(750 / width);
				const tabsNum = this.tabTitles.length;
				const offset = page > appearNum ? -(750 - width) / 2 : -width * 2;
				if (appearNum < tabsNum) {
					(previousPage > appearNum || page > 1) &&
					dom.scrollToElement(currentTabEl, {
						offset,
						animated
					});
					page <= 1 &&
						previousPage > page &&
						dom.scrollToElement(currentTabEl, {
							offset: -width * page,
							animated
						});
				}
				this.currentPage = page;
				this._animateTransformX(page, animated);
			},
			jumpOut(url) {
				url && Utils.goToH5Page(url);
			},
			_animateTransformX(page, animated) {
				const {
					duration,
					timingFunction
				} = this;
				const computedDur = animated ? duration : 0.00001;
				const containerEl = this.$refs[`tab-container`];
				const dist = page * 750;
				containerEl.s;
				animation.transition(
					containerEl, {
						styles: {
							transform: `translateX(${-dist}px)`
						},
						duration: 0,
						timingFunction,
						delay: 0
					},
					() => {}
				);
			}
		}
	};
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
		font-size: 40px;
		margin-bottom: 10px;
	}

	.wxc-tab-page {
		flex: 1;
	}

	.tab-title-list {
		flex-direction: row;
		justify-content: space-around;

		background-color: #ffffff;
		align-items: flex-end;

		padding-bottom: 10px;
		position: relative;
	}

	.title-item {
		justify-content: center;
		align-items: center;
		border-bottom-style: solid;
	}

	.tab-page-wrap {
		width: 750px;
		flex: 1;
		overflow: hidden;
	}

	.tab-container {
		flex: 1;
		flex-direction: row;
		position: absolute;
	}

	.tab-text {
		lines: 1;
		text-overflow: ellipsis;
	}

	.desc-tag {
		position: absolute;
		top: 10px;
		right: 22px;
		border-radius: 30px;
		background-color: #ff3e3e;
		height: 30px;
		width: 30px;
		align-items: center;
		justify-content: center;
		padding-left: 6px;
		padding-right: 6px;
	}

	.dot {
		width: 14px;
		height: 14px;
		border-bottom-right-radius: 14px;
		border-bottom-left-radius: 14px;
		border-top-left-radius: 14px;
		border-top-right-radius: 14px;
		position: absolute;
		top: 13px;
		right: 43px;
		background-color: #ff3e3e;
	}

	.desc-text {
		font-size: 20px;
		color: #ffffff;
	}

	.icon-font {
		margin-bottom: 8px;
	}

	.no-margin {
		margin-bottom: 0px;
	}

	.tabItem {
		align-items: center;
		width: 140px;
	}

	.centerNav {
		position: fixed;
		left: 325px;
		bottom: 10px;
		justify-content: center;
		align-items: center;
	}

	.centerIcon {
		width: 116px;
		height: 116px;
		text-align: center;
		line-height: 96px;
		background-color: #c09244;
		border-radius: 58px;
		color: #ffffff;
		border-color: #fefefe;
		border-width: 10px;
		border-style: solid;
		box-shadow: -5px 0 5px #ffffff;
	}

	.active {
		color: #bd8d38;
	}
</style>
