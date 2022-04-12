<template>
	<view>
		<common-dialog v-if="showDialog" :showCancel="false" title="登录"
			content="使用本平台软件及服务之前，请仔细阅读《注册协议》，《隐私政策》，同意请点击确定。" v-on:on-click-dialog="onClickDialog"></common-dialog>
		<navigator open-type="navigateBack" class="close">
			<image src="/static/icons/cancel.png" mode="aspectFill"></image>
		</navigator>
		<view class="top"></view>
		<view class="logo">
			<image src="/static/icons/logo.png" mode="aspectFill"></image>
		</view>
		<view class="form">
			<view class="row">
				<view class="icon">
					<image src="/static/icons/phone_icon.png" mode="aspectFill"></image>
				</view>
				<view class="input"><input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号"
						placeholder-class="myholder" /></view>
			</view>
			<view class="row">
				<view class="icon">
					<image src="/static/icons/verify_code.png" mode="aspectFill"></image>
				</view>
				<view class="input"><input type="number" maxlength="6" v-model="code" placeholder="请输入验证码"
						placeholder-class="myholder" /></view>
				<view class="code" v-if="iscode" @click.stop="sendCode">{{
          codename
        }}</view>
				<view class="code" v-else>{{ codename }}</view>
			</view>
		</view>
		<button class="submit" @click.stop="submiting">登录</button>
		<view class="login_read">
			<view class="icon" @click.stop="doAgree">
				<image :src="
            isAgree
              ? '/static/icons/select.png'
              : '/static/icons/no_select_icon.png'
          " mode="aspectFill"></image>
			</view>
			<view class="read">登录即表示您已同意<navigator open-type="navigate" url="/pages/my/agreement/agreement?type=5">
					《注册协议》</navigator>和<navigator open-type="navigate" url="/pages/my/agreement/agreement?type=6">《隐私协议》
				</navigator>
			</view>
		</view>
		<view class="bottom">
			<view class="icon">
				<image src="/static/icons/safe_pay_icon.png" mode="aspectFill"></image>
			</view>
			<view class="text">让您的每一个权益都有保障</view>
		</view>
	</view>
</template>

<script>
	import {
		login,
		sendSMS
	} from "@/config/api/user.js";
	import {
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				phone: "17701140105",
				code: "1234",
				isAgree: false,
				wait: 60,
				codename: "获取验证码",
				iscode: true,
				showDialog: false,
			};
		},
		methods: {
			...mapMutations(['SETDEVICE', 'LOGIN', 'SET_TOKEN']),
			submiting() {

				console.log(uni.$u.os(), '平台', uni.$u.sys())
				// return;
				if (!this.phone || this.phone.length != 11) {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号",
					});
					return;
				}
				if (!this.code) {
					uni.showToast({
						icon: "none",
						title: "请输入验证码",
					});
					return;
				}
				if (!this.isAgree) {
					this.showDialog = true;
					return;
				}
				uni.showLoading({
					title: "加载中",
				});
				let loginHeaderObj = {
					osType: uni.$u.os(),
					deviceId: uni.$u.sys().deviceId,

				}
				this.SETDEVICE(loginHeaderObj)
				login({
						phone: this.phone,
						code: this.code,
					}, {
						header: {
							'device-type': uni.$u.os() || '',
							'device-token': uni.$u.sys().deviceId || ''
						}
					})
					.then((res) => {
						uni.hideLoading();
						if (res.code === 100000) {
							console.log('陈工了', res);

							let handleBaseInfo = {
								token: res.data.access_token,
								userInfo: res.data
							}
							this.LOGIN(handleBaseInfo)
							this.SET_TOKEN({
								token: res.data.access_token,
								refresh_token: res.data.refresh_token
							})
							// userInfo: {
							// 		...res.data
							// 	}
							uni.switchTab({
								url: '/pages/index/index'
							})

						}
						//   return this.$request.getShowBorrowButton();

					})
					.catch((err) => {
						console.log('res哈哈哈哈是比啊了', err);

						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: err.msg || "登录失败，请稍后重试",
						});
					});
				// 发出post，假设需要带上token
				//   login({
				//     custom: {
				//       auth: true,
				//     },
				//   })
				//     .then(() => {})
				//     .catch(() => {});
			},
			onClickDialog(event) {
				if (event == "confirm") {
					this.isAgree = true;
				}
				this.showDialog = false;
			},
			doAgree() {
				this.isAgree = !this.isAgree;
			},
			countTime() {
				if (this.wait == 0) {
					// 让可点击的显示
					this.iscode = true;
					this.wait = 60;
					this.codename = "获取验证码";
				} else {
					this.codename = this.wait + "s后获取";
					this.wait--;
					var that = this;
					setTimeout(function() {
						that.countTime();
					}, 1000);
				}
			},
			sendCode() {
				if (!this.phone || this.phone.length != 11) {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号",
					});
					return;
				}
				uni.showLoading();

				sendSMS({
						"phone": this.phone
					})
					.then((res) => {
						if (res.code === 100000) {
							console.log('陈工了', res);

							uni.hideLoading();
							this.countTime();
							this.iscode = true;
							this.code = "";
							uni.showToast({
								title: "验证码发送成功",
							});
						}

					})
					.catch((err) => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: err.data || "获取验证码失败，请稍后再试",
						});
						this.iscode = true;
					});
			},
		},
	};
