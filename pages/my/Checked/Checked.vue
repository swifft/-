<template>
	<view :style="{height:phoneHeight + 'px'}">
		<template v-if="Object.keys(leaveData).length === 0">
			<view class="bg">
				<image src="../../../static/my/DefaultPage_1.jpg"></image>
			</view>
		</template>
		<template v-else>
			<view class="box">
				<view class="title">
					请假条
				</view>
				<uni-list v-if="leaveData.finish == '完成'">
					<uni-list-item title="请假条" :rightText="leaveData.create_time | time" @tap="goProgress('leave')"></uni-list-item>
				</uni-list>
				<view v-if="leaveData.finish == '未完成'" class="tips">
					<view>
						<image src="../../../static/my/nothing.png"></image>
					</view>
					<view>
						暂时没有已审核的请假条，去待审核看看吧
					</view>
				</view>
				<view class="title">
					教室申请
				</view>
				<uni-list v-if="classInfo.finish == '完成'">
					<uni-list-item title="教室申请" :rightText="classInfo.create_time | time" @tap="goProgress('class')"></uni-list-item>
				</uni-list>
				<view v-if="classInfo.finish == '未完成'" class="tips">
					<view>
						<image src="../../../static/my/nothing.png"></image>
					</view>
					<view>
						暂时没有已审核的教室，去待审核看看吧
					</view>
				</view>
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
				leaveData:{},
				classInfo:{}
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
										this.getClassData()
									}
								}
							})
						}
					},
				})
			},
			getClassData(){
				uni.request({
					data:{
						id:this.userinfo._id,
					},
					method:'POST',
					url:'https://gxnudsl.xyz/api/class/getByUid',
					success: (res) => {
						if(res.data.status_code == 200){
							this.classInfo = res.data.res_info
							console.log(this.classInfo)
						}
					}
				})
			},
			goProgress(e){
				console.log(this.userinfo._id) 
				uni.navigateTo({
					url:'progress/progress?id='+this.userinfo._id + '&type=' + e
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
