<template>
	<view v-bind:style="{ height: phoneHeight }">
		<view class="bg"><image src="../../static/bg.jpg"></image></view>
		<view class="cover">
			<view class="register" @tap="register">注册</view>
			<view class="title"><view class="title-top">欢迎回来</view></view>
			<view class="form">
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
				<view class="forgetword">忘记密码？</view>
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
			isemailsuccess: false,
			isemailfail: false,
			ispasswordsuccess: false,
			ispasswordfail: false,
			userinfo: {
				email: '',
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
		login() {
			if (this.userinfo.password.length > 0 && this.userinfo.email.length > 0) {
				if (this.isemailfail) {
					uni.showToast({
						title: '邮箱格式不正确',
						duration: 1000,
						icon: 'none'
					});
					if (this.ispasswordfail) {
						uni.showToast({
							title: '密码为3到16个字符',
							duration: 1000,
							icon: 'none'
						});
					}
				} else {
					console.log(this.userinfo);
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
