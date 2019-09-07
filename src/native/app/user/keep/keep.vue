<template>
<div class="wrapper">
  <head title="My collection" @rightClick="showDel=!showDel">
    <div slot="right">
      <text v-if="showDel" class="complete">cancel</text>
      <text v-else class="delIcon">&#xe6e4;</text>
    </div>
  </head>
  <div class="tabr">
    <div class="tabItem" v-for="(item,index) in navList" :key="index" @click="tabClick(index)">
      <text :class="[tabCurrentIndex === index?'on':'off']">{{ item.text }}</text>
    </div>
  </div>
  <slider class="slider" @change="slideChange" :index="tabCurrentIndex">
    <scroller class="listScroll" v-for="(items, index1) in navList" :key="index1">
      <div class="scrollerDiv" v-if="items.orderList.length>0">
        <div
          class="listCell"
          v-for="(item,index) in items.orderList"
          :key="index"
          @longpress="showDel=true"
          @click="toUrl"
        >
          <img class="cellImg" :src="item.thumb" resize="cover" />
          <div v-if="showDel" class="selectMask" @click="selected(index)">
            <text v-if="item.selected" class="select selected">&#xe60d;</text>
            <text v-else class="select">&#xe67f;</text>
          </div>
        </div>
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="empty"></div>
      </div>
      <empty v-if="items.orderList.length==0" tips="Your order is empty"></empty>
    </scroller>
  </slider>
  <div class="bottomBar" v-if="showDel">
    <div
      class="checkAllBox"
      @click="allSelect"
      v-for="(item,index) in navList"
      :key="index"
      v-if="index==tabCurrentIndex"
    >
      <text v-if="item.isAllselected" class="selectAll selected">&#xe60d;</text>
      <text v-else class="selectAll">&#xe67f;</text>
      <text>check all</text>
    </div>
    <text class="delBox" @click="deleteC">delete</text>
  </div>
</div>
</template>

<script>
import {
  get_goods_collection_List,
  del_all_collection
} from "../../../mixin/ajax";
import asCore from "../../../mixin/core";

export default {
  data() {
    return {
      userId: "",
      tabCurrentIndex: 0,
      selectedAll: false,
      showDel: false,
      selectedList: [],
      show: true,
      navList: [
        {
          hasMore: true,
          state: 0,
          text: "used",
          page: 1,
          loadingType: "more",
          total: 0,
          isAllselected: false,
          selectedList: [],
          orderList: []
        },
        {
          hasMore: true,
          state: 1,
          page: 1,
          text: "new",
          loadingType: "more",
          isAllselected: false,
          selectedList: [],
          total: 0,
          orderList: []
        }
      ],
      goodsList: [],
      shopList: [],
      headerTop: 0,

      subState: "",
      theIndex: null,
      oldIndex: null,
      isStop: false
    };
  },
  created() {},

  methods: {
    onLoad(parmar) {
      asCore.getBsessionid(userId => {
        this.userId = userId;
        this.getList();
      });
    },
    tabClick(index) {
      if (this.tabCurrentIndex == index) {
        return false;
      }
      this.tabCurrentIndex = index;
      this.getList("tabChange");
    },
    // 选中商品
    selected(index) {
      let pageNav = this.navList[this.tabCurrentIndex];
      let navItem = this.navList[this.tabCurrentIndex].orderList;
      navItem[index].selected = navItem[index].selected ? false : true;
      let i = pageNav.selectedList.indexOf(navItem[index].id);
      i > -1
        ? pageNav.selectedList.splice(i, 1)
        : pageNav.selectedList.push(navItem[index].id);
      pageNav.isAllselected = pageNav.selectedList.length == navItem.length;
    },
    //全选
    allSelect() {
      let pageNav = this.navList[this.tabCurrentIndex];
      let navItem = this.navList[this.tabCurrentIndex].orderList;
      let len = navItem.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        navItem[i].selected = pageNav.isAllselected ? false : true;
        arr.push(navItem[i].id);
      }
      pageNav.selectedList = pageNav.isAllselected ? [] : arr;
      pageNav.isAllselected =
        pageNav.isAllselected || navItem.length == 0 ? false : true;
    },
    getList(source) {
      let index = this.tabCurrentIndex;
      let navItem = this.navList[index];
      if (source === "tabChange" && navItem.loaded === true) {
        //tab切换只有第一次需要加载数据
        return;
      }
      if (navItem.loadingType === "loading" || !navItem.hasMore) {
        //防止重复加载
        return;
      }
      let type = this.tabCurrentIndex == 1 ? 1 : 2;
      navItem.loadingType = "loading";
      get_goods_collection_List(
        { users_id: this.userId, type: type, page: navItem.page, page_num: 30 },
        (res, flag) => {
          if (flag) {
            if (res.code == 200) {
              let list = res.data.list;
              list.forEach(item => {
                this.$set(item, "selected", false);
              });
              if (navItem.page == 1) {
                navItem.orderList = list;
              } else {
                navItem.orderList = navItem.orderList.concat(list);
              }
              navItem.page++;
              this.$set(navItem, "total", res.data.total);
              this.$set(navItem, "loaded", true);
              if (navItem.orderList.length == res.data.total) {
                this.$set(navItem, "hasMore", false);
              }
              navItem.loadingType = "more";
            }
          }
        }
      );
    },
    toUrl() {
      this.toast("跳转");
    },
    deleteC() {
      let pageNav = this.navList[this.tabCurrentIndex];
      if (pageNav.selectedList.length == 0) {
        this.toast("请选择商品");
        return false;
      }
      let id = pageNav.selectedList.join(",");
      del_all_collection({ users_id: this.userId, id: id }, (res, flag) => {
        if (flag) {
          if (res.code == 200) {
            this.toast(res.message);
          }
        }
      });
      while (pageNav.selectedList.length > 0) {
        this.deleteGoods(pageNav.selectedList[0]);
      }
      //丢弃
    },
    deleteGoods(id) {
      let pageNav = this.navList[this.tabCurrentIndex];
      let len = pageNav.orderList.length;
      for (let i = 0; i < len; i++) {
        if (id == pageNav.orderList[i].id) {
          pageNav.orderList.splice(i, 1);
          break;
        }
      }
      pageNav.selectedList.splice(pageNav.selectedList.indexOf(id), 1);
    }
  }
};
</script>
<style scoped>
.slider {
  flex: 1;
  position: relative;
}
.listScroll {
  flex: 1;
  background-color: #f5f5f5;
}

