var app = getApp(),
	uploaded = [], //产品
	imgArray = [],
	address = require('../../utils/city.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		id: '4',
		diqu: '广东省, 广州市, 海珠区',
		img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=951406960,1942756478&fm=11&gp=0.jpg",
		name: "影儿",
		user_tel: "15330012134",
		upload_img_length: 0,
		companyimg: [], //公司图片
		imgArray: [],
		chanpinimg: [], //产品图片
		zhuying: '',
		company: '',
		introduce: '',
		upload_img: [],
		images: [],
		lunbo_len: 0,
		hangye:["再生PET","再生颗粒","设备商","物资","其它"],
		menuType: 0,
		begin: null,
		status: 1,
		end: null,
		isVisible: false,
		animationData: {},
		animationAddressMenu: {},
		addressMenuIsShow: false,
		value: [0, 0, 0],
		provinces: [],
		citys: [],
		areas: [],
		province: '',
		city: '',
		area: ''


	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad: function(options) {
		var that = this;
		let users = wx.getStorageSync("users");
		let openid = wx.getStorageSync("openid");
		var t = wx.getStorageSync("url2");
		that.setData({
			url: t
		})
		app.util.request({
			url: "entry/wxapp/Userxx",
			data: {
				openid: openid
			},
			success: function(e) {
				console.log(e), that.setData(e.data.info);
				
				that.setData({
					upload_img:that.data.companyimg,
					images:that.data.chanpinimg
				})
			}
		});

	// 初始化动画变量
	var animation = wx.createAnimation({
	  duration: 500,
	  transformOrigin: "50% 50%",
	  timingFunction: 'ease',
	})
	this.animation = animation;
	// 默认联动显示北京
	var id = address.provinces[0].id
	this.setData({
	  provinces: address.provinces,
	  citys: address.citys[id],
	  areas: address.areas[address.citys[id][0].id],
	})
	console.log(this.data)
	},

	delete: function(e) {
	      console.log(this.data), console.log(imgArray), Array.prototype.indexOf = function(e) {
	          for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
	          return -1;
	      }, Array.prototype.remove = function(e) {
	          var t = this.indexOf(e);
	          -1 < t && this.splice(t, 1);
	      };
	      var t = e.currentTarget.dataset.index, a = this.data.images;
	      imgArray.remove(imgArray[t]), a.remove(a[t]), console.log(a), this.setData({
	          images: a,
	          lunbo_len: a.length
	      });
	  },
	  chooseImage2: function() {
	      var o = this, n = this.data.images;
	      imgArray = [], console.log(o.data);
	      var i = wx.getStorageSync("uniacid"), e = 9 - n.length;
	      0 < e && e <= 9 ? wx.chooseImage({
	          count: e,
	          sizeType: [ "compressed" ],
	          sourceType: [ "album", "camera" ],
	          success: function(e) {
	              wx.showToast({
	                  icon: "loading",
	                  title: "正在上传"
	              });
	              var t = e.tempFilePaths;
	              console.log(t);
	              var a = e.tempFilePaths;
	              n = n.concat(a), console.log(n), o.setData({
	                  images: n,
	                  lunbo_len: n.length
	              }), o.uploadimg({
	                  url: o.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
	                  path: n
	              });
	          }
	      }) : wx.showModal({
	          title: "上传提示",
	          content: "最多上传9张图片",
	          showCancel: !0,
	          cancelText: "取消",
	          confirmText: "确定",
	          success: function(e) {},
	          fail: function(e) {},
	          complete: function(e) {}
	      });
	  },
	  uploadimg: function(e) {
	      var t = this, a = e.i ? e.i : 0, o = e.success ? e.success : 0, n = e.fail ? e.fail : 0;
	      wx.uploadFile({
	          url: e.url,
	          filePath: e.path[a],
	          name: "upfile",
	          formData: null,
	          success: function(e) {
	              "" != e.data ? (console.log(e), o++, imgArray.push(e.data), console.log(a), console.log("上传厂家轮播图时候提交的图片数组", imgArray)) : wx.showToast({
	                  icon: "loading",
	                  title: "请重试"
	              });
	          },
	          fail: function(e) {
	              n++, console.log("fail:" + a + "fail:" + n);
	          },
	          complete: function() {
	              console.log(a), ++a == e.path.length ? (t.setData({
	                  images: e.path
	              }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + o + " 失败：" + n)) : (console.log(a), 
	              e.i = a, e.success = o, e.fail = n, t.uploadimg(e));
	          }
	      });
	  },
	  delete2: function(e) {
	      Array.prototype.indexOf = function(e) {
	          for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
	          return -1;
	      }, Array.prototype.remove = function(e) {
	          var t = this.indexOf(e);
	          -1 < t && this.splice(t, 1);
	      };
	      var t = e.currentTarget.dataset.index, a = this.data.upload_img;
	      uploaded.remove(uploaded[t]), a.remove(a[t]), console.log(a), this.setData({
	          upload_img: a,
	          upload_img_length: a.length
	      });
	  },
	upload_image: function() {
	        var a = this, o = this.data.upload_img;
	        uploaded = [], console.log(o);
	        var n = wx.getStorageSync("uniacid"), e = 9 - o.length;
	        0 < e && e <= 9 ? wx.chooseImage({
	            count: e,
	            sizeType: [ "compressed" ],
	            sourceType: [ "album", "camera" ],
	            success: function(e) {
	                wx.showToast({
	                    icon: "loading",
	                    title: "正在上传"
	                });
	                var t = e.tempFilePaths;
	                o = o.concat(t), console.log(o), a.setData({
	                    upload_img: o,
	                    upload_img_length: o.length
	                }), a.already({
	                    url1: a.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
	                    path1: o
	                });
	            }
	        }) : wx.showModal({
	            title: "上传提示",
	            content: "最多上传9张图片",
	            showCancel: !0,
	            cancelText: "取消",
	            confirmText: "确定",
	            success: function(e) {},
	            fail: function(e) {},
	            complete: function(e) {}
	        });
	    },
	    already: function(e) {
	        var t = this, a = e.j ? e.j : 0, o = e.success ? e.success : 0, n = e.fail ? e.fail : 0;
	        wx.uploadFile({
	            url: e.url1,
	            filePath: e.path1[a],
	            name: "upfile",
	            formData: null,
	            success: function(e) {
	                "" != e.data ? (console.log(e), o++, uploaded.push(e.data), t.setData({
	                    uploaded: uploaded
	                }), console.log(a), console.log("上传厂家介绍时候提交的图片数组", uploaded)) : wx.showToast({
	                    icon: "loading",
	                    title: "请重试"
	                });
	            },
	            fail: function(e) {
	                n++, console.log("fail:" + a + "fail:" + n);
	            },
	            complete: function() {
	                console.log(a), ++a == e.path1.length ? (t.setData({
	                    upload_img: e.path1
	                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + o + " 失败：" + n)) : (console.log(a), 
	                e.j = a, e.success = o, e.fail = n, t.already(e));
	            }
	        });
	    },
	   
	formSubmit: function(e) {
		
		var that = this;
		let msg = e.detail.value;
		let users = wx.getStorageSync("users");
		let u_tel = e.detail.value.user_tel;
		if(u_tel.length>0){
			if (u_tel.length == 11) {
				var myreg = /^1\d{10}$/;
				if (!myreg.test(u_tel)) {
					wx.showToast({
						title: '请输入正确的手机号',
						icon: 'loading',
						duration: 1000
					});
					return;
				}
			} else {
				wx.showToast({
					title: '请输入完整手机号',
					icon: 'loading',
					duration: 1000
				})
				return;
			}
		}
		that.setData({
			companyimg:that.data.upload_img,
			chanpinimg:that.data.images
		})
		app.util.request({
			url: "entry/wxapp/editUserinfo",
			data: {
				user_id: users.id,
				province: '省',
				city: '市',
				county: '县',
				diqu:e.detail.value.diqu,
				user_tel:u_tel,
				zhuying: e.detail.value.zhuying,
				company: e.detail.value.company,
				introduce: e.detail.value.introduce,
				companyimg:that.data.companyimg,
				chanpinimg: that.data.chanpinimg,
			},
			success: function(e) {
				console.log(e), that.setData(e.info);
				wx.showToast({
					title: '提交成功',
					duration: 1000
				})
			}
		});

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

	},
	// 点击所在地区弹出选择框
	selectDistrict: function (e) {
	  var that = this
	  console.log('111111111')
	  if (that.data.addressMenuIsShow) {
	    return
	  }
	  that.startAddressAnimation(true)
	},
	// 执行动画
	startAddressAnimation: function (isShow) {
	  console.log(isShow)
	  var that = this
	  if (isShow) {
	    that.animation.translateY(0 + 'vh').step()
	  } else {
	    that.animation.translateY(40 + 'vh').step()
	  }
	  that.setData({
	    animationAddressMenu: that.animation.export(),
	    addressMenuIsShow: isShow,
	  })
	},
	// 点击地区选择取消按钮
	cityCancel: function (e) {
	  this.startAddressAnimation(false)
	},
	// 点击地区选择确定按钮
	citySure: function (e) {
	  var that = this
	  var city = that.data.city
	  var value = that.data.value
	  that.startAddressAnimation(false)
	  // 将选择的城市信息显示到输入框
	  var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
	  that.setData({
	    areaInfo: areaInfo,
	  })
	},
	hideCitySelected: function (e) {
	  console.log(e)
	  this.startAddressAnimation(false)
	},
	// 处理省市县联动逻辑
	cityChange: function (e) {
	  console.log(e)
	  var value = e.detail.value
	  var provinces = this.data.provinces
	  var citys = this.data.citys
	  var areas = this.data.areas
	  var provinceNum = value[0]
	  var cityNum = value[1]
	  var countyNum = value[2]
	  if (this.data.value[0] != provinceNum) {
	    var id = provinces[provinceNum].id
	    this.setData({
	      value: [provinceNum, 0, 0],
	      citys: address.citys[id],
	      areas: address.areas[address.citys[id][0].id],
	    })
	  } else if (this.data.value[1] != cityNum) {
	    var id = citys[cityNum].id
	    this.setData({
	      value: [provinceNum, cityNum, 0],
	      areas: address.areas[citys[cityNum].id],
	    })
	  } else {
	    this.setData({
	      value: [provinceNum, cityNum, countyNum]
	    })
	  }
	  console.log(this.data)
	}
})
