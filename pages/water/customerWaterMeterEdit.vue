<template>
	<view>
		<view class="title">
			姓名: {{editWaterMeter.cname}}
		</view>
		<view class="title">一月</view>
		<input class="uni-input" type="number" v-model="editWaterMeter.one" @blur="checkNumber" maxlength="6" />
		<view class="uni-form-item uni-column">
			<view class="title">二月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.two" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">三月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.three" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">四月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.four" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">五月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.five" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">六月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.six" maxlength="6" />
		</view>

		<view class="uni-form-item uni-column">
			<view class="title">七月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.seven" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">八月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.eight" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">九月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.nine" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">十月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.ten" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">十一月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.eleven" maxlength="6" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">十二月</view>
			<input class="uni-input" type="number" v-model="editWaterMeter.twelve" maxlength="6" />
		</view>

		<view class="myButton">
			<button class="mini-btn" type="primary" size="mini" @click="submit">提交</button>
			<button class="mini-btn" type="default" size="mini" @click="goback">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option)
			const params = option
			this.page = params.page
			this.editWaterMeter = JSON.parse(params.waterMeter)
		},
		data() {
			return {
				page: '',
				editWaterMeter: ''
			}
		},
		methods: {
			submit() {
				if (this.editWaterMeter.one === '' || this.editWaterMeter.two === '' || this.editWaterMeter.three === '' || this.editWaterMeter
					.four === '' || this.editWaterMeter.five === '' || this.editWaterMeter.six === '' ||
					this.editWaterMeter.seven === '' || this.editWaterMeter.eight === '' || this.editWaterMeter.nine === '' || this.editWaterMeter
					.ten === '' || this.editWaterMeter.eleven === '' || this.editWaterMeter.twelve === '') {
						
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '带有非法参数,拒绝提交!'
					});
					return;
				}
				const goPage = this.page
				this.$api.updateCustomerMeter({
					cid: this.editWaterMeter.cid,
					cname: this.editWaterMeter.cname,
					one: this.editWaterMeter.one,
					two: this.editWaterMeter.two,
					three: this.editWaterMeter.three,
					four: this.editWaterMeter.four,
					five: this.editWaterMeter.five,
					six: this.editWaterMeter.six,
					seven: this.editWaterMeter.seven,
					eight: this.editWaterMeter.eight,
					nine: this.editWaterMeter.nine,
					ten: this.editWaterMeter.ten,
					eleven: this.editWaterMeter.eleven,
					twelve: this.editWaterMeter.twelve,
					id: this.editWaterMeter.id
				}).then(res => {
					if(res.code === 20000){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: res.msg
						});
						
						setTimeout(function() {
							uni.redirectTo({
								url: 'customerWaterMeter?page=' + goPage
							});
						}, 1500)
					}
					
				})
			},
			goback() {
				uni.redirectTo({
					url: 'customerWaterMeter?page=' + this.page
				});
			},
			checkNumber: function(event) {
				if (event.detail.value == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '输入非法'
					});
				}

			}
		}
	}
</script>

<style>
	.myButton {
		text-align: center;
		margin: 10px 10px;
	}

	.title {
		font-size: 18px;
	}

	.mini-btn {
		margin: 10px 10px;
	}
</style>
