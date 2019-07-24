<template>
	<div>
		<div class="content">
			<div class="list">
				<div class="row">
					<text class="title">头像</text>
					<div class="right"><div class="tis">
					<img class="image" src="/static/img/face.jpg" mode="widthFix"></img>
					</div><div class="icon xiangyou"></div></div>
				</div>
				<div class="row">
					<text class="title">昵称</text>
					<div class="right"><text class="tis">大黑哥</text><div class="icon xiangyou"></div></div>
				</div>
				<div class="row">
					<text class="title">个性签名</text>
					<div class="right"><text class="tis">这人太懒了，什么都不写</text><div class="icon xiangyou"></div></div>
				</div>
				<div class="row">
					<text class="title">收货地址</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
				<div class="row last">
					<text class="title">账户安全</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
			</div>
			<div class="list">
				<div class="row">
					<text class="title">通知提醒</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
				<div class="row">
					<text class="title">支付设置</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
				<div class="row last">
					<text class="title">通用</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
			</div>
			<div class="list">
				<div class="row">
					<text class="title">版本升级</text>
					<div class="right"><text class="tis">v1.0.0</text><div class="icon xiangyou"></div></div>
				</div>
				<div class="row">
					<text class="title">清除缓存</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
				<div class="row">
					<text class="title">问题反馈</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
				<div class="row last">
					<text class="title">关于商城</text>
					<div class="right"><div class="tis"></div><div class="icon xiangyou"></div></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    showType(tbIndex) {
      this.tabbarIndex = tbIndex;
      this.list = this.orderList[tbIndex];
    }
  }
};
</script>

<style  scoped>
.icon {
  font-size: 30px;
}
.content {
  padding-bottom: 20px;
}
.list {
  width: 96%;
  padding-left: 4%;
  background-color: #fff;
  margin-bottom: 20px;
}
.row {
  widows: 100%;
  min-height: 90px;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #eee;
}
.last {
  border-bottom: none;
}
.title {
  font-size: 32px;
  color: #333;
}
.right {
  align-items: center;
  color: #999;
}
.tis {
  font-size: 26px;
  margin-right: 5px;
  max-height: 120px;
}
.image {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 10px 0;
}
.icon {
  width: 40px;
  color: #cecece;
}
</style>
