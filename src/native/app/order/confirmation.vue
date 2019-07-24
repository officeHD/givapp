<template>
	<div>
		<!-- 收货地址 -->
		<div class="addr" @tap="selectAddress">
			<div class="icon">
				<img src="../../static/img/addricon.png" mode=""></img>
			</div>
			<div class="right">
				<div class="tel-name">
					<div class="name">
						{{recinfo.name}}
					</div>
					<div class="tel">
						{{recinfo.tel}}
					</div>
				</div>
				<div class="addres">
					{{recinfo.address.region.label}}
					{{recinfo.address.detailed}}
				</div>
			</div>
		</div>
		<!-- 购买商品列表 -->
		<div class="buy-list">
			<div class="row" v-for="(row,index) in buylist" :key="index">
				<div class="goods-info">
					<div class="img">
						<img :src="row.img"></img>
					</div>
					<div class="info">
						<div class="title">{{row.name}}</div>
						<text class="spec">选择{{row.spec}} 数量:{{row.number}}</text>
						<div class="price-number">
							<text class="price">￥{{row.price*row.number}}</text>
							<div class="number">
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 提示-备注 -->
		<div class="order">
			<div class="row">
				<text class="left">
					积分 :
				</text>
				<text class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</text>
			</div>
			<div class="row">
				<text class="left">
					备注 :
				</text>
				<div class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</div>
			</div>
		</div>
		<!-- 明细 -->
		<div class="detail">
			<div class="row">
				<text class="nominal">
					商品金额
				</text>
				<text class="content">
					￥{{goodsPrice|toFixed}}
				</text>
			</div>
			<div class="row">
				<text class="nominal">
					运费
				</text>
				<text class="content">
					￥+{{freight|toFixed}}
				</text>
			</div>
			<div class="row">
				<text class="nominal">
					积分抵扣
				</text>
				<text class="content">
					￥-{{deduction|toFixed}}
				</text>
			</div>
		</div>
		<div class="blck">
			
		</div>
		<div class="footer">
			<div class="settlement">
				<div class="sum"><text>合计:</text> <text class="money">￥{{sumPrice|toFixed}}</text></div>
				<text class="btn" @tap="toPay">提交订单</text>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      buylist: [], //订单列表
      goodsPrice: 0.0, //商品合计价格
      sumPrice: 0.0, //用户付款价格
      freight: 12.0, //运费
      note: "", //备注
      int: 1200, //抵扣积分
      deduction: 0, //抵扣价格
      recinfo: {
        id: 1,
        name: "大黑哥",
        head: "大",
        tel: "18816881688",
        address: {
          region: {
            label: "广东省-深圳市-福田区",
            value: [18, 2, 1],
            cityCode: "440304"
          },
          detailed: "深南大道1111号无名摩登大厦6楼A2"
        },
        isDefault: true
      }
    };
  },
  onShow() {
    //页面显示时，加载订单信息
    uni.getStorage({
      key: "buylist",
      success: ret => {
        this.buylist = ret.data;
        this.goodsPrice = 0;
        //合计
        let len = this.buylist.length;
        for (let i = 0; i < len; i++) {
          this.goodsPrice =
            this.goodsPrice + this.buylist[i].number * this.buylist[i].price;
        }
        this.deduction = this.int / 100;
        this.sumPrice = this.goodsPrice - this.deduction + this.freight;
      }
    });
    uni.getStorage({
      key: "selectAddress",
      success: e => {
        this.recinfo = e.data;
        uni.removeStorage({
          key: "selectAddress"
        });
      }
    });
  },
  onHide() {},
  onBackPress() {
    //页面后退时候，清除订单信息
    this.clearOrder();
  },
  filters: {
    toFixed: function(x) {
      return parseFloat(x).toFixed(2);
    }
  },
  methods: {
    clearOrder() {
      uni.removeStorage({
        key: "buylist",
        success: res => {
          this.buylist = [];
          console.log("remove buylist success");
        }
      });
    },
    toPay() {
      //商品列表
      let paymentOrder = [];
      let goodsid = [];
      let len = this.buylist.length;
      for (let i = 0; i < len; i++) {
        paymentOrder.push(this.buylist[i]);
        goodsid.push(this.buylist[i].id);
      }
      if (paymentOrder.length == 0) {
        uni.showToast({ title: "订单信息有误，请重新购买", icon: "none" });
        return;
      }
      //本地模拟订单提交UI效果
      uni.showLoading({
        title: "正在提交订单..."
      });
      setTimeout(() => {
        uni.setStorage({
          key: "paymentOrder",
          data: paymentOrder,
          success: () => {
            uni.hideLoading();
            uni.redirectTo({
              url: "../pay/payment/payment?amount=" + this.sumPrice
            });
          }
        });
      }, 1000);
    },
    //选择收货地址
    selectAddress() {
      uni.navigateTo({
        url: "../user/address/address?type=select"
      });
    }
  }
};
</script>

<style  scoped>
.addr {
  width: 86%;
  padding: 20px 3%;
  margin: 30px auto 20px auto;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.icon {
  width: 80px;
  height: 80px;
  align-items: center;
}
image {
  width: 60px;
  height: 60px;
}
.tel-name {
  width: 100%;
  font-size: 32px;
}
.tel {
  margin-left: 40px;
}
.addres {
  width: 100%;
  font-size: 26px;
  color: #999;
}
.buy-list {
  width: 86%;
  padding: 10px 3%;
  margin: 30px auto 20px auto;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.row {
  margin: 30px 0;
}
.goods-info {
  width: 100%;
}
.img {
  width: 22vw;
  height: 22vw;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
}
image {
  width: 22vw;
  height: 22vw;
}
.info {
  width: 100%;
  height: 22vw;
  overflow: hidden;
  flex-wrap: wrap;
  position: relative;
}
.title {
  width: 100%;
  font-size: 28px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.spec {
  font-size: 22px;
  background-color: #f3f3f3;
  color: #a7a7a7;
  height: 40px;
  align-items: center;
  padding: 0 10px;
  border-radius: 20px;
  margin-bottom: 20vw;
}
.price-number {
  position: absolute;
  width: 100%;
  bottom: 0px;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 28px;
  height: 40px;
}
.price {
  color: #f06c7a;
}
.number {
  justify-content: center;
  align-items: center;
}
.order {
  width: 86%;
  padding: 10px 3%;
  margin: 30px auto 20px auto;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.row {
  margin: 20px 0;
  height: 40px;
}
.left {
  font-size: 28px;
}
.right {
  margin-left: 40px;
  font-size: 26px;
  color: #999;
}
input {
  font-size: 26px;
  color: #999;
}
.blck {
  width: 100%;
  height: 100px;
}
.footer {
  width: 92%;
  padding: 0 4%;
  background-color: #fbfbfb;
  height: 100px;
  justify-content: flex-end;
  align-items: center;
  font-size: 28px;
  position: fixed;
  bottom: 0px;
}
.settlement {
  width: 80%;
  justify-content: flex-end;
  align-items: center;
}
.sum {
  width: 50%;
  font-size: 28px;
  margin-right: 10px;
  justify-content: flex-end;
}
.money {
  font-weight: 600;
}
.btn {
  padding: 0 30px;
  height: 60px;
  background-color: #f06c7a;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 40px;
}
.detail {
  width: 86%;
  padding: 10px 3%;
  margin: 30px auto 20px auto;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.detail .row {
  height: 60px;
  justify-content: space-between;
  align-items: center;
}
.row .nominal {
  font-size: 28px;
}
.row .content {
  font-size: 26px;
  color: #f06c7a;
}
</style>
