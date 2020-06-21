<template>
	<view>
		<view class="top">
			<view class="bg">
				<image :src="userinfo.avatar" v-if="userinfo.avatar"></image>
				<view class="mask"> 
					<view class="avatar">
						<image :src="userinfo.avatar" v-if="userinfo.avatar"></image>
						<view class="login" @tap="login" v-if="Object.keys(userinfo) == 0">
							登录/注册
						</view>
						<view class="login" v-else>
							{{userinfo.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="setting" :style="{height:phoneHeight + 'px'}">
			<uni-list>
				<uni-list-item title="个人信息" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'person-filled'}" @tap="gouserinfo"></uni-list-item>
				<uni-list-item title="身份认证" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'personadd-filled'}" @tap="goattestation"></uni-list-item>
				<uni-list-item title="关于我们" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'info-filled'}" @tap="goabout"></uni-list-item>
				<uni-list-item title="待审核" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'circle-filled'}" @tap="gowaitchecked"></uni-list-item>
				<uni-list-item title="已审核" showExtraIcon="true" :extra-icon="{color: '#D4237A',size: '22',type: 'checkbox-filled'}" @tap="gochecked"></uni-list-item>
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
		},
		onLoad() {
			uni.startPullDownRefresh();
		},
		mounted() { 
			this.getData()
		},
		onPullDownRefresh() {
			setTimeout(() =>{
				this.getData();
				uni.stopPullDownRefresh();
			}, 1000);	
			setTimeout(() =>{
				uni.showToast({
				    title: '已更新至最新数据啦',
					icon:'none',
				    duration: 2000
				});
			}, 1100);
		},
		methods:{
			getHeight(){
				uni.getSystemInfo({
				    success:  (res) =>{
						this.phoneHeight = res.windowHeight - 230
				    }
				});
			},
			getData(){
				uni.getStorage({
				    key: 'userInfo',
				    success: (res) =>{
				      this.userinfo = res.data
					  console.log(this.userinfo)
				    },
					fail: (err) => {
						this.userinfo = {}
					}
				});
			},
			goabout(){
				uni.navigateTo({
					url:'about/about'
				})
			},
			gouserinfo(){
				if(this.userinfo.isattestation == 2){
					uni.navigateTo({
						url:'userinfo/userinfo'
					})
				}else{
					uni.showToast({
					    title: '身份认证中，限制访问',
						icon:'none',
					    duration: 1000
					});
				}
			},
			login(){
				uni.navigateTo({
					url:'../login/login'
				}) 
			},
			goattestation(){
				//身份认证
				uni.redirectTo({
					url:'attestation/attestation'
				})
			},
			gowaitchecked(){
				if(this.userinfo.isattestation == 2){
					uni.navigateTo({
						url:'WaitChecked/WaitChecked'
					})
				}else{
					uni.showToast({
					    title: '身份认证中，限制访问',
						icon:'none',
					    duration: 1000
					});
				}
			},
			gochecked(){
				if(this.userinfo.isattestation == 2){
					uni.navigateTo({
						url:'Checked/Checked'
					})
				}else{
					uni.showToast({
					    title: '身份认证中，限制访问',
						icon:'none',
					    duration: 1000
					});
				}
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
					padding: 1px;
					border-radius: 50%;
					border: 1px solid #eeeeee;
					background-color: #eeeeee;
					box-shadow: 0 1px 6px 0 #eeeeee;
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
				}
			}	
		}
	}
	
	.setting{
		padding: 15px 0;
		background-color: #eeeeee;
	}
</style>
