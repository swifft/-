<template>
	<view class="index">
		<view class="uni-tab-bar">
			<scroll-view class="uni-swiper-tab" scroll-x>
				<view class="swiper-tab-list" :class="{'active':tabIndex==0}" @tap="tabtap(0)">请假</view>
				<view class="swiper-tab-list" :class="{'active':tabIndex==1}" @tap="tabtap(1)">教室</view>
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
					<view class="classMoudel">
						<view class="classList">
							<view class="title">
								性别:
							</view>
							<view class="input">
								<input type="text"/>
							</view>
						</view>
						<view class="classList">
							<view class="title">
								学号:
							</view>
							<view class="input">
								<input type="text"/>
							</view>
						</view>
						<view class="classList">
							<view class="title">
								电话:
							</view>
							<view class="input">
								<input type="text"/>
							</view>
						</view>
						<view class="classList">
							<view class="title">
								用途:
							</view>
							<view class="input">
								<input type="text"/>
							</view>
						</view>
						<view class="classList">
							<view class="title">
								是否使用多媒体:
							</view>
							<view class="radio">
								<radio :checked="radio" @tap="isRadioCheked" />
							</view>
						</view>
						<view class="lookup">
							<view class="chooseClass">
								<view class="chooseClass-1">
									<uni-combox label="教室:" :candidates="candidates" placeholder="请选择教室区域" v-model="classposition"></uni-combox>
								</view>
								<view class="chooseClass-2">
									<uni-combox label="节数:" :candidates="candidates_1" placeholder="请选择使用时间" v-model="classtime"></uni-combox>
								</view>
							</view>
							<view class="lookupBtn" @tap="lookup">
								查询
							</view>
						</view>
						<view class="classResult" v-if="isclassResult == true">
							<view class="classResult_0">
								为你查询到以下结果：
							</view>
							<scroll-view scroll-y="true" class="classResult-1"> 
								<view v-for="(item, index) in classData" :key="index"><text>{{item}}</text></view>
							</scroll-view>
						</view>
					</view>
					<view class="footer">
						<button type="default" size="mini">确认提交</button>
					</view>
				</swiper-item>
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
				radio:false,
				candidates:['理科楼'],
				classposition:'',
				candidates_1:['一节','二节','三节','四节','五节','上午加下午','上午加晚上','下午加晚上','一天'],
				classtime:'',
				classData:['理1-202','理1-201','理1-302','理1-401','理1-207','理1-405',],
				isclassResult:false
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
			},
			isRadioCheked(){
				this.radio = !this.radio
				console.log(this.radio)
			},
			lookup(){
				this.isclassResult = true
			}
		}
	}
</script>

<style lang="less">
	.swiper-tab-list {
		width: 250rpx;
		margin: 0 70rpx;
	}
	
	.uni-combox__selector{
		z-index: 999!important;
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
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
	
	.classMoudel{
		background-color: #ffffff;
		.classList{
			padding-top: 30rpx;
			display: flex;
			justify-content: center;
			.title{
				padding-right: 30rpx;
			}
			.input{
				input{
					padding:  5rpx 10rpx;
					border: 1px dashed rgba(0, 0, 0, 0.6);
				}
			}
			.radio{
				radio{
					padding-left: 100rpx;
				}
			}
		}
		.lookup{
			display: flex;
			justify-content: center;
			align-items: center;
			.chooseClass{
				width: 55%;
				.chooseClass-1{			
					padding: 5px 0;
					text:nth-child(1){
						color: black;
					}
				}
				.chooseClass-2{
					padding: 5px 0;
					text:nth-child(1){
						color: black;
					}
				}
			}
			.lookupBtn{
				height: 70px;
				width: 40px;
				line-height: 70px;
				margin-left: 10px;
				font-size: 16px;
				text-align: center;
				color: rgb(22, 75, 129);
				border-radius: 15px;
				background-color: rgba(238, 238, 238, 0.1);
				border: 1px solid #eeeeee;
				box-shadow: 0 0 3px 3px rgba(238, 238, 238, 0.6);
			}
			.lookupBtn:active{
				background-color: #EEEEEE;
			}
		}
		
		.classResult{
			height: 200px;
			margin: 10px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			.classResult_0{
				font-size: 16px;
				color: rgb(245, 108, 108);
			}
			.classResult-1{
				width: 60%;
				margin: 0 auto;
				border: 1px solid #eeeeee;
				border-radius: 5px;
				max-height: 160px;
				box-sizing: border-box;
				view{
					margin: 5px 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #eeeeee;
				}
				view:last-child{
					border-bottom: none;
				}
			}
		}
	}
</style>
