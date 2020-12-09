var app = getApp()
Page({

 
  data: {
	list:[{
		name:'颠倒是非',
		tel:'132222222',
		chanpin:'V型创新型持续创新',
		addres:'V型从V型从V型从',
		url:''
	},
	{
		name:'颠倒是非',
		tel:'132222222',
		chanpin:'V型创新型持续创新',
		addres:'V型从V型从V型从'
	}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let that =this;
	 let opendid = wx.getStorageSync("openid")
	 let users = wx.getStorageSync("users")
	app.util.request({
      url: "entry/wxapp/XxList",
      data: {
          id: users.id,
		  openid:opendid
      },
      success: function(a) {
		  console.log(a.data)
		  // that.setData({
			 //  list:a	
		  // })
	  }
	  })
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