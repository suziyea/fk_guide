<template>
	<view class="container u-flex u-flex-column  u-flex-items-center">
		<view class="logo">
			<image src="/static/icons/logo.png" mode="aspectFill"></image>
		</view>
		<view>
			<u--text size='12' text="欢迎您,下载并使用“小狗普惠”"></u--text>
		</view>

		<view class="btns u-flex u-flex-items-center u-flex-between u-flex-center">
			<view class="btn primary u-flex u-flex-items-center u-flex-center" @click="downloadApp('android')">Android
				下载</view>
			<view class="btn success u-flex u-flex-items-center u-flex-center" @click="downloadApp('')">IOS 下载</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			downloadApp(val = '') {
				// 创建A标签
				if (val) {
					const link = document.createElement('a');
					link.style.display = 'none';
					link.href = `https://api.shcwwl.cn/apk/xiaogoupuhui.apk?v=${new Date().getTime()}`;
					// 触发点击方法
					link.setAttribute('download', '小狗普惠');
					document.body.appendChild(link);
					link.click();
					return;
				}
				uni.$u.route('/pages/guide/guide');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;

		.logo {
			width: 182upx;
			height: 182upx;
			margin: 57px auto 57upx auto;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.tips {
			border: 1px solid hotpink;
			padding: 40rpx;
			font-size: 24rpx;
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
			border-radius: 46rpx;
			font-size: 32rpx;
			width: 320rpx;
			height: 80rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #3E536C;
		}

		.btns {
			width: 750rpx;
			margin-top: 130rpx;
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
