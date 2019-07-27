<template>
	<div class="layout" :style="{'background-color':bgcolor,'height':height+'px','padding-top':top}">
		<div style="flex-direction: row;align-items: center;flex: 1; justify-content:space-between ">
			<div class="backbg" v-if="!back&&hasleft" @click="letfClick" style="">
				<slot name="left"></slot>
			</div>
			<div class="leftIcon" v-if="back" @click="backTo">
				<!-- <image src="root:img/back.png" style="width: 70px;height: 70px;  "></image> -->
        <text class="arricon">&#xe603;</text>
			</div>
      <slot name="center"></slot>
			<text v-if="title" style="text-align: center;font-size: 36;" :style="{'color':titleColor}" @click="titleClick">{{title}}</text>
			
      <div class="backbg" @click="rightClick"  >
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  props: {
    hasleft: {
      default: true
    },
    title: {
      default: ""
    },
    back: {
      default: true
    },
    titleColor: {
      default: "#ffffff"
    },
    hideBottomLine: {
      default: false
    },

    bgcolor: {
      default: "#1EA5FC"
    },
    autoback: {
      default: true
    },
    isloading: {
      default: false
    },
    disabled: {
      default: false
    },

    type: {
      type: String,
      default: "text"
    },
    font_size: {
      default: 20
    },
    height: {
      default: 140
    },
    top: {
      default: 50
    },
    titletop: {
      default: 10
    }
  },
  data() {
    return {};
  },
  methods: {
    titleClick() {
      this.$emit("titleClick");
    },
    letfClick() {
      this.$emit("letfClick");
    },
    rightClick() {
      this.$emit("rightClick");
    },
    backTo() {
      if (this.autoback) {
        var nav = weex.requireModule("navigator");
        nav.back();
        return;
      }
      this.$emit("backClick");
    },

    onclick() {
      if (!this.disabled) this.$emit("onclick");
    },

    adjust() {
      if (weex.config.env.platform == "android") {
        //                    if(weex.config.env.osVersion=)
        var p = weex.config.env.osVersion;
        p = p.replace(/\./g, "");
        if (p.length < 3) p = p + "0";
        if (p <= "440") {
          this.height = 108;
          this.top = 16;
          this.titletop = 4;
        }
      }
    }
  },

  created: function() {
    this.adjust();
  },
  ready: function() {}
};
</script>
<style scoped>
.backbg {
  width: 120;
  justify-content: center;
  align-items: center;
}

.leftIcon {
  width: 80px;
  justify-content: center;
  align-items: center;
}
.arricon {
  font-size: 44px;
  font-family: iconfont;
  color: #ffffff;
}

.layout {
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  background-color: #02993c;
  height: 128;
  width: 750;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
