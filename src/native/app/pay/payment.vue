<template>
	<div>
		<div class="block">
			<div class="content">
				<div class="orderinfo">
					<div class="row">
						<text class="nominal">订单名称:</text><text class="text">{{orderName}}</text>
					</div>
					<div class="row">
						<text class="nominal">订单金额:</text><text class="text">{{amount}}元</text>
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<text class="title">
				选择支付方式
			</text>
			<div class="content">
				<div class="pay-list">
					<div class="row" @tap="paytype='alipay'">
							<div class="left">
								<image src="/static/img/alipay.png"></image>
							</div>
							<text class="center">
								支付宝支付
							</text>
							<div class="right">
								<radio :checked="paytype=='alipay'" color="#f06c7a" />
							</div>
					</div>
					<div class="row" @tap="paytype='wxpay'">
							<div class="left">
								<image src="/static/img/wxpay.png"></image>
							</div>
							<text class="center">
								微信支付
							</text>
							<div class="right">
								<radio :checked="paytype=='wxpay'" color="#f06c7a" />
							</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pay">
			<text class="btn" @tap="doDeposit">立即支付</text>
			<div class="tis"> 
				<text class=""> 点击立即支付，即代表您同意 </text>
				<text class="terms"> 《条款协议》 </text>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      orderName: "",
      paytype: "alipay" //支付类型
    };
  },
  onLoad(e) {
    this.amount = parseFloat(e.amount).toFixed(2);
    uni.getStorage({
      key: "paymentOrder",
      success: e => {
        if (e.data.length > 1) {
          this.orderName = "多商品合并支付";
        } else {
          this.orderName = e.data[0].name;
        }
        uni.removeStorage({
          key: "paymentOrder"
        });
      }
    });
  },
  methods: {
    doDeposit() {
      //模板模拟支付，实际应用请调起微信/支付宝
      uni.showLoading({
        title: "支付中..."
      });
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: "支付成功"
        });
        setTimeout(() => {
          uni.redirectTo({
            url: "../../pay/success/success?amount=" + this.amount
          });
        }, 300);
      }, 700);
    }
  }
};
</script>

<style scoped>
.block {
  width: 94%;
  padding: 0 3% 40px 3%;
}
.title {
  width: 100%;
  font-size: 34px;
}
.orderinfo {
  width: 100%;
  border-bottom: solid 1px #eee;
}
.row {
  width: 100%;
  height: 90px;
  align-items: center;
}
.nominal {
  font-size: 32px;
  color: #7d7d7d;
}
.text {
  width: 70%;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 32px;
}
.pay-list {
  width: 100%;
  border-bottom: solid 1px #eee;
}
.row {
  width: 100%;
  height: 120px;
  align-items: center;
}
.left {
  width: 100px;

  align-items: center;
}
image {
  width: 80px;
  height: 80px;
}
.center {
  width: 100%;
  font-size: 30px;
}
.right {
  width: 100px;

  justify-content: flex-end;
}
.pay {
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  width: 70%;
  height: 80px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #f06c7a;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
.tis {
  margin-top: 10px;
  width: 100%;
  font-size: 24px;
  justify-content: center;
  align-items: flex-end;
  color: #999;
}
.terms {
  color: #5a9ef7;
}
</style>
