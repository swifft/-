<template>
	<view :style="{height:phoneHeight + 'px'}">
		<template v-if="Object.keys(leaveData).length === 0">
			<view class="bg">
				<image src="../../../static/my/DefaultPage.jpg"></image>
			</view>
		</template>
		<template v-else>
			<view class="box">
				<view class="title">
					请假条
				</view>
				<uni-list v-if="leaveData.finish == '未完成'">
					<uni-list-item title="请假条" :rightText="leaveData.create_time | time" @tap="goProgress"></uni-list-item>
				</uni-list>
				<view v-if="leaveData.finish == '完成'" class="tips">
					<view>
						<image src="../../../static/my/nothing.png"></image>
					</view>
					<view>
						暂时没有待审核的请假条，去已审核看看吧
					</view>
				</view>
				<view class="title">
					教室申请
				</view>
				<uni-list>
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
				userinfo:{},
				leaveData:{}
			};
		},
		onLoad() {
			this.getLeaveData()
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
			getLeaveData(){
				uni.showLoading({
					title:'加载中。。。',
					mask:true
				});
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						if (res.data == null) {
							this.userinfo = {};
						} else {
							this.userinfo = res.data;
							uni.request({
								data:{
									id:this.userinfo._id,
								},
								method:'POST',
								url:'https://gxnudsl.xyz/api/leave/getByUid',
								success: (res) => {
									if(res.data.status_code == 200){
										this.leaveData = res.data.res_info
										console.log(this.leaveData)
										uni.hideLoading();
									}
								}
							})
						}
					},
				})
			},
			goProgress(){
				console.log(this.userinfo._id)
				uni.navigateTo({
					url:'progress/progress?id='+this.userinfo._id
				})
			}
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
	.tips{
		height: 150px;
		margin: 30px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		view:nth-child(1){
			width: 50px;
			height: 50px;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
