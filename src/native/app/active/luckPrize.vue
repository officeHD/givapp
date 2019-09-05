<template>
<div class="wrapper">
  <head title="Prize"></head>
  <empty v-if="prizeList.length==0" tips="Your Prize is empty"></empty>
  <scroller class="scroller" v-if="prizeList.length==0">
    <div
      class="pizeItem"
      v-for="(item,index) in prizeList"
      :key="index"
      @click="goNext('root:app/active/luckDetail.js',{data:JSON.stringify(item)})"
    >
      <div class="leftItem">
        <image class="pImg" resize="container" :src="item.image_url" />
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
    goNext(url, parmar) {
      this.push(url, parmar);
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
  background-color: #f5f5f5;
}
.scroller {
  flex: 1;
}
.pizeItem {
  width: 700px;
  margin-left: 25px;
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
  align-items: flex-start;
  padding-left: 20px;
  flex: 1;
  justify-content: center;
}
.pName {
  font-size: 32px;
  color: #1e1e1e;
  text-align: left;
  line-height: 45px;
}
.pTime {
  font-size: 22px;
  color: #888;
  margin-top: 10px;
  text-align: left;
  line-height: 30px;
}
</style>