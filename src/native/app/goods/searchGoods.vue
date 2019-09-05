<template>
<div class="wrapper">
  <head :hasleft="false" :backFlag="false" bgcolor="rgba(0,0,0,0)" bgwidth="120">
    <div slot="center" class="inputbox" @click="searchClick">
      <text class="searchIcon iconfont">&#xe62a;</text>
      <input
        autofocus
        @focus="focusInput"
        :value="searchVal"
        class="tips"
        placeholder="noteBook "
        ref="input1"
        @return="searchRet"
        return-key-type="search"
      />
    </div>
    <text class="Cancel" slot="right" @click="backPage">Cancel</text>
  </head>
  <div class="bt"></div>

  <div class="pageContent">
    <div class="historyMode" :style="{'left':pageType=='search'?0:'750px' }">
      <div class="hisTop">
        <text class="hisTit">Historical search</text>
        <text class="iconfont hisDel" @click="clearHis">&#xe6e4;</text>
      </div>
      <div class="hisItem" v-if="searchArr.length>0">
        <text class="itemLi" v-for="item in searchArr" :key="item" @click="searchRet({value:item})">{{item}}</text>
      </div>
    </div>
    <scroller class="listMode" :style="{'left':pageType=='list'?0:'750px' }">
      <div class="recontent" v-if="shopList.length>0">
        <div class="reitem" v-for="item in shopList" :key="item">
          <image
            class="goodsImg"
            :src="item.thumb"
            @click="gonext('root:app/goods/goods.js',{id:item.id})"
          />
          <view class="contentBox">
            <text class="goodsTitle2">{{item.title}}</text>
            <view class="priceInfo">
              <view class="leftInfo">
                <text class="symbol">$</text>
                <text class="money">{{item.price}}</text>
                <!-- <text class="reduce">80%</text> -->
                <!-- <text class="shopType">NEW</text> -->
              </view>
              <view class="leftInfo">
                <text class="iconfont shopIcon">&#xe64c;</text>
                <text class="iconfont shopIcon">&#xe634;</text>
                <text class="iconfont shopIcon">&#xe607;</text>
              </view>
            </view>
          </view>
        </div>
      </div>
      <empty v-if="shopList.length==0" tips="Your search is empty" img="root:img/e_seel.png"></empty>
    </scroller>
  </div>
</div>
</template>

<script>
const navigator = weex.requireModule("navigator");
const navbar = weex.requireModule("navbar");
const animation = weex.requireModule("animation");
const storage = weex.requireModule("storage");
import asCore from "../../mixin/core";
import { get_goods_list } from "../../mixin/ajax.js";
export default {
  data() {
    return {
      pageType: "search",
      back: false,
      amount: 0,
      shopList: [],
      searchList: "",
      searchVal: "",
      setype: "0"
    };
  },
  computed: {
    searchArr() {
      if (!this.searchList) {
        return [];
      }
      return this.searchList.split(",");
    }
  },
  methods: {
    onLoad(parmars) {
      this.getHist(parmars);
    },
    getHist(parmars) {
      storage.getItem("searchHist", event => {
        var value = event.data;
        if (event.result != "success") {
          value = "";
        }
        this.searchList = value;

        if (parmars) {
          if (parmars.type) {
            this.setype = parmars.type;
          }
          if (parmars.name) {
            this.searchRet({
              value: parmars.name
            });
          }
        }
      });
    },
    backPage() {
      var nav = weex.requireModule("navigator");
      nav.back();
    },
    clearHis() {
      this.modal.confirm(
        {
          message: "Are you sure to delete all history?",
          okTitle: "Confirm",
          cancelTitle: "Cancel"
        },
        res => {
          if (res == "Confirm") {
            storage.removeItem("searchHist", () => {
              this.getHist();
            });
          }
        }
      );
    },
    gonext(url, parmar) {
      this.push(url, parmar);
      // this.log("jdksdjsk", "error");
    },
    focusInput() {
      this.pageType = "search";
      this.log(3);
    },
    searchRet(param) {
      let that = this;
      this.$refs.input1.blur();
      this.pageType = "list";
      this.searchVal = param.value;

      let searchHist = param.value;

      if (this.searchList) {
        searchHist = param.value + "," + this.searchList;

        if (this.searchArr.filter(item => item == param.value).length > 0) {
          searchHist = this.searchList;
        }
      }
      if (param.value) {
        storage.setItem("searchHist", searchHist, () => {
          that.getHist();
        });
      }

      get_goods_list(
        {
          users_id: "",
          keywords: param.value,
          categoryid: "",
          type: this.setype,
          status: "1",
          page: 1,
          page_num: "10"
        },
        (res, flag) => {
          if (flag) {
            this.log("商品列表---" + JSON.stringify(res.data));
            if (res.code == "200") {
              that.shopList = res.data.list;
            } else {
              that.toast(res.message);
            }
          }
        }
      );
    },
    onResume() {
      navbar.setStatusBarStyle("black");
    }
  }
};
</script>

