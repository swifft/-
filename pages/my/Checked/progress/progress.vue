<template>
	<view>
		<template v-if="type == 'leave'">
			<template v-if="show == 0" >
				<view class="box">
					<uni-steps :options="[{title: '请假条提交'}, {title: '辅导员审核'}]" :active="index"></uni-steps>
				</view>
				<view v-if="Data.pass == '辅导员审核'" class="tips">
					<view>
						<image src="../../../../static/my/smile.png"></image>
					</view>
					<view>
						恭喜你，请假条审核已通过
					</view>
				</view>
				<view v-if="Data.pass == '辅导员审核失败'" class="tips">
					<view>
						<image src="../../../../static/my/failface.png"></image>
					</view>
					<view>
						很遗憾，请假条未能通过审核，请重新提交吧
					</view>
					<view class="text">
						tips: {{Data.failPassInfo}}
					</view>
				</view>
			</template>
			<template v-if="show == 1" >
				<view class="box">
					<uni-steps :options="[{title: '请假条提交'}, {title: '辅导员审核'}, {title: '副书记审核'}]" :active="index"></uni-steps>
				</view>
				<view v-if="Data.pass == '辅导员审核失败'" class="tips">
					<view>
						<image src="../../../../static/my/failface.png"></image>
					</view>
					<view>
						很遗憾，请假条未能通过审核
					</view>
					<view class="text">
						tips: {{Data.failPassInfo}}
					</view>
				</view>
				<view v-if="Data.pass == '副书记审核'" class="tips">
					<view>
						<image src="../../../../static/my/smile.png"></image>
					</view>
					<view>
						恭喜你，请假条审核已通过
					</view>
				</view>
				<view v-if="Data.pass == '副书记审核失败'" class="tips">
					<view>
						<image src="../../../../static/my/failface.png"></image>
					</view>
					<view>
						很遗憾，请假条未能通过审核，请重新提交吧
					</view>
					<view class="text">
						tips: {{Data.failPassInfo}}
					</view>
				</view>
			</template>
			<template v-if="show == 2" >
				<view class="box">
					<uni-steps :options="[{title: '请假条提交'}, {title: '辅导员审核'}, {title: '副书记审核'}, {title: '书记审核'}]" :active="index"></uni-steps>
				</view>
				<view v-if="Data.pass == '辅导员审核失败'" class="tips">
					<view>
						<image src="../../../../static/my/failface.png"></image>
					</view>
					<view>
						很遗憾，请假条未能通过审核
					</view>
					<view class="text">
						tips: {{Data.failPassInfo}}
					</view>
				</view>
				<view v-if="Data.pass == '副书记审核失败'" class="tips">
					<view>
						<image src="../../../../static/my/failface.png"></image>
					</view>
					<view>
						很遗憾，请假条未能通过审核，请重新提交吧
					</view>
					<view class="text">
						tips: {{Data.failPassInfo}}
					</view>
				</view>
				<view v-if="Data.pass == '书记审核'" class="tips">
					<view>
						<image src="../../../../static/my/smile.png"></image>
					</view>
					<view>
						恭喜你，请假条审核已通过
					</view>
				</view>
				<view v-if="Data.pass == '书记审核失败'" class="tips">
					<view>
						<image src="../../../../static/my/failface.png"></image>
					</view>
					<view>
						很遗憾，请假条未能通过审核，请重新提交吧
					</view>
					<view class="text">
						tips: {{Data.failPassInfo}}
					</view>
				</view>
			</template>
		</template>
		<template v-if="type == 'class'">
			<view v-if="classInfo.pass == '教务处审核'" class="tips" style="margin-top: 150px;">
				<view>
					<image src="../../../../static/my/smile.png"></image>
				</view>
				<view>
					恭喜你，教室审核已通过
				</view>
			</view>
			<view v-if="classInfo.pass == '教务处审核失败'" class="tips" style="margin-top: 150px;">
				<view>
					<image src="../../../../static/my/failface.png"></image>
				</view>
				<view>
					很遗憾，教室未能通过审核，请重新提交吧
				</view>
				<view class="text">
					tips: {{classInfo.failPassInfo}}
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				Data: {},
				leaveInfo: [],
				classInfo:{},
				index: 0,
				show: 0,
				type:'',
				id:''
			};
		},
		onLoad(option) {
			this.type = option.type
			this.id = option.id
			this.getData()
			this.getHeight()
		},
		methods: {
			getData() {
				uni.request({
					data: {
						id: this.id,
					},
					method: 'POST',
					url: 'https://gxnudsl.xyz/api/leave/getByUid',
					success: (res) => {
						if (res.data.status_code == 200) {
							this.Data = res.data.res_info
							console.log(this.Data)
							this.leaveInfo = res.data.res_info.rangetime
							this.condition()
							this.getActive()
							this.getClassData()
						}
					}
				})
			},
			getClassData(){
				uni.request({
					data:{
						id:this.id,
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
			getActive() {
				if (this.Data.pass == "请假条提交") {
					this.index = 0
				} else {
					if (this.Data.pass == "辅导员审核" || this.Data.pass == "辅导员审核失败") {
						this.index = 1
					} else {
						if (this.Data.pass == "副书记审核") {
							this.index = 2
						} else {
							if (this.Data.pass == "书记审核") {
								this.index = 3
							}
						}
					}
				}
			},
			condition() {
				const dura = moment(this.leaveInfo[1]).format('x') - moment(this.leaveInfo[0]).format('x')
				const tempTime = moment.duration(dura);
				console.log(tempTime.days())
				if (tempTime.days() <= 3) {
					this.show = 0
				} else {
					if (tempTime.days() < 7) {
						this.show = 1
					} else {
						this.show = 2
					}
				}
			},
			getHeight() {
				uni.getSystemInfo({
					success: (res) => {
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
	.box {
		margin-top: 200px;
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
		.text{
			padding-top: 30px;
			color:#fe6c6f;
		}
	}
</style>
