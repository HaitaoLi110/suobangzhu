var app = getApp();
Page({

  
  data: {

  },
formSubmit:function(e){
	var that = this;
	let openid = wx.getStorageSync("openid")
	app.util.request({
	    url: "entry/wxapp/Pro_sub",
	    method:"POST",
	    data: {
			openid:openid,
	         content: e.detail.value.content
	    },
	    success: function(t) {
			console.log(t)
	        wx.showToast({
	            title: "提交成功",
	            success: function(e) {},
	            fail: function(e) {}
	        });
	    }
	})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
	app.setNavigationBarColor(this), app.getUrl(this);
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

  }
})