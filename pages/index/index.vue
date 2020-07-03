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
					<template v-if="Object.keys(userinfo).length === 0">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png"></image>
							</view>
							<view class="title">
								您还没有登录，请登录
							</view>
							<view class="btn">
								<button type="primary" size="mini" @tap="goLogin">去登陆</button>
							</view>
						</view>
					</template>
					<template v-if="userinfo.isattestation == 0">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png"></image>
							</view>
							<view class="title">
								您还没有认证，请认证
							</view>
							<view class="btn">
								<button type="primary" size="mini" @tap="goAttestation">去认证</button>
							</view>
						</view>
					</template>
					<template v-if="userinfo.isattestation == 1">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png"></image>
							</view>
							<view class="title">
								认证审核中，请稍后再来访问
							</view>
						</view>
					</template>
					<template v-if="userinfo.isattestation == 2">
						<template v-if="userinfo.role == '学生'">
							<template v-if="leaveData == null || leaveData.key == false">
								<view class="one">
									<view class="title">
										请 假 条
									</view>
									<view class="main">
										<view class="top">
											<view>尊敬的</view>
											<view>
												<uni-combox :candidates="teacherName" placeholder="请选择辅导员" v-model="superior_name"></uni-combox>
											</view>
											<view>老师</view>
										</view>
										<view class="center">
											<view class="center_1">
												<view>您好!我是计信学院</view>
												<view>
													<input type="text" v-model="grade"/>
												</view>
												<view>级</view>
												<view>
													<input type="text" v-model="major"/>
												</view>
												<view>专业学生 {{userinfo.name}}</view>
												<view>，学号 {{userinfo.schoolnumber}}</view>
												<view>，因</view>
												<view>
													<input type="text" class="center_2" v-model="reason"/>
												</view>
												<view>原因需请假，时间为</view>
												<view v-if="rangetime.length == 0" style="margin: 0 5px;"><button type="default" size="mini" @tap="chooseDate(1)">选择</button></view>
												<view v-else @tap="chooseDate(1)">{{rangetime[0]}} 至 {{rangetime[1]}}</view>
												<view>，去向地址为</view>
												<view>
													<input type="text" class="center_3" v-model="address"/>
												</view>
												<view class="center_4">本人承诺请假期间安全责任自负，恳请批准!</view>
											</view>
											<view class="center_5">
												<view>
													<view>联系方式: </view>
													<view>
														<input type="text" v-model="phone_number"/>
													</view>
												</view>
											</view>
											<view class="center_6">
												<view>请假人： </view>
												<view>
													{{userinfo.name}}
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
									<button type="default" size="mini" @tap="leave_submit">确认提交</button>
								</view>
							</template>
							<template v-if="leaveData.key == true">
								<view class="leave_success" :style="{'height':swiperheight + 'px'}">
									<view>
										<image src="../../static/index/success.png"></image>
									</view>
									<view>
										请假信息已提交，请在<span style="color: #007AFF;" @tap="goWaitChecked">个人中心</span>查看进度
									</view>
								</view>
							</template>
						</template>
						<template v-if="userinfo.role == '辅导员'">
							<view class="box" v-if="teacherLeaveData.length > 0">
								<uni-list v-for="(item,index) in teacherLeaveData" :key="index">
									<uni-list-item title="请假条" :rightText="item.create_time | time" @tap="lookDetail(item._id,'leave')"></uni-list-item>
								</uni-list>
							</view>
							<view :style="{'height':swiperheight + 'px'}" v-if="teacherLeaveData.length == 0">
								<view style="height: 100%;width: 100%;">
									<image src="../../static/my/DefaultPage_1.jpg" style="height: 100%;width: 100%;"></image>
								</view>
							</view>
						</template>
						<template v-if="userinfo.role == '副书记'">
							<view class="box" v-if="teacherLeaveData.length > 0">
								<uni-list v-for="(item,index) in teacherLeaveData" :key="index">
									<view v-if="item.pass == '辅导员审核' && item.finish == '未完成'">
									<uni-list-item title="请假条" :rightText="item.create_time | time" @tap="lookDetail(item._id,'leave')"></uni-list-item>
									</view>
								</uni-list>
							</view>
							<view :style="{'height':swiperheight + 'px'}" v-if="teacherLeaveData.length == 0">
								<view style="height: 100%;width: 100%;">
									<image src="../../static/my/DefaultPage_1.jpg" style="height: 100%;width: 100%;"></image>
								</view>
							</view>
						</template>
						<template v-if="userinfo.role == '书记'">
							<view class="box" v-if="teacherLeaveData.length > 0">
								<uni-list v-for="(item,index) in teacherLeaveData" :key="index">						
									<uni-list-item title="请假条" :rightText="item.create_time | time" @tap="lookDetail(item._id,'leave')"></uni-list-item>
								</uni-list>
							</view>
						</template>
						<template v-if="userinfo.role == '教务处'">
							<view class="classPublic" :style="{'height':swiperheight + 'px'}">
								<view class="icon">
									<image src="../../static/index/forbid.png"></image>
								</view>
								<view class="text">
									抱歉，您的身份暂不支持此类型服务
								</view>
							</view>
						</template>
					</template>
					<template v-if="userinfo.isattestation == 3">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png"></image>
							</view>
							<view class="title">
								身份认证失败，请重新认证
							</view>
							<view class="btn">
								<button type="primary" size="mini" @tap="goAttestation">去认证</button>
							</view>
						</view>
					</template>
				</swiper-item>
				<swiper-item>
					<template v-if="Object.keys(userinfo).length === 0">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png"></image>
							</view>
							<view class="title">
								您还没有登录，请登录
							</view>
							<view class="btn">
								<button type="primary" size="mini" @tap="goLogin">去登陆</button>
							</view>
						</view>
					</template>
					<template v-if="userinfo.isattestation == 0">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png" mode=""></image>
							</view>
							<view class="title">
								您还没有认证，请认证
							</view>
							<view class="btn">
								<button type="primary" size="mini" @tap="goAttestation">去认证</button>
							</view>
						</view>
					</template>
					<template v-if="userinfo.isattestation == 1">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png" mode=""></image>
							</view>
							<view class="title">
								认证审核中，请稍后再来访问
							</view>
						</view>
					</template>
					<template v-if="userinfo.isattestation == 2">
						<template v-if="userinfo.role == '学生'">
							<template v-if="classInfo == null || classInfo.key == false">
								<view class="classMoudel">
									<view class="classList">
										<view class="title">
											姓名: {{userinfo.name}}
										</view>
									</view>
									<view class="classList">
										<view>
											<view v-if="classDate == ''" style="margin: 0 5px;"><button type="default" size="mini" @tap="chooseDate(3)">请假日期选择</button></view>
											<view v-else @tap="chooseDate(3)">请假日期: {{classDate}}</view>
										</view>
										<mx-date-picker :show="showClassDate" type="date" @confirm="classSelected" @cancel="classSelected" />
									</view>
									<view class="classList">
										<view class="title">
											学号: {{userinfo.schoolnumber}}
										</view>
									</view>
									<view class="classList">
										<view class="title">
											电话:
										</view>
										<view class="input">
											<input type="text" v-model="class_phone"/>
										</view>
									</view>
									<view class="classList">
										<view class="title">
											用途:
										</view>
										<view class="input">
											<input type="text" v-model="purpose"/>
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
										<!-- <view class="lookupBtn" @tap="lookup">
											查询
										</view> -->
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
									<button type="default" size="mini" @tap="class_submit">确认提交</button>
								</view>
							</template>
							<template v-if="classInfo.key == true">
								<view class="leave_success" :style="{'height':swiperheight + 'px'}">
									<view>
										<image src="../../static/index/success.png"></image>
									</view>
									<view>
										请假信息已提交，请在<span style="color: #007AFF;" @tap="goWaitChecked">个人中心</span>查看进度
									</view>
								</view>
							</template>
						</template>
						<template v-if="userinfo.role == '辅导员'">
							<view class="classPublic" :style="{'height':swiperheight + 'px'}">
								<view class="icon">
									<image src="../../static/index/forbid.png"></image>
								</view>
								<view class="text">
									抱歉，您的身份暂不支持此类型服务
								</view>
							</view>
						</template>
						<template v-if="userinfo.role == '副书记'">
							<view class="classPublic" :style="{'height':swiperheight + 'px'}">
								<view class="icon">
									<image src="../../static/index/forbid.png"></image>
								</view>
								<view class="text">
									抱歉，您的身份暂不支持此类型服务
								</view>
							</view>
						</template>
						<template v-if="userinfo.role == '书记'">
							<view class="classPublic" :style="{'height':swiperheight + 'px'}">
								<view class="icon">
									<image src="../../static/index/forbid.png"></image>
								</view>
								<view class="text">
									抱歉，您的身份暂不支持此类型服务
								</view>
							</view>
						</template>
						<template v-if="userinfo.role == '教务处'">
							<view class="box" v-if="classAllData.length > 0">
								<uni-list v-for="(item,index) in classAllData" :key="index">						
									<uni-list-item title="教室申请" :rightText="item.create_time | time" @tap="lookDetail(item._id,'class')"></uni-list-item>
								</uni-list>
							</view>
							<view :style="{'height':swiperheight + 'px'}" v-if="classAllData.length == 0">
								<view style="height: 100%;width: 100%;">
									<image src="../../static/my/DefaultPage_1.jpg" style="height: 100%;width: 100%;"></image>
								</view>
							</view>
						</template>
					</template>
					<template v-if="userinfo.isattestation == 3">
						<view class="topBox" :style="{'height':swiperheight + 'px'}">
							<view class="icon">
								<image src="../../static/index/error.png" mode=""></image>
							</view>
							<view class="title">
								身份认证失败，请重新认证
							</view>
							<view class="btn">
								<button type="primary" size="mini" @tap="goAttestation">去认证</button>
							</view>
						</view>
					</template>
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
		mounted() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getData();
				uni.stopPullDownRefresh();
			}, 500);
			setTimeout(() => {
				uni.showToast({
					title: '已更新至最新数据啦',
					icon: 'none',
					duration: 2000
				});
			}, 1100);
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				show: 0,
				showPicker: false,
				showDate: false,
				showClassDate: false,
				date: '',
				classDate:'',
				rangetime: [],
				radio: false,
				candidates: ['理科楼'],
				classposition: '',
				candidates_1: ['一节', '二节', '三节', '四节', '五节', '上午加下午', '上午加晚上', '下午加晚上', '一天'],
				classtime: '',
				classData: ['理1-202', '理1-201', '理1-302', '理1-401', '理1-207', '理1-405'],
				isclassResult: false,
				userinfo: {},
				superior_name:'',
				grade:'',
				major:'',
				reason:'',
				phone_number:'',
				address:'',
				leaveData:{},
				teacherLeaveData:[],
				class_phone:'',
				classInfo:{},
				purpose:'',
				classAllData:[],
				teacherName:[]
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
			getData() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						if (res.data == null) {
							this.userinfo = {};
						} else {
							this.userinfo = res.data;
							uni.request({
								data: {
									'id': this.userinfo._id
								},
								method: 'POST',
								url: 'https://gxnudsl.xyz/api/user/getUserInfoById',
								success: (res) => {
									if (res.data.status_code == 200) {
										this.userinfo = res.data.res_info;
										uni.setStorage({
											key: 'userInfo',
											data: this.userinfo
										})
										console.log(this.userinfo)
										this.getLeaveData()
										this.getTeacherLeave()
										this.getClassData()
										this.getAllClassDate()
										this.teacherName = []  
										this.getTeacherName()
									} else {
										this.userinfo = {}
									}
								}
							})
						}
					},
					fail: (err) => {
						this.userinfo = {};
					}
				});
			},
			getTeacherName(){
				uni.request({
					url:'https://gxnudsl.xyz/api/user/getTeacher',
					success: (res) => {
						if (res.data.status_code == 200) {
							res.data.res_info.forEach((item)=>{
								this.teacherName.push(item.name)
							})
							console.log(this.teacherName)
						}
					}
				})
			},
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
					case 3:
						this.showClassDate = true;
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
			classSelected(e) {
				this.showClassDate = false;
				if (e) {
					this.classDate = e.value
				}
			},
			isRadioCheked() {
				this.radio = !this.radio
				console.log(this.radio)
			},
			lookup() {
				this.isclassResult = true
			},
			goLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			goAttestation() {
				uni.navigateTo({
					url: '../my/attestation/attestation'
				})
			},
			leave_submit(){
				const array = [];
				let k = 0;
				array.push(this.superior_name,this.grade,this.major,this.reason,this.address,this.phone_number,this.date)
				array.forEach((item)=>{
					if(Object.keys(item).length == 0){
						k++;
					}
				})
				if(k == 0){
					uni.request({
						data:{
							id:this.userinfo._id,
							leaveInfo:array,
							superior_name:this.superior_name,
							rangetime:this.rangetime,
							pass:'请假条提交'
						},
						method:'POST',
						url:'https://gxnudsl.xyz/api/leave/accept',
						success: (res) => {
							console.log(res)
							if(res.data.status_code == 200){
								uni.showToast({
								    title: '请假信息已提交',
									icon:'none',
								    duration: 1000
								});
								setTimeout(()=>{
									uni.startPullDownRefresh()
								},1000)
							}
						}
					})
				}else{
					uni.showToast({
						title:'请完善信息',
						icon:'none'
					});
				}
			},
			getLeaveData(){
				uni.request({
					data:{
						id:this.userinfo._id,
					},
					method:'POST',
					url:'https://gxnudsl.xyz/api/leave/getByUid',
					success: (res) => {
						if(res.data.status_code == 200){
							this.leaveData = res.data.res_info
							// console.log(this.leaveData)
						}
					}
				})
			},
			getTeacherLeave(){
				uni.request({
					data:{
						superior_name:this.userinfo.name,
					},
					method:'POST',
					url:'https://gxnudsl.xyz/api/leave/getBySuperior_name',
					success: (res) => {
						if(res.data.status_code == 200){
							this.teacherLeaveData = res.data.res_info
							// console.log(this.teacherLeaveData)
						}
					}
				})
			},
			getAllClassDate(){
				uni.request({
					url:'https://gxnudsl.xyz/api/class/getAll',
					success: (res) => {
						if(res.data.status_code == 200){
							this.classAllData = res.data.res_info
							console.log(this.classAllData)
						}
					}
				})
			},
			goWaitChecked(){
				uni.navigateTo({
					url:'../my/WaitChecked/WaitChecked'
				})
			},
			lookDetail(id,type){
				uni.navigateTo({
					url:'viewDetail/viewDetail?id='+id + '&type=' + type
				})
			},
			class_submit(){
				const array = [];
				let k = 0;
				array.push(this.userinfo.name,this.classDate,this.userinfo.schoolnumber,this.class_phone,this.classposition,this.classtime);
				array.forEach((item)=>{
					if(Object.keys(item).length == 0){
						k++;
					}
				})
				if(k == 0){
					uni.request({
						data:{
							id:this.userinfo._id,
							classInfo:array,
							purpose:this.purpose,
							isMedia:this.radio
						},
						method:'POST',
						url:'https://gxnudsl.xyz/api/class/accept',
						success: (res) => {
							console.log(res)
							if(res.data.status_code == 200){
								uni.showToast({
								    title: '教室信息已提交',
									icon:'none',
								    duration: 1000
								});
								setTimeout(()=>{
									uni.startPullDownRefresh()
								},1000)
							}
						}
					})
				}else{
					uni.showToast({
						title:'请完善信息',
						icon:'none'
					});
				}
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
			}
		}
	}
