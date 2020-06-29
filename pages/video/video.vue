<template>
	<view>
		<view class="page-body">
			<view class="page-section">
<!-- 
				<video id="myVideo" src="https://jiexi.380k.com/?url=https://www.iqiyi.com/v_19rri11f3o.html" @error="videoErrorCallback"
				 :danmu-list="danmuList" enable-danmu danmu-btn controls muted="muted" type="video/mp4"></video>
 -->
				<video id="myVideo" src="https://jiexi.380k.com/?url=https://www.iqiyi.com/v_19rri11f3o.html">
				</video>

				<!-- <view>
					<web-view webview-styles="width: 100px;height: 100px;border: red 2px solid;" src="https://jiexi.380k.com/?url=https://www.iqiyi.com/v_19rri11f3o.html"></web-view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view>
							<view class="uni-label">弹幕内容</view>
						</view>
						<view class="uni-list-cell-db">
							<input @blur="bindInputBlur" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
						</view>
					</view>
				</view>
				<view class="btn-area">
					<button @tap="bindSendDanmu" class="page-body-button" formType="submit">发送弹幕</button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'video',
				src: '',
				inputValue: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				]
			}
		},
		methods: {
			// #ifdef APP-PLUS 
			var currentWebview = page.$getAppWebview(); //页面栈最顶层就是当前
			webview 
			// #endif
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
