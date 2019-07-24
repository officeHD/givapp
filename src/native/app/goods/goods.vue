<template>
	<div>
		<div class="status" :style="{ opacity: afterHeaderOpacity }"></div>
		<div class="header">
			<!-- 头部-默认显示 -->
			<div class="before" >
				<div class="back"><div class="icon xiangqian" @tap="back" v-if="showBack"></div></div> 
				<div class="middle"></div>
				<div class="icon-btn">
					<div class="icon tongzhi" @tap="toMsg"></div>
					<div class="icon cart" @tap="joinCart"></div>
				</div>
			</div>
			<!-- 头部-滚动渐变显示 -->
			<div class="after" >
				<div class="back" ><div class="icon xiangqian" @tap="back" v-if="showBack"></div></div>
				<div class="middle">
					<div v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</div>
				</div>
				<div class="icon-btn">
					<div class="icon tongzhi" @tap="toMsg"></div>
					<div class="icon cart" @tap="joinCart"></div>
				</div>
			</div>
		</div>
		<!-- 底部菜单 -->
		<div class="footer">
			<div class="icons">
				<div class="box" @tap="share">
					<div class="icon fenxiang"></div>
					<text class="text">分享</text>
				</div>
				<div class="box" @tap="toChat">
					<div class="icon kefu"></div>
					<text class="text">客服</text>
				</div>
				<div class="box" @tap="keep">
					<div class="icon" :class="[isKeep?'shoucangsel':'shoucang']"></div>
					<text class="text">{{isKeep?'已':''}}收藏</text>
				</div>
			</div>
			<div class="btn">
				<text class="joinCart" @tap="joinCart">加入购物车</text>
				<text class="buy" @tap="buy">立即购买</text>
			</div>
		</div>
		<!-- share弹窗 -->
		<div class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<div class="mask"></div>
			<div class="layer" @tap.stop="discard">
				<text class="h1">分享</text>
				<div class="list">
					<div class="box">
						<img src="../../static/img/share/wx.png"></img>
						<text class="title">
							微信好友
						</text>
					</div>
					<div class="box">
						<img src="../../static/img/share/pyq.png"></img>
						<text class="title">
							朋友圈
						</text>
					</div>
					<div class="box">
						<img src="../../static/img/share/wb.png"></img>
						<text class="title">
							新浪微博
						</text>
					</div>
					<div class="box">
						<img src="../../static/img/share/qq.png"></img>
						<text class="title">
							QQ
						</text>
					</div>
				</div>
				<text class="btn" @tap="hideShare">
					取消
				</text>
			</div>
			
		</div>
		<!-- 服务-模态层弹窗 -->
		<div class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<div class="mask"></div>
			<div class="layer" @tap.stop="discard">
				<div class="content">
					<div class="row" v-for="(item,index) in goodsData.service" :key="index">
						<div class="title">{{item.name}}</div>
						<div class="description">{{item.description}}</div>
					</div>
				</div>
				<div class="btn"><text class="button" @tap="hideService">完成</text></div>
			</div>
		</div>
		<!-- 规格-模态层弹窗 -->
		<div class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<div class="mask"></div>
			<div class="layer" @tap.stop="discard">
				<div class="content">
					<text class="title">选择规格：</text>
					<div class="sp">
						<div v-for="(item,index) in goodsData.spec" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index)" :key="index">{{item}}</div>
					</div>
					<div class="length" v-if="selectSpec!=null">
						<text class="text">数量</text>
						<div class="number">
							<div class="sub" @tap.stop="sub">
								<div class="icon jian"></div>
							</div>
							<div class="input" @tap.stop="discard">
								<input type="number" v-model="goodsData.number" />
							</div>
							<div class="add"  @tap.stop="add">
								<div class="icon jia"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="btn"><text class="button" @tap="hideSpec">完成</text></div>
			</div>
		</div>
		<!-- 商品主图轮播 -->
		<div class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in swiperList" :key="swiper.id">
					<image :src="swiper.img"></image>
				</swiper-item>
			</swiper>
			<text class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</text>
		</div>
		<!-- 标题 价格 -->
		<div class="info-box goods-info">
			<text class="price">￥{{goodsData.price}}</text>
			<div class="title">
				{{goodsData.name}}
			</div>
		</div>
		<!-- 服务-规则选择 -->
		<div class="info-box spec">
			<div class="row" @tap="showService">
				<text class="text">服务</text>
				<div class="content"><div class="serviceitem" v-for="(item,index) in goodsData.service" :key="index">{{item.name}}</div></div>
				<div class="arrow"><div class="icon xiangyou"></div></div>
			</div>
			<div class="row" @tap="showSpec(false)">
				<text class="text">选择</text>
				<div class="content">
					<text>选择规格：</text>
					<div class="sp">
						<div v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</div>
					</div>
					
				</div>
				<div class="arrow"><div class="icon xiangyou"></div></div>
			</div>
		</div>
		<!-- 评价 -->
		<div class="info-box comments" id="comments">
			<div class="row">
				<text class="text">商品评价({{goodsData.comment.number}})</text>
				<div class="arrow" @tap="toRatings">
					<div class="show" @tap="showComments(goodsData.id)">
						<text>查看全部</text>
						<div class="icon xiangyou"></div>
					</div>
				</div>
			</div>
			<div class="comment" @tap="toRatings">
				<div class="user-info">
					<div class="face"><image :src="goodsData.comment.userface"></image></div>
					<div class="username">{{goodsData.comment.username}}</div>
				</div>
				<div class="content">
					{{goodsData.comment.content}}
				</div>
			</div>
		</div>
		<!-- 详情 -->
		<div class="description">
			<text class="title">———— 商品详情 ————</text>
			<div class="content"><rich-text :nodes="descriptionStr"></rich-text></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		 
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [
				{ id: 1, img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg' },
				{ id: 2, img: 'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg' },
				{ id: 3, img: 'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg' },
				{ id: 4, img: 'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg' }
			],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{
				id:1,
				name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
				price:"127.00",
				number:1,
				service:[
					{name:"正品保证",description:"此商品官方保证为正品"},
					{name:"极速退款",description:"此商品享受退货极速退款服务"},
					{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				],
				spec:["XS","S","M","L","XL","XXL"],
				comment:{
					number:102,
					userface:'../../static/img/face.jpg',
					username:'大黑哥',
					content:'很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
				}
			},
			selectSpec:null,//选中规格
			isKeep:false,//收藏
			//商品描述html
			descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>'
		};
	},
 
	mounted () {
		
	},
	methods: {
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../msg/msg'
			})
		},
		// 客服
		toChat(){
			uni.navigateTo({
				url:"../msg/chat/chat?name=客服008"
			})
		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		//收藏
		keep(){
			this.isKeep = this.isKeep?false:true;
		},
		// 加入购物车
		joinCart(){
			if(this.selectSpec==null){
				return this.showSpec(()=>{
					uni.showToast({title: "已加入购物车"});
				});
			}
			uni.showToast({title: "已加入购物车"});
		},
		//立即购买
		buy(){
			if(this.selectSpec==null){
				return this.showSpec(()=>{
					this.toConfirmation();
				});
			}
			this.toConfirmation();
		},
		//商品评论
		toRatings(){
			uni.navigateTo({
				url:'ratings/ratings'
			})
		},
		//跳转确认订单页面
		toConfirmation(){
			let tmpList=[];
			let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
			tmpList.push(goods);
			uni.setStorage({
				key:'buylist',
				data:tmpList,
				success: () => {
					uni.navigateTo({
						url:'../order/confirmation'
					})
				}
			})
		},
		//跳转评论列表
		showComments(goodsid){
			
		},
		//选择规格
		setSelectSpec(index){
			this.selectSpec = index;
		},
		//减少数量
		sub(){
			if(this.goodsData.number<=1){
				return;
			}
			this.goodsData.number--;
		},
		//增加数量
		add(){
			this.goodsData.number++;
		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'主图',top:0},
				{name:'评价',top:0},
				{name:'详情',top:0}
			]
			let commentsdiv = uni.createSelectorQuery().select("#comments");
			commentsdiv.boundingClientRect((data) => {
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.px2px(100);
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			setTimeout(() => {
				this.serviceClass = 'none';
			}, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;
		},
		specCallback(){
			return;
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调

			this.selectSpec&&this.specCallback&&this.specCallback();
			this.specCallback = false;
			setTimeout(() => {
				this.specClass = 'none';
			}, 200);
		},
		discard() {
			//丢弃
		}
	}
};
</script>
<style  scoped>
 
</style>