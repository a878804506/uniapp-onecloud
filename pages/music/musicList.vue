<template>
	<view class="container">
		<view>
			<view class="content">
				<sl-filter themeColor="#06CFFF" :menuList="menuList" @result="result"></sl-filter>
			</view>

			<!-- 设置圆角 -->
			<uni-search-bar :radius="200" @cancel="cancel" @input="input" @confirm="search" placeholder="可搜索歌名,歌手" :maxlength="10" clearButton="false">
			</uni-search-bar>

		</view>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- <view> @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致) </view>
			<view> 字节跳动小程序 ref="mescrollRef" 必须配置 </view>
			<view> 此处支持写入原生组件 </view> -->
			<!-- style="width: 50%;float: left;" -->
			<view v-for="(data,index) in dataList">
				<div class="div1">
					<image :src="data.picUrl" class="musicPic"></image>
				</div>
				<div class="div2">
					<p class="musicInfo">{{data.name}}</p>
					<p class="musicInfo">作者:{{data.singers.length< 10 ? data.singers: data.singers.substring(0,10)+'...'}}</p>
					<p class="musicInfo">专辑:{{data.albumName.length< 10 ? data.albumName: data.albumName.substring(0,10)+'...'}}</p>
				</div>
				<div class="div3">
					<p style="padding-top: 15px;">
						<image src="../../static/music/played.png" style="width: 20px;height: 20px;" @click="playMusic(data,index)"></image>
						<image src="../../static/music/collect_before.png" style="width: 20px;height: 20px;"></image>
					</p>
				</div>
			</view>

			<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
			<!-- 在app-nvue下，如果是长列表，使用list组件的性能高于使用view或scroll-view的滚动。原因在于list在不可见部分的渲染资源回收有特殊的优化处理。-->
			<!-- <list>
				<cell v-for="(item, index) in dataList" :key="item.id">
					<div><cover-image src="item.picUrl"></cover-image>{{item.name}}</div>
					<view>{{item.name}}</view>
				</cell>
			</list> -->
		</mescroll-body>
		<!-- <view>fixed元素需写在mescroll-body的外面,否则下拉刷新时会降级为absolute </view> -->

		<!-- Fab 悬浮按钮-->
		<view>
			<uni-fab :pattern="pattern" :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger"
			 @fabClick="fabClick">
			</uni-fab>
		</view>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// 引入mescroll-body组件 (如已在main.js注册全局组件,则省略此步骤)
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"; // 注意.vue后缀不能省
	// 2个条件选择
	import slFilter from '@/components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	// 搜索
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	// Fab 悬浮按钮
	import uniFab from '@/components/uni-fab/uni-fab.vue';

	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBody,
			slFilter,
			uniFab
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 90%的情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 90%的情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				// 列表数据
				dataList: [],
				// 选中的搜索范围
				selectSearchType: 0,
				// 选中的音乐平台
				selectPlatform: 0,
				// 搜索关键字
				keyword: '',
				// 后台返回的平台列表
				platformsList: [],
				// 解锁码
				unlockCode: '',
				// 播放控件
				musicAudioMannager: undefined,
				menuList: [{
						'title': '搜索范围',
						'detailTitle': '请选择搜索范围（单选）',
						'isMutiple': false,
						'isSort': true,
						'key': 'selectSearchType',
						'detailList': [{
								'title': '站内',
								'value': 0
							},
							{
								'title': '站外',
								'value': 1
							}
						]

					},
					{
						'title': '音乐平台',
						'key': 'selectPlatform',
						'isMutiple': false,
						'isSort': true,
						'detailTitle': '请选择音乐平台（单选）',
						'detailList': []

					}
				],
				// 悬浮框样式
				pattern: {
					color: '#2C2C2C',
					selectedColor: '#06CFFF',
					backgroundColor: '#EEF1F3',
					buttonColor: '#06CFFF'
				},
				// 展开菜单内容配置项
				content: [{
						iconPath: '../../static/music/played.png',
						selectedIconPath: '../../static/music/playing.png',
						text: '播放/暂停',
						active: false
					},
					{
						iconPath: '../../static/music/random.png',
						selectedIconPath: '../../static/music/random.png',
						text: '随机',
						active: false
					}
				]
			}
		},
		created() {
			this.musicAudioMannager = uni.createInnerAudioContext();
			this.$api.getPlatformsList({
				needTran: true
			}).then(res => {
				this.menuList[1].detailList = res.data
				this.platformsList = res.data
			})
			this.$api.getUnlockCode().then(res => {
				this.unlockCode = res.data
			})
		},
		methods: {
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				// 第1种: 请求具体接口
				/* uni.request({
					url: 'xxxx',
					success: () => {
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: () => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				}) */
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
				// 若整个downCallback方法仅调用this.mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认,大部分都是这个情况~)
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.$api.musicList({
					searchType: this.selectSearchType,
					platformId: this.selectPlatform,
					keyword: this.keyword,
					page: pageNum,
					limit: pageSize
				}).then(res => {
					if (20000 != res.code) {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr()
						return
					}
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.data.pages;
					// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
					let totalSize = res.data.total;
					// 接口返回的是否有下一页 (true/false)
					let hasNext = res.data.current < res.data.pages;

					//设置列表数据
					if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(curPageData); //追加新数据

					// 请求成功,隐藏加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage);

					setTimeout(() => {
						this.mescroll.endSuccess(curPageLen)
					}, 20)
				})
			},
			// 下拉框的事件
			result(val) {
				this.selectSearchType = val.selectSearchType == '' ? 0 : val.selectSearchType
				this.selectPlatform = val.selectPlatform
				if (val.selectSearchType == 1 && val.selectPlatform == 0) {
					this.menuList[1].detailList[0].isSelected = false
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '站外搜索需选中一个音乐平台',
					})
					return
				}
				if (val.selectSearchType == 1 && this.keyword == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '站外搜索需输入关键字',
					})
					return
				}
				// 查询数据
				this.mescroll.num = 1
				this.upCallback(this.mescroll)
			},
			// 搜索框的搜索事件
			search(param) {
				this.keyword = param.value
				if (this.selectSearchType == 1 && this.selectPlatform == 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '站外搜索需选中一个音乐平台',
					})
					return
				}
				if (this.selectSearchType == 1 && this.keyword == '') {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '站外搜索需输入关键字',
					})
					return
				}
				// 查询数据
				this.mescroll.num = 1
				this.upCallback(this.mescroll)
			},
			// 搜索框改变时触发事件
			input(param) {
				this.keyword = param.value
			},
			// 取消搜索
			cancel(e) {
				this.keyword = ''
			},
			// 展开菜单点击事件，返回点击信息
			trigger(val) {
				console.log(val)
				if(val.index == 0){
					if(this.musicAudioMannager.paused){
						this.musicAudioMannager.play()
					}else{
						this.musicAudioMannager.pause()
					}
				}
			},
			// 悬浮按钮点击事件
			fabClick() {
				console.log('悬浮按钮点击事件')
			},
			// 点击列表中的播放按钮
			playMusic(music, index) {
				console.log(music)
				console.log(index)

				let musicUrl = '';
				if (music.searchType == 0) {
					this.$api.getAppMusicUrl({
						searchType: music.searchType,
						platformId: music.platformId,
						id: music.id
					}).then(res => {
						console.log('站内返回的url->')
						console.log(res)
						musicUrl = res.data;
						this.doplay(music,musicUrl)
					})
				} else {
					let platformEn = this.platformsList[music.platformId].en
					uni.request({
						url: 'https://api.sounm.com/' + platformEn + '/song',
						data: {
							id: music.id
						},
						header: {
							'unlockCode': this.unlockCode
						},
						success: (res) => {
							uni.request({
								url: 'https://api.sounm.com/' + platformEn + '/url',
								data: {
									id: res.data.data.id,
									quality: 320,
									isRedirect: 0
								},
								header: {
									'unlockCode': this.unlockCode
								},
								success: (res) => {
									console.log('站外返回的url->')
									console.log(res.data.data[0])
									musicUrl = res.data.data[0];
									this.doplay(music,musicUrl)
								}
							})
						}
					})


				}
			},
			doplay(music,url) {
				this.musicAudioMannager.title = music.name
				this.musicAudioMannager.singer = music.singers
				this.musicAudioMannager.coverImgUrl = music.picUrl
				this.musicAudioMannager.src = url
				
				uni.showModal({
				    title: '提示',
				    content: url,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
				this.musicAudioMannager.onPlay(() => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '开始播放 '+this.musicAudioMannager.title,
					})
				})
				this.musicAudioMannager.onError((res) => {
					uni.showModal({
					    title: '提示',
					    content: res.errMsg+'==='+res.errCode,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					})
				})
				this.musicAudioMannager.onCanplay(() => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '音频文件加载完毕^_^',
					})
					this.musicAudioMannager.play()
				})
				this.musicAudioMannager.onPause(() => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '音频暂停了',
					})
				})
				this.musicAudioMannager.onStop(() => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '音频停止了',
					})
				})
				this.musicAudioMannager.onWaiting(() => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: 'onWaiting',
					})
				})

				/* const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = url;
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				}); */
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

	.div1 {
		float: left;
		width: 22%;
		height: 80px;
		text-align: center;
		border-bottom: 1px solid #06CFFF;
		margin-bottom: 10px;
	}

	.div2 {
		float: left;
		width: 62%;
		height: 80px;
		border-bottom: 1px solid #06CFFF;
		margin-bottom: 10px;
		padding-left: 15px;
	}

	.div3 {
		float: left;
		width: 7%;
		height: 80px;
		border-bottom: 1px solid #06CFFF;
		margin-bottom: 10px;
	}

	.musicPic {
		width: 80px;
		height: 80px;
		border-radius: 40px;
	}

	.musicInfo {
		/* margin-left: 10px; */
	}
</style>
