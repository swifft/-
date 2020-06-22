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
				userinfo:{},
				avatarPath:'',
				avatarUrl:''
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
				this.avatarPath = res.path
				uni.showLoading({
				    title: '头像正在上传。。。',
				});
				uni.uploadFile({
					url:'https://gxnudsl.xyz/api/user/avatarUpload',
					name: 'file',
					filePath:this.avatarPath,
					success:(res)=>{
						if(res.statusCode == 200){
							this.avatarUrl = JSON.parse(res.data).data.url
							uni.getStorage({
							    key: 'userInfo',
							    success: (res) =>{
							      this.id = res.data._id
								  uni.request({
								  	url:'https://gxnudsl.xyz/api/user/userInfoEdit',
									method:'POST',
									data:{
										'id':res.data._id,
										'avatar':this.avatarUrl
									},
									success: (res) => {
										this.userinfo = res.data.res_info
										uni.setStorage({
											key:'userInfo',
											data:this.userinfo,
											success: () => {
												uni.hideLoading();
												uni.showToast({
												    title: '头像修改成功！',
													icon:'success',
												    duration: 2000
												});
												let page = getCurrentPages()
												let prevPage = page[page.length - 2]
												prevPage.$vm.getData()
											},
										})
									}
								  })
							    }
							});
						}
					}
				})
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
</style>
