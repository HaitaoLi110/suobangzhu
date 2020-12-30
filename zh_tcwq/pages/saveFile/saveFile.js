var dsq, dsq1, a = getApp();

Page({
    data: {
        imgUrls: [ "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
		 "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
		  "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg" ]
    },
    tggg: function() {
        clearInterval(dsq), clearTimeout(dsq1), wx.reLaunch({
            url: "index"
        });
    },
    jumps: function() {
        wx.navigateTo({
            url: this.data.xtxx.kp_url
        });
    },
    onLoad: function(t) {
        var n = this;
		var user_id = t.id;
		let url = wx.getStorageSync("url");
         a.util.request({
            url: "entry/wxapp/MyCard",
            cachetime: "0",
			data:{
				user_id:user_id
			},
            success: function(t) {
                console.log(t);
                var o = t.data.data[0];
				let zhuying = o.zhuying;
				let companyimg = o.companyimg;
				let chanpinimg = o.chanpinimg;
				if(zhuying && zhuying.length>0){
					zhuying = zhuying.replace(/&quot;/g,"");
					zhuying = zhuying.replace(/\[|]/g,'');
					o.zhuying = zhuying;
				}
				if(companyimg){
					if(companyimg.indexOf(',') != -1){
						companyimg = companyimg.split(',');
						o.companyimg = companyimg;
					}else{
						companyimg = companyimg.split(' ');
						o.companyimg = companyimg;
					}
				}
				if(chanpinimg){
					if(chanpinimg.indexOf(',') !=-1){
						chanpinimg = chanpinimg.split(',');
						o.chanpinimg = chanpinimg;
					}else{
						chanpinimg = chanpinimg.split(',');
						o.chanpinimg = chanpinimg;
					}
				}
				
                n.setData({
                    xtxx: o,
					url:url
                });
               
            }
        });
    },
    maketel: function(t) {
        var o = this.data.xtxx.gs_tel;
        wx.makePhoneCall({
            phoneNumber: o
        });
    },
    location: function() {
        var t = this.data.xtxx.gs_zb.split(","), o = this.data.xtxx;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: o.gs_add,
            name: "位置"
        });
    },
    onReady: function() {},
    onShow: function() {
        a.setNavigationBarColor(this)
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});