<template>
	<view>
		<view class="mainbox">
			<view class="title">
				请假条
			</view>
			<view class="content">
				<view>尊敬的{{leaveData.superior_name}}老师</view>
				<view>您好!我是计信学院{{leaveData.leaveInfo[0]}} 级 {{leaveData.leaveInfo[1]}}专业学生，学号{{leaveData.Uid.schoolnumber}}，因 {{leaveData.leaveInfo[2]}} 原因需请假，时间为{{leaveData.rangetime[0]}}
					至 {{leaveData.rangetime[1]}}，去向地址为 {{leaveData.leaveInfo[3]}}</view>
				<view>本人承诺请假期间安全责任自负，恳请批准!</view>
				<view>联系方式: {{leaveData.leaveInfo[4]}}</view>
				<view>请假人：{{leaveData.Uid.name}} </view>
				<view>{{leaveData.leaveInfo[5]}}</view>
			</view>
		</view>
		<view class="btn" v-if="leaveData.pass == '请假条提交'">
			<button type="primary" size="mini" @click="pass">通过</button>
			<button type="warn" size="mini" @click="openPopup">不通过</button>
		</view>
		<view class="btn" v-if="leaveData.pass == '辅导员审核'" style="color: #ec7259;">
			已审核  <view style="color: #ec7259;">结果：通过</view>
		</view>
		<view class="btn" v-if="leaveData.pass == '辅导员审核失败'" style="color: #ec7259;">
			已审核  <view style="color: #ec7259;">结果：未通过</view>
		</view>
		<uni-popup ref="failPassInfo">
			<view class="box">
				<view class="title">
					不通过理由
				</view>
				<view class="content">
					<input type="text" placeholder="请输入不通过的理由" confirm-type="done" @confirm="failPass"/>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				id:'',
				leaveData: {},
				failPassInfo:''
			};
		},
		onLoad(option) {
			this.id = option.id
			this.getLeaveData()
		},
		methods: {
			getLeaveData() {
				uni.request({
					data: {
						id: this.id,
					},
					method: 'POST',
					url: 'https://gxnudsl.xyz/api/leave/getById',
					success: (res) => {
						if (res.data.status_code == 200) {
							this.leaveData = res.data.res_info
						}
					}
				})
			},
			pass(){
				const dura = moment(this.leaveData.rangetime[1]).format('x') - moment(this.leaveData.rangetime[0]).format('x')
				const tempTime = moment.duration(dura);
				if(tempTime.days() <=3){
					uni.request({
						data: {
							id: this.id,
							pass:'辅导员审核',
							finish:'完成',
							key:false
						},
						method: 'POST',
						url: 'https://gxnudsl.xyz/api/leave/leaveEdit',
						success: (res) => {
							if (res.data.status_code == 200) {
								this.leaveData = res.data.res_info
								console.log(this.leaveData)
								uni.showToast({
									title:'提交成功',
									icon:'success',
									duration:1000
								})
							}
						}
					})
				}else{
					uni.request({
						data: {
							id: this.id,
							pass:'辅导员审核',
							finish:'未完成',
							key:true
						},
						method: 'POST',
						url: 'https://gxnudsl.xyz/api/leave/leaveEdit',
						success: (res) => {
							if (res.data.status_code == 200) {
								this.leaveData = res.data.res_info
								console.log(this.leaveData)
								uni.showToast({
									title:'提交成功',
									icon:'success',
									duration:1000
								})
							}
						}
					})
				}
			},
			openPopup(){
				this.$refs.failPassInfo.open()
			},
			failPass(e){
				this.failPassInfo = e.detail.value
				console.log(this.failPassInfo)
				this.$refs.failPassInfo.close()
				if(this.failPassInfo.length > 0){
					uni.request({
						data: {
							id: this.id,
							pass:'辅导员审核失败',
							finish:'完成',
							key:false,
							failPassInfo:this.failPassInfo
						},
						method: 'POST',
						url: 'https://gxnudsl.xyz/api/leave/leaveEdit',
						success: (res) => {
							if (res.data.status_code == 200) {
								this.leaveData = res.data.res_info
								console.log(this.leaveData)
								uni.showToast({
									title:'提交成功',
									icon:'success',
									duration:1000
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:'理由不能为空',
						icon:'none',
						duration:1000
					})
				}
				
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
	
	.box{
		background-color: #ffffff;
		border-radius: 14px;
		width: 200px;
		.title{
			text-align: center;
			padding: 10px;
		}
		.content{
			padding: 10px;
			input{
				padding: 5px 0;
			}
		}
	}
</style>
