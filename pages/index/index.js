//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  tapName: function (event) {
    wx.request({
      url: 'http://apibeta.salesman.cc/article', //仅为示例，并非真实的接口地址
      data: {
        page: 1,
        row: 10,
      },

      header: {
        'content-type': 'application/json',// 默认值
        'cookie': wx.getStorageSync("sessionid")

      },
      success: function (res) {
        wx.setStorageSync("sessionid", res.header["Set-Cookie"])
        console.log(res.header["Set-Cookie"])
      }
    })
  },
  toast: function () {
    wx.navigateTo({
      url: '../content/content'
    })
  },
  formSubmit: function (e) {
    wx.request({
      url: 'http://apibeta.salesman.cc/login', //仅为示例，并非真实的接口地址
      data: {
        user_name: 'ribsrice',
        password: 'admin123',
        verify_code: 'dasd',
        login_type: 'node',
        remember: true,

      },
      method: 'POST',
      header: {
        'content-type': 'application/json',// 默认值
        'cookie': wx.getStorageSync("sessionid")

      },
      success: function (res) {
        console.log(res.data.msg)
        wx.setStorageSync("sessionid", res.header["Set-Cookie"])
        console.log(res.header["Set-Cookie"])
        wx.showModal({
          content: res.data.msg,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getopenid: function () {
    wx.login({
      success: function (res) {
        console.log(res)
      }
    });
  },

})
