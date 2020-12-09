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
		  motto: 'Hello World',
		    hidden: true,
		    userInfo: {},
		    hasUserInfo: false,
		    windowWidth: '',
		    posterHeight: '',



	},


	onLoad: function(options) {
		
		const that = this
		  // 图片路径
		  const imagePath = that.data.bgImgPath
		  let bgimgPromise = new Promise(function (resolve, reject) {
		    console.log('data', that.data)
		    wx.getImageInfo({
		      src: imagePath + "base.png",
		      success: function (res) {
		        resolve(res);
		      }
		    })
		  });
		
		 const poster = {
		    "with": 375,
		    "height": 587
		  }
		  const systemInfo = wx.getSystemInfoSync()
		  let windowWidth = systemInfo.windowWidth
		  let windowHeight = systemInfo.windowHeight
		  let posterHeight = parseInt((windowWidth / poster.with) * poster.height)
		  this.setData({
		    windowWidth: windowWidth,
		    posterHeight: posterHeight
		  })


	},
	createImage: function(){
	    let imageWidth = this.data.imageWidth,
	      imageHeight = this.data.imageHeight;
	 
	    wx.canvasToTempFilePath({     //将canvas生成图片
	      canvasId: 'gameCanvas',
	      x: 0,
	      y: 0,
	      width: imageWidth,
	      height: imageHeight,
	      destWidth: imageWidth,     //截取canvas的宽度
	      destHeight: imageHeight,   //截取canvas的高度
	      success: function (res) {
	        wx.saveImageToPhotosAlbum({  //保存图片到相册
	          filePath: res.tempFilePath,
	          success: function () {
	            wx.showToast({
	              title: "生成图片成功！",
	              duration: 2000
	            })
	          }
	        })
	      }
	    })
	  }
,
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
