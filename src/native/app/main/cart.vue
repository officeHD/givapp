<template>
<div class="layout">
  <head :hasleft="false" title="Cart">
    <div slot="right">
      <text v-if="showDel" class="complete" @click="showDel=false">cancel</text>
      <text v-else class="delIcon" @click="showDel=true">&#xe6e4;</text>
    </div>
  </head>
  <!-- 商品列表 -->
  <scroller class="goods-list" @loadmore="onloadmore" loadmoreoffset="200" :show-scrollbar="false">
    <empty v-if="goodsList.length==0" tips="Your Cart is empty" img="root:img/e_car.png"></empty>
    <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      <loading-indicator class="indicator"></loading-indicator>
    </refresh>
    <div class="goods-row" v-for="(row,index) in goodsList" :key="index">
      <!-- checkbox -->
      <div class="checkBx" @click="selected(index)">
        <div class="checkbox-box">
          <text v-if="row.selected" class="iconfont selectIcon">&#xe602;</text>
          <text v-else class="iconfont noselect">&#xe67f;</text>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="goods-info" @click="toGoods(row)">
        <div class="imgbox">
          <image class="img" :src="row.thumb" />
        </div>
        <div class="info">
          <div class="title">{{row.title}}</div>
          <text class="infospec">{{row.spec}}</text>
          <div class="price-number">
            <text class="price">￥{{row.total_price}}</text>
            <div class="gnumber">
              <div class="numaction" @click="sub(index)">
                <text class="iconfont numIcon">&#xe630;</text>
              </div>
              <div class="numinputbox" @click="discard">
                <input
                  class="numinput"
                  type="number"
                  v-model="row.number"
                  @input="sum($event,index)"
                />
              </div>
              <div class="numaction" @click="add(index)">
                <text class="iconfont numIcon">&#xe601;</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loadingbox" v-if="hasMore">
      <image class="loading" src="https://img.alicdn.com/tfs/TB1CWnby7yWBuNjy0FpXXassXXa-32-32.gif" />
    </div>
    <text class="loadingbox" v-if="!hasMore">No more</text>
  </scroller>
  <!-- 脚部菜单 -->
  <div class="cartfooter" v-if="goodsList.length>0">
    <div class="footerLeft" @click="allSelect">
      <div class="checkbox-box">
        <text v-if="isAllselected" class="iconfont selectIcon">&#xe602;</text>
        <text v-else class="iconfont noselect">&#xe67f;</text>
      </div>
      <text class="selecttext">Select all</text>
    </div>

    <div class="settlement">
      <div class="settlement" v-if="!showDel">
        <div class="sum">
          <text>Total:</text>
          <text class="symbol">$</text>
          <text class="money">{{sumPrice}}</text>
        </div>
        <text
          class="cartbtn"
          :style="{'background-color':sumPrice>0?'#333':'#9A9A9A'}"
          @click="toConfirmation"
        >Pay</text>
      </div>
      <text class="cardelBtn" @click="deleteList" v-if="showDel">delete</text>
    </div>
  </div>
