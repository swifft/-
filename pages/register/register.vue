<template>
	<view v-bind:style="{ height: phoneHeight }">
		<view class="bg"><image src="../../static/bg.jpg"></image></view>
		<view class="cover">
			<view class="title"><view class="title-top">创建账户</view></view>
			<view class="form">
				<view class="public">
					<view class="form-title">用户名</view>
					<view class="form-input">
						<input type="text" placeholder="请输入用户名" placeholder-style="color:rgba(244, 244, 244, 0.4)" @input="getname" />
						<view class="success" v-show="isnamesuccess"><image src="../../static/public/success.png" mode=""></image></view>
						<view class="fail" v-show="isnamefail"><image src="../../static/public/fail.png" mode=""></image></view>
					</view>
				</view>
				<view class="public">
					<view class="form-title">邮箱</view>
					<view class="form-input">
						<input type="text" placeholder="请输入邮箱" placeholder-style="color:rgba(244, 244, 244, 0.4)" @input="getemail" />
						<view class="success" v-show="isemailsuccess"><image src="../../static/public/success.png" mode=""></image></view>
						<view class="fail" v-show="isemailfail"><image src="../../static/public/fail.png" mode=""></image></view>
					</view>
				</view>
				<view class="public">
					<view class="form-title">密码</view>
					<view class="form-input">
						<input type="password" placeholder="请输入密码" placeholder-style="color:rgba(244, 244, 244, 0.4)" @input="getpassword" />
						<view class="success" v-show="ispasswordsuccess"><image src="../../static/public/success.png" mode=""></image></view>
						<view class="fail" v-show="ispasswordfail"><image src="../../static/public/fail.png" mode=""></image></view>
					</view>
				</view>
				<view class="role">
					<view class="role-1">
						请选择你的身份：
					</view>
					<picker mode="selector" :range="roleType" @change="selectRole">
						<view class="role-2">{{roleType[roleIndex]}}</view>
					</picker>
				</view>
				<view class="radio">
					<radio :checked="radio" style="transform:scale(0.5)" @tap="ischeked" />
					<view class="radio-text" @tap="clause">我同意已阅读条款</view>
					<uni-popup ref="popup" style="color: white;">
						<view class="popup_title">用户条款</view>
						<view class="popup_main" @tap="popupclose">
							<p>
								1、根据必备条款的约定，甲方有权审查乙方注册所提供的身份信息是否真实、有效，并应积极地采取技术与管理等合理措施保障用户账号的安全、有效；乙方有义务妥
								善保管其账号及密码，并正确、安全地使用其账号及密码。任何一方未尽上述义务导致账号密码遗失、账号被盗等情形而给乙方和他人的民事权利造成损害的，应
								当承担由此产生的法律责任。
							</p>
							<p>2、乙方对登录后所持账号产生的行为依法享有权利和承担责任。</p>
							<p>3、乙方发现其账号或密码被他人非法使用或有使用异常的情况的，应及时根据甲方公布的处理方式通知甲方，并有权通知甲方采取措施暂停该账号的登录和使用。</p>
							<p>4、甲方根据乙方的通知采取措施暂停乙方账号的登录和使用的，甲方应当要求乙方提供并核实与其注册身份信息相一致的个人有效身份信息。</p>
							<p>5、甲方核实乙方所提供的个人有效身份信息与所注册的身份信息相一致的，应当及时采取措施暂停乙方账号的登录和使用。</p>
							<p>7、乙方没有提供其个人有效身份证件或者乙方提供的个人有效身份证件与所注册的身份信息不一致的，甲方有权拒绝乙方上述请求。</p>
							<p>
								8、乙方为了维护其合法权益，向甲方提供与所注册的身份信息相一致的个人有效身份信息时，甲方应当为乙方提供账号注册人证明、原始注册信息等必要的协助和支持
								，并根据需要向有关行政机关和司法机关提供相关证据信息资料。
							</p>
						</view>
					</uni-popup>
				</view>
				<view class="btn-box"><view class="btn" @tap="register">注册</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneHeight: '700px',
			radio: false,
			isemailsuccess: false,
			isemailfail: false,
			ispasswordsuccess: false,
			ispasswordfail: false,
			isnamesuccess: false,
			isnamefail: false,
			userinfo: {
				name: '',
				email: '',
				password: ''
			},
			roleType:['学生','老师','辅导员','教务处'],
			roleIndex:0
		};
	},
	methods: {
		onReady() {
			uni.getSystemInfo({
				success: res => {
					// #ifdef APP-PLUS
					this.phoneHeight = res.windowHeight - 75 + 'px';
					// #endif
					// #ifndef APP-PLUS
					this.phoneHeight = res.windowHeight + 'px';
					// #endif
				}
			});
		},
		// 条款
		clause() {
			this.$refs.popup.open();
		},
		ischeked(){
			this.radio = !this.radio
		},
		popupclose() {
			this.$refs.popup.close();
		},
		getemail(e) {
			const str = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
			if (str.test(e.detail.value)) {
				this.isemailfail = false;
				this.isemailsuccess = true;
			} else {
				this.isemailfail = true;
				this.isemailsuccess = false;
			}
			this.userinfo.email = e.detail.value;
		},
		getpassword(e) {
			if (e.detail.value.length >= 3 && e.detail.value.length <= 16) {
				this.ispasswordfail = false;
				this.ispasswordsuccess = true;
			} else {
				this.ispasswordfail = true;
				this.ispasswordsuccess = false;
			}
			this.userinfo.password = e.detail.value;
		},
		getname(e) {
			if (e.detail.value.length >= 3 && e.detail.value.length <= 8) {
				this.isnamefail = false;
				this.isnamesuccess = true;
			} else {
				this.isnamefail = true;
				this.isnamesuccess = false;
			}
			this.userinfo.name = e.detail.value;
		},
		// 身份选择
		selectRole(e){
			this.roleIndex = e.detail.value
		},
		register() {
			if (this.userinfo.name.length > 0 && this.userinfo.password.length > 0 && this.userinfo.email.length > 0) {
				if (this.isemailfail) {
					uni.showToast({
						title: '邮箱格式不正确',
						duration: 1000,
						icon: 'none'
					});
				} else {
					if (this.ispasswordfail) {
						uni.showToast({
							title: '密码为3到16个字符',
							duration: 1000,
							icon: 'none'
						});
					} else {
						if (this.isnamefail) {
							uni.showToast({
								title: '用户名为3到8个字符',
								duration: 1000,
								icon: 'none'
							});
						} else {
							if (!this.radio) {
								uni.showToast({
									title: '请勾选用户协议',
									duration: 1000,
									icon: 'none'
								});
							} else {
								this.userinfo['role'] = this.roleType[this.roleIndex],
								uni.request({
									data:this.userinfo,
									method:'POST',
									url:'https://gxnudsl.xyz/api/user/register',
									success: (res) => {
										uni.setStorage({
											key:'userInfo',
											data:res.data.res_info,
											success: () => {
												uni.showToast({
													title:'注册成功,正在为您跳转...',
													icon:'none',
													duration:1000
												})
												setTimeout(()=>{
													let page = getCurrentPages()
													let prevPage = page[page.length - 3]
													prevPage.$vm.getData()
													uni.navigateBack({
														delta: 2
													})
												},1000)
											}
										})
									}
								})
							}
						}
					}
				}
			} else {
				uni.showToast({
					title: '表单不能为空，请仔细填写',
					duration: 1000,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	image {
		height: 100%;
		width: 100%;
	}
}

.cover {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: rgba(39, 40, 50, 0.6);
	background-size: cover;
}

.title {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 300rpx;

	.title-top {
		height: 80rpx;
		font-size: 56rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		color: rgba(244, 244, 244, 1);
		font-weight: 500;
		line-height: 80rpx;
	}
}

.form {
	padding: 50rpx 100rpx;

	.public {
		margin-top: 30rpx;

		.form-title {
			font-size: 36rpx;
			color: rgba(244, 244, 244, 0.8);
		}

		.form-input {
			margin-top: 20rpx;
			position: relative;
			input {
				padding: 2px 35px 2px 6px;
				color: rgba(244, 244, 244, 1);
				border-bottom: 1px solid rgba(244, 244, 244, 0.9);
			}
			.success {
				width: 30px;
				height: 30px;
				position: absolute;
				right: 0;
				top: 0;
				image {
					height: 100%;
					width: 100%;
				}
			}
			.fail {
				width: 30px;
				height: 30px;
				position: absolute;
				right: 0;
				top: 0;
				image {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
	
	.role{
		margin-top: 30rpx;
		display: flex;
		.role-1{
			color: rgba(255, 255, 255, 0.8);
		}
		.role-2{
			color: rgba(244, 244, 244, 0.8);
		}
	}

	.radio {
		margin-top: 30rpx;
		display: flex;
		align-items: center;

		.radio-text {
			font-size: 24rpx;
			color: rgba(87, 153, 255, 0.8);
		}

		.popup_title {
			text-align: center;
			font-size: 48rpx;
		}

		.popup_main {
			padding: 0 15px;
		}
	}

	.btn-box {
		height: 70rpx;
		border-radius: 18rpx;
		margin: 60rpx 0;
		background-color: rgba(87, 153, 255, 1);

		.btn {
			height: 100%;
			line-height: 60rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
	}
}
</style>
