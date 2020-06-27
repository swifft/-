<template>
	<view>
		<view class="box">
			<template v-if="show == 0" :style="{height:phoneHeight + 'px'}">
				<uni-steps :options="[{title: '请假条提交'}, {title: '辅导员审核'}]" :active="index"></uni-steps>
			</template>
		</view>
		<view class="box">
			<template v-if="show == 1" :style="{height:phoneHeight + 'px'}" class="box">
				<uni-steps :options="[{title: '请假条提交'}, {title: '辅导员审核'}, {title: '副书记审核'}]" :active="index"></uni-steps>
			</template>
		</view>
		<view class="box">
			<template v-if="show == 2" :style="{height:phoneHeight + 'px'}" class="box">
				<uni-steps :options="[{title: '请假条提交'}, {title: '辅导员审核'}, {title: '副书记审核'}, {title: '书记审核'}]" :active="index"></uni-steps>
			</template>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				Data: {},
				leaveInfo: [],
				index: 0,
				show: 0
			};
		},
		onLoad(option) {
			this.getData(option.id)
			this.getHeight()
		},
		methods: {
			getData(id) {
				uni.request({
					data: {
						id: id,
					},
					method: 'POST',
					url: 'https://gxnudsl.xyz/api/leave/getByUid',
					success: (res) => {
						if (res.data.status_code == 200) {
							this.Data = res.data.res_info
							console.log(this.Data)
							this.leaveInfo = res.data.res_info.rangetime
							console.log(this.leaveInfo)
							this.condition()
							this.getActive()
						}
					}
				})
			},
			getActive() {
				if (this.Data.pass == "请假条提交") {
					this.index = 0
				} else {
					if (this.Data.pass == "辅导员审核") {
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
</style>
