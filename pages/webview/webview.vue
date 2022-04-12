<template>
	<view>
		<web-view :src="path" :progress="false"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				path: '',
			}
		},
		methods: {

		},
		onLoad(options) {
			this.path = decodeURIComponent(options.urlPath);
		}
	}
</script>

<style>

</style>
