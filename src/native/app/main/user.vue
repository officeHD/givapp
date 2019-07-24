<template>
<div class="layout">
  <head :back="false" bgcolor="#303030" title="mine"></head>
  <scroller class="scroller" :show-scrollbar="false">
    <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      <loading-indicator class="indicator"></loading-indicator>
    </refresh>

    <div class="userhead">
      <div class="userTop">
        <div class="userImg">
          <image class="avator" :src="user.face" />
        </div>
        <div class="userInfo">
          <text class="username">{{user.name}}</text>
          <text class="userPhone">{{user.phone}}</text>
        </div>
        <text class="iconfont righticon">&#xe6a1;</text>
      </div>
      <div class="userSection">
        <div class="sectionItem">
          <text class="itemNum">6</text>
          <text class="itemTitle">like</text>
        </div>
        <div class="sectionItem">
          <text class="itemNum">6</text>
          <text class="itemTitle">like</text>
        </div>
        <div class="sectionItem">
          <text class="itemNum">6</text>
          <text class="itemTitle">like</text>
        </div>
      </div>
    </div>

    <x-cell title="My order" :hasArrow="true" class="list-margin">
      <text slot="value" style="color:#999;font-size:30px;">View my orders</text>
    </x-cell>
    <x-cell title="Selling" :hasArrow="true">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe670;</text>
      </div>
    </x-cell>
    <x-cell title="Sold" :hasArrow="true" @cellClick="gonext('messageSeting')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe685;</text>
      </div>
    </x-cell>
    <x-cell title="Unpaid" :hasArrow="true" @cellClick="gonext('helpCenter')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe626;</text>
      </div>
    </x-cell>
    <x-cell title="Waiting for shipping" :hasArrow="true" @cellClick="gonext('share')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe652;</text>
      </div>
    </x-cell>
    <x-cell title="shipped" :hasArrow="true" @cellClick="gonext('share')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe668;</text>
      </div>
    </x-cell>
    <x-cell title="After sale" :hasArrow="true" @cellClick="gonext('share')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe616;</text>
      </div>
    </x-cell>
    <x-cell title="Help" :hasArrow="true" @cellClick="gonext('share')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe6cf;</text>
      </div>
    </x-cell>
    <x-cell title="Customer service" :hasArrow="true" @cellClick="gonext('share')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe605;</text>
      </div>
    </x-cell>
    <x-cell title="Make an appointment" :hasArrow="true" @cellClick="gonext('share')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:40}">&#xe63f;</text>
      </div>
    </x-cell>
    <x-cell title="Setting" :hasArrow="true" @cellClick="gonext('setting')">
      <div slot="label" class="list-icon">
        <text class="iconfont" :style="{fontSize:38}">&#xe615;</text>
      </div>
    </x-cell>
	<div style="margin-bottom:40px"></div>
  </scroller>
</div>
</template>
<script>
const navigator = weex.requireModule("navigator");

export default {
  components: {
    "x-cell": require("../../component/cell.vue")
  },
  data() {
    return {
      refreshing: false,
      user: {
        name: "JAck",
        phone: "1321526262"
      }
    };
  },
  props: {},
  methods: {
    onrefresh(event) {
      var s = this;
      s.refreshing = true;
      setTimeout(() => {
        s.refreshing = false;
      }, 1000);
    },
    gonext(url) {
      //this.push('test.js',{name:"ssss"})
      this.log("jdksdjsk", "error");
      navigator.push(url);
    }
  },
  created() {}
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
  background-color: #f2f2f2;
}

.scroller {
  flex: 1;
  background-color: #f2f2f2;
}
.userhead {
  width: 750px;
  padding: 20px 30px;
  background-color: #fff;
  justify-content: center;
}
.userTop {
  border-bottom-color: #f2f2f2;
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
}
.userImg {
  width: 100px;
  height: 100px;
}
.userInfo {
  flex: 1;
}
.username {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}
.userPhone {
  font-size: 28px;
}
.righticon {
  font-size: 40px;
}
.userSection {
  flex-direction: row;
  padding: 20px 0 10px;
}
.sectionItem {
  flex: 1;
  justify-content: center;
  align-items: center;
}
.itemNum {
  margin-bottom: 10px;
  color: #333;
}
.itemTitle {
  color: #666;
}
.refresh {
  width: 750;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
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
}
.panel {
  background-color: #fff;
  padding-left: 15px;
  padding-right: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
}
.panel:active {
  background-color: #eee;
}
.panel-content {
  flex-direction: row;
  margin-left: 20px;
  padding-top: 25px;
  padding-bottom: 25px;
}
.content-img {
  width: 140px;
  height: 140px;
  border-radius: 10px;
}
.content-div {
  flex: 1;
  padding-left: 30px;
}
.content-title {
  margin-top: 25px;
  color: #333;
  text-overflow: ellipsis;
  lines: 1;
  font-size: 35px;
}
.ios-top {
  margin-top: 20px;
}
.content-text {
  color: #888;
  text-overflow: ellipsis;
  lines: 1;
  margin-top: 18px;
  font-size: 28px;
}
.list-icon {
  height: 65px;
  width: 65px;
  border-radius: 10px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
}
.list-margin {
  margin-top: 30px;
}
.cell-icon {
  color: #ffffff;
}
.panel-right {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 150px;
}
.panel-right-icon {
  font-size: 50px;
  color: #c1c1c1;
}
.panel-right-icon2 {
  font-size: 50px;
  color: #c1c1c1;
}
</style>
