<template>
	<view class="container u-flex u-flex-column u-flex-items-center">
		<view class="bg_banner">
			<!-- <image src="/static/img/guide_bg.png" mode="aspectFill"></image> -->
		</view>

		<view class="row_bg u-flex u-flex-between">
			<image src="/static/img/guide_row1.png" mode="aspectFill"></image>
			<image src="/static/img/guide_row2.png" mode="aspectFill"></image>
		</view>

		<view class="mobilebox ">
			<u--form :model="formContent" :rules="rules" ref="uForm">
				<u-form-item label="" prop="phone">
					<u--input v-model="formContent.phone" placeholderClass="placeholderClass" placeholder="请输入手机号" prefixIcon="phone" type="number"
						prefixIconStyle="font-size: 44rpx;color: #909399">
					</u--input>
				</u-form-item>
			</u--form>

			<view class="btn">
				<u-button type="primary" :plain="true" class="custom-style" @click="clickSubmit" :hairline="true"
					text="立即拿额度">
				</u-button>
			</view>

			<view class="notice u-flex  u-flex-items-center">
				<view :class="[!selectRadio ? 'icon-this-option' : 'icon-has-checked']" @click="checkboxChange"></view>
				<text class="read_tip">注册即表明您已经同意<text class="blue"
						@click="jumpContent('register')">{{` 《注册协议》 `}}</text>和<text class="blue"
						@click="jumpContent('hide')">{{` 《隐私协议》 `}}</text></text>
			</view>


		</view>
		<view class="remark u-flex u-flex-column u-row-center u-flex-center u-flex-items-center">
			<text>
				具体放款金额及放款时间视个人情况而定
			</text>
			<text>
				投资有风险，借贷需谨慎
			</text>
			<text>
				资金来源于合规持牌机构
			</text>
			<navigator url='/pages/webview/webview?urlPath=https://beian.miit.gov.cn/#/Integrated/index'>
				<text @click="jumpCompany">
					{{`沪ICP 备2021036878号-1`}}
				</text>
			</navigator>

		</view>

	</view>
</template>

<script>
	import {
		register,
		addDrainage
	} from "@/config/api/user.js"
	export default {
		data() {
			return {
				selectRadio: false,
				channel_code: '',
				formContent: {
					phone: ''
				},
				rules: {

					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					]
				}
			}
		},
		onLoad() {
			// this.loadmore()
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			let curParam = routes[routes.length - 1].options; //获取路由参数

			let keys = Object.keys(curParam); //获取对象的key 返回对象key的数组
			if (keys.length >= 1) {
				if (curParam.source) {
					this.channel_code = curParam.source
					addDrainage({
							source: curParam.source
						}).then((res) => {
							if (res.code === 100000) {
								// 这里此提示会被this.start()方法中的提示覆盖
								console.log('引流', res)
							}

						})
						.catch((err) => {
							uni.showToast({
								icon: "none",
								title: err.msg || "请稍后再试",
							});
						});
				}
			}
		},

		methods: {
			checkboxChange() {
				this.selectRadio = !this.selectRadio
			},
			clickSubmit() {
				this.selectRadio = true;
				if (this.selectRadio) {
					uni.$u.debounce(this.submit, 500)
					return;
				}
				uni.$u.toast('请您阅读协议并勾选同意')
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					register({
							"phone": this.formContent.phone,
							"channel_code": this.channel_code
						})
						.then((res) => {
							if (res.code === 100000) {
								// 这里此提示会被this.start()方法中的提示覆盖
								uni.$u.toast('注册成功');
								this.selectRadio = '';
								this.formContent.phone = '';
								uni.navigateTo({
									url: `/pages/webview/webview?urlPath=${encodeURIComponent(`https://api.shcwwl.cn/apk/xiaogoupuhui.apk?v=${new Date().getTime()}`)}`
								});
							}


						})
						.catch((err) => {
							uni.showToast({
								icon: "none",
								title: err.msg || "请稍后再试",
							});
						});
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('手机号码不正确')
				})


			},
			jumpContent(val) {
				if (val === 'register') {
					uni.$u.route('/subpages/registerAgreem/registerAgreem')
					return;
				}

				if (val === 'hide') {
					uni.$u.route('/subpages/appPrivacyAgreement/appPrivacyAgreement')
					return;
				}
			},
			jumpCompany() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		box-sizing: border-box;

		.bg_banner {
			width: 100%;
			height: 440rpx;
			background: url(../../static/img/guide_bg.png) no-repeat;
			background-size: cover;
			position: relative;
			// image
		}

		.row_bg {
			margin: 48rpx 32rpx;
			align-self: normal;

			image {
				width: 334rpx;
				height: 134rpx;
			}

		}

		.mobilebox {
			margin: 32rpx 52rpx;

			.btn {
				margin-top: 56rpx;
				width: 646rpx;
				height: 88rpx;

				.custom-style {
					background: #4579E6;
					border-radius: 8rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 44rpx;
				}
			}

			.notice {
				margin-top: 40rpx;

				.read_tip {
					margin-left: 20rpx;
					width: 600rpx;
					height: 34rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #414141;
					line-height: 34rpx;

					.blue {
						color: #4579E6;
						cursor: pointer;
					}
				}
			}

		}

		.remark {
			margin: 120rpx 52rpx 20rpx 52rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #414141;
			line-height: 34rpx;
		}
	}

	.icon-has-checked {
		width: 44rpx;
		height: 44rpx;
		background: url(../../static/img/checked.png) no-repeat;
		;
		background-size: cover;
	}

	.icon-this-option {
		width: 44rpx;
		height: 44rpx;
		background: url(../../static/img/noChecked.png) no-repeat;
		background-size: cover;
	}
</style>