</script>

<style lang="scss">
	.close {
		position: absolute;
		left: 45upx;
		top: 69upx;
		width: 33upx;
		height: 33upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.top {
		max-width: 750upx;
		background: url(../../static/bgs/login_top.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		height: 410upx;
		margin: 0px;
		padding: 0px;
	}

	.logo {
		width: 173upx;
		height: 173upx;
		margin: -86upx auto 0 auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.form {
		margin: 0 75upx;
		padding-bottom: 100upx;

		.row {
			@extend %flex-layout-row;
			justify-content: space-between;
			padding-top: 69upx;
			border-bottom: 1upx solid #e6e6e6;
			padding-bottom: 25upx;

			.icon {
				flex: 0 0 44upx;
				width: 44upx;
				height: 44upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.input {
				flex: 1;
				margin-left: 40upx;

				input {
					color: #333333;
				}
			}

			.code {
				flex: 0 0 140upx;
				font-size: $mc-normal-font-size;
				color: #ff7e0c;
				position: relative;

				&::after {
					position: absolute;
					content: " ";
					left: -21upx;
					top: 25%;
					width: 2upx;
					height: 29upx;
					display: inline-block;
					background-color: #e0e0e0;
				}
			}
		}
	}

	.submit {
		width: 640upx;
		height: 88upx;
		background: linear-gradient(-90deg, #ff7611, #ff9001);
		border-radius: 44upx;
		color: #ffffff;
		font-size: $mc-large-font-size;

		&.dis {
			background: linear-gradient(-90deg, #ff7611, #ff9001);
			opacity: 0.4;
		}
	}

	.login_read {
		padding-top: 49upx;
		width: 80%;
		line-height: 25upx;
		@extend %flex-layout-row;
		justify-content: center;
		margin: 0 auto;

		.icon {
			flex: 0 0 44upx;
			width: 44upx;
			height: 44upx;
			line-height: 44upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.read {
			margin-left: 14upx;
			display: flex;
			flex-direction: row;
			flex: 1;
			font-size: $mc-submit-font-size;
			color: #999999;

			navigator {
				color: #ff871b;
			}
		}
	}

	.bottom {
		position: fixed;
		bottom: 39upx;
		z-index: 1;
		left: 55upx;
		right: 55upx;
		@extend %flex-layout-row;
		justify-content: center;
		height: 33upx;
		align-items: center;

		.icon {
			flex: 0 0 44upx;
			width: 44upx;
			height: 44upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			margin-left: 16upx;
			color: #999999;
			font-size: 22upx;
		}
	}

	.myholder {
		color: #cccccc;
		font-size: $mc-normal-font-size;
	}
</style>
