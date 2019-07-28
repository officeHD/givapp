<template>
	<div>
		<video id="myVideo" class="myVideo" :src="videoSrc" v-show="isPlayVideo" :show-fullscreen-btn="showFullscreenBtn"
		 :direction="videoDirection" :show-play-btn="showPlayBtn" @pause="videoPause" @fullscreenchange="viderFullscreen">
			<cover-image class="stopPlayVideoBtn" @click="stopPlayVideo" src="/static/img/close.png"></cover-image>
		</video>
		<div class="content">

			<div class="label">
				<text v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="loadRatings(index)" :key="label.type">
					{{label.name}}({{label.number}})
				</text>
			</div>
			<div class="list">
				<div class="row" v-for="(row,Rindex) in ratingsList" :key="Rindex">
					<div class="left">
						<div class="face">
							<img :src="row.face"></img>
						</div>
					</div>
					<div class="right">
						<div class="name-date">
							<div class="username">
								{{row.username}}
							</div>
							<div class="date">
								{{row.date}}
							</div>
						</div>
						<div class="spec">
							{{row.spec}}
						</div>
						<div class="first">
							<div class="rat">
								{{row.first.content}}
							</div>
							<div class="img-video">
								<div class="box" v-for="item in row.first.video" @tap="playVideo(item.path)" :key="item.path">
									<img mode="aspectFill" :src="item.img"></img>
									<div class="playbtn">
										<div class="icon bofang"></div>
									</div>
								</div>
								<div class="box" v-for="item in row.first.img" @tap="showBigImg(item,row.first.img)" :key="item">
									<img mode="aspectFill" :src="item"></img>
								</div>
							</div>
						</div>
						<div class="append" v-if="row.append">
							<text class="date">
								{{row.append.date}}天后追加
							</text>
							<div class="rat">
								{{row.append.content}}
							</div>
							<div class="img-video">
								<div class="box" v-for="item in row.append.video" @tap="playVideo(item.path)" :key="item.path">
									<img mode="aspectFill" :src="item.img"></img>
									<div class="playbtn">
										<div class="icon bofang"></div>
									</div>
								</div>
								<div class="box" v-for="item in row.append.img" @tap="showBigImg(item,row.append.img)" :key="item">
									<img mode="aspectFill" :src="item"></img>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				labelList: [{
						name: '全部',
						number: 25,
						type: 'all'
					},
					{
						name: '好评',
						number: 23,
						type: 'good'
					},
					{
						name: '中评',
						number: 1,
						type: 'secondary'
					},
					{
						name: '差评',
						number: 1,
						type: 'poor'
					},
					{
						name: '有图',
						number: 12,
						type: 'img'
					},
					{
						name: '视频',
						number: 2,
						type: 'video'
					},
					{
						name: '追加',
						number: 2,
						type: 'append'
					}
				],
				labelIndex: 0,
				ratingsList: [{
						id: 1,
						username: "大黑哥",
						face: "/static/img/face.jpg",
						date: '2019-04-21',
						spec: "规格: XL",
						grade: "good",
						first: {
							content: "好看，可以，不愧是专业的，才拿到手上就研究了半天才装上",
							img: ["https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg",
								"https://ae01.alicdn.com/kf/HTB1sL7hTjDpK1RjSZFrq6y78VXaw.jpg",
								"https://ae01.alicdn.com/kf/HTB111soTbvpK1RjSZPiq6zmwXXaB.jpg",
								"https://ae01.alicdn.com/kf/HTB1O2TRTmzqK1RjSZPcq6zTepXa4.jpg"
							],
							video: [{
								img: "https://ae01.alicdn.com/kf/HTB1AMEBTcfpK1RjSZFOq6y6nFXaK.jpg",
								path: "https://mp4.vjshi.com/2018-12-28/1083f3db90334f86e3fc3586b4472914.mp4"
							}]
						},
						append: {
							date: 65,
							content: "用了一段时间，质量很好，体验很流畅，推荐购买",
							img: ["https://ae01.alicdn.com/kf/HTB1dKZtTgHqK1RjSZFEq6AGMXXaS.jpg",
								"https://ae01.alicdn.com/kf/HTB18h3oTmzqK1RjSZFjq6zlCFXap.jpg"
							],
							video: [{
								img: "https://ae01.alicdn.com/kf/HTB1AMEBTcfpK1RjSZFOq6y6nFXaK.jpg",
								path: "https://mp4.vjshi.com/2017-06-17/ed1d63669bea39f5ef078c4e194291d6.mp4"
							}]
						}
					},
					{
						id: 2,
						username: "小黑狗",
						face: "/static/img/face.jpg",
						date: '2019-04-21',
						spec: "规格: XL",
						grade: "secondary",
						first: {
							content: "好评，看图",
							img: ["https://ae01.alicdn.com/kf/HTB111soTbvpK1RjSZPiq6zmwXXaB.jpg",
								"https://ae01.alicdn.com/kf/HTB1O2TRTmzqK1RjSZPcq6zTepXa4.jpg"
							],
							video: []
						}
					},
					{
						id: 3,
						username: "小黑狗",
						face: "/static/img/face.jpg",
						date: '2019-04-21',
						spec: "规格: XL",
						grade: "poor",
						first: {
							content: "好评，看图",
							img: ["https://ae01.alicdn.com/kf/HTB111soTbvpK1RjSZPiq6zmwXXaB.jpg",
								"https://ae01.alicdn.com/kf/HTB1O2TRTmzqK1RjSZPcq6zTepXa4.jpg"
							],
							video: []
						}
					},
					{
						id: 3,
						username: "小黑狗",
						face: "/static/img/face.jpg",
						date: '2019-04-21',
						spec: "规格: XL",
						grade: "secondary",
						first: {
							content: "系统默认好评",
							img: [],
							video: []
						}
					}
				],
				videoDirection: 0,
				showFullscreenBtn: true,
				showPlayBtn: true,
				isPlayVideo: true,
				videoSrc: ''

			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({
				title: '触发上拉加载'
			});
		},
		methods: {
			loadRatings(index) {
				this.labelIndex = index;
				uni.showToast({
					title: "切换评论列表"
				})
				//实际应用中，请求对应类型的评论列表，覆盖this.ratingsList
				/*
				let type = this.labelList[index].type; // 评论类型
				......
				*/
			},
			playVideo(path) {
				this.videoSrc = path;
				// this.isPlayVideo = true;
				this.$nextTick(function() {
					this.videoContext.requestFullScreen({
						direction: 0
					});
				});

			},
			stopPlayVideo() {
				this.videoContext.pause();
			},
			videoPause() {
				// this.isPlayVideo = false;
				this.videoSrc = '';
			},
			viderFullscreen(e) {
				if (e.detail.fullScreen) {
					this.videoContext.play();
				} else {
					this.stopPlayVideo();
				}
			},
			showBigImg(src, srclist) {
				uni.predivImage({
					current: src,
					urls: srclist
				});
			}
		},
	}
</script>

<style scoped>

</style>
