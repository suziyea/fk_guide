<template>
	<view class="container u-flex u-flex-column u-flex-items-center">
		<view class="weixinTip" v-if="isWeat">
			<image src="/static/img/live_wechat.png"></image>
		</view>
		<view v-else>
			<view class="logo">
				<image src="/static/icons/logo.png" mode="aspectFill"></image>
			</view>
			<view class="tipTitle">
				<u--text size='15' lineHeight='22' text="苹果手机操作流程："></u--text>
			</view>
			<view class="tips">
				<u--text size='13' lineHeight='22' text="1.点击设置，进入通用"></u--text>
				<u--text size='13' lineHeight='22' text="2.点击VPN与设备管理"></u--text>
				<u--text size='13' lineHeight='22' text="3.点击“Global Limited”并点击信任即可正常使用APP"></u--text>
			</view>

			<view class="btns u-flex u-flex-items-center u-flex-between u-flex-center">
				<view class="btn success u-flex u-flex-items-center u-flex-center" @click="downloadApp('')">IOS 下载
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isWeat: false
			}
		},
		onLoad() {
			this.isWeat = this.is_weixin()
		},
		methods: {
			downloadApp(val = '') {
				// 创建A标签
				const link = document.createElement('a');
				link.style.display = 'none';
				link.href =
					`itms-services:///?action=download-manifest&url=https://api.shcwwl.cn/ios/manifest_v1.0.0.plist`;
				// 触发点击方法
				link.setAttribute('download', '鑫顺花');
				document.body.appendChild(link);
				link.click();
				return;
			},
			is_weixin() {
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					return true;
				} else {
					return false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;

		// min-height: 100vh;
		.weixin-tip {
			display: none;
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.8);
			filter: alpha(opacity=80);
			height: 100%;
			width: 100%;
			z-index: 100;
		}

		.weixin-tip {
			text-align: center;
			margin-top: 10%;
			padding: 0 5%;

			image {
				max-width: 100%;
				height: auto;

			}
		}


		.logo {
			width: 182upx;
			height: 182upx;
			margin: 57px auto 57upx auto;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.tipTitle {
			margin: 24rpx 0;
			padding: 0 40rpx;
			// font-size: 24rpx;
			display: flex;
			align-self: flex-start;
		}

		.tips {
			padding: 0 40rpx;
			// font-size: 24rpx;
		}

		.button {
			-webkit-animation-iteration-count: infinite;
			text-decoration: none;
			padding-left: 24rpx;
			padding-right: 24rpx
		}

		.blue {
			-webkit-animation-name: bluess;
			-webkit-animation-duration: 1.0s;
			// padding: 16rpx 20rpx;
			border-radius: 40rpx !important;
			font-size: 16rpx;
			// font-weight: 800;
			// max-width: 500rpx;
			// margin: 40rpx auto;
			// font-size: 50rpx;
			// font-family: microsoft yahei;
			font-weight: 600;
			// display: inline-block;
			// margin-left: 70rpx
		}

		.btn {
			-webkit-animation-name: bluess;
			-webkit-animation-duration: 1.0s;
			-webkit-animation-iteration-count: infinite;
			// background: #FFFFFF;
			border-radius: 46rpx;
			// border: 1rpx solid #EEEEEE;
			font-size: 32rpx;
			width: 320rpx;
			height: 80rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #3E536C;
			flex: 1 1 auto;
		}

		.btns {
			width: 750rpx;
			// border:1px solid red;
			margin-top: 100rpx;
			height: 128rpx;
			background: #FFFFFF;
			bottom: 0;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
		}

		@-webkit-keyframes bluess {
			from {
				background-color: #2975ff;
				color: #fff;
				margin-top: 40rpx;
				box-shadow: 0 0 20rpx #fff;
			}

			50% {
				background-color: #2975ff;
				color: #f1f1f1;
				margin-top: 40rpx;
				box-shadow: 0 0 20rpx #000;
				font-weight: 800
			}

			to {
				background-color: #2975ff;
				color: #fff;
				margin-top: 40rpx;
				box-shadow: 0 0 20rpx #fff;
			}
		}
	}
</style>
