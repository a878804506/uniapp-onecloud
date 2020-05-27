<template>
	<view class="content">
		页面
	</view>
</template>
<script>

	export default {
		data() {
			return {
				
			}
		},
		components: {
			
		},
		created() {
			
		},
		methods: {
		},
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '/pages/person/person'
			});
		}
	};
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
		font-size: 24rpx;
	}

	.table {
		text-align: center;
	}

	.title {
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.example-block {
		padding: 20rpx;
		margin: 20rpx -20rpx;
		background: #f7f9ff;
	}

	.example-title {
		font-size: 30rpx;
		font-weight: bold;
		margin: 30rpx 0 10rpx;
	}

	.example-explain {
		font-size: 24rpx;
	}

	.explain-title {
		margin-top: 30rpx;
		padding-bottom: 10rpx;
		font-size: 28rpx;
		border-bottom: solid 2rpx #ccc;
	}

	.explain-context {
		margin-top: 10rpx;
		color: #8f8f94;
	}

	.explain {
		display: flex;
	}

	.explain-text {
		flex: 1;
		margin-left: 20rpx;
	}

	.codes {
		padding: 20rpx;
		background: #333;
		color: #fff;
		box-sizing: border-box;
	}

	.codes text {
		white-space: nowrap;
	}

	.toggle-btn {
		margin: 10rpx 0;
		padding: 10rex;
		color: #1c1;
	}

	.select-btn {
		display: inline-block;
		width: 200rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
	}

	.type-select-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx;
		margin: 0 -20rpx;
		background: #f7f9ff;
	}

	.type-select-box-title {
		width: 100%;
		margin-bottom: 20rpx;
		font-size: 36rpx;
	}

	.type-select-item {
		flex: 1;
		padding: 20rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		white-space: nowrap;
		border: solid 2rpx #066;
		border-radius: 4rpx;
		font-size: 28rpx;
		background: #fff;
		color: #006666;
		text-align: center;

		&.selected {
			background: #066;
			color: #fff;
		}
	}

	.myButton {
		text-align: center;
		margin: 10px 10px;
	}
</style>
