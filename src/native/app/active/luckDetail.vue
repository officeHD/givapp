<template>
<div class="wrapper">
  <head title="Prize details"></head>
  <div class="center">
    <image class="pimg" :src="prize.image_url" />
    <text class="pName">{{prize.prize}}</text>
    <text class="pTime">{{prize.create_time}}</text>
    <div class="line"></div>
    <text class="btnDraw default" v-if="prize.status==1">Successfully received</text>
    <text class="btnDraw" @click="getPrize" v-if="prize.status==0">Get it right now</text>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      prize: {}
    };
  },
  methods: {
    onLoad(parmar) {
      this.log(parmar);
      this.prize = JSON.parse(parmar.data);
    },
    getPrize() {
      this.toast("Get it right now");
    }
  }
};
</script>
<style  scoped>
.wrapper {
  background-color: #f5f5f5;
}
.center {
  width: 702px;
  margin-left: 24px;
  margin-top: 24px;
  background-color: #fff;
  align-items: center;
  padding: 24px;
}
.pimg {
  width: 146px;
  height: 138px;
  border-width: 1px;
  border-color: #dedede;
  border-style: solid;
  margin-bottom: 12px;
}

.pName {
  font-size: 32px;
  color: #1e1e1e;
  line-height: 45px;
}
.pTime {
  font-size: 22px;
  color: #888;
  margin-top: 10px;

  line-height: 30px;
  margin-bottom: 100px;
}
.line {
  width: 624px;
  border-bottom-width: 1px;
  border-bottom-color: #a2a2a2;
  border-bottom-style: dashed;
  margin-bottom: 48px;
}

.btnDraw {
  height: 68px;
  line-height: 68px;
  color: #fff;
  font-size: 34px;
  text-align: center;
  background-color: #303030;
  border-radius: 34px;
  padding: 0 34px;
  margin-bottom: 24px;
}
.default {
  background-color: #f1f1f1;
  color: #888888;
}
</style>