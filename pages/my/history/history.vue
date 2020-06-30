<template>
	<view>
		<view class="container">
			<uni-list v-for="(item, index) in Data" :key="index">
				<uni-list-item title="请假条" :rightText="item.create_time | time" @tap="goDetail(item._id)"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data:[]
			};
		},
		onLoad() {
			this.getData()
		},
		methods:{
			getData(){
				uni.request({
					url:'https://gxnudsl.xyz/api/leaveKeep/get',
					success: (res) => {
						this.Data = res.data.res_info
					}
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'historyDetail/historyDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="less">

</style>
