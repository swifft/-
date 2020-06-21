<template>
	<view :style="{height:phoneHeight + 'px'}" class="box">
		<view class="form-box">
			<view class="name">
				<input type="text" placeholder="姓名" v-model="form.name" @input="name_check"/>
				<view class="check-success" v-show="name_check_success">
					<image src="../../../static/my/success.png"></image>
				</view>
				<view class="check-fail" v-show="name_check_fail">
					<image src="../../../static/my/fail.png"></image>
				</view>
			</view>
			<view class="schoolnumber">
				<input type="text" placeholder="教职工号/学号" v-model="form.schoolnumber" @input="schoolnumber_check"/>
				<view class="check-success" v-show="schoolnumber_check_success">
					<image src="../../../static/my/success.png"></image>
				</view>
				<view class="check-fail" v-show="schoolnumber_check_fail">
					<image src="../../../static/my/fail.png"></image>
				</view>
			</view>
			<view class="upload">
				<view class="title">
					上传证件照
				</view>
				<view class="main">
					<view class="bg">
						<image :src="previewImg"></image>
						<view class="delete" v-show="ishidden" @tap="close">
							<image src="../../../static/my/delete.png"></image>
						</view>
						<view class="icon" @tap="upload" v-show="isshow">
							<image src="../../../static/my/add.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @tap="submit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneHeight:0,
				previewImg:'../../../static/my/previewImg.png',
				isshow:true,
				ishidden:false,
				form:{
					name:'',
					schoolnumber:''
				},
				name_check_success:null,
				name_check_fail:null,
				schoolnumber_check_success:null,
				schoolnumber_check_fail:null
			};
		},
		onReady() {
			this.getHeight()
		},
		methods:{
			getHeight(){
				uni.getSystemInfo({
				    success:(res)=> {
				        this.phoneHeight = res.windowHeight;
				    }
				});
			},
			upload(){
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera '], //从相册选择
				    success:(res) =>{
				        this.previewImg = res.tempFilePaths
						this.isshow = false
						this.ishidden = true
				    }
				});
			},
			close(){
				this.previewImg = '../../../static/my/previewImg.png'
				this.isshow = true
				this.ishidden = false
			},
			submit(){
				console.log(this.form,this.previewImg)
			},
			name_check(e){
				const str = new RegExp(/^[\u4E00-\u9FA5]{2,6}$/)
				if(str.test(e.detail.value)){
					this.name_check_success = true
					this.name_check_fail = false
				}else{
					this.name_check_success = false
					this.name_check_fail = true
				}
			},
			schoolnumber_check(e){
				const str = new RegExp(/^\d{6,12}$/)
				if(str.test(e.detail.value)){
					this.schoolnumber_check_success = true
					this.schoolnumber_check_fail = false
				}else{
					this.schoolnumber_check_success = false
					this.schoolnumber_check_fail = true
				}
			}
		}
	}
</script>

<style lang="less">
.box{
	background-color: #eeeeee;
}
.form-box{
	background-color: #ffffff;
	padding: 10px 30px;
	.name{
		position: relative;
		.check-success{
			position: absolute;
			right: 20px;
			top: 10px;
			width: 20px;
			height: 20px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.check-fail{
			position: absolute;
			right: 20px;
			top: 10px;
			width: 20px;
			height: 20px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		input{
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			padding: 10px;
			font-size: 18px;
			margin: 15px 0;
		}
	}
	.schoolnumber{
		position: relative;
		.check-success{
			position: absolute;
			right: 20px;
			top: 10px;
			width: 20px;
			height: 20px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.check-fail{
			position: absolute;
			right: 20px;
			top: 10px;
			width: 20px;
			height: 20px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		input{
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			padding: 10px;
			font-size: 18px;
			margin: 15px 0;
		}
	}
	.upload{
		padding: 20px 0;
		.title{
			font-size: 16px;
			font-weight: 500;
			font-family: Arial, Helvetica, sans-serif;
			padding: 5px;
		}
		.main{
			width: 100px;
			height: 100px;
			margin: 10px 0;
			.bg{
				width: 100%;
				height: 100%;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.delete{
					position: absolute;
					right: 0px;
					top: 0px;
					width: 20px;
					height: 20px;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.icon{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					width: 20px;
					height: 20px;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
.btn{
	width: 80%;
	height: 50px;
	margin: 20px auto;
	text-align: center;
	border-radius: 20px;
	background-color: #ffffff;
	line-height: 50px;
	box-shadow: 0 5px 10px 5px #cccccc;
	font-size: 18px;
}
</style>
