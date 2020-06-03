<template>
	<view :style="{height:phoneHeight + 'px'}" class="userinfo">
		<view class="list">
			<uni-list>
				<uni-list-item title="头像" :showArrow="false">
					<template v-slot:right="">
						<image style="width: 40px;height: 40px;" src="../../../static/test.jpg" mode="widthFix"></image>
					</template>
				</uni-list-item>
				<uni-list-item title="姓名" :showArrow="false" rightText="邓世林"></uni-list-item>
				<uni-list-item title="性别" :showArrow="false" rightText="男"></uni-list-item>
				<uni-list-item title="学号" :showArrow="false" rightText="201712300166"></uni-list-item>
				<uni-list-item title="学院" :showArrow="false" rightText="计算机科学与信息工程学院/软件学院"></uni-list-item>
			</uni-list>
		</view>
		<view class="btn">
			<button type="warn" @tap="exit">退出登录</button>
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
			exit(){
				uni.clearStorage();
				uni.showToast({
					title:"正在为您退出...",
					icon:'none',
					duration:1000
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'../my'
					})
				},1000)
			}
		}
	}
</script>

<style lang="less">
.userinfo{
	background-color: #eeeeee;
	.list{
		
	}
}
.btn{
	margin-top: 100px;
	button{
		width: 60%;
		margin: 0 auto; 
	}
}
</style>