</div>
</template>
<script>
const navigator = weex.requireModule("navigator");
const AddCart = new BroadcastChannel("AddCart");
import {
  get_order_list,
  update_order_num,
  del_order_info,
  get_order_price
} from "../../mixin/ajax.js";
import asCore from "../../mixin/core";
export default {
  data() {
    return {
      refreshing: false,
      showDel: false,
      hasMore: true,

      sumPrice: "0.00",
      headerPosition: "fixed",
      headerTop: null,
      statusTop: null,
      selectedList: [],
      isAllselected: false,
      goodsList: [],
      //控制滑动效果
      theIndex: null,
      oldIndex: null,
      isStop: false,
      userId: "",
      page: 1
    };
  },
  created() {
    asCore.getBsessionid(userId => {
      this.userId = userId;
    });
    AddCart.onmessage = this.loadData(this.userId);
    // this.loadData();
  },
  methods: {
    onrefresh(event) {
      var s = this;
      s.refreshing = true;
      s.page = 1;
      s.loadData(s.userId);
      setTimeout(() => {
        s.refreshing = false;
      }, 1000);
    },
    loadData(id) {
      this.userId = id;
      this.log("购物车用户ID" + id);
      if (!id) {
        return false;
      }
      this.getOrerList();
    },
    onloadmore() {
      if (this.hasMore) {
        this.page++;
        this.getOrerList();
      }
    },
    getOrerList() {
      let that = this;
      get_order_list(
        {
          users_id: this.userId,
          goods_type: 1,
          page: this.page,
          page_num: "10"
        },
        (res, flag) => {
          if (flag) {
            this.log("购物车列表--1--" + JSON.stringify(res.data.list));
            if (res.code == 200 && res.data.list.length > 0) {
              let list = res.data.list;
              list.forEach(item => {
                this.$set(item, "selected", false);
              });
              if (this.page > 1) {
                that.goodsList = that.goodsList.concat(list);
              } else {
                that.goodsList = list;
              }
            } else {
              this.hasMore = false;
            }
          }
        }
      );
    },
    //控制左滑删除效果-end

    //商品跳转
    toGoods(item) {
      this.push("root:app/goods/goods.js", {
        id: item.id
      });
    },
    //跳转确认订单页面
    toConfirmation() {
      let tmpList = [];
      let len = this.goodsList.length;
      for (let i = 0; i < len; i++) {
        if (this.goodsList[i].selected) {
          tmpList.push(this.goodsList[i]);
        }
      }
      if (tmpList.length < 1) {
        this.toast("请选择商品结算");
        return;
      }
      // this.log(tmpList)
      this.push("root:app/order/confirm.js", { data: JSON.stringify(tmpList) });
      // uni.setStorage({
      // 	key: "buylist",
      // 	data: tmpList,
      // 	success: () => {
      // 		uni.navigateTo({
      // 			url: "../order/confirmation"
      // 		});
      // 	}
      // });
    },
    //删除商品
    deleteGoods(id) {
      let len = this.goodsList.length;
      for (let i = 0; i < len; i++) {
        if (id == this.goodsList[i].id) {
          this.goodsList.splice(i, 1);
          break;
        }
      }

      this.selectedList.splice(this.selectedList.indexOf(id), 1);
      this.sum();
      this.oldIndex = null;
      this.theIndex = null;
    },
    // 删除商品s
    deleteList() {
      let len = this.selectedList.length;

      del_order_info(
        {
          users_id: this.userId,
          order_id: this.selectedList.join(",")
        },
        (res, flag) => {
          if (flag) {
            this.log(res);
            if (res.code == 200) {
            }
          }
        }
      );
      while (this.selectedList.length > 0) {
        this.deleteGoods(this.selectedList[0]);
      }
      this.selectedList = [];
      this.isAllselected =
        this.selectedList.length == this.goodsList.length &&
        this.goodsList.length > 0;
      this.sum();
    },
    // 选中商品
    selected(index) {
      this.goodsList[index].selected = this.goodsList[index].selected
        ? false
        : true;
      let i = this.selectedList.indexOf(this.goodsList[index].id);
      i > -1
        ? this.selectedList.splice(i, 1)
        : this.selectedList.push(this.goodsList[index].id);
      this.isAllselected = this.selectedList.length == this.goodsList.length;
      this.sum();
    },
    //全选
    allSelect() {
      let len = this.goodsList.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        this.goodsList[i].selected = this.isAllselected ? false : true;
        arr.push(this.goodsList[i].id);
      }
      this.selectedList = this.isAllselected ? [] : arr;
      this.isAllselected =
        this.isAllselected || this.goodsList.length == 0 ? false : true;
      this.sum();
    },
    // 减少数量
    sub(index) {
      if (this.goodsList[index].number <= 1) {
        return;
      }

      let number = this.goodsList[index].number - 1;
      this.upadtenumber(index, number);
    },
    // 增加数量
    add(index) {
      // this.goodsList[index].number++;
      let number = this.goodsList[index].number + 1;
      this.upadtenumber(index, number);
    },
    upadtenumber(index, number) {
      update_order_num(
        {
          users_id: this.userId,
          order_id: this.goodsList[index].id,
          number: number
        },
        (res, flag) => {
          this.log(res);
          if (flag) {
            if (res.code == 200) {
              this.goodsList[index].number = res.data.number;
              this.goodsList[index].total_price = res.data.total_price;
            }
            this.toast(res.message);
          }
          this.sum();
        }
      );
    },
    // 合计
    sum(e, index) {
      this.sumPrice = 0.0;
      // let len = this.goodsList.length;
      // for (let i = 0; i < len; i++) {
      // 	if (this.goodsList[i].selected) {
      // 		if (e && i == index) {
      // 			this.sumPrice =
      // 				this.sumPrice + e.detail.value * this.goodsList[i].price;
      // 		} else {
      // 			this.sumPrice =
      // 				this.sumPrice +
      // 				this.goodsList[i].number * this.goodsList[i].price;
      // 		}
      // 	}
      // }
      // this.sumPrice = this.sumPrice.toFixed(2);
      // this.log(this.selectedList.join(','))
      get_order_price(
        {
          users_id: this.userId,
          order_id: this.selectedList.join(",")
        },
        (res, flag) => {
          if (flag) {
            if (res.code == 200) {
              this.sumPrice = res.data.total_price;
            }
          }
        }
      );
    },
    discard() {
      //丢弃
    }
  }
};
</script>
<style scoped>
.iconfont {
  font-family: iconfont;
}