</script>

<style lang="less">
	.swiper-tab-list {
		width: 250rpx;
		margin: 0 70rpx;
	}

	.uni-combox__selector {
		z-index: 999 !important;
	}

	.topBox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.icon {
			width: 50px;
			height: 50px;
			padding: 10px 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			padding-top: 20px;
		}

		.btn {
			padding-top: 30px;
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
				align-items: center;
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

	.footer {
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}

	.leave_success{
		display: flex;
		flex-direction: column;
		justify-content: center; 
		align-items: center;
		view:nth-child(1){
			width: 100px;
			height: 100px;
			margin-bottom: 20px;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}

	.classMoudel {
		background-color: #ffffff;

		.classList {
			padding-top: 30rpx;
			display: flex;
			justify-content: center;

			.title {
				padding-right: 30rpx;
			}

			.input {
				input {
					padding: 5rpx 10rpx;
					border: 1px dashed rgba(0, 0, 0, 0.6);
				}
			}

			.radio {
				radio {
					padding-left: 100rpx;
				}
			}
		}

		.lookup {
			display: flex;
			justify-content: center;
			align-items: center;

			.chooseClass {
				width: 55%;

				.chooseClass-1 {
					padding: 5px 0;

					text:nth-child(1) {
						color: black;
					}
				}

				.chooseClass-2 {
					padding: 5px 0;

					text:nth-child(1) {
						color: black;
					}
				}
			}

			.lookupBtn {
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

			.lookupBtn:active {
				background-color: #EEEEEE;
			}
		}

		.classResult {
			height: 200px;
			margin: 10px 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			.classResult_0 {
				font-size: 16px;
				color: rgb(245, 108, 108);
			}

			.classResult-1 {
				width: 60%;
				margin: 0 auto;
				border: 1px solid #eeeeee;
				border-radius: 5px;
				max-height: 160px;
				box-sizing: border-box;

				view {
					margin: 5px 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #eeeeee;
				}

				view:last-child {
					border-bottom: none;
				}
			}
		}
	}
	
	.classPublic{
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		.icon{
			width: 100px;
			height: 100px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			font-weight: 500;
			font-family: "楷体";
			font-size: 18px;
		}
	}
</style>
