<template>
	<view class="content">
		<!-- 原生分页器 -->
		<uni-pagination title="cyh" :total="total" :current="page" :pageSize="limit" @change="gotoPage"></uni-pagination>
		
		<!-- Popup 弹出层-->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="info" :title="editMessage"  :duration="0" @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
		
		<view class="example-block">
			<view class="table">
				<z-table :textAlign="selectContent.textAlign" :titleTextAlign="selectContent.titleTextAlign" :tableData="nowData" :columns="nowColumn"  :stickSide="selectContent.stickSide" :showBottomSum="selectContent.showBottomSum" :showLoading="true" :emptyText='selectContent.emptyText'
				 :tableHeight='selectContent.tableHeight' @onClick="rowClick" :singleSelect="singleSelect" :showSelect="selectContent.showSelect" @onSelect="tableSelect"></z-table>
			</view>
			<button v-if="selectContent.showSelect" class="select-btn" type="primary" @click="singleSelect = !singleSelect">{{ !singleSelect ? '开启单选' : '开启多选' }}</button>
		</view>
		
		<view class="myButton">
			<button class="mini-btn" type="primary" size="mini" @click="goToPage">跳转</button>
		</view>
	</view>
</template>
<script>
	import zTable from "../../components/z-table/z-table.vue";
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	// Popup弹出层
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			const params = option
			if(params.page){
				this.page = params.page	
				this.getWaterCustomerMeter()
			}
		},
		data() {
			return {
				title: "zTable使用示例",
				showUpData: false,
				nowType: 0,
				nowData: false,
				nowColumn: false,
				nowHtml: '',
				myDebounce: this.debounce(this.setTable),
				selectContent: {
						id: 'f0',
						name: '开启所有的功能', // 功能名
						textAlign: 'center', // 内容对齐方式
						titleTextAlign: 'center', // 表头对齐方式
						tableData: 'finaleTableData', // 表格数据
						columns: 'finaleColumns', // 表格列内容
						stickSide: true, // 左侧固定
						showBottomSum: false, // 底部显示统计
						emptyText: '这个为空', // 表格内容为空时显示的内容
						tableHeight: 1000, // 表格高度
						showSelect: false ,// 开启选择功能
						html: 'finaleHtml'
				},
				
				finaleTableData: [
				],
				finaleColumns: [
					{
						title: '<span style="color: #333"><span style="vertical-align: middle;">客户编号</span></span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#cid#</span>",
							names: ["cid"]
						},
						width: 120
					},
					{
						title: '<span style="color: #333"><span style="vertical-align: middle;">姓名</span></span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#cname#</span>",
							names: ["cname"]
						},
						width: 140
					},
					{
						title: "一月",
						key: "one",
						width: 200,
						listenerClick: true
					},
					{
						title: "二月",
						key: "two",
						width: 200,
						listenerClick: true
					},
					{
						title: "三月",
						key: "three",
						width: 200,
						listenerClick: true
					},
					{
						title: "四月",
						key: "four",
						width: 200,
						listenerClick: true
					},
					{
						title: "五月",
						key: "five",
						width: 200,
						listenerClick: true
					},
					{
						title: "六月",
						key: "six",
						width: 200,
						listenerClick: true
					},
					{
						title: "七月",
						key: "seven",
						width: 200,
						listenerClick: true
					},
					{
						title: "八月",
						key: "eight",
						width: 200,
						listenerClick: true
					},
					{
						title: "九月",
						key: "nine",
						width: 200,
						listenerClick: true
					},
					{
						title: "十月",
						key: "ten",
						width: 200,
						listenerClick: true
					},
					{
						title: "十一月",
						key: "eleven",
						width: 200,
						listenerClick: true
					},
					{
						title: "十二月",
						key: "twelve",
						width: 200,
						listenerClick: true
					}
				],
				finaleHtml: "<z-table :tableData='finaleTableData' :columns='finaleColumns' stickSide showBottomSum emptyText='设置了showLoading=false才会看到我' :tableHeight='800' showSelect @onClick='rowClick' @onSelect='tableSelect' ></z-table>",
				singleSelect: true,
				
				page: 1,
				// 一页的数据量
				limit: 15,
				// 总数据量
				total: 0,
				// 一共多少页
				pages: 0,
				indexList: [],
				
				selectedWaterMeter: '',
				
				editMessage : '是否编辑'
			}
		},
		components: {
			zTable,
			uniPagination,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		watch: {
			nowType: {
				handler() {
					this.nowData = false
					this.nowColumn = false
					this.myDebounce()
				},
				immediate: true
			}
		},
		created(){
			this.getWaterCustomerMeter()
		},
		methods: {
			getWaterCustomerMeter(){
				this.$api.waterCustomerMeter({
					page: this.page,
					limit: this.limit
				}).then(res => {
					this.finaleTableData = res.data.records
					this.total = res.data.total
					this.page = res.data.current
					this.limit = res.data.size
					this.pages = res.data.pages
					this.myDebounce()
				})
			},
			gotoPage(parm){
				this.finaleTableData = []
				// 分页点击
				this.page = parm.current
				this.getWaterCustomerMeter()
			},
			setTable() {
				this.nowData = this.$data[this.selectContent.tableData]
				this.nowColumn = this.$data[this.selectContent.columns]
				this.nowHtml = this.$data[this.selectContent.html]
			},
			debounce(fn, time = 1000) {
				let timer = null
				return function() {
					if (timer) clearTimeout(timer)
					timer = setTimeout(fn, time)
				}
			},
			/* doSort(res) {
				uni.showToast({
					title: `点击了${res.key}的排序, 排序方式为${res.type}`,
					icon: "none"
				})
			}, */
			rowClick(item) {
				console.log(`${JSON.stringify(item)}数据被点击`)
				this.selectedWaterMeter = item
				this.editMessage = "是否编辑 "+ item.cname + " 的起止码?"
				this.$refs.popup.open()
			},
			tableSelect(selectList) {
				uni.showToast({
					title: `选中了TableData中下标为${selectList.join(',')}的元素`,
					icon: 'none'
				})
			},
			/**
			 * 点击取消按钮触发
			 */
			close(done){
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				done()
			},
			/**
			 * 点击确认按钮触发
			 */
			confirm(done,value){
				uni.navigateTo({
				    url: 'customerWaterMeterEdit?waterMeter=' + JSON.stringify(this.selectedWaterMeter)+'&page='+ this.page
				});
				// 输入框的值
				// console.log(value)
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				done()
			},
			goToPage(){
				const that = this
				for(var i = 0 ; i < this.pages ;i++){
					this.indexList[i] = i+1
				}
				uni.showActionSheet({
				    itemList : this.indexList,
				    success: function (res) {
				        // console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						that.page = res.tapIndex + 1;
						that.getWaterCustomerMeter();
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			}
		},
		onNavigationBarButtonTap(e){
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
