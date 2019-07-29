<template>
	<div>
    	<head :back="true" bgcolor="transparent" title="raffle" titleColor="#333"></head>
        <div class="wrapper"> 
            <text class="title">Luck whell</text>
            <div class="wheel">
                <image  ref="wheels"  class="wheelImg" src="root:img/activity/whell.png"></image>
            </div>
            <text class="starBtn" @click="rotate">Exhibitors</text>
            <looper font-size="25" @click="ok" :data="items"  color="#BA8833"  style="  border-radius: 30px;width: 602;height: 50;background-color:#FDF2E9;padding-left:20px"> 
            </looper>
        </div>
		
	</div>
</template>

<script>
const navigator = weex.requireModule("navigator");
const animation = weex.requireModule("animation");
export default {
  data() {
    return {
      index: 0,
      items: [
        "2017年11月9日，网络设计平台app",
        "2017年11月9日，网络设计平台app",
        "2017年11月9日，网络设计平台app",
        "2017年11月9日，网络设计平台app",
        "2017年11月9日，网络设计平台app"
      ]
    };
  },
  beforeCreate() {
    let navbar = weex.requireModule("navbar");
    navbar.setStatusBarStyle("black");
  },
  methods: {
    rotate() {
      var ref1 = this.$refs.wheels;
      let that = this;
      animation.transition(
        ref1,
        {
          duration: 5000, //ms
          timingFunction: "ease",
          needLayout: false, 
          styles: { 
            transform: "rotate(1)",
          },
          delay: 0 //ms
        },
        function() {
          that.toast({ message: "animation finished." });
        }
      );
    }
  }
};
</script>

<style scoped>
.wrapper {
  justify-content: center;
  align-items: center;
  flex: 1;
}
.title {
  font-size: 60px;
  color: #ba8833;
}
.wheel {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 624px;
  height: 624px;
}
.wheelImg {
  width: 624px;
  height: 624px;
  border-radius: 314px;
}
.starBtn {
  width: 200px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #ba8833;
  color: #ffffff;
  border-radius: 30px;
  margin-bottom: 50px;
}
</style>
