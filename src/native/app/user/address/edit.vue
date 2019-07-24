<template>
	<div>
		<div class="content">
			<div class="row">
				<text class="nominal">
					收件人
				</text>
				<div class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="name" />
				</div>
			</div>
			<div class="row">
				<text class="nominal">
					电话号码
				</text>
				<div class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
				</div>
			</div>
			<div class="row">
				<text class="nominal">
					所在地区
				</text>
				<div class="input" @tap="chooseCity">
					{{region.label}}
				</div>
				
			</div>
			<div class="row">
				<text class="nominal">
					详细地址
				</text>
				<div class="input">
					<textarea v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
				</div>
			</div>
			<div class="row">
				<text class="nominal">
					设置默认地址
				</text>
				<div class="input switch">
					<switch color="#f06c7a" :checked="isDefault" @change=isDefaultChange />
				</div>
			</div>
			<div class="row" v-if="editType=='edit'" @tap="del">
				<text class="del">
					删除收货地址
				</text>
			</div>
		</div>
		<div class="save" @tap="save">
			<text class="btn">
				保存地址
			</text>
		</div>
		<!-- <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker> -->
	</div>
</template>

<script>
// import mpvueCityPicker from "root:component/mpvue-citypicker/mpvueCityPicker.vue";
export default {
  components: {
    // mpvueCityPicker
  },
  data() {
    return {
      editType: "edit",
      id: "",
      name: "",
      tel: "",
      detailed: "",
      isDefault: false,
      cityPickerValue: [0, 0, 1],
      themeColor: "#007AFF",
      region: { label: "请点击选择地址", value: [], cityCode: "" }
    };
  },
  methods: {
    onCancel(e) {
      console.log(e);
    },
    chooseCity() {
      this.$refs.mpvueCityPicker.show();
    },
    onConfirm(e) {
      this.region = e;
      this.cityPickerValue = e.value;
    },
    isDefaultChange(e) {
      this.isDefault = e.detail.value;
    },
    del() {
      uni.showModal({
        title: "删除提示",
        content: "你将删除这个收货地址",
        success: res => {
          if (res.confirm) {
            uni.setStorage({
              key: "delAddress",
              data: { id: this.id },
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
        address: { region: this.region, detailed: this.detailed },
        isDefault: this.isDefault
      };
      if (this.editType == "edit") {
        data.id = this.id;
      }
      if (!data.name) {
        uni.showToast({ title: "请输入收件人姓名", icon: "none" });
        return;
      }
      if (!data.tel) {
        uni.showToast({ title: "请输入收件人电话号码", icon: "none" });
        return;
      }
      if (!data.address.detailed) {
        uni.showToast({ title: "请输入收件人详细地址", icon: "none" });
        return;
      }
      if (data.address.region.value.length == 0) {
        uni.showToast({ title: "请选择收件地址", icon: "none" });
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
.save {
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
.content {
  flex-wrap: wrap;
}
.row {
  width: 94%;

  margin: 0 3%;
  border-top: solid 1px #eee;
}
.nominal {
  width: 30%;
  height: 120px;
  font-weight: 200;
  font-size: 30px;
  align-items: center;
}
.input {
  width: 70%;
  padding: 20px 0;
  align-items: center;
  font-size: 30px;
}
.switch {
  justify-content: flex-end;
}
.textarea {
  margin: 20px 0;
  min-height: 120px;
}
.del {
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #f06c7a;
  background-color: rgba(255, 0, 0, 0.05);
  border-bottom: solid 1px #eee;
}
</style>
