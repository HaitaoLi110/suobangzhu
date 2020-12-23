var util = require("../../utils/util.js"), app = getApp();

Page({
    data: {
        Return: !1,
		groupid:""
    },
    bindGetUserInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg && (this.setData({
            hydl: !1
        }), this.changeData());
		let temps = wx.wx.getStorageSync("tempID")
		if(temps){
			util.getMessageNum(0)
		}
		
    },
    changeData: function() {
        var n = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(t) {
                        app.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: wx.getStorageSync("openid"),
                                img: t.userInfo.avatarUrl,
                                name: t.userInfo.nickName
                            },
                            success: function(t) {}
                        });
                        var e = t.userInfo;
                        n.setData({
                            avatarUrl: e.avatarUrl,
                            nickName: e.nickName
                        });
                    }
                }) : (console.log("未授权过"), n.setData({
                    hydl: !0
                }));
            }
        });
    },
   tuiSong:function(){
	   var e =this;
	   let openid = wx.getStorageSync("openid");
	   let users = wx.getStorageSync("users")
	   app.util.request({
	       url: "entry/wxapp/SYMbInfo",
	       data: {
	           openid: openid,
			   id:users.id
	       },
	       success: function(t) {
			   if(t.data){
				   wx.setStorageSync('tempID', t.data) 
			   }
			   
		   }
		 })
   },
   open_hy:function(){
	   var e = this;
	   var openid = wx.getStorageSync("openid")
	   //获取会员状态
	   app.util.request({
	       url: "entry/wxapp/UserGroupInfo",
	       cachetime: "30",
	       data: {
	           openid: openid
	       },
	       success: function(t) {
	   		if(!t.data.groupid){
	   			wx.showModal({
	   			    title: "开通会员",
	   			    content: "是否继续开通会员",
	   			    showCancel: !0,
	   			    cancelText: "取消",
	   			    confirmText: "确定",
	   			    success: function(t) {
	   					if(t.cancel){
	   						return false;
	   					}else{
	   						wx.navigateTo({
	   					    url: "../hydj/hydj",
	   					    success: function(t) {},
	   					    fail: function(t) {},
	   					    complete: function(t) {
	                             
	                           }
	   					});
	   					}
	   					
	   				},
	   			    fail: function(t) {
	   					
	   				},
	   			    complete: function(t) {
	   					
	   				}
	   		});
	   		
	       }else{
	   		e.setData({
	   			groupid:t.data.title
	   		})
	   	}
	   	
	   	
	   	}
	   	
	   })
   },
	onLoad: function(t) {
		console.log("sf"+t)
        var e = this, n = getCurrentPages();
		var openid = wx.getStorageSync("openid")
        n.route = "zh_tcwq/pages/logs/index", 1 == e.data.Return && n.setData({
            Return: !0
        }), app.pageOnLoad(this), app.setNavigationBarColor(this), this.changeData();
        var o = wx.getStorageSync("System").bq_name, a = wx.getStorageSync("System").bq_logo, c = wx.getStorageSync("user_info");
        console.log(c);
        var i = wx.getStorageSync("store"), s = wx.getStorageSync("url");
        console.log(i), e.setData({
            store: i,
            url: s,
            System: wx.getStorageSync("System"),
            support: o,
            bq_logo: a
        }), e.setData({
            avatarUrl: c.avatarUrl,
            nickName: c.nickName
        });
		e.tuiSong()
		
	//获取会员状态
	var e = this;
	var openid = wx.getStorageSync("openid")
	//获取会员状态
	app.util.request({
	    url: "entry/wxapp/UserGroupInfo",
	    cachetime: "30",
	    data: {
	        openid: openid
	    },
	    success: function(t) {
			if(t.data.title){
				e.setData({
					groupid:t.data.title
				})
			}
			
		}
	})
		
    },
    collection: function(t) {
        wx.navigateTo({
            url: "../Collection/Collection"
        });
    },

  
    jfsc: function() {
        wx.navigateTo({
            url: "../typeP/typeP?showMy=true"
        });
    },
  

    my_post: function(t) {
        wx.navigateTo({
            url: "../mypost/mypost",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
 
  
    help: function(t) {
        wx.navigateTo({
            url: "promelText",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    ptgl: function() {
        wx.navigateTo({
            url: "../extra/ptgly/bbaa"
        });
    },
    wallet: function(t) {
        wx.navigateTo({
            url: "income",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
 
    myInfo: function(t) {
     wx.navigateTo({
         url: "../settled/settled"
     });
    },
    jump: function(t) {
        wx.navigateToMiniProgram({
            appId: wx.getStorageSync("System").tz_appid,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                console.log("跳转成功"), console.log(t);
            }
        });
    },
    about: function(t) {
        wx.navigateTo({
            url: "system",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "30",
            data: {
                user_id: t
            },
            success: function(t) {
				console.log('s555555')
                console.log(t), e.setData({
                    UserInfo: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyCollection",
            cachetime: "30",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    MyCollection: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(t) {
                console.log("签到设置", t), e.setData({
                    qdset: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyDistribution",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    MyDistribution: t.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});