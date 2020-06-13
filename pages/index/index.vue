<template>
	<view class="index">
		<view class="uni-tab-bar">
			<scroll-view class="uni-swiper-tab" scroll-x>
				<view class="swiper-tab-list" :class="{'active':tabIndex==0}" @tap="tabtap(0)">请假</view>
				<view class="swiper-tab-list" :class="{'active':tabIndex==1}" @tap="tabtap(1)">教室</view>
				<view class="swiper-tab-list" :class="{'active':tabIndex==2}" @tap="tabtap(2)">活动</view>
			</scroll-view>
		</view>
		<view class="uni-tab-bar">
			<swiper class="swiper-box" style="background: #f2f2f2;" :style="{'height':swiperheight + 'px'}" :current="tabIndex"
			 @change="tabChange">
				<swiper-item>
					<template v-if="show == 1">
						<view class="one">
							<view class="title">
								请 假 条
							</view>
							<view class="main">
								<view class="top">
									<view>尊敬的</view>
									<view>
										<input type="text" />
									</view>
									<view>老师</view>
								</view>
								<view class="center">
									<view class="center_1">
										<view>您好!我是计信学院</view>
										<view>
											<input type="text" />
										</view>
										<view>级</view>
										<view>
											<input type="text" />
										</view>
										<view>专业学生</view>
										<view>
											<input type="text" />
										</view>
										<view>，学号为</view>
										<view>
											<input type="text" />
										</view>
										<view>，因</view>
										<view>
											<input type="text" class="center_2" />
										</view>
										<view>原因需请假，时间为</view>
										<view v-if="rangetime.length == 0" style="margin: 0 5px;"><button type="default" size="mini" @tap="chooseDate(1)">选择</button></view>
										<view v-else @tap="chooseDate(1)">{{rangetime[0]}} 至 {{rangetime[1]}}</view>
										<view>，去向地址为</view>
										<view>
											<input type="text" class="center_3" />
										</view>
										<view class="center_4">本人承诺请假期间安全责任自负，恳请批准!</view>
									</view>
									<view class="center_5">
										<view>
											<view>本人联系方式: </view>
											<view>
												<input type="text" />
											</view>
										</view>
										<view>
											<view>去向联系方式: </view>
											<view>
												<input type="text" />
											</view>
										</view>
									</view>
									<view class="center_6">
										<view>请假人: </view>
										<view>
											<input type="text" />
										</view>
									</view>
									<view class="center_7">
										<view v-if="date == ''" style="margin: 0 5px;"><button type="default" size="mini" @tap="chooseDate(2)">请假日期选择</button></view>
										<view v-else @tap="chooseDate(2)">{{date}}</view>
									</view>
									<mx-date-picker :show="showPicker" type="rangetime" :begin-text="'离校'" :end-text="'返校'" @confirm="onSelected"
									 @cancel="onSelected" />
									<mx-date-picker :show="showDate" type="date" @confirm="dateSelected" @cancel="dateSelected" />
								</view>
							</view>
							
						</view>
						
						<view class="footer">
							<button type="default" size="mini">确认提交</button>
						</view>
					</template>
					<template v-if="show == 2">
						老师端
					</template>
					<template v-if="show == 3">
						辅导员端
					</template>
					<template v-if="show == 4">
						教务处端
					</template>
				</swiper-item>
				<swiper-item>
					
				</swiper-item>
				<swiper-item>你好</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				show: 1,
				showPicker: false,
				showDate: false,
				date: '',
				rangetime: [],
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			});
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			chooseDate(index) { //显示
				switch (index) {
					case 1:
						this.showPicker = true;
						break;
					case 2:
						this.showDate = true;
						break;
					default:
						break;
				}
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this.rangetime = e.value
				}
			},
			dateSelected(e) {
				this.showDate = false;
				if (e) {
					this.date = e.value
				}
			}
		}
	}
</script>

<style lang="less">
	.swiper-tab-list {
		width: 100rpx;
		margin: 0 70rpx;
	}

	.one {
		padding: 10px;
		background-color: #ffffff;

		.title {
			height: 50px;
			text-align: center;
			line-height: 50px;
			font-weight: bold;
			font-size: 20px;
			font-family: '楷体';
		}

		.main {
			.top {
				display: flex;
				font-size: 18px;
				margin: 5px 0;

				input {
					width: 100px;
					padding: 0 5px;
					border-bottom: 1px solid black;
				}
			}

			.center {
				font-size: 18px;
				margin: 5px 0;

				.center_1 {
					display: flex;
					flex-wrap: wrap;

					input {
						width: 80px;
						padding: 0 5px;
						border-bottom: 1px solid black;
					}

					view:nth-child(1) {
						text-indent: 2em;
					}

					.center_2 {
						width: 200px;
						padding: 0 5px;
						border-bottom: 1px solid black;
					}

					.center_3 {
						width: 200px;
						padding: 0 5px;
						border-bottom: 1px solid black;
					}

					.center_4 {
						font-weight: bolder;
					}
				}

				.center_5 {
					padding: 10px;

					input {
						margin-left: 10px;
						width: 80px;
						padding: 0 5px;
						border-bottom: 1px solid black;
					}

					view:nth-child(1) {
						margin: 5px 0;
						display: flex;
					}

					view:nth-child(2) {
						margin: 5px 0;
						display: flex;
					}
				}

				.center_6 {
					display: flex;
					justify-content: flex-end;
					padding: 10px;

					input {
						margin-left: 10px;
						width: 80px;
						padding: 0 5px;
						border-bottom: 1px solid black;
					}
				}

				.center_7 {
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
	
	.footer{
		margin-top: 30px;
		display: flex;
		justify-content: center;
	}
</style>
