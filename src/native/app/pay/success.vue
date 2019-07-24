<template>
	<div>
		<div class="icon">
			<img src="/static/img/success.png"></img>
		</div>
		<text class="tis">
			订单支付成功
		</text>
		<text class="pay-amount">
			支付金额:{{amount}}元
		</text>
		<div class="back">
			<text class="btn" @tap="toUser">个人中心</text>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0
    };
  },
  onLoad(e) {
    this.amount = parseFloat(e.amount).toFixed(2);
  },
  methods: {
    toUser() {
      uni.switchTab({
        url: "/pages/tabBar/user"
      });
    }
  }
};
</script>

<style  scoped>
.icon {
  width: 100%;
  margin-top: 10vw;
}
image {
  width: 25vw;
  height: 25vw;
}
.tis {
  width: 100%;
  margin-top: 20px;
  font-size: 48px;
}
.pay-amount {
  width: 100%;
  margin-top: 10px;
  font-size: 32px;
}
.back {
  position: absolute;
  width: 100%;
  bottom: 80px;
}
.btn {
  padding: 0 50px;
  height: 70px;
  border: solid 2px #f06c7a;
  color: #f06c7a;
  align-items: center;
  border-radius: 10px;
  font-size: 34px;
}
</style>
