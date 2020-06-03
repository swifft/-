<template>
	<view>
		<view class="top">
			<view class="bg">
				<image :src="userinfo.avatar" mode="aspectFit" v-if="userinfo.avatar"></image>
				<image src="http://gxnudsl.xyz/images/default.png" mode="aspectFit" v-else></image>
				<view class="mask"> 
					<view class="avatar">
						<image :src="userinfo.avatar" mode="aspectFit" v-if="userinfo.avatar"></image>
						<image src="http://gxnudsl.xyz/images/default.png" mode="aspectFit" v-else></image>
						<view class="login" :class="{'isshow':isshow,'ishidden':!isshow}" @tap="login">
							登录/注册
						</view>
					</view>
					<view class="edit" @tap="edit">
						<image src="../../static/my/edit.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="setting" :style="{height:phoneHeight + 'px'}">
			<uni-list>
				<uni-list-item title="个人信息" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'person'}" @tap="gouserinfo"></uni-list-item>
				<uni-list-item title="关于我们" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'info'}" @tap="goabout"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				userinfo:{},
				phoneHeight:0,
				isshow:null
			};
		},
		onReady() {
			this.getHeight() 
			this.isshowlogin() 
		},
		onLoad() { 
			this.getData()
		},
		onShow() {
			this.rload()
		},
		methods:{
			getHeight(){
				uni.getSystemInfo({
				    success:  (res) =>{
						this.phoneHeight = res.windowHeight - 250
				    }
				});
			},
			getData(){
				uni.getStorage({
				    key: 'userInfo',
				    success: (res) =>{
				      this.userinfo = res.data
				    }
				});
			},
			rload(){
			},
			isshowlogin(){
				console.log(this.userinfo)
				if(JSON.stringify(this.userinfo) == "{}"){
					this.isshow = false
				}else{
					this.isshow = true 
				}
			}, 
			goabout(){
				uni.navigateTo({
					url:'about/about'
				})
			},
			gouserinfo(){
				if(JSON.stringify(this.userinfo) != "{}"){
					uni.navigateTo({
						url:'userinfo/userinfo'
					})
				}else{
					uni.showToast({
					    title: '您还没有登录,请先登录',
						icon:'none',
					    duration: 2000
					});
				}
			},
			edit(){
				if(JSON.stringify(this.userinfo) != "{}"){
					uni.navigateTo({
						url:'edit/edit'
					})
				}else{
					uni.showToast({
					    title: '您还没有登录,请先登录',
						icon:'none',
					    duration: 2000
					});
				}
			},
			login(){
				uni.redirectTo({
					url:'../login/login'
				}) 
			}
		}
	}
</script>

<style lang="less">
	.isshow{
		display: none;
	}
	.ishidden{
		display: block;
	}
	.top{
		height: 200px;
		.bg{
			width: 100%;
			height: 100%;
			position: relative;
			image{
				height: 100%;
				width: 100%;
			}
			.mask{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(0, 0, 0, 0.4);
				.avatar{
					height: 100px;
					width: 100px;
					position: absolute;
					top: 50px;
					left: 0;
					right: 0;
					margin: auto;
					padding: 5px;
					border-radius: 50%;
					border: 1px solid #eeeeee;
					background-color: #eeeeee;
					box-shadow: 0px 10px 10px -3px #eeeeee;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					.login{
						height: 20px;
						position: absolute;
						top: 40px;
						left: 0;
						right: 0;
						margin: 0 auto;
						font-size: 20px;
						font-weight: 500;
						font-family: Arial, Helvetica, sans-serif;
						color: rgb(58, 136, 253) ;
						text-align: center;
					}
				}
				.edit{
					height: 20px;
					width: 20px;
					position: absolute;
					top: 10px;
					right: 10px;
					padding: 5px;
					image{
						width: 100%;
						height: 100%;
						
					}
				}
			}	
		}
	}
	
	.setting{
		padding: 15px 0;
		background-color: #eeeeee;
	}
</style>
