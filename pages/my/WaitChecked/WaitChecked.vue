<template>
	<view :style="{height:phoneHeight + 'px'}">
		<template v-if="info == 0">
			<view class="bg">
				<image src="../../../static/my/DefaultPage.jpg"></image>
			</view>
		</template>
		<template v-else>
			<view>
				1
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneHeight:0,
				info:0
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
</style>
