<template>
	<div class="wrapper">
		<head title="Delivery tracking"></head>
		<div class="detailItem">
			<div class="itemLeft">
				<text class="detaTit">Delivery company</text>
				<text class="detaInf">{{ShipperCode}}</text>
			</div>  
		</div>
		<!-- 物流信息 -->
		<div class="wuliuMes">
			<div class="secTop">
				<text class="paidtip">Tracking number</text>
				<text class="paidnum">{{LogisticCode}}</text> 
			</div>
			<div class="devList" v-if="traces.length>0">
				<div class="itemList" v-for="(item,index) in traces" :key="index">
					<div class="lineBox">
						<text class="itemTit">{{item.AcceptStation}}</text>
						<text class="itemDec">{{item.AcceptTime}}</text>

					</div>
					<text class="radio " :class="[index==0?'activeR':'']"></text>
				</div>
				 
				<!-- <div class="Expand">
					<text class="ExpandTxt">Expand</text>
					<text class="ExpandIcon">&#xe60a;</text>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import { get_order_express } from "../../../mixin/ajax.js";
	import asCore from "../../../mixin/core";
	 
	export default {
		data() {
			return{
				ShipperCode: "",
				LogisticCode: "",
				OrderCode:"",
				traces:[]
			}
		},
		methods: {
			onLoad(param) {
				let type = 0;
				if (param && param.shipper_code) {
					this.ShipperCode = param.shipper_code;
					this.LogisticCode = param.logistic_code;
				}
				asCore.getBsessionid(userId => {
					this.userId = userId;
					this.getExpress()
				})
			},
			getExpress(){
				get_order_express({
					shipper_code: this.ShipperCode,  
					logistic_code: this.LogisticCode  
				}, (res, flag) => {
					this.log(res)
					if (flag) { 
						this.OrderCode = res.OrderCode; //物流运单号 
						this.traces = res.Traces
					}
				})
			},
			
		}
	}
</script>

<style scoped>
	.wrapper {
		background-color: #F5F5F5;
	}

	.detailItem {
		padding: 32px;
		background-color: #FFFFFF;
	}

	.mt20 {
		margin-top: 20px;
	}

	.itemLeft {
		flex-direction: row;
		align-items: center;

	}

	.detaTit {
		color: #999999;
		font-size: 28px;
		width: 260px;
	}

	.detaInf {
		color: #333333;
		font-size: 28px;
		line-height: 40px;
	}

	.active {
		color: #BA8833;
	}

	.wuliuMes {
		padding: 20px;

		margin-top: 20px;
		background-color: #FFFFFF;
	}

	.secTop {
		flex-direction: row;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 20px;
		padding-top: 20px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #D8D8D8;
		margin-bottom: 30px;
	}

	.paidtip {
		font-size: 28px;
		color: #999999;
		line-height: 40px;
		margin-right: 40px;
	}

	.paidnum {
		font-size: 32px;
		color: #333333;

	}



	.devList {
		padding: 20px;
		position: relative;
	}

	.Expand {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.ExpandTxt {
		color: #888888;
		font-size: 16px;
		margin-right: 15px;
	}

	.ExpandIcon {
		font-family: iconfont;
		color: #888888;
		font-size: 30px;
	}

	.itemList {
		padding-left: 12px;
		margin-left: 12px;
		/* border-left-width: 1px;
	 		border-left-style: solid;
	 		border-left-color: #D8D8D8; */
		position: relative;
	}

	.lineBox {
		border-left-width: 1px;
		border-left-style: solid;
		border-left-color: #D8D8D8;
		padding-left: 24px;
		padding-bottom: 24px;
	}

	.radio {
		position: absolute;
		left: 0px;
		top: 0;
		background-color: #D8D8D8; 
		width: 24px;
		height: 24px;
		border-radius: 12px;
	}

	.activeR {
		background-color: #F3D39E;
		border-color: #BA8833;
		border-width: 4px;
		border-style: solid;
	}

	.itemTit {
		color: #666;
		font-size: 22px;
	}

	.itemDec {
		color: #999999;
		font-size: 20px;
		margin-top: 20px;
		padding-bottom: 20px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #D8D8D8;
	}
</style>
