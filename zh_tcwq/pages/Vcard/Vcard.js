var app = getApp();

Page({
    data: {
        index: 0,
        types: 1,
		djss:0,
		zx:[{icon: "",
			id: "1",
			sort: "0",
			time: "2020-11-25 22:39:49",
			type_name: "瓶片瓶报价",uniacid: "3"},
			{icon: "",
			id: "2",
			sort: "0",
			time: "2020-11-25 22:39:49",
			type_name: "颗粒报价",uniacid: "3"},{icon: "",
			id: "3",
			sort: "0",
			time: "2020-11-25 22:39:49",
			type_name: "其他报价",uniacid: "3"}]
    },
    onLoad: function(e) {
       var r = this;
       app.util.request({

           url: "entry/wxapp/MyCardList",
           cachetime: "0",
           success: function(e) {
               console.log(e)
       		r.setData({
                   zx: e.data.data
               });
           }
       });  
	 },
	 vcardInfo:function(e){
		 var that= this;
		 let user_id = wx.getStorageSync('users').id;
		  var t = e.currentTarget.dataset.id;
		 wx.navigateTo({
		   url: "../saveFile/saveFile?id=" + t,
		   success: function(e) {},
		   fail: function(e) {},
		   complete: function(e) {}
		 });
	 }
   });