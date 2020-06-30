<template>
	<view>
		<view class="mainbox">
			<view class="title">
				请假条
			</view>
			<view class="content">
				<view>尊敬的{{detailData.leaveInfo[0]}}老师</view>
				<view>您好!我是计信学院{{detailData.leaveInfo[1]}} 级 {{detailData.leaveInfo[2]}}专业学生，学号{{detailData.Uid.schoolnumber}}，因 {{detailData.leaveInfo[3]}} 原因需请假，时间为{{detailData.rangetime[0]}}
					至 {{detailData.rangetime[1]}}，去向地址为 {{detailData.leaveInfo[4]}}</view>
				<view>本人承诺请假期间安全责任自负，恳请批准!</view>
				<view>联系方式: {{detailData.leaveInfo[5]}}</view>
				<view>请假人：{{detailData.Uid.name}} </view>
				<view>{{detailData.leaveInfo[6]}}</view>
			</view>
		</view>
		<view class="btn" style="color: #ec7259;">
			已审核  <view style="color: #ec7259;">结果：通过</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:{}
			};
		},
		onLoad(option) {
			this.getData(option.id)
		},
		methods:{
			getData(id){
				uni.request({
					data:{
						id:id
					},
					method:'POST',
					url:'https://gxnudsl.xyz/api/leaveKeep/getById',
					success: (res) => {
						this.detailData = res.data.res_info
					}
				})
			}
		}
	}
</script>

<style lang="less">
.mainbox{
		margin: 20px 16px;
		border: 1px solid #ebeef5;
		background-color: #fff;
		border-radius: 4px;
		color: #303133;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		.title{
			text-align: center;
			font-size: 20px;
			font-family: "楷体";
			font-weight: bold;
			margin: 10px 0;
		}
		.content{
			padding: 10px;
			view:nth-child(2){
				text-indent: 2em;
			}
			view:nth-child(3){
				text-indent: 2em;
			}
			view:nth-child(4){
				display: flex;
				justify-content: flex-end;
			}
			view:nth-child(5){
				display: flex;
				justify-content: flex-end;
			}
			view:nth-child(6){
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	
	.btn{
		margin: 20rpx;
		display: flex;
		justify-content: space-around;
	}
</style>
