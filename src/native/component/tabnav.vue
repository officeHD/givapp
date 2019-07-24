<template>
	<div>
		<div class="tabbar">
			<div class="tabItem" @click="gonext('root:/shop/app.js')">
				<text :class="[active=='Home' ? 'active' : '','iconfont']">&#xe63e;</text>
				<text :class="[active=='Home' ? 'active' : '']">Home</text>
			</div>
			<div class="tabItem" @click="gonext('root:/shop/category/app.js')">
				<text :class="[active=='Categories' ? 'active' : '','iconfont']">&#xe64a;</text>
				<text :class="[active=='Categories' ? 'active' : '']">Categories</text>
			</div>
			<div class="tabItem">

			</div>
			<div class="tabItem" @click="gonext('root:/shop/cart/app.js')">
				<text :class="[active=='Cart' ? 'active' : '','iconfont']">&#xe64c;</text>
				<text :class="[active=='Cart' ? 'active' : '']">Cart</text>
			</div>
			<div class="tabItem" @click="gonext('root:/shop/user/app.js')">
				<text :class="[active=='User' ? 'active' : '','iconfont']">&#xe782;</text>
				<text :class="[active=='User' ? 'active' : '']">My GIV</text>
			</div>
			<div class="centerNav">
				<text class="iconfont centerIcon">&#xe601;</text>
				<text>Post</text>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			active: {
				default: 'Home'
			}

		},
		data() {
			return {}
		},
		methods: {
			gonext(url) {
				//this.push('test.js',{name:"ssss"})
				// this.log("jdksdjsk", "error");
				this.push(url);
			},
			click() {
				this.$emit('click')
			}
		},
		mounted() {},
		created() {

		}
	}
</script>
<style scoped>
	.iconfont {
		font-family: iconfont;
		font-size: 40px;
		margin-bottom: 10px;
	}

	.tabbar {
		width: 750px;
		height: 100px;
		background-color: #FFFFFF;
		align-items: flex-end;
		justify-content: space-around;
		flex-direction: row;

		padding-bottom: 10px;
		position: relative;
	}


	.tabItem {
		align-items: center;
		width: 140px;
	}

	.centerNav {
		position: fixed;
		left: 325px;
		bottom: 10px;
		justify-content: center;
		align-items: center;
	}

	.centerIcon {
		width: 116px;
		height: 116px;
		text-align: center;
		line-height: 96px;
		background-color: #C09244;
		border-radius: 58px;
		color: #FFFFFF;
		border-color: #FEFEFE;
		border-width: 10px;
		border-style: solid;
		box-shadow: -5px 0 5px #FFFFFF;
	}

	.active {
		color: #BD8D38;
	}
</style>