.layout {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.delIcon {
  flex: 1;
  font-family: iconfont;
  font-size: 38px;
  color: #ffffff;
}

.loadingbox {
  align-items: center;
  padding: 20px;
  height: 80px;
  margin-bottom: 20px;
  text-align: center;
  color: #999999;
}

.loading {
  height: 40px;
  width: 40px;
}

.complete {
  flex: 1;
  font-size: 28px;
  color: #ffffff;
}

.goods-tis {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
}

.goods-menu {
  position: absolute;
  width: 30%;
  height: 100%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: #fff;
  z-index: 2;
}

.goods-icon {
  color: #fff;
}

.goodsopen {
  animation: showMenu 0.25s linear both;
}

.goodsclose {
  animation: closeMenu 0.15s linear both;
}

.goods-list {
  background-color: #fff;
  width: 750px;
  flex: 1;
  padding: 20px 0;
}

.goods-row {
  width: 710px;
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-left: 20px;
  border-bottom-color: #e7e7e7;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.checkbox-box {
  width: 40px;
  height: 40px;
}

.selectIcon {
  font-size: 32px;
  color: #b98732;
}

.noselect {
  font-size: 32px;
}

.checkBx {
  width: 100px;
  height: 120px;
}

.goods-info {
  flex: 1;
  flex-direction: row;
}

.info {
  flex: 1;
}

.imgbox {
  width: 140px;
  justify-content: flex-start;
  align-items: flex-start;
}

.img {
  width: 100px;
  height: 100px;
}

.infospec {
  height: 60px;
  line-height: 60px;
}

.price-number {
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
}

.price {
  color: #f06c7a;
}

.gnumber {
  flex-direction: row;
}

.numaction {
  width: 44px;
  height: 44px;
  background-color: #e7e7e7;
  justify-content: center;
  align-items: center;
}

.numinputbox {
  width: 100px;
  height: 44px;
  background-color: #fdfeff;
}

.numinput {
  width: 100px;
  height: 44px;
  text-align: center;
  font-size: 28px;
  color: #000;
}

.numIcon {
  color: #fff;
}

.delBtn {
  border: solid 1px #f06c7a;
  color: #f06c7a;
  padding: 0 30px;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.symbol {
  color: #ec414d;
  margin-left: 8px;
  font-size: 22px;
}

.money {
  font-weight: 600;
  margin-right: 20px;
  color: #ec414d;
  font-size: 36px;
}

.sum {
  width: 50%;
  font-size: 28px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
}

.refresh {
  width: 750px;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}

.indicator {
  margin-top: 30px;
  margin-bottom: 20px;
  height: 70px;
  width: 70px;
  color: #ce2020;
  text-align: center;
}

.footer {
  width: 92%;
  padding: 0 4%;
  background-color: #fbfbfb;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  position: fixed;
  bottom: 0px;
  z-index: 5;
}

.settlement {
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.cartfooter {
  height: 100px;
  width: 750px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.footerLeft {
  height: 100px;
  padding-left: 20px;

  flex-direction: row;
  align-items: center;
}

.selecttext {
  font-size: 30px;
  margin-left: 20px;
}

.cardelBtn {
  color: #2a2a2a;
  width: 228px;
  height: 68px;
  line-height: 68px;
  background-color: #2a2a2a;
  text-align: center;
  border-radius: 8px;
  font-size: 32px;
  color: #ffffff;
}

.settlement {
  flex: 1;
  flex-direction: row;

  justify-content: flex-end;
  align-items: center;
}

.sum {
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}

.cartbtn {
  width: 230px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 32px;
  background-color: #9a9a9a;
}
</style>
