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
	       var list = e.data;
		   that.setData({
			   list:list
		   })
	    }
	});
  },
	groupid:function(e){
		var that = this;
		var id = e.currentTarget.id;
		var  openid = wx.getStorageSync("openid");
		var moneys = e.currentTarget.dataset.price;
		var user_id = wx.getStorageSync("users").id
		app.util.request({
		    url: "entry/wxapp/UserGroupPay",
			data:{
				openid:openid,
				groupid:id
			},
		    success: function(e) {
		       if (console.log("付费刷新"), that.data.isios && "2" == that.data.System.is_pgzf) return void wx.showModal({
		           title: "暂不支持",
		           content: "由于相关规范，iOS功能暂不可用",
		           showCancel: !1,
		           confirmText: "好的",
		           confirmColor: "#666"
		       });
		       app.util.request({
		           url: "entry/wxapp/UserGroupPay",
		           cachetime: "0",
		           data: {
		              openid:openid,
		              groupid:id
		           },
		           success: function(t) {
					   console.log(t)
		               wx.requestPayment({
		                   timeStamp: t.data.timeStamp,
		                   nonceStr: t.data.nonceStr,
		                   package: t.data.package,
		                   signType: t.data.signType,
		                   paySign: t.data.paySign,
		                   success: function(t) {
		                       wx.showModal({
		                           title: "提示",
		                           content: "支付成功",
		                           showCancel: !1
		                       });
		                   },
		                   complete: function(t) {
		                       console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
		                           title: "取消支付",
		                           icon: "loading",
		                           duration: 1e3
		                       }), "requestPayment:ok" == t.errMsg , app.util.request({
		                           url: "entry/wxapp/SaveTzPayLog",
		                           cachetime: "0",
		                           data: {
		                               tz_id: user_id,
		                               money: moneys,
		                               money5: moneys
		                           },
		                           success: function(t) {}
		                       }), app.util.request({
		                           url: "entry/wxapp/fx",
		                           cachetime: "0",
		                           data: {
		                               user_id: user_id,
		                               money: moneys
		                           },
		                           success: function(t) {
		                               console.log(t);
		                           }
		                       }), setTimeout(function() {
		                           wx.reLaunch({
		                               url: "../logs/logs"
		                           });
		                       }, 1e3);
		                   }
		               });
		           }
		       });
		                                  
			   // let users = e.data
			   // wx.navigateTo({
			   //     url: "../logs/logs?tile"+users.title+"&groupid"+users.groupid,
			   //     success: function(t) {},
			   //     fail: function(t) {},
			   //     complete: function(t) {}
			   // });
		    }
		});
		
		// wx.navigateTo({
		//     url: "../logs/logs?tile=第一等级&groupid=3",
		//     success: function(t) {},
		//     fail: function(t) {},
		//     complete: function(t) {}
		// });
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