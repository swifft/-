<template>
	<view>
		<view class="container" :style="{height:phoneHeight + 'px'}">
			<view class="top">
				<view class="logo">
					<image src="../../../static/test.jpg" mode=""></image>
				</view>
				<view class="desc">
					本应用由实训开发第五组团队开发
				</view>
				<view class="version">
					Version 1.0.0
				</view>
			</view>
			<view class="copyright">
				<view>本开发团队 版权所有</view>
				<view>Copyright@2020</view>
				<view>All Rights Reserved</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneHeight:0
			};
		},
		onLoad() {
			this.getHeight()
		},
		methods:{
			getHeight(){
				uni.getSystemInfo({
				    success:  (res) =>{
						// #ifdef APP-PLUS
							this.phoneHeight = res.windowHeight - 75
						// #endif
						// #ifndef APP-PLUS
							this.phoneHeight = res.windowHeight
						// #endif
				    }
				});
			},
		}
	}
</script>

<style lang="less">
.container{
	background-color: #eeeeee;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.top{
		padding-top: 100px;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items:center;
		.logo{
			width: 50px;
			height: 50px;
			border-radius: 10px;
			image{
				height: 100%;
				width: 100%;
				border-radius: 10px;
			}
		}
		.desc{
			font-size: 18px;
			font-weight: 400;
		}
		.version{
			font-size: 14px;
			font-weight: 400;
		}
	}
	.copyright{
		height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
	}
}
</style>
