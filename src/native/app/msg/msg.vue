<template>
	<div class="wrapper">
		<head  :title="title"></head>
		<list class="scroller">
			<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
				<loading-indicator class="indicator"></loading-indicator>
			</refresh>

			<div class="list-top-border" v-if="msgData.length > 0"></div>
			<cell v-for="(msg,index) in msgData" :key="index" ref="mainList">
				<!-- <swipecell @cellclick="clickmenu(msg)" @actionClick="actionClick(msg)"> -->
				<div slot="content" class="panel" @click="clickmenu(msg)">
					<image class="content-img" src="root:img/user.jpg"></image>
					<div class="panel-content">
						<!-- <div :class="['content-icon',isIos()?'ios-icon-top':'']" :style="{ backgroundColor: msg.backcolor}" v-if="msg.icon && !msg.img">
							<text class="content-font iconfont" :style="{ fontSize: msg.fontsize + 'px'}">{{msg.icon}}</text>
						</div> -->

						<!-- <div class="msg-tag" v-if="msg.count > 0">
							<text class="count-text">{{msg.count}}</text>
						</div> -->
						<div class="content-div">
							<text :class="['content-title',isIos()?'':'ios-icon-top3']">{{msg.title}}</text>
							<text :class="['content-text',isIos()?'':'ios-icon-top2']">{{msg.label}}</text>
							<text class="timeAgo">A day ago</text>
						</div>
						<image class="goodsImg" src="root:img/goods.png"></image>
					</div>
				</div>
				<!-- </swipecell> -->
			</cell>


		</list>

	</div>
</template>

<script>
	const modal = weex.requireModule("modal");
	const navigator = weex.requireModule("navigator");
	const storage = weex.requireModule("storage");
	export default {
		components: {
			// swipecell: require("root:component/swipecell.vue")
		},

		data() {
			return {
				title: "message",
				refreshing: false,
				qrColor: "#1B82D2",
				bartheme: "",
				msgData: [{
						backcolor: "",
						title: "小浦",
						label: "在哪吃饭？",
						img: "root:img/head.jpg",
						icon: "",
						fontsize: "",
						count: 5,
						rowid: "1",
						rename: "list1"
					},
					{
						backcolor: "",
						title: "腾讯新闻",
						label: "北大留美硕士控诉父母“控制与伤害” 12年未回家过年",
						icon: "",
						img: "root:img/tenxunnew.png",
						fontsize: "",
						count: 1,
						rowid: "news",
						rename: "list2"
					},
					{
						backcolor: "",
						title: "小明",
						label: "发个链接给我",
						img: "root:img/head1.jpg",
						icon: "",
						fontsize: "",
						count: "",
						rowid: "3",
						rename: "list3"
					},
					{
						backcolor: "#18B6F7",
						title: "通知公告",
						label: "今年年会时间地点通知",
						img: "",
						icon: "\ue6b9",
						fontsize: "65",
						count: 1,
						rowid: "notice",
						rename: "list4"
					},
					{
						backcolor: "#FFA25A",
						title: "日报动态",
						label: "今天去有个好地方出差",
						img: "",
						icon: "\ue602",
						fontsize: "55",
						count: 8,
						rowid: "dayReport",
						rename: "list5"
					},
					{
						backcolor: "",
						title: "小杰",
						label: "明天去玩吗?",
						img: "root:img/myhead.gif",
						icon: "",
						fontsize: "",
						count: "",
						rowid: "6",
						rename: "list6"
					},
					{
						backcolor: "#FB5C67",
						title: "我的邮件",
						label: "您有一封来自QQ的新邮件",
						img: "",
						icon: "\ue6d9",
						fontsize: "58",
						count: "1",
						rowid: "email",
						rename: "list7"
					},
					{
						backcolor: "#FB5C67",
						title: "我的邮件",
						label: "您有一封来自QQ的新邮件",
						img: "",
						icon: "\ue6d9",
						fontsize: "58",
						count: "1",
						rowid: "email",
						rename: "list7"
					},
					{
						backcolor: "#FB5C67",
						title: "我的邮件",
						label: "您有一封来自QQ的新邮件",
						img: "",
						icon: "\ue6d9",
						fontsize: "58",
						count: "1",
						rowid: "email",
						rename: "list7"
					}
				],
				topMShow: false,
				theme: "topM_theme1"
			};
		},
		methods: {
			clickmenu(data) {
				navigator.push("root:app/msg/chat.js");
				//   if (data.rowid == "news") {
				//     // navigator.push(asCore.localpath + "yunagileoa/app/news/news.js");
				//   } else if (data.rowid == "dayReport") {
				//     navigator
				//       .push
				//       // asCore.localpath + "yunagileoa/app/dayReport/dayList.js"
				//       ();
				//   } else if (data.rowid == "notice") {
				//     navigator
				//       .push
				//       // asCore.localpath + "yunagileoa/app/notice/noticeActivity.js"
				//       ();
				//   } else if (data.rowid == "email") {
				//   } else {
				//     navigator.pushParam(
				//       // asCore.localpath + "yunagileoa/app/message/message.js",
				//       {
				//         title: data.title,
				//         url: data.img
				//       }
				//     );
				//   }
			},
			actionClick() {
				// asCore.toast("删除按钮被单击");
			},
			leftButtonClick() {
				// navigator.push(asCore.localpath + "saui/list.js");
			},
			openMessage(data) {},
			onrefresh(event) {
				this.refreshing = true;
				this.topMShow = false;
				setTimeout(() => {
					this.refreshing = false;
					modal.toast({
						message: "刷新成功"
					});
				}, 1000);
			},
			opentopM() {
				this.topMShow = true;
			},
			closetopM: function(e) {
				this.topMShow = false;
				e.stopPropagation();
			},
			openQr: function(e) {
				var qr = weex.requireModule("qr");
				var p = {};
				p.color = "#ffffff";
				p.bgcolor = this.qrColor;
				this.topMShow = false;
				qr.open(p, res => {
					var url = res.url;
				});
			},
			openSearch() {
				// navigator.push(asCore.localpath + "yunagileoa/index/searchP.js");
			},
			setColor(color) {
				this.qrColor = color;
			},
			setTheme(tname) {
				this.bartheme = tname;
				storage.getItem("theme", event => {
					if (event.data) {
						if (event.data == "theme1") {
							this.theme = "topM_" + event.data;
						} else {
							this.theme = "topM_theme2";
						}
					}
				});
			},
			isIos() {
				const {
					platform
				} = weex.config.env;
				return platform.toLowerCase() === "ios";
			}
		}
	};
