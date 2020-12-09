var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isOpacity: true,
		deviceWidth: wx.getSystemInfoSync().windowWidth,
		deviceHeight: 280,
		shareImgSrc: '',
		bgImgPath: 'https://pic1.zhimg.com/v2-be10bac6bfc1671a98ab4aa8d1ba5285_1440w.jpg?source=172ae18b',
		headIcon: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2286353466,1518623472&fm=26&gp=0.jpg',
		wxCode: '',
		detail: {
			"post_title": '某某某公司',

			"coverWidth": 600,
			"coverHeight": 400,
			"avatar": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2286353466,1518623472&fm=26&gp=0.jpg",
			"member": {
				"name": "我叫谁"
			}
		},
		path: "",
		pathICon: "",
		pathavatar: ''

	},
	shar() {
		var that = this;

		that.createdCode() // 根据以上信息开始画图
		//canvas画图需要时间而且还是异步的，所以加了个定时器
		setTimeout(() => {
			// 将生成的canvas图片，转为真实图片
			wx.canvasToTempFilePath({
				x: 0,
				y: 0,
				canvasId: 'shareFrends',
				success: function(res) {

					let shareImg = res.tempFilePath;
					that.setData({
						shareImg: shareImg,
						showModal: true,
						showShareModal: false
					})
					wx.hideLoading()
				},
				fail: function(res) {}
			})
		}, 500)
	},


	//开始绘图
	createdCode() {
		let that = this;
		const detail = this.data.detail;
		const ctx = wx.createCanvasContext('shareFrends'); //绘图上下文
		const date = new Date;
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const time = year + '.' + month + '.' + day; // 绘图的时间
		const name = detail.post_title; //绘图的标题  需要处理换行
		const coverWidth = this.data.deviceWidth; // 封面图的宽度 裁剪需要
		const coverHeight = this.data.deviceHeight; // 封面图的宽度 裁剪需要
		let pichName = detail.member.name; //用户昵称
		const explain = 'Hi,我想分享给你一条资讯猛料!';
		// 截取昵称 超出省略。。。
		if (pichName.length > 16) { //用户昵称显示一行 截取
			pichName = pichName.slice(0, 9) + '...'
		};
		// 绘制logo
		ctx.save()
		// canvas 背景颜色设置不成功，只好用白色背景图
		ctx.drawImage(that.data.path, 0, 0, that.data.deviceWidth, that.data.deviceHeight);
		//绘制logo
		ctx.drawImage(that.data.pathICon, 120, 15, 30, 30);


		// 绘制 封面图并裁剪（这里图片确定是按100%宽度，同时高度按比例截取，否则图片将会变形）
		// 裁剪位置  图片上的坐标  x:0 ,y: (coverHeight - 129 * coverWidth / 252) / 2
		// 图片比例 255:129   图片宽度按原图宽度即coverWidth  图片高度按129*coverWidth/252
		// 开始绘图的位置  16, 94
		// 裁剪框的大小，即需要图片的大小 252, 129
		// ctx.drawImage(this.data.cover, 0, (coverHeight - 129 * coverWidth / 252) / 2, coverWidth, 129*coverWidth/252 , 16, 94, 252, 129);


		// 绘制标题
		ctx.font = 'normal bold 14px sans-serif';
		ctx.setTextAlign('left');
		const nameWidth = ctx.measureText(name).width;
		// 标题换行  16是自已定的，为字体的高度
		this.wordsWrap(ctx, name, nameWidth, 252, 6, 52, 16);
		// 计算标题所占高度
		const titleHight = Math.ceil(nameWidth / 252) * 16;
		// 绘制头像和昵称



		ctx.arc(36, 268 + titleHight, 20, 0, 2 * Math.PI);
		ctx.clip()
		ctx.drawImage(that.data.pathIConr, 16, 48 + titleHight, 40, 44);
		ctx.restore();
		ctx.font = 'normal normal 12px sans-serif';
		ctx.setTextAlign('left');
		ctx.setFillStyle('#ffffff')
		ctx.fillText(pichName, 10, 10 + titleHight);
		// 二维码描述  及图片

		ctx.fillText(explain.slice(0, 11), 10, 66 + titleHight); // 描述截取换行
		ctx.fillText(explain.slice(11), 10, 88 + titleHight);

		// ctx.drawImage(this.data.erweima, 194, 308 + titleHight, 44, 44);
		// ctx.setFontSize(10);
		// ctx.setFillStyle('#bbbbbb')
		// ctx.fillText('长按扫码查看详情', 175, 370 + titleHight);
		// ctx.setFillStyle('#f7f7f7')
		// ctx.fillRect(0, 400 + titleHight, 286, 48)
		// ctx.setFontSize(14);
		// ctx.setFillStyle('#bbbbbb')
		// ctx.setTextAlign('center');
		// ctx.fillText('长按图片保存至相册，并分享至朋友圈！', 142, 430 + titleHight);

		ctx.draw()


	},


	//文字换行处理
	// canvas 标题超出换行处理
	wordsWrap(ctx, name, nameWidth, maxWidth, startX, srartY, wordsHight) {
		let lineWidth = 0;
		let lastSubStrIndex = 0;
		for (let i = 0; i < name.length; i++) {
			lineWidth += ctx.measureText(name[i]).width;
			if (lineWidth > maxWidth) {
				ctx.fillText(name.substring(lastSubStrIndex, i), startX, srartY);
				srartY += wordsHight;
				lineWidth = 0;
				lastSubStrIndex = i;
			}
			if (i == name.length - 1) {
				ctx.fillText(name.substring(lastSubStrIndex, i + 1), startX, srartY);
			}
		}
	},



	// 长按保存事件
	saveImg() {
		let that = this;
		// 获取用户是否开启用户授权相册
		wx.getSetting({
			success(res) {
				// 如果没有则获取授权
				if (!res.authSetting['scope.writePhotosAlbum']) {
					wx.authorize({
						scope: 'scope.writePhotosAlbum',
						success() {
							wx.saveImageToPhotosAlbum({
								filePath: that.data.shareImg,
								success() {
									wx.showToast({
										title: '保存成功'
									})
								},
								fail() {
									wx.showToast({
										title: '保存失败',
										icon: 'none'
									})
								}
							})
						},
						fail() {
							// 如果用户拒绝过或没有授权，则再次打开授权窗口
							//（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
							that.setData({
								openSet: true
							})
						}
					})
				} else {
					// 有则直接保存
					wx.saveImageToPhotosAlbum({
						filePath: that.data.shareImg,
						success() {
							wx.showToast({
								title: '保存成功'
							})
						},
						fail() {
							wx.showToast({
								title: '保存失败',
								icon: 'none'
							})
						}
					})
				}
			}
		})
	},
	phone: function(t) {
		var a = this,
			e = wx.getStorageSync("users").id,
			o = (wx.getStorageSync("openid"),
				a.data.post);
		this.data.alreadyCharge ? wx.makePhoneCall({
			phoneNumber: o.user_tel
		}) : wx.showModal({
			title: "提示",
			content: "拨打电话需支付" + o.tel_money + "元",
			success: function() {
				app.util.request({
					url: "entry/wxapp/Call",
					data: {
						post_id: o.id,
						user_id: e
					},
					success: function(t) {
						var e = t.data;
						app.util.request({
							url: "entry/wxapp/CallPay",
							data: {
								order_id: e
							},
							success: function(t) {
								wx.requestPayment({
									timeStamp: t.data.timeStamp,
									nonceStr: t.data.nonceStr,
									package: t.data.package,
									signType: t.data.signType,
									paySign: t.data.paySign,
									success: function(t) {
										console.log("这里是支付成功");
									},
									complete: function(t) {
										console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
											title: "取消支付",
											icon: "loading",
											duration: 1e3
										}), "requestPayment:ok" == t.errMsg && (a.reload(), wx.showToast({
											title: "支付成功"
										}));
									}
								});
							}
						});
					}
				});
			}
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this;
		wx.getImageInfo({
			src: that.data.bgImgPath,
			success: function(res) {
				console.log(res.path)
				that.setData({
					path: res.path
				})
			}
		})
		wx.getImageInfo({

			src: that.data.headIcon,

			success: function(res) {

				console.log(res.path)

				that.setData({

					pathICon: res.path

				})

			}

		})
		wx.getImageInfo({

			src: that.data.detail.avatar,

			success: function(res) {

				console.log(res.path)

				that.setData({

					pathavatar: res.path


				})
				that.shar()

			}

		})


	},
	save: function() {
		var that = this;
		if (wx.getStorageSync('userInfo')) {
			this.userInfo = wx.getStorageSync('userInfo')
		}
		that.showImg()
	},



	circleImg(ctx, img, x, y, r) {
		ctx.save();
		var d = 2 * r;
		var cx = x + r;
		var cy = y + r;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, 2 * Math.PI);
		// ctx.setStrokeStyle('rgba(0,0,0,0)')
		canvas.stroke()
		ctx.clip();
		ctx.drawImage(img, x, y, d, d);
		ctx.restore()
	},
	showImg() {
		var that = this;
		const ctx = wx.createCanvasContext('myCanvas');

		// 设置背景
		ctx.setFillStyle('#E72454')
		ctx.fillRect(0, 0, 670, 280)

		// 绘制图片
		ctx.drawImage(that.path.path, 0, 0, 670, 280)
		// 绘制头像
		that.circleImg(ctx, that.pathICon, 670 / 2 - 50, 20, 50)


		//创建文字
		ctx.setFontSize(18)
		ctx.setFillStyle('#fff')
		ctx.setTextAlign('center')
		ctx.fillText(that.userInfo.nickName + '邀请你一起分奖金', 670 / 2, 70)
		ctx.stroke()

		ctx.setFontSize(42)
		ctx.setFillStyle('#FFD288')
		ctx.textAlign = 'center'
		ctx.fillText(that.message.money, 157, 80)

		var a = ctx.measureText(that.message.money).width
		ctx.setFontSize(16)
		ctx.setFillStyle('#FFD288')
		ctx.fillText('元', 157 + 5 + a / 2, 80)
		ctx.stroke()

		// 绘制小程序码
		// ctx.drawImage(that.wxCode, 670/2-75, 200, 150, 150)

		// context.setFontSize(12)
		// context.setFillStyle("#fff")
		// context.setTextAlign("center")
		// context.fillText("长按识别小程序", 157, 310)
		// ctx.stroke()
		//渲染
		ctx.draw()

		//需要把canvas转成图片后才能保存
		wx.canvasToTempFilePath({ // 生成图片并把绘制的图片路径保存到一个变量
			x: 0,
			y: 0,
			width: 670,
			height: 280,
			destWidth: 2010, //3倍关系
			destHeight: 840, //3倍关系
			canvasId: 'myCanvas',
			success: function(res) {
				//关键 赋值给变量
				that.shareImgSrc = res.tempFilePath
				that.saveImg2()
			},
			fail: function(res) {
				console.log(res)
			}
		})
	},
	saveImg2() {
		var that = this
		wx.saveImageToPhotosAlbum({ // 这张图片保存到本地相册
			//shareImgSrc为canvas赋值的图片路径
			filePath: that.shareImgSrc,
			success(res) {
				console.log('保存成功');
				wx.showModal({
					title: '保存成功',
					content: '图片成功保存到相册了，快去发朋友圈吧~',
					showCancel: false,
					confirmText: '确认',
					confirmColor: '#21e6c1',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
