<template>
	<view :style="{height:phoneHeight + 'px'}" class="userinfo">
		<view class="list">
			<uni-list>
				<uni-list-item title="头像">
					<template v-slot:right="">
						<avatar
							selWidth="150px" selHeight="150px" @upload="myUpload" avatarSrc="../../static/test.jpg"
							avatarStyle="width: 40px; height: 40px;">
						</avatar>
					</template>
				</uni-list-item>
				<uni-list-item title="姓名" :rightText="userinfo.name" @tap="changeNamepopup"></uni-list-item>
				<uni-list-item title="性别" :rightText="sex" @tap="changeSexpopup"></uni-list-item>
				<uni-list-item title="学号" :rightText="userinfo.schoolnumber" @tap="changeSchoolnumberpopup"></uni-list-item>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<uni-list-item title="学院" :rightText="array[index]"></uni-list-item>
				</picker>
			</uni-list>
		</view>
		<view class="btn">
			<button type="default">提交</button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="bg">
				<view @tap="changeSex(0)">
					男
				</view>
				<view @tap="changeSex(1)">
					女
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="username">
			<view class="bg-1">
				<input type="text" :value="userinfo.name" @input="changename" />
				<button type="default" size="mini" @tap="editname">修改</button>
			</view>
		</uni-popup>
		<uni-popup ref="schoolnumber">
			<view class="bg-1">
				<input type="text" :value="userinfo.schoolnumber" @input="changeschoolnumber"/>
				<button type="default" size="mini" @tap="editschoolnumber">修改</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import avatar from '../../../components/yq-avatar/yq-avatar.vue'
	export default {
		components: {
			avatar
		},
		data() {
			return {
				phoneHeight:0,
				z_name:'',
				z_schoolnumber:null,
				sex:'男',
				array:['文学院 /新闻与传播学院','法学院','教育学部','音乐学院','化学与药学学院','计算机科学与信息工程学院/软件学院','职业技术师范学院','国际文化教育学院'
				,'历史文化与旅游学院','政治与公共管理学院','外国语学院','数学与统计学院','生命科学学院','体育学院','健康管理学院','漓江学院(独立学院)','马克思主义学院'
				,'经济管理学院','美术学院','物理科学与技术学院','环境与资源学院','电子工程学院','设计学院'],
				index: 5,
				userinfo:{
					name:'邓世林',
					schoolnumber:'201712300166'
				}
			};
		},
		onLoad() {
			
			this.getHeight()
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
			myUpload(rsp) {
				console.log(rsp.path)
				this.url = rsp.path; //更新头像方式一
				//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			changeSexpopup(){
				this.$refs.popup.open()
			},
			changeSex(index){
				if(index == 0){
					this.sex = '男',
					this.$refs.popup.close()
				}else{
					this.sex = '女',
					this.$refs.popup.close()
				}
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value, e)
				this.index = e.target.value
			},
			changeNamepopup(){
				this.$refs.username.open()
			},
			changeSchoolnumberpopup(){
				
				this.$refs.schoolnumber.open()
			},
			changename(e){
				this.z_name = e.detail.value
			},
			editname(){
				this.userinfo.name = this.z_name
				this.$refs.username.close()
			},
			changeschoolnumber(e){
				this.z_schoolnumber = e.detail.value
			},
			editschoolnumber(){
				this.userinfo.schoolnumber = this.z_schoolnumber
				this.$refs.schoolnumber.close()
			}
		}
	}
</script>

<style lang="less">
.userinfo{
	background-color: #eeeeee;
	.list{
		
	}
	.btn{
		padding: 30px;
	}
	.bg{
		background-color: #ffffff;
		border-radius: 20px 20px 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		view{
			width: 70%;
			text-align: center;
			padding: 20px 0;
			font-size: 20px;
		}
		view:nth-child(1){
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		}
	}
	.bg-1{
		height: 100px;
		background-color: #ffffff;
		border-radius: 20px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		input{
			padding: 5px 15px;
			border-bottom: 1px solid rgba(145, 190, 255, 0.5);
		}
	}
}
</style>