</script>
<style scoped>
	.wrapper {
		flex: 1;
	}

	.iconfont {
		font-family: iconfont;
	}

	.scroller {
		flex: 1;
	}

	.refresh {
		width: 750;

		-ms-flex-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		align-items: center;
	}

	.indicator {
		margin-top: 30px;
		margin-bottom: 20px;
		height: 70px;
		width: 70px;
		color: #ce2020;
	}

	.panel {
		width: 750px;
		background-color: #ffffff;
		flex-direction: row;
	}

	.content-img {
		width: 100px;
		height: 100px;
		border-radius: 50px;
		margin-top: 30px;
		margin-left: 30px;
		margin-right: 30px;
	}

	.panel-content {
		flex: 1;
		flex-direction: row;
		/* padding-left: 25px; */
		padding-top: 18px;
		padding-right: 30px;
		padding-bottom: 10px;
		border-bottom-color: #e6e6e6;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.panel-pos {
		position: relative;
	}

	.content-icon {
		width: 100px;
		height: 100px;
		border-radius: 10px;
		align-items: center;
		justify-content: center;
	}

	.ios-icon-top {
		padding-top: 10px;
	}

	.ios-icon-top2 {
		padding-top: 15px;
	}

	.ios-icon-top3 {
		padding-top: 5px;
	}

	.content-font {
		color: #ffffff;
	}

	.content-div {
		flex: 1;
	}

	.goodsImg {
		width: 100px;
		height: 100px;
		margin: 20px 0;
	}

	.content-title {
		margin-top: 3px;
		color: #333;
		text-overflow: ellipsis;
		lines: 1;
		font-size: 32px;
	}

	.content-text {
		color: #888;
		text-overflow: ellipsis;
		lines: 1;
		padding-top: 10px;
		font-size: 28px;
	}

	.timeAgo {
		color: #999999;
		font-size: 24px;
		margin-top: 20px;
	}

	.msg-tag {
		position: absolute;
		top: 10px;
		left: 90px;
		border-radius: 40px;
		background-color: #ff3e3e;
		height: 40px;
		width: 40px;
		align-items: center;
		justify-content: center;
	}

	.count-text {
		font-size: 24px;
		color: #ffffff;
	}

	.list-top-border {
		border-bottom-width: 1px;
		border-bottom-color: #d9d9d9;
	}

	.topMenu {
		width: 750px;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0px;
	}

	.content {
		margin-top: 130px;
		margin-left: 425px;
		width: 320px;
		/* height: 160px; */
	}

	.topBtn {
		width: 320px;
		height: 79px;
		border-top-color: #24272c;
		border-top-width: 1px;
		padding-left: 30px;
		flex-direction: row;
	}

	.topBtn：active {
		background-color: #2e3238;
	}

	.topBtn_icon {
		font-size: 34px;
		line-height: 80px;
		margin-right: 20px;
		color: #fff;
	}

	.topBtn_text {
		font-size: 34px;
		line-height: 80px;
		color: #fff;
	}

	.topM_theme1 {
		background-color: #3a3f45;
		border-top-color: #24272c;
		border-top-width: 1px;
	}

	.topM_theme2 {
		background-color: #fff;
		border-top-color: #e2e2e2;
		border-top-width: 2px;
		border-bottom-color: #e2e2e2;
		border-bottom-width: 2px;
		border-left-color: #e2e2e2;
		border-left-width: 2px;
		border-right-color: #e2e2e2;
		border-right-width: 2px;
	}

	.topM_theme2_font {
		color: #888;
	}

	.topM_theme2_border {
		border-top-color: #fff;
	}
</style>
