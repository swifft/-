<template>
	<view :style="{height:phoneHeight + 'px'}" class="userinfo">
		<view class="list">
			<uni-list>
				<uni-list-item title="头像">
					<template v-slot:right="">
						<avatar 
							selWidth="200px" selHeight="200px" @upload="myUpload" :avatarSrc="userinfo.avatar"
							avatarStyle="width: 40px;height: 40px; border-radius: 100%;">
						</avatar>
					</template>
				</uni-list-item>
				<uni-list-item title="姓名" :showArrow="false" :rightText="userinfo.name"></uni-list-item>
				<uni-list-item title="性别" :showArrow="false" :rightText="userinfo.sex"></uni-list-item>
				<uni-list-item title="学号" :showArrow="false" :rightText="userinfo.schoolnumber"></uni-list-item>
				<uni-list-item title="学院" :showArrow="false" :rightText="userinfo.college"></uni-list-item>
				<uni-list-item title="身份认证" :showArrow="false" v-if="userinfo.isattestation == 0" rightText="未认证"></uni-list-item>
				<uni-list-item title="身份认证" :showArrow="false" v-else rightText="已认证"></uni-list-item> 
				<uni-list-item title="当前身份" :showArrow="false" :rightText="userinfo.role"></uni-list-item>
			</uni-list>
		</view>
		<view class="btn">
			<button type="warn" @tap="exit">退出登录</button>
		</view>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				phoneHeight:0,
				userinfo:{}
			};
		},
		onLoad() {
			this.getHeight()
		},
		mounted() {
			this.getData()
		},
		methods:{
			getHeight(){
				uni.getSystemInfo({
				    success:  (res) =>{
						// #ifdef APP-PLUS
							this.phoneHeight = res.windowHeight - 75
						// #endif
						// #ifndef APP-PLUS
							this.phoneHeight = res.windowHeight
						// #endif	
				    }
				});
			},
			getData(){
				uni.getStorage({
				    key: 'userInfo',
				    success: (res) =>{
				      this.userinfo = res.data
					  console.log(res)
				    },
					fail: (err) => {
						this.userinfo = []
					}
				});
			},
			myUpload(res) {
				this.userinfo.avatar = res.path;
				this.userinfo['avatar'] = res.path;
				uni.setStorage({
					key:'userInfo',
					data:this.userinfo,
					success: () => {
						uni.showToast({
							title:'头像修改成功！',
							icon:'none',
							duration:1000
						})
						let page = getCurrentPages()
						let prevPage = page[page.length - 2]
						prevPage.$vm.getData()
					},
				})
			},
			exit(){
				uni.clearStorage();
				uni.showToast({
					title:"正在为您退出...",
					icon:'none',
					duration:1000
				})
				setTimeout(()=>{
					let page = getCurrentPages()
					let prevPage = page[page.length - 2]
					prevPage.$vm.getData()
					uni.navigateBack({
					})
				},1000)
			}
		}
	}
</script>

<style lang="less">
.userinfo{
	background-color: #eeeeee;
	.list{
		
	}
}
.btn{
	margin-top: 100px;
	button{
		width: 60%;
		margin: 0 auto; 
	}
}
</style>