.tabr {
  height: 100px;
  width: 700px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.delIcon {
  font-family: iconfont;
  font-size: 38px;
  color: #ffffff;
}

.complete {
  font-size: 28px;
  color: #ffffff;
}

.tabItem {
  height: 60px;
  width: 180px;

  padding: 0 2px;
  justify-content: center;
  align-items: center;
}

.off {
  line-height: 60px;
  height: 60px;
  border-bottom-width: 4px;
  border-bottom-color: #fff;
  border-bottom-style: solid;
  font-size: 30px;
}

.row {
  flex-direction: row;
}

.on {
  border-bottom-width: 4px;
  border-bottom-color: #ba8833;
  border-bottom-style: solid;
  color: #ba8833;
  line-height: 60px;
  font-size: 30px;
  height: 60px;
}

.wrapper {
  background-color: #fff;
}

.bottomBar {
  width: 750px;
  height: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background-color: #fff;
  /* position: fixed; */
  /* bottom: -90px; */
}

.checkAllBox {
  flex-direction: row;
  flex: 1;
  align-items: center;
}

.selectAll {
  font-size: 40px;
  color: #000000;
  font-family: iconfont;
  margin-right: 10px;
}

.delBox {
  background-color: #2a2a2a;
  color: #ffffff;
  width: 228px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-radius: 8px;
}

.listBox {
  flex: 1;
}

.scroller {
  width: 750px;
  flex: 1;
}

.scrollerDiv {
  flex-direction: row;
  flex-wrap: wrap;
  width: 750px;
  justify-content: space-around;
}

.listCell {
  width: 170px;
  height: 170px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  /* border-width: 1px;
  border-style: solid;
  border-color: #e6e6e6; */
  position: relative;
}

.selectMask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.select {
  font-family: iconfont;
  font-size: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.selected {
  color: #ba8833;
}

.cellImg {
  width: 120px;
  height: 120px;
}

.empty {
  width: 170px;
  height: 0;
  margin: 5px;
}

.mask {
  position: fixed;
  left: 104px;
  width: 542px;
  height: 185px;
  top: 570px;
  background-color: rgba(31, 31, 31, 0.85);
  border-radius: 8px;
}

.inputDate {
  width: 300px;
  background-color: #999;
  height: 100px;
}
</style>
