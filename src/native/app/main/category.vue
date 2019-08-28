<template>
	<div class="layout">
		<head :hasleft="false" title="Categories"></head>
		<div class="tabr">
			<!-- <text class="tabItem" :ref="'item'+index" @click="tabClick(index)"
			  :class="[tabCurrentIndex === index?'current':'']">{{ item.text }}</text> -->
			<div class="tabItem" @click="tabClick(index)" v-for="(item, index) in navList" :key="index">
				<text :class="[tabCurrentIndex==index?'on':'off']">{{item.text}}</text>
			</div>
			<!--<div class="tabItem" @click="switchType('new')">
				<text :class="[typeClass=='new'?'on':'off']">self-support</text>
			</div> -->
		</div>
		<!-- <scroller class="navbar" scroll-direction="horizontal">
			
		</scroller> -->
		<slider class="slider" @change="slideChange" :index="tabCurrentIndex">
			<div v-for="(item, index) in navList">
				<div class="header">
					<div class="input-box">
						<input class="input" placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
						<text class="iconfont iconSearch">&#xe62a;</text>
					</div>
				</div>
				<div class="category-list">
					<!-- 左侧分类导航 -->
					<scroller class="scrollerleft">
						<div class="leftrow" v-for="(category,index) in item.List" :key="category.id" :class="[index==showCategoryIndex?'leftrowon':'']"
						 @click="showCategory(index,category.id)">
							<div class="lefttext">
								<text>{{category.name}}</text>
							</div>
						</div>
					</scroller>
					<scroller class="scrollerright">
						<!-- 右侧子导航 -->
						<block v-for="(category,index) in item.List" :key="category.id">
							<div class="categoryList" v-if="index==showCategoryIndex">
								<div class="catelist">
									<div class="listBox">
										<div class="listitem" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
											<image class="itemImg" :src="box.thumb" />
											<text class="itemName">{{box.name}}</text>
										</div>
										<div class="listitema"></div>
										<div class="listitema"></div>
									</div>
								</div>
							</div>
						</block>
					</scroller>
				</div>
			</div>

		</slider>
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");
	import {
		get_category_list
	} from "../../mixin/ajax"


	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				showCategoryIndex: 0,
				headerPosition: "fixed",
				city: "北京",
				typeClass: "used",
				parentid: "",
				navList: [{
						hasMore: true,
						type: 2,
						text: 'second-hand',
						page: 1,
						loadingType: 'more',
						total: 0,
						List: []
					},
					{
						hasMore: true,
						type: 1,
						page: 1,
						text: 'self-support',
						loadingType: 'more',
						total: 0,
						List: []
					}
				],
				//分类列表
				categoryList: []
			};
		},

		onLoad() {},
		methods: {
			//消息列表
			loadData(user_id) {
				this.log(user_id);
				this.getGoodList()
			},
			getGoodList(type) {
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let subItenm = [];
				if (type === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (type === "subChange") {
					subItenm = navItem.List.filter(item => item.id == this.parentid);

					if (subItenm[0] && subItenm[0].loaded == true) {
						return;
					}
				}
				get_category_list({
					parentid: this.parentid,
					type: navItem.type
				}, (res, flag) => {
					this.log(navItem.type)
					this.log(res)
					if (flag) {
						if (!this.parentid) {
							let list = res.data;
							list.forEach(item => {
								this.$set(item, "list", []);
								this.$set(item, "loaded", false);
							})
							this.navList.forEach(item => {
								if (item.type == navItem.type) {

									this.$set(item, "List", list);
									this.$set(item, "loaded", true);
								}
							})
							if (res.data.length > 0) {
								this.parentid = res.data[0].id;
								this.getGoodList()
							}
							//this.log(this.navList) 
						} else {
							navItem.List.forEach(item => {
								if (item.id == this.parentid) {
									this.$set(item, "list", res.data);
									this.$set(item, "loaded", true);
								}
							})

						}
					}

				})
			},
			switchType(type) {
				if (this.typeClass == type) {
					return
				}
				this.typeClass = type
			},
			tabClick(index) {
				if (this.tabCurrentIndex == index) {
					return false;
				}
				this.tabCurrentIndex = index;
				this.getGoodList('tabChange');
			},
			slideChange(index) {
				if (this.tabCurrentIndex == index.index) {
					return false;
				}
				this.tabCurrentIndex = index.index;
				this.getGoodList('tabChange');
				// const ref = this.$refs["item" + index.index]
				// const el = ref ? ref[0] : null;
				// dom.scrollToElement(el, {
				// 	offset: -250
				// })

			},
			//分类切换显示
			showCategory(index, id) {
				this.showCategoryIndex = index;
				this.parentid = id;
				this.getGoodList('subChange')
			},
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.navigateTo({
					url: "../goods/goods-list?cid=" + e.id + "&name=" + e.name
				});
			},
			//搜索跳转
			toSearch() {
				uni.showToast({
					title: "建议跳转到新页面做搜索功能"
				});
			}
		}
	};
