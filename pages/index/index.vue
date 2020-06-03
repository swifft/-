<template>
	<view class="index">
		<view class="uni-tab-bar">
			<scroll-view class="uni-swiper-tab" scroll-x>
				<view class="swiper-tab-list" :class="{'active':tabIndex==0}" @tap="tabtap(0)">请假</view>
				<view class="swiper-tab-list" :class="{'active':tabIndex==1}" @tap="tabtap(1)">教室</view>
				<view class="swiper-tab-list" :class="{'active':tabIndex==2}" @tap="tabtap(2)">活动</view>
			</scroll-view>
		</view>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" style="background: #f2f2f2;" :style="{'height':swiperheight + 'px'}" :current="tabIndex"
			 @change="tabChange">
			<swiper-item>你好</swiper-item>
			<swiper-item>你好</swiper-item>
			<swiper-item>你好</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			});
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
		}
	}
</script>

<style lang="less">
	.swiper-tab-list {
		width: 100rpx;
		margin: 0 70rpx;
	}
</style>
