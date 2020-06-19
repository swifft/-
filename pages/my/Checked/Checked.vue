<template>
	<view :style="{height:phoneHeight + 'px'}">
		<template v-if="info == 0">
			<view class="bg">
				<image src="../../../static/my/DefaultPage_1.jpg"></image>
			</view>
		</template>
		<template v-else>
			<view class="box">
				<view class="title">
					请假条
				</view>
				<uni-list>
					<uni-list-item title="请假条" rightText="05/06 10:00"></uni-list-item>
					<uni-list-item title="请假条" rightText="05/06 10:00"></uni-list-item>
					<uni-list-item title="请假条" rightText="05/06 10:00"></uni-list-item>
					<uni-list-item title="请假条" rightText="05/06 10:00"></uni-list-item>
				</uni-list>
				<view class="title">
					教室申请
				</view>
				<uni-list>
					<uni-list-item title="教室申请" rightText="05/06 10:00"></uni-list-item>
					<uni-list-item title="教室申请" rightText="05/06 10:00"></uni-list-item>
					<uni-list-item title="教室申请" rightText="05/06 10:00"></uni-list-item>
					<uni-list-item title="教室申请" rightText="05/06 10:00"></uni-list-item>
				</uni-list>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneHeight:0,
				info:1
			};
		},
		onReady() {
			this.getHeight()
		},
		methods:{
			getHeight(){
				uni.getSystemInfo({
				    success:  (res) =>{
						this.phoneHeight = res.windowHeight
				    }
				});
			},
		}
	}
</script>

<style lang="less">
.bg{
	height: 100%;
	width: 100%;
	image{
		height: 100%;
		width: 100%;
	}
}
.box{
	width: 80%;
	padding-top: 10px;
	margin: 0 auto;
	.title{
		font-size: 20px;
		font-family: "楷体";
		font-weight: bold;
		margin: 10px 0;
		display: flex;
		justify-content: center;
	}
}
</style>
