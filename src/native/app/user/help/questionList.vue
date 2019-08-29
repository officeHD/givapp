<template>
	<div class="wrapper">
		<head title="Help"></head>
		<div class="mt20"></div>
		<!-- <x-cell title="问题1" @cellClick="gonext('root:app/user/help/question.js',{type:0})"> </x-cell> -->
		<x-cell v-for="item in helpList" :title="item.title" :hasArrow="true" @cellClick="gonext('root:app/user/help/question.js',{id:item.id})">
		</x-cell>
	</div>
</template>

<script>
	import {
		get_help_list
	} from "../../../mixin/ajax";
	export default {
		components: {
			"x-cell": require("../../../component/cell.vue")
		},
		data() {
			return {
				helpList: []
			}
		},
		methods: {
			onLoad(parmar) {
				if (parmar.id) {
					get_help_list({
						type: parmar.id,
						page: 1,
						page_num: 10
					}, (res, flag) => {
						this.log(res)
						if (flag) {
							this.helpList = res.data.list;
						}
					})
				}

			},
			gonext(url, parmar) {
				this.push(url, parmar);
			}
		}

	}
</script>

<style scoped="scoped">
	.wrapper {
		background-color: #F5F5F5;

	}

	.mt20 {
		margin-top: 20px;
	}
</style>
