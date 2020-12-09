var app = getApp();

Page({
    data: {
		label:""
	},
    onLoad: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Mianze",
            success: function(e) {
                console.log(e), a.setData({
                    label: e.data.info.content
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("bzinfo");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});