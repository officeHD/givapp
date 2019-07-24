<template>
	<div>
		<div class="block">
			
		</div>
		<div class="QR">
			<img class="image" src="root:img/qr.png"></img>
		</div>
		<text class="title">
			扫描二维码，加我好友
		</text>
		<div class="btn" v-if="showBtn" @tap="printscreen">
			{{tis}}
		</div>
		<div class="logo">
			<img class="loimage" src="root:img/qrlogo.png"></img>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      tis: "保存到相册",
      showBtn: false
    };
  },
  onLoad() {
    // #ifdef APP-PLUS
    this.showBtn = true;
    // #endif
  },
  methods: {
    // 截图，调用webview、Bitmap方法
    printscreen() {
      this.tis = "正在保存";
      let ws = this.$mp.page.$getAppWebview();
      let bitmap = new plus.nativeObj.Bitmap();
      this.showBtn = false;
      this.$nextTick(function() {
        setTimeout(() => {
          ws.draw(
            bitmap,
            e => {
              this.showBtn = true;
              console.log("bitmap绘制图片成功");
              console.log("e: " + JSON.stringify(e));
              bitmap.save(
                "_doc/Qr.jpg",
                {
                  overwrite: true,
                  quality: 100
                },
                i => {
                  plus.gallery.save(
                    i.target,
                    e => {
                      uni.showToast({
                        title: "保存成功"
                      });
                      this.tis = "保存到相册";
                      bitmap.clear(); //销毁
                    },
                    e => {
                      bitmap.clear(); //销毁
                    }
                  );
                },
                e => {
                  console.log("保存图片失败：" + JSON.stringify(e));
                }
              );
            },
            e => {
              console.log("bitmap绘制图片失败：" + JSON.stringify(e));
            }
          );
        }, 200);
      });
    }
  }
};
</script>

<style scoped>
.block {
  width: 100%;
  height: 30vh;
  background-color: #fff;
  justify-content: center;
}
.QR {
  width: 60vw;
  height: 60vw;
  margin: -40vw auto 0 auto;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
.image {
  width: 50vw;
  height: 50vw;
}
.title {
  width: 100%;
  margin-top: 50px;
  justify-content: center;
  font-size: 36px;
  color: #fff;
}
.btn {
  width: 50%;
  height: 80px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
  margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.8);
}
.logo {
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 25px;
}
.loimage {
  width: 39.6%;
}
</style>
