<template>
	<view v-bind:style="{ height: phoneHeight }">
		<view class="bg"><image src="../../static/bg.jpg"></image></view>
		<view class="cover">
			<view class="register" @tap="register">注册</view>
			<view class="title"><view class="title-top">欢迎回来</view></view>
			<view class="form">
				<view class="public">
					<view class="form-title">账号</view>
					<view class="form-input">
						<input type="text" placeholder="请输入昵称/学号/教职工号" placeholder-style="color:rgba(244, 244, 244, 0.4)" @input="getaccount" />
						<view class="success" v-show="isaccountsuccess"><image src="../../static/public/success.png" mode=""></image></view>
						<view class="fail" v-show="isaccountfail"><image src="../../static/public/fail.png" mode=""></image></view>
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
				<view class="forgetword" @tap="forgetPassword">忘记密码？</view>
				<view class="btn-box"><view class="btn" @tap="login">登录</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneHeight: '',
			isaccountsuccess: false,
			isaccountfail: false,
			ispasswordsuccess: false,
			ispasswordfail: false,
			userinfo: {
				account: '',
				password: ''
			}
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
		register() {
			uni.navigateTo({
				url: '../register/register'
			});
		},
		getaccount(e) {
			if (e.detail.value.length >= 2) {
				this.isaccountfail = false;
				this.isaccountsuccess = true;
			} else {
				this.isaccountfail = true;
				this.isaccountsuccess = false;
			}
			this.userinfo.account = e.detail.value;
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
		forgetPassword(){
			uni.showToast({
				title:'如需修改密码，请联系管理员',
				icon:'none',
				duration:1000
			})
		},
		login() {
			if (this.userinfo.password.length > 0 && this.userinfo.account.length > 0) {
				if (this.isaccountfail) {
					uni.showToast({
						title: '账号至少为3个字符',
						duration: 1000,
						icon: 'none'
					});
				}else { 
					if (this.ispasswordfail) {
						uni.showToast({
							title: '密码为3到16个字符',
							duration: 1000,
							icon: 'none'
						});
					}else {
						uni.request({
							data:this.userinfo,
							method:'POST',
							url:'https://gxnudsl.xyz/api/user/login',
							success: (res) => {
								console.log(res)
								if(res.data.status_code == 200){
									uni.setStorage({
										key:'userInfo',
										data:res.data.res_info,
										success: () => {
											uni.showToast({
												title:'登录成功',
												icon:'none',
												duration:1000
											})
											setTimeout(()=>{
												if(res.data.res_info.isattestation == 0){
													uni.showToast({
														title:'系统检测到您还未认证身份，正在为您跳转...',
														icon:'none',
														duration:1000
													})
													setTimeout(()=>{
														uni.redirectTo({
															url:'../my/attestation/attestation'
														})
													},1000)
												}else{
													setTimeout(()=>{
														let page = getCurrentPages()
														let prevPage = page[page.length - 2]
														prevPage.$vm.getData()
														uni.navigateBack({})
													},1000)
												}
											},1000)
										}
									})
								}else{
									uni.showToast({
										title:res.data.msg + '，请重新登陆',
										icon:'none',
										duration:1000
									})
								}
							}
						})
					}
				}
			} else {
				uni.showToast({
					title: '登录信息不能为空，请仔细填写',
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

.register {
	position: absolute;
	right: 32rpx;
	top: 20rpx;
	color: white;
	font-weight: 500;
	font-size: 32rpx;
}

.title {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 400rpx;

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
	padding: 80rpx 100rpx;

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

	.forgetword {
		display: flex;
		justify-content: flex-end;
		margin-top: 10rpx;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.7);
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
