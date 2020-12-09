// zh_tcwq/pages/Collection/myList.js
var app = getApp()
var time = require('../../utils/util.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [{
			"id": "1",
			
			"content": "\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f\u5730\u5740\u4fe1\u606f",
			"addtime": "2020-11-22 15:30:30",
			
		}
		],
		cont_active:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	formatNumber:function (n) {
	    n = n.toString()
	    return n[1] ? n : '0' + n
	},
	formatTimeTwo:function (number, format) {
	
	    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	    var returnArr = [];
	
	    var date = new Date(number * 1000);
	    returnArr.push(date.getFullYear());
	    returnArr.push(this.formatNumber(date.getMonth() + 1));
	    returnArr.push(this.formatNumber(date.getDate()));
	
	    returnArr.push(this.formatNumber(date.getHours()));
	    returnArr.push(this.formatNumber(date.getMinutes()));
	    returnArr.push(this.formatNumber(date.getSeconds()));
	
	    for (var i in returnArr) {
	        format = format.replace(formateArr[i], returnArr[i]);
	    }
	    return format;
	},
	onLoad: function(options) {
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
			 for(var i=0 ;i<a.data.length;i++){
				 a.data[i].addtime = that.formatTimeTwo(a.data[i].addtime,'Y/M/D h:m:s')
			 }
			  that.setData({
				  list:a.data	
			  })
		  }
		  })
	},
	toggleCass:function(e){
		var that = this;
		this.setData({cont_active:!false})
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
