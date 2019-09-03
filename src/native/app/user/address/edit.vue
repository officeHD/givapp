<template>
<div class="wrapper">
  <head :title="title"></head>
  <div class="content">
    <div class="row">
      <text class="nominal">Name</text>
      <div class="inputbox">
        <input class="input" placeholder="Enter receive name" type="text" :value="name" />
      </div>
    </div>
    <div class="row">
      <text class="nominal">Phone number</text>
      <div class="inputbox">
        <input class="input" placeholder="Enter receive phone" type="text" v-model="tel" />
      </div>
    </div>
    <div class="row">
      <text class="nominal">Location</text>
      <div class="inputbox" @click="chooseCity">
        <text class="input" v-if="region.label"></text>
        <text class="input c999" v-else>Picker receive location</text>
      </div>
    </div>
    <div class="row">
      <text class="nominal">Address</text>
      <div class="inputbox">
        <textarea
          class="input"
          v-model="detailed"
          auto-height="true"
          placeholder="Enter receive address"
        ></textarea>
      </div>
    </div>
    <!-- <div class="row" v-if="editType=='edit'" @tap="del">
				<text class="delloca"> 	删除收货地址 </text>
    </div>-->
  </div>
  <div class="content mt20">
    <div class="row">
      <text class="longtitle">Set the default address</text>
      <div class="input switch">
        <switch color="#f06c7a" :checked="isDefault" @change="isDefaultChange" />
      </div>
    </div>
  </div>
  <div class="save" @tap="save">
    <text class="btn">confirm</text>
  </div>

  <CityPicker @confirm="confirm" v-if="showAddress"></CityPicker>
  <!-- <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker> -->
</div>
</template>

<script>
import CityPicker from "../../../component/citypicker/cityPicker.vue";
export default {
  components: {
    CityPicker
  },
  data() {
    return {
      showAddress: false,
      title: "Receiving address",
      editType: "edit",
      id: "",
      name: "",
      tel: "",
      detailed: "",
      isDefault: false,
      cityPickerValue: [0, 0, 1],
      themeColor: "#007AFF",
      region: {
        label: "",
        value: [],
        cityCode: ""
      }
    };
  },
  methods: {
    onCancel(e) {
      console.log(e);
    },
    chooseCity() {
      // this.$refs.mpvueCityPicker.show();
      this.toast("城市选择");
    },
    onConfirm(e) {
      this.region = e;
      this.cityPickerValue = e.value;
    },
    isDefaultChange(e) {
      // this.isDefault = e.detail.value;
    },
    del() {
      uni.showModal({
        title: "删除提示",
        content: "你将删除这个收货地址",
        success: res => {
          if (res.confirm) {
            uni.setStorage({
              key: "delAddress",
              data: {
                id: this.id
              },
              success() {
                uni.navigateBack();
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    save() {
      let data = {
        name: this.name,
        head: this.name.substr(0, 1),
        tel: this.tel,
        address: {
          region: this.region,
          detailed: this.detailed
        },
        isDefault: this.isDefault
      };
      if (this.editType == "edit") {
        data.id = this.id;
      }
      if (!data.name) {
        uni.showToast({
          title: "请输入收件人姓名",
          icon: "none"
        });
        return;
      }
      if (!data.tel) {
        uni.showToast({
          title: "请输入收件人电话号码",
          icon: "none"
        });
        return;
      }
      if (!data.address.detailed) {
        uni.showToast({
          title: "请输入收件人详细地址",
          icon: "none"
        });
        return;
      }
      if (data.address.region.value.length == 0) {
        uni.showToast({
          title: "请选择收件地址",
          icon: "none"
        });
        return;
      }
      uni.showLoading({
        title: "正在提交"
      });
      //实际应用中请提交ajax,模板定时器模拟提交效果
      setTimeout(() => {
        uni.setStorage({
          key: "saveAddress",
          data: data,
          success() {
            uni.hideLoading();
            uni.navigateBack();
          }
        });
      }, 300);
    }
  },
  onLoad(e) {
    //获取传递过来的参数

    this.editType = e.type;
    if (e.type == "edit") {
      uni.getStorage({
        key: "address",
        success: e => {
          this.id = e.data.id;
          this.name = e.data.name;
          this.tel = e.data.tel;
          this.detailed = e.data.address.detailed;
          this.isDefault = e.data.isDefault;
          this.cityPickerValue = e.data.address.region.value;
          this.region = e.data.address.region;
        }
      });
    }
  },
  onBackPress() {
    if (this.$refs.mpvueCityPicker.showPicker) {
      this.$refs.mpvueCityPicker.pickerCancel();
      return true;
    }
  },
  onUnload() {
    if (this.$refs.mpvueCityPicker.showPicker) {
      this.$refs.mpvueCityPicker.pickerCancel();
    }
  }
};
</script>
<style scoped>
.icon {
  height: 80px;
  color: #fff;
  font-size: 30px;
  justify-content: center;
  align-items: center;
}

.wrapper {
  background-color: #f5f5f5;
}

.content {
  padding: 0 30px;
  background-color: #fff;
}

.mt20 {
  margin-top: 20px;
}

.row {
  width: 690px;
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  border-bottom-color: #e6e6e6;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  min-height: 100px;
}

.nominal {
  width: 220px;
  font-size: 30px;
}

.inputbox {
  flex: 1;
  padding: 20px 0;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 30px;
}

.input {
  flex: 1;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
}

.c999 {
  color: #999;
  font-size: 30px;
}

.longtitle {
  flex: 1;
  font-size: 30px;
}

.switch {
  justify-content: flex-end;
  flex-direction: row;
}

.textarea {
  margin: 20px 0;
  min-height: 120px;
}

.delloca {
  width: 700px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 36px;
  color: #f06c7a;
  background-color: rgba(255, 0, 0, 0.05);
  /* border-bottom: solid 1px #eee; */
}

.save {
  position: fixed;
  bottom: 0;
  width: 750px;
  height: 120px;
  justify-content: center;
  align-items: center;
}

.btn {
  width: 690px;
  height: 80px;
  line-height: 80px;
  border-radius: 10px;
  background-color: #303030;
  color: #fff;
  text-align: center;
  font-size: 30px;
}
</style>
