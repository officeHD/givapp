<template>
<div class="content">
  <head title="My order"></head>
  <scroller class="navbar" scroll-direction="horizontal">
    <text
      v-for="(item, index) in navList"
      :key="index"
      class="nav-item"
      :ref="'item'+index"
      @click="tabClick(index)"
      :class="[tabCurrentIndex === index?'current':'']"
    >{{ item.text }}</text>
  </scroller>
  <slider class="slider" @change="slideChange" :index="tabCurrentIndex">
    <scroller class="listScroll" v-for="(item, index) in navList" :key="index">
      <div
        v-if="item.orderList.length>0"
        v-for="(list, index2) in item.orderList"
        class="listItem"
        :key="index2"
        @click="goUrl('root:app/user/order_list/order_details.js',{id:list.id})"
      >
        <div class="titList">
          <div class="titLeft">
            <text class="titname">{{list.nickname}}</text>
            <text class="iconfont titIcon">&#xe6a1;</text>
          </div>
          <text
            class="status"
          >{{ list.type==2?"Unpaid":list.type_2==1?"Waiting for shipping":list.type_2==2?"Waiting for Shipped":"Shipped" }}</text>
        </div>
        <div class="titList">
          <image class="imgList" src="root:img/goods.png" />
          <text class="iconfont imgIcon">&#xe6a1;</text>
        </div>
        <div class="bottomList">
          <text class="num">{{list.number}} item</text>
          <text class="total">Total</text>
          <text class="symbol">$</text>
          <text class="money">{{list.pay_price}}</text>
        </div>
        <!-- type=1 2 	未支付 -->
        <div class="actionBox" v-if="list.type==1||list.type==2">
          <text class="actionItem">Cancel order</text>
        </div>
        <!-- type=3  	已支付 -->
        <!-- type_2=1  	已支付 未发货-->
        <div class="actionBox" v-if="list.type_2==2">
          <text
            class="actionItem"
            @click="goUrl('root:app/user/order_list/order_details.js',{id:list.id})"
          >Delivery tracking</text>
          <text class="actionItem" @click="received(list.id)">Item received</text>
          <text class="actionItem" @click="refund(list.id)">refund</text>
          <!-- type_2=3   已收货 -->
        </div>
        <!-- type_2=2  	已发货 -->
        <!-- type_2=3   已收货 -->
        <div class="actionBox" v-if="list.type_2==3">
          <text class="actionItem">Check logistics</text>
          <!-- 评价 -->
          <text
            class="actionItem"
            @click="goUrl('root:app/user/order_list/evaluation.js',{id:list.id})"
          >valuation</text>
        </div>
      </div>

      <empty v-if="item.orderList.length==0" tips="Your order is empty"></empty>
    </scroller>
  </slider>
</div>
</template>

<script>
const dom = weex.requireModule("dom");
import { get_order_coList } from "../../mixin/ajax.js";
import asCore from "../../mixin/core";
export default {
  data() {
    return {
      tabCurrentIndex: 0,
      page: 1,
      userId: "",
      navList: [
        {
          hasMore: true,
          state: 0,
          text: "All",
          page: 1,
          loadingType: "more",
          total: 0,
          orderList: []
        },
        {
          hasMore: true,
          state: 1,
          page: 1,
          text: "Unpaid",
          loadingType: "more",
          total: 0,
          orderList: []
        },
        {
          hasMore: true,
          state: 2,
          text: "Waiting for shipping",
          page: 1,
          loadingType: "more",
          total: 0,
          orderList: []
        },
        {
          hasMore: true,
          state: 3,
          text: "Shipped",
          page: 1,
          loadingType: "more",
          total: 0,
          orderList: []
        }
      ]
    };
  },
  created() {},
  methods: {
    onLoad(param) {
      let type = 0;
      if (param && param.type) {
        this.tabCurrentIndex = param.type;
      }
      asCore.getBsessionid(userId => {
        this.log(userId);
        this.userId = userId;
        this.getOrderList();
      });
    },
    getOrderList(source) {
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
      navItem.loadingType = "loading";
      let type =
        this.tabCurrentIndex == 1 ? 2 : this.tabCurrentIndex == 0 ? "" : "3";
      let type_2 =
        this.tabCurrentIndex == 2
          ? 1
          : this.tabCurrentIndex == 3
          ? "2"
          : this.tabCurrentIndex == 4
          ? "3"
          : "";
      get_order_coList(
        {
          users_id: this.userId,
          type: type,
          type_2: type_2,
          page: navItem.page
        },
        (res, flag) => {
          this.log(res);
          if (flag) {
            if (navItem.page == 1) {
              navItem.orderList = res.data.list;
            } else {
              navItem.orderList = navItem.orderList.concat(res.data.list);
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
      );
    },
    goDelivery() {
      this.push("root:app/user/order_list/delivery.js", {
        name: "ssss"
      });
    },
    goDetail() {
      this.push("root:app/user/order_list/order_details.js", {
        name: "ssss"
      });
    },
    refund() {
      this.push("root:app/user/order_list/refund.js", {
        name: "ssss"
      });
    },
    goUrl(url, parmar) {
      this.push(url, parmar);
    },

    tabClick(index) {
      if (this.tabCurrentIndex == index) {
        return false;
      }
      this.tabCurrentIndex = index;
      this.getOrderList("tabChange");
    },
    slideChange(index) {
      if (this.tabCurrentIndex == index.index) {
        return false;
      }
      this.tabCurrentIndex = index.index;
      this.getOrderList("tabChange");
      const ref = this.$refs["item" + index.index];
      const el = ref ? ref[0] : null;
      dom.scrollToElement(el, {
        offset: -250
      });
    }
  }
};
</script>

<style scoped>
.content {
  background-color: #f5f5f5;
  flex: 1;
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
  border-bottom-color: #ba8833;
  border-bottom-width: 4px;
  border-bottom-style: solid;
  color: #ba8833;
}

.slider {
  flex: 1;
  position: relative;
}

.listScroll {
  flex: 1;
  background-color: #f5f5f5;
}

.listItem {
  margin-top: 20px;
  background-color: #ffffff;
  padding: 32px;
}

.listItem:active {
  background-color: #f2f2f2;
}

.titList {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.titLeft {
  flex-direction: row;
  align-items: center;
}

.imgList {
  width: 120px;
  height: 120px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.titname {
  font-size: 28px;
  color: #333;
  margin-right: 20px;
}

.iconfont {
  font-family: iconfont;
}

.titIcon {
  font-size: 24px;
  color: #999999;
}

.imgIcon {
  font-size: 32px;
  color: #999999;
}

.status {
  font-size: 28px;
  color: #ec414d;
}

.bottomList {
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  border-bottom-color: #e6e6e6;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.num {
  margin-right: 40px;
  font-size: 22px;
  color: #8e8e93;
}

.total {
  font-size: 22px;
  color: #8e8e93;
}

.symbol {
  font-size: 22px;
  color: #ec414d;
  margin: 0 10px;
}

.money {
  font-size: 22px;
  color: #ec414d;
}

.actionBox {
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 20px;
}

.actionItem {
  font-size: 28px;
  color: #333333;
  padding: 5px 10px;
  line-height: 40px;
  border-width: 1px;
  border-style: solid;
  border-color: #333333;
  margin-left: 10px;
}

.actionItem:active {
  border-color: #cccccc;
  background-color: #cccccc;
}
</style>
