<template>
	<div class="wrapper">
		<head title="Coupon"> </head>
		<text class="tis" v-if="couponValidList.length==0"> 没有数据~ </text>
		<list class="sub-list">
			<cell class="rowcell" v-for="(row,index) in couponValidList" :key="index">
				<div class="cellBox">
					<div class="boxleft">
						<text class="money">$ 50</text>
						<text class="title">{{row.title}} </text>
						<text class="term">{{row.termStart}} ~ {{row.termEnd}} </text>
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
	export default {
		data() {
			return {
				couponValidList: [{
						id: 1,
						title: "Full 300 use ",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "10",
						criteria: "满50使用"
					},
					{
						id: 2,
						title: "Full 300 use",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "100",
						criteria: "Full 300 use"
					},
					{
						id: 3,
						title: "Full 300 use",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "10",
						criteria: "无门槛"
					},
					{
						id: 4,
						title: "Full 300 use",
						termStart: "2019-04-01",
						termEnd: "2019-05-30",
						ticket: "50",
						criteria: "满1000使用"
					}
				],
				headerTop: 0,

			};
		},

		methods: {

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
