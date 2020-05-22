<template>
	<view class="content">
		<view class="person-head">
			<view class="header">
				<image :src="userImage"></image>
			</view>

			<view class="person-head-box">
				<view class="person-head-username">ID：{{userInfo.id}}</view>
				<view class="person-head-nickname">昵称：{{userInfo.name}}</view>
				<view class="person-head-username">角色: {{userInfo.roles}}</view>
			</view>
		</view>

		<view class="uni-list">
			<uni-list>
				<uni-list-item title="账号" :rightText="userInfo.account"></uni-list-item>
				<uni-list-item title="性别" :rightText="userInfo.sex == 1?'男':'女'" ></uni-list-item>
				<uni-list-item title="联系方式" :rightText="userInfo.phone" ></uni-list-item>
				<uni-list-item title="所属部门" :rightText="userInfo.dept" ></uni-list-item>
				<uni-list-item title="email" :rightText="userInfo.email"></uni-list-item>
				<uni-list-item title="生日" :rightText="userInfo.birthday"></uni-list-item>
				<uni-list-item title="修改密码" ></uni-list-item>
				
				<!-- 显示Switch -->
				<uni-list-item title="是否接收消息推送" :show-switch="true" :show-arrow="false" :switchChecked="true" ></uni-list-item>
			</uni-list>
			
			<!-- <uni-list>
				<uni-list-item title="标题文字" :show-badge="true" badge-text="12" ></uni-list-item>
			</uni-list> -->
			
		</view>

		<view class="example-body">
			<uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
				<uni-list>
					<uni-list-item v-for="menu in userMenus" :title='menu.name' @click="gotoMenu(menu.path)"/>
				</uni-list>
				<!-- <view class="close">
					<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="closeDrawer('showLeft')"><text
						 class="word-btn-white">关闭Drawer</text></view>
				</view> -->
				
				<view v-if="userMenus.length == 0" class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="closeDrawer('showLeft')">
					<text class="word-btn-white">没有权限</text>
				</view>
			</uni-drawer>
		</view>

		<wButton text="退出登录" :rotate="isRotate" @click.native="loginOut()" class="wbutton"></wButton>
	</view>
</template>

<script>
	import wButton from '../../components/watch-login/watch-button.vue' //button

	export default {
		data() {
			return {
				// user image
				userImage: 'https://avatar.bbs.miui.com/images/noavatar_small.gif',
				isRotate: false,
				// 用户信息
				userInfo: uni.getStorageSync('userInfo').profile,
				
				showRight: false,
				showLeft: false,
				allWaterMenus: [
					{'path':'/customerMgr','name':'客户管理',}, 
					{'path':'/customerWaterMeter','name': '起止码管理'}
				],
				userMenus:[]
			}
		},
		created(){
			this.initUserMenus()
		},
		components: {
			wButton,
		},
		methods: {
			initUserMenus(){
				const tempUrl = uni.getStorageSync('userInfo').permissions
				this.allWaterMenus.forEach(allmenu =>{
					tempUrl.forEach(userMenu =>{
						if(allmenu.path === userMenu){
							this.userMenus.push(allmenu)
						}
					})
				})
			},
			confirm() {},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			gotoMenu(url){
				console.log(url)
				uni.reLaunch({
					url: '../water/waterCustomer',
				});
			},
			loginOut() {
				//退出
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '退出成功'
				});
				this.isRotate = true
				setTimeout(function() {
					this.isRotate = false

					uni.reLaunch({
						url: '../login/login',
					});
				}, 1000)
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.person-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 150px;
		padding-left: 20px;
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.person-head-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-left: 10px;
	}

	.person-head-nickname {
		font-size: 18px;
		font-weight: 500;
		color: #fff;
	}

	.person-head-username {
		font-size: 14px;
		font-weight: 500;
		color: #fff;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		box-shadow: 0upx 0upx 60upx 0upx rgba(0, 0, 0, 0.1);
		border-radius: 60%;
		background-color: #646566;
		margin-top: 90upx;
		margin-bottom: 72upx;
		margin-left: auto;
		margin-right: auto;
	}
	
	
	
	
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
		text-align: center;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		overflow: hidden;
	}
	
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	
	.header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
		border-top-width: 1px;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		/* background-color: #ffffff; */
	}
	
	.input-view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
		background-color: #f5f5f5;
	}
	
	.uni-drawer-info {
		background-color: #ffffff;
		padding: 15px;
		padding-top: 5px;
		color: #3b4144;
	}
	
	.uni-padding-wrap {
		padding: 0 15px;
		line-height: 1.8;
	}
	
	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		background-color: transparent;
	}
	
	.close {
		padding: 15px;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}
	
	.draw-cotrol-btn {
		flex: 1;
	}
	
	.info {
		padding: 15px;
		color: #666;
	}
	
	.info-text {
		font-size: 14px;
		color: #666;
	}
	
	.scroll-view {
		flex: 1
	}
	
	/* 处理抽屉内容滚动 */
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.info-content {
		padding: 5px 15px;
	}
	
	.wbutton{
		margin-top: 100rpx
	}
</style>
