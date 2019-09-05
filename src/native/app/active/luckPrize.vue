<template>
<div class="wrapper">
  <head title="Prize"></head>
  <scroller class="scroller">
    <div class="pizeItem" v-for="(item,index) in prizeList" :key="index">
      <div class="leftItem">
        <image class="pImg" resize="container" :src="item.headimgurl" />
      </div>
      <div class="rightItem">
        <text class="pName">{{item.prize}}</text>
        <text class="pTime">{{item.create_time}}</text>
      </div>
    </div>
  </scroller>
</div>
</template>
<script>
import { getUserRaffle_list } from "../../mixin/ajax";
import asCore from "../../mixin/core";
export default {
  data() {
    return {
      userId: "",
      prizeList: []
    };
  },
  methods: {
    onLoad() {
      asCore.getBsessionid(userId => {
        this.userId = userId;
        this.getList();
      });
    },
    getList() {
      getUserRaffle_list({ users_id: this.userId }, (res, flag) => {
        if (flag) {
          if (res.code == 200) {
            this.prizeList = res.data;
          } else {
            this.toast(res.message);
          }
        }
      });
    }
  }
};
</script>
<style  scoped>
.wrapper {
  background-color: #fff;
}
.scroller {
  flex: 1;
}
.pizeItem {
  width: 680px;
  margin-left: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  flex-direction: row;
  padding: 16px;
  align-items: center;
}
.leftItem {
  width: 146px;
  height: 138px;
  border-width: 1px;
  border-color: #dedede;
  border-style: solid;
}
.pImg {
  width: 146px;
  height: 138px;
}
.rightItem {
  align-items: center;
}
.pName {
  font-size: 32px;
  color: #1e1e1e;
}
.pTime {
  font-size: 22px;
  color: #888;
  margin-top: 10px;
}
</style>