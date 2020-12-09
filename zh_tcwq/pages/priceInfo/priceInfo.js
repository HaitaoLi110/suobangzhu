// zh_tcwq/pages/priceInfo/priceInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		list:[
			{'des':'【调整】移动商城用户营销系统','time':"2020-11-25","url":'www.baidu.com'},
			{'des':'【调整】赏心悦目的页面样式可以提高用户浏览、购物体验的满意度哦','time':"2020-10-25","url":'www.baidu.com'},
			{'des':'【调整】期暂时无法针对不同路径单独装修，除店铺导航可以针对微信公众号和小程序单独配，其他的装修数据会同步应用在微信公众号和小程序上','time':"2020-10-05","url":'www.baidu.com'},
		],
		tabNav: ['全部', '充值', '消费'],
		currentIndex:0,
		shareNum:0
  },
onTabNav: function (e) {
    var indexTag = e.currentTarget.dataset.index;
    console.log(indexTag);
    this.setData({
      currentIndex:indexTag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	wx.showShareMenu({
	      withShareTicket: true
	});

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
	  var that = this;
	  debugger
	
	  if(that.data.shareNum <=3){
		  var tal = that.data.shareNum + 1
		  that.setData({
		  		  shareNum:tal  
		  })
		  return {
		  			  title: '555',
		  			  path: 'zh_tcwq/pages/priceInfo/priceInfo',
		  			  //imageUrl:'分享链接图片',
		  			  success: function (res) {
						  
		  				console.log("分享成功"+ JSON.stringify(res))
		  			  },
		  			  fail: function (res) {
						  debugger
		  				console.log("分享失败"+ JSON.stringify(res))
		  			  }
		  	}
	  }else{
		  wx.showModal({
		      title: "提示",
		      content: "每天只能分享查看三条",
		      showCancel: !0,
		      cancelText: "取消",
		      confirmText: "确定",
		      success: function(e) {},
		      fail: function(e) {},
		      complete: function(e) {}
		  })
	  }

	  },
	  // 分享到朋友圈 
	  onShareTimeline: function() {
		  return {
			title: '朋友圈看到的页面标题',
			path: 'zh_tcwq/pages/priceInfo/priceInfo',
			//imageUrl:'分享链接图片',
			//query: 'kjbfrom=pyq'
		  }
	  }
})