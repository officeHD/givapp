<template>
<div class="layout">
  <head :back="false" bgcolor="#303030" title="Categories"></head>
  <view class="header">
    <view class="input-box">
      <input class="input" placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
      <text class="iconfont iconSearch">&#xe62a;</text>
    </view>
  </view>
  <!-- 占位 -->
  <view class="category-list">
    <!-- 左侧分类导航 -->
    <scroller class="scrollerleft">
      <view
        class="leftrow"
        v-for="(category,index) in categoryList"
        :key="category.id"
        :class="[index==showCategoryIndex?'leftrowon':'']"
        @click="showCategory(index)"
      >
        <view class="lefttext">
          <text>{{category.title}}</text>
        </view>
      </view>
    </scroller>
    <scroller class="scrollerright">
      <!-- 右侧子导航 -->
      <block v-for="(category,index) in categoryList" :key="category.id">
        <div class="categoryList" v-if="index==showCategoryIndex">
          <div class="catelist" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
            <text class="catetext">{{box.title}}</text>
			<div class="listBox">
				<div class="listitem" v-for="(item,index) in box.list" :key="index">
					<image class="itemImg" :src="item.img" />
					<text class="itemName">{{item.name}}</text>
				</div>
			</div>
          </div>
        </div>
      </block>
    </scroller>
  </view>
</div>
</template>
<script>
const navigator = weex.requireModule("navigator");

export default {
  data() {
    return {
      showCategoryIndex: 0,
      headerPosition: "fixed",
      city: "北京",
      //分类列表
      categoryList: [
        {
          id: 1,
          title: "Women's Wear",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "Beauty makeup",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 3,
          title: "wears",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 4,
          title: "Digital",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            },
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 5,
          title: "shoes",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 6,
          title: "trousers",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 7,
          title: "Children's",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 8,
          title: "Toys",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 9,
          title: "furniture",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 10,
          title: "Bag",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 11,
          title: "Wash and care",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        },
        {
          id: 12,
          title: "Stationery",
          banner: "../../static/img/category/banner.jpg",
          list: [
            {
              title: "Best Sellers",
              list: [
                { name: "电视", img: "2.jpg" },
                { name: "空调", img: "3.jpg" },
                { name: "洗衣机", img: "4.jpg" },
                { name: "风扇", img: "5.jpg" },
                { name: "燃气灶", img: "6.jpg" },
                { name: "热水器", img: "7.jpg" }
              ]
            }
          ]
        }
      ]
    };
  },
  onPageScroll(e) {
    //兼容iOS端下拉时顶部漂移
    if (e.scrollTop >= 0) {
      this.headerPosition = "fixed";
    } else {
      this.headerPosition = "absolute";
    }
  },
  onLoad() {},
  methods: {
    //消息列表
    toMsg() {
      uni.navigateTo({
        url: "../msg/msg"
      });
    },
    //分类切换显示
    showCategory(index) {
      this.showCategoryIndex = index;
    },
    toCategory(e) {
      //uni.showToast({title: e.name,icon:"none"});
      uni.navigateTo({
        url: "../goods/goods-list?cid=" + e.id + "&name=" + e.name
      });
    },
    //搜索跳转
    toSearch() {
      uni.showToast({ title: "建议跳转到新页面做搜索功能" });
    }
  }
};
</script>
<style scoped>
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
.catetext{
	font-size: 30px;
	margin-bottom: 15px;
}
.listBox{
	 width: 537px; 
	flex-direction: row;
	justify-content: space-around; 
	flex-wrap: wrap;
}
.listitem{
	width: 170px;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 15px;

}
.itemImg{
	width: 120px;
	height: 140px;
	background-color: #f2f2f2;
	margin-bottom: 10px;
}
.itemName{
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