<style>
.wrapper {
  background-color: #ffffff;
}

.pageContent {
  flex: 1;
  flex-direction: row;
  width: 1500px;
  position: relative;
}

.historyMode {
  width: 750px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
}

.listMode {
  width: 750px;
  position: absolute;
  /* left: 10px; */
  position: absolute;
  /* background-color: #02993C; */
  left: 750px;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
}

.hisTop {
  flex-direction: row;
  padding: 24px 32px;
  justify-content: space-between;
  align-items: center;
}

.hisItem {
  flex-direction: row;
  flex-wrap: wrap;
  padding: 32px;
}

.itemLi {
  margin-right: 20px;
  margin-bottom: 24px;
  height: 55px;
  line-height: 55px;
  padding: 0 40px;
  background-color: #e6e6e6;
  border-radius: 55px;
  color: #666666;
}

.hisTit {
  font-size: 28px;
  color: #000000;
}

.hisDel {
  font-size: 30px;
  color: #999999;
}

.inputbox {
  background-color: #fff;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  border-radius: 40px;
  height: 60px;
  padding: 0 40px;
  margin: 0 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #e1e1e1;
  /* margin-left: 32px; */
}

.iconfont {
  font-family: iconfont;
}

.bt {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #e1e1e1;
}

.searchIcon {
  font-family: iconfont;
  color: #999;
  margin-right: 10px;
  font-size: 30px;
}

.tips {
  height: 58px;
  flex: 1;
  font-size: 28px;
}

.Cancel {
  font-size: 26px;
  color: #333333;
  padding: 20px;
}

.scroller {
  flex: 1;
}

.recontent {
  width: 750px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 24px 32px;
  /* background-color: #000000; */
}

.reitem {
  height: 516px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;
  /* justify-content: space-between; */
}

.goodsImg {
  width: 336px;
  height: 336px;
}

.contentBox {
  width: 336px;
  padding: 0 20px;
}

.goodsTitle {
  font-size: 20px;
  height: 56px;
  line-height: 28px;
  margin-top: 12px;
  color: #1e1e1e;
  text-overflow: ellipsis;
  lines: 2;
  word-wrap: break-word;
}

.goodsTitle2 {
  font-size: 26px;
  height: 74px;
  line-height: 37px;
  margin-top: 16px;
  color: #1e1e1e;
  text-overflow: ellipsis;
  lines: 2;
  word-wrap: break-word;
}

.priceInfo {
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
}

.leftInfo {
  flex-direction: row;
  align-items: flex-end;
}

.symbol {
  color: red;
  margin-bottom: 5px;
  margin-right: 5px;
}

.money {
  color: red;
  font-size: 32px;
  font-weight: bold;
  margin-right: 5px;
}

.shopIcon {
  font-size: 32px;
  margin-left: 10px;
}
</style>
