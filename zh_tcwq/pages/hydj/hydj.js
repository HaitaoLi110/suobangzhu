var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	list:[
		{"id":0,title:"第一登记","sj":"30","price":"$5"}
	]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var that = this;
	app.util.request({
	    url: "entry/wxapp/GroupList",
	    success: function(e) {
	       var list = e.data.data;
		   that.setData({
			   list:list
		   })
	    }
	});
  },
	groupid:function(e){
		var that = this;
		var id = e.currentTarget.dataset.id;
		var  openid = wx.getStorageSync("openid")
		app.util.request({
		    url: "entry/wxapp/UserGroupPay",
			data:{
				openid:openid,
				groupid:id
			},
		    success: function(e) {
		       
			   let users = e.data
			   wx.navigateTo({
			       url: "../index/logs?tile"+users.title+"groupid"+users.groupid,
			       success: function(t) {},
			       fail: function(t) {},
			       complete: function(t) {}
			   });
		    }
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

  }
})