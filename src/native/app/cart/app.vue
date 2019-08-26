<template>
	<div class="layout">
		<head @letfClick="letfClick" @rightClick="rightClick">
			<text class="leftIcon iconfont" slot="left">&#xe64a;</text>
			<text class="leftIcon iconfont" slot="right">&#xe600;</text>
		</head>
		<scroller class="scroller"></scroller>
		<tabnav active="Cart"></tabnav>
	</div>
</template>
<script>
	const navigator = weex.requireModule("navigator");

	export default {

		data() {
			return {
				imageList: [{
						src: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjI5NDk2fQ'
					},
					{
						src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
					},
					{
						src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'
					}
				]
			};
		},
		props: {},
		methods: {
			onLoad(p) {},
			gonext(url) {
				//this.push('test.js',{name:"ssss"})
				this.log("jdksdjsk", "error");
				navigator.push(url);
			},

			searchClick() {
				this.toast("搜索跳转")
			},
			letfClick() {
				this.toast("左边按钮跳转")
			},
			rightClick() {
				this.toast("右边边按钮跳转")
			},
		},
		created() {

		}
	};
</script>
<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.layout {
		background-color: #ffffff;

	}

	.scroller {
		flex: 1;
		background-color: #f2f2f2;
	}

	.header {
		height: 310px;
		padding-top: 45px;
		justify-content: flex-start;
		align-items: center;
		margin-top: -310px;
	}

	.inputbox {
		background-color: #fff;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 680px;
		border-radius: 70px;
		height: 70px;
		padding: 0 35px;

	}

	.searchIcon {
		color: #666;
		margin-right: 10px;
		font-size: 30px;
	}

	.tips {
		color: #666;
	}

	.leftIcon {
		color: #ffffff;
		font-size: 40px;

	}

	.img {
		width: 200px;
		height: 200px;
		margin-top: -100px;
	}

	.text {
		color: black;
		margin-top: 30px;
		font-size: 70px;
		font-weight: bold;
		margin-bottom: 50px;
	}

	.image {
		width: 750px;
		height: 310px;
	}

	.slider {
		margin-top: 0;
		margin-left: 0;
		width: 750px;
		height: 310px;

	}

	.frame {
		width: 750px;
		height: 310px;

		position: relative;
	}

	.tabSection {
		width: 690px;
		height: 350px;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin-left: 30px;
		margin-top: 40px;
	}

	.subSection {
		height: 244px;
		width: 690px;
		margin-left: 30px;
		margin-top: 40px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}

	.recommend {
		width: 690px;
		border-radius: 10px;
		background-color: #FFFFFF;
		margin-left: 30px;
		margin-top: 40px;
	}
</style>