</script>
<style scoped>
	.tabr {
		height: 100px;
		width: 700px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.tabItem {
		height: 70px;
		width: 280px;

		padding: 0 2px;
		justify-content: center;
		align-items: center;
	}

	.navbar {
		height: 90px;
		width: 750px;
		flex-direction: row;
	}

	.nav-item {
		height: 90px;
		padding: 0 20px;
		margin: 0 30px;
		line-height: 90px;
		font-size: 30px;
		color: #333333;
	}

	.current {

		border-bottom-color: #BA8833;
		border-bottom-width: 4px;
		border-bottom-style: solid;
		color: #BA8833;
	}

	.slider {
		flex: 1;
		position: relative;
	}

	.off {
		line-height: 70px;
		height: 70px;
		/* border-bottom-width: 8px; */
		/* border-bottom-color: #FFF; */
		/* border-bottom-style: solid; */

		font-size: 30px;
	}




	.on {
		border-bottom-width: 8px;
		border-bottom-color: #BA8833;
		border-bottom-style: solid;
		color: #BA8833;
		line-height: 70px;
		font-size: 30px;
		height: 70px;
	}

	.iconfont {
		font-family: iconfont;
	}

	.leftIcon {
		color: #ffffff;
		font-size: 40px;
	}

	.layout {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}

	.scroller {
		flex: 1;
		background-color: #f06c7a;
	}

	.header {
		width: 750px;
		height: 100px;
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #fafafa;
		justify-content: center;
	}

	.input-box {
		width: 600px;
		height: 60px;
		background-color: #f5f5f5;
		border-radius: 30px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.input {
		padding-left: 28px;
		height: 28px;
		font-size: 28px;
	}

	.iconSearch {
		margin-right: 15px;
		font-size: 30px;
	}

	.category-list {
		width: 750px;
		background-color: #fff;
		display: flex;
		flex: 1;
		flex-direction: row;
	}

	.scrollerleft {
		flex: 2;
		background-color: #f2f2f2;
		padding: 0;
	}

	.leftrow {
		widows: 213px;
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f2f2f2;
	}

	.leftrowon {
		height: 90px;
		background-color: #fff;
		border-left-width: 4px;
		border-left-style: solid;
		border-left-color: #ba8833;
	}

	.lefttext {
		flex: 1;
		font-size: 28px;
		display: flex;
		justify-content: center;
		color: #3c3c3c;
		align-items: center;
	}

	.scrollerright {
		flex: 5;
		background-color: #f2f2f2;
	}

	.categoryList {
		width: 537px;
		background-color: #f2f2f2;

	}

	.catelist {
		width: 537px;
		background-color: #fff;

		padding-top: 20px;
		padding-bottom: 20px;
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.catetext {
		font-size: 30px;
		margin-bottom: 15px;
	}

	.listBox {
		width: 537px;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.listitema {
		width: 170px;
	}

	.listitem {
		width: 170px;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 15px;

	}

	.itemImg {
		width: 120px;
		height: 140px;
		background-color: #f2f2f2;
		margin-bottom: 10px;
	}

	.itemName {
		width: 170px;
		text-align: center;
	}

	.catebanner {
		border-radius: 10px;
	}

	.block {
		position: absolute;
		width: 0px;
		left: 0;
	}

	.text {
		width: 200px;
		position: relative;
		font-size: 28px;
		display: flex;
		justify-content: center;
		color: #3c3c3c;
	}

	.block {
		width: 10px;
		height: 80%;
		top: 10%;
		background-color: #f06c7a;
	}

	.text {
		font-size: 30px;
		font-weight: 600;
		color: #2d2d2d;
	}

	.row {
		width: 200px;
		height: 90px;
		display: flex;
		align-items: center;
	}

	image {
		width: 100%;
		height: 24.262vw;
	}

	.banner {
		width: 100%;
		height: 24.262vw;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
	}

	.right {
		width: 76%;
		left: 24%;
	}

	.category {
		width: 550px;
	}

	.list {
		margin-top: 40px;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.box {
		width: calc(71.44vw / 3);
		margin-bottom: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	image {
		width: 60%;
		height: calc(71.44vw / 3 * 0.6);
	}

	.text {
		margin-top: 5px;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 26px;
	}
</style>
