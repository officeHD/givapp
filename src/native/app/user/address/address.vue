<template>
	<div>
		<div class="content">
			<div class="list">
				<div class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
					<div class="left">
						<div class="head">
							{{row.head}}
						</div>
					</div>
					<div class="center">
						<div class="name-tel">
							<div class="name">{{row.name}}</div>
							<div class="tel">{{row.tel}}</div>
							<text class="default" v-if="row.isDefault">
								默认
							</text>
						</div>
						<div class="address">
							{{row.address.region.label}} {{row.address.detailed}}
						</div>
					</div>
					<div class="right">
						<div class="icon bianji" @tap.stop="edit(row)">
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="add">
			<div class="btn" @tap="add"> 
			<text class="icon tianjia"></text>
			<text class="">text新增地址</text>
			
			
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      isSelect: false,
      addressList: [
        {
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
        },
        {
          id: 2,
          name: "大黑哥",
          head: "大",
          tel: "15812341234",
          address: {
            region: {
              label: "广东省-深圳市-福田区",
              value: [18, 2, 1],
              cityCode: "440304"
            },
            detailed: "深北小道2222号有名公寓502"
          },
          isDefault: false
        },
        {
          id: 3,
          name: "老大哥",
          head: "老",
          tel: "18155467897",
          address: {
            region: {
              label: "广东省-深圳市-福田区",
              value: [18, 2, 1],
              cityCode: "440304"
            },
            detailed: "深南大道1111号无名摩登大厦6楼A2"
          },
          isDefault: false
        },
        {
          id: 4,
          name: "王小妹",
          head: "王",
          tel: "13425654895",
          address: {
            region: {
              label: "广东省-深圳市-福田区",
              value: [18, 2, 1],
              cityCode: "440304"
            },
            detailed: "深南大道1111号无名摩登大厦6楼A2"
          },
          isDefault: false
        }
      ]
    };
  },
  onShow() {
    uni.getStorage({
      key: "delAddress",
      success: e => {
        let len = this.addressList.length;
        if (e.data.hasOwnProperty("id")) {
          for (let i = 0; i < len; i++) {
            if (this.addressList[i].id == e.data.id) {
              this.addressList.splice(i, 1);
              break;
            }
          }
        }
        uni.removeStorage({
          key: "delAddress"
        });
      }
    });
    uni.getStorage({
      key: "saveAddress",
      success: e => {
        let len = this.addressList.length;
        if (e.data.hasOwnProperty("id")) {
          for (let i = 0; i < len; i++) {
            if (this.addressList[i].id == e.data.id) {
              this.addressList.splice(i, 1, e.data);
              break;
            }
          }
        } else {
          let lastid = this.addressList[len - 1];
          lastid++;
          e.data.id = lastid;
          this.addressList.push(e.data);
        }
        uni.removeStorage({
          key: "saveAddress"
        });
      }
    });
  },
  onLoad(e) {
    if (e.type == "select") {
      this.isSelect = true;
    }
  },
  methods: {
    edit(row) {
      uni.setStorage({
        key: "address",
        data: row,
        success() {
          uni.navigateTo({
            url: "edit/edit?type=edit"
          });
        }
      });
    },
    add() {
      uni.navigateTo({
        url: "edit/edit?type=add"
      });
    },
    select(row) {
      //是否需要返回地址(从订单确认页跳过来选收货地址)
      if (!this.isSelect) {
        return;
      }
      uni.setStorage({
        key: "selectAddress",
        data: row,
        success() {
          uni.navigateBack();
        }
      });
    }
  }
};
</script>

<style  scoped>
.add {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120px;
  justify-content: center;
  align-items: center;
}
.btn {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  width: 70%;
  height: 80px;
  border-radius: 80px;
  background-color: #f06c7a;
  color: #fff;
  justify-content: center;
  align-items: center;

  font-size: 30px;
}
.icon {
  height: 80px;
  color: #fff;
  font-size: 30px;
  justify-content: center;
  align-items: center;
}
.list {
  flex-wrap: wrap;
}
.row {
  width: 96%;
  padding: 20px 2%;
}
.left {
  width: 90px;
  align-items: center;
}
.head {
  width: 70px;
  height: 70px;
  background: linear-gradient(to right, #ccc, #aaa);
  color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  font-size: 35px;
}
.center {
  width: 100%;
  flex-wrap: wrap;
}
.name-tel {
  width: 100%;
  align-items: flex-end;
}
.name {
  font-size: 34px;
}
.tel {
  margin-left: 30px;
  font-size: 24px;
  color: #777;
}
.default {
  font-size: 22px;

  background-color: #f06c7a;
  color: #fff;
  padding: 0 18px;
  border-radius: 24px;
  margin-left: 20px;
}
.address {
  width: 100%;
  font-size: 24px;
  align-items: flex-end;
  color: #777;
}
.right {
  align-items: center;
  margin-left: 20px;
}
.icon {
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 60px;
  border-left: solid 1px #aaa;
  font-size: 40px;
  color: #777;
}
</style>
