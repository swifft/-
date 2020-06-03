<template>
	<view>
		<scroll-view scroll-y class="list">
			<view class="list-box" v-for="(item, index) in listData" :key="index">
				<view class="list-box-title">
					<view class="left">
						<view class="avatar"><image :src="item.avatar" mode=""></image></view>
					</view>
					<view class="right">
						<view class="name">{{ item.name }}</view>
						<view class="time">{{ item.time }}</view>
					</view>
				</view>
				<view class="list-box-content">{{ item.content }}</view>
				<view class="list-box-more">阅读全文</view>
				<view class="list-box-footer">
					<image :src="item.star" @tap="star_click(index)"></image>
					<image src="../../static/community/share.png"></image>
					<image src="../../static/community/edit.png"></image>
					<image :src="item.zan" @tap="zan_click(index)"></image>
				</view>
			</view>
			<view style="padding: 0 0 40rpx 0;">
				<uni-load-more :status="status" color="#3F85ED"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			triggered: false,
			status:'more',
			listData: [
				{
					avatar: '../../static/notice/3.jpg',
					name: '某某某',
					time: '2020年1月18日 上午11:00',
					content: '太感谢这个平台了，今天幸好有童趣阅读平台的志愿者，我们家孩子',
					star: '../../static/community/star.png',
					zan: '../../static/community/zan.png'
				},
				{
					avatar: '../../static/notice/2.jpg',
					name: '官方',
					time: '2020年4月18日 上午11:00',
					content: '太感谢这个平台了，今天幸好有童趣阅读平台的志愿者，我们家孩子',
					star: '../../static/community/star.png',
					zan: '../../static/community/zan.png'
				},
				{
					avatar: '../../static/notice/1.jpg',
					name: '程序员',
					time: '2020年4月26日 晚上11:00',
					content:
						'太感谢这个平台了，今天幸好有童趣阅读平台的志愿者，我们家孩子学到挺多知识。太感谢这个平台了，今天幸好有童趣阅读平台的志愿者，我们家孩子学到挺多知识测温枪成为服务器而服务',
					star: '../../static/community/star.png',
					zan: '../../static/community/zan.png'
				}
			]
		};
	},
	onLoad() {
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		setTimeout(() =>{
			uni.stopPullDownRefresh();
		}, 1000);	
		setTimeout(() =>{
			uni.showToast({
			    title: '已更新至最新数据啦',
				icon:'none',
			    duration: 2000
			});
		}, 1100);
	},
	onReachBottom(){
		setTimeout(()=>{
			this.status = 'loading'
		}, 500)
		let str = {
					avatar: '../../static/notice/1.jpg',
					name: '程序员',
					time: '2020年4月26日 晚上11:00',
					content:
						'太感谢这个平台了，今天幸好有童趣阅读平台的志愿者，我们家孩子学到挺多知识。太感谢这个平台了，今天幸好有童趣阅读平台的志愿者，我们家孩子学到挺多知识测温枪成为服务器而服务',
					star: '../../static/community/star.png',
					zan: '../../static/community/zan.png'
				}
		setTimeout(()=>{
			this.msg = "加载中..."
			this.listData.push(str)
		}, 1500)
		
	},
	methods: {
		
	}
};
</script>

<style lang="less">
.list-box {
	width: 80%;
	height: 500rpx;
	margin: 40rpx auto;
	background: #ffffff;
	padding: 20rpx 50rpx;
	border-radius: 40rpx;
	box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);

	.list-box-title {
		width: 100%;
		height: 120rpx;
		display: flex;

		.left {
			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;

			.name {
				font-size: 36rpx;
				font-family: 'Microsoft YaHei';
			}

			.time {
				color: rgba(0, 0, 0, 0.4);
			}
		}
	}

	.list-box-content {
		height: 180rpx;
		margin-top: 20rpx;
		text-indent: 2em;
		font-size: 32rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.list-box-more {
		margin-top: 10rpx;
		display: flex;
		justify-content: flex-end;
		font-size: 34rpx;
		color: #9ec0ea;
		cursor: pointer;
	}

	.list-box-footer {
		width: 100%;
		height: 60rpx;
		margin-top: 60rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
}
</style>
