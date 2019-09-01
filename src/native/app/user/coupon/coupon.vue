<template>
	<div class="wrapper">
		<head title="Coupon"> </head>
		<empty v-if="couponValidList.length==0" tips="Your vouchers is empty" img="root:img/e_eva.png"></empty>
		<list class="sub-list" v-if="couponValidList.length>0">
			<cell class="rowcell" v-for="(row,index) in couponValidList" :key="index">
				<div class="cellBox">
					<div class="boxleft">
						<text class="money">$ {{row.reduce}}</text>
						<text class="title">{{row.name}} </text>
						<text class="term">{{row.start_time}} ~ {{row.end_time}} </text>
					</div>
					<text class="line"></text> 
					<div class="right">
						<text class="touse"> 去使用 </text>
					</div>
				</div>
			</cell>
		</list>
		
	</div>
</template>

<script>
	import {get_users_coupon_list} from "../../../mixin/ajax"
	import asCore from "../../../mixin/core";
	export default {
		data() {
			return {
				couponValidList: [],
				headerTop: 0,
				userId:""

			};
		},
		created() {
			
			asCore.getBsessionid(userId => {
				this.log(userId)
				this.userId = userId;
				this.getList();
			});
		},
		methods: {
			getList(){
				get_users_coupon_list({
					users_id:this.userId,
					status:"1" //状态 1 未使用 2 已使用
				},(res,flag)=>{
					this.log(res)
					if(flag){
						if(res.code==200){
							this.couponValidList=res.data;
						}
					} 
				})
			}
		}
	};
</script>
<style scoped>
	.wrapper {
		background-color: #F2F2F2;
	}
  
	.sub-list {
		width: 750px;
		padding: 32px;
		flex: 1;
	}


	.tis {
		width: 100%;
		height: 60px;
		justify-content: center;
		align-items: center;
		font-size: 32px;
	}

	.rowcell {
		width: 686px;
		/* height: 150px; */
		padding: 16px 0; 
		border-radius: 8px;

		background-color: #F2F2F2;
	}

	.cellBox {
		flex: 1;
		width: 686px;
		height: 150px;
		align-items: center;
		flex-direction: row;
		
		position: relative;
	}

	.line{
		height: 118px;
		border-left-width: 2px;
		border-left-color: #999;
		border-left-style: dashed;
	}

	.boxleft {
		flex: 1;
		height: 150px;
		position: relative;
		padding-left: 32px;
		justify-content: center;
		border-radius: 16px;
		background-color: #FFFFFF;
	}

	.money {
		color: #EC414D;
		font-size: 40px;
	}

	.title {
		margin: 10px 0;
		font-size: 23px;
		color: #666666;
	}

	.term {
		font-size: 18px;
		color: #999;
	}

	 

	 

	.right {
		width: 170px;
		height: 150px;
		align-items: center;
		justify-content: center;
	/* 	border-left-width: 1px;
		border-left-color: #000000;
		border-left-style: dashed; */
		background-color: #FFFFFF;
		border-radius: 16px;
	}

	.touse {
		color: #FFFFFF;
		background-image: linear-gradient(to right, #D2B37C, #BA8833);
		font-size: 26px;
		width: 112px;
		height: 54px;
		line-height: 54px;
		text-align: center;
		border-radius: 4px;
	} 
</style>
