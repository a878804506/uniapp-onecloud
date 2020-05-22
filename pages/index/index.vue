<template>
	<view class="container">
		<view class="intro">欢迎来到一云智慧云平台！</view>
		<text class="intro"></text>
		<uni-link :href="href" :text="href"></uni-link>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://myblog.erdongchen.top'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
