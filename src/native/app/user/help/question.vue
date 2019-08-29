<template>
	<div class="wrapper">
		<head title="Help"></head>
		<text class="title bb">{{helpInfo.title}}</text>
		<div class="content">
			<text class="detail">{{helpInfo.details}}</text>

			<div class="Bitem">
				<div class="itemL" :class="[disabled?'disabled':'']" @click="topAct(helpInfo.id,1)">
					<text class="iconfont" :class="[disabled?'disabled':'']">&#xe60b;</text>
					<text class="Solved" :class="[disabled?'disabled':'']">{{helpInfo.top_num}}</text>
				</div>
				<div class="itemL" :class="[disabled?'disabled':'']" @click="topAct(helpInfo.id,2)">
					<text class="iconfont" :class="[disabled?'disabled':'']">&#xe7ed;</text>
					<text class="Solved" :class="[disabled?'disabled':'']">{{helpInfo.step_num}}</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		get_help_info,
		add_help_info
	} from "../../../mixin/ajax";
	export default {
		components: {

		},
		data() {
			return {
				disabled: false,
				helpInfo: {
					"title": "",
					"details": "",
					"top_num": null,
					"step_num": null
				}
			}
		},
		methods: {
			onLoad(parmar) {
				if (parmar.id) {
					get_help_info({
						id: parmar.id,

					}, (res, flag) => {
						this.log(res)
						if (flag) {
							this.helpInfo = res.data;
						}
					})
				} 
			},
			topAct(id, type) {
				if(this.disabled){
					this.toast("已经操作了");
					return
				}
				add_help_info({
					id: id,
					type: type
				}, (res, flag) => {
					this.log(res)
					if (flag) {
						this.toast(res.message)
						if (res.code == 200) {
							this.disabled = true;
						}

					}
				})
			},
			gonext(url, parmar) {
				this.push(url, parmar);
			}
		}

	}
</script>

<style scoped="scoped">
	.Bitem {
		flex-direction: row;
		padding: 20px 60px;
		justify-content: center;
	}

	.disabled {
		border-color: #C2C2C2;
		color: #C2C2C2;
	}

	.itemL {
		flex-direction: row;
		justify-content: center;
		margin: 0 20px;
		align-items: center;
		border-style: solid;
		border-width: 1px;
		border-color: #BA8833;
		height: 52px;
		width: 180px;
		border-radius: 4px;
	}

	.Solved {
		font-size: 22px;
		color: #BA8833;
		margin-left: 20px;
	}

	.wrapper {
		background-color: #F5F5F5;

	}

	.iconfont {
		font-family: iconfont;
		font-size: 22px;
		color: #BA8833;
	}

	.bb {
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #DDDDDD;
	}

	.title {
		padding: 0 32px;
		height: 100px;
		line-height: 100px;
		font-size: 28px;
		color: #1E1E1E;
		background-color: #FFFFFF;
	}

	.content {
		background-color: #FFFFFF;
		width: 750px;
		padding: 26px 32px;
	}

	.detail {
		color: #333333;
		font-size: 26px;
		margin-bottom: 30px;
	}
</style>
