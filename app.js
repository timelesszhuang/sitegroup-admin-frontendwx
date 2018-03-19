//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        // console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://bn.sjy/wxlogin',
            data: {
              code: res.code,
            },
            success: function (res) {
              wx.setStorageSync("sessionid", res.header["Set-Cookie"])
              if (res.data.msg == 'not_bind') {
                wx.showToast({
                  title: '请先绑定',
                  icon: 'loading',
                  duration: 2000
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../content/content'
                  })
                }, 2000)
              } else if (res.data.status == 'success') {
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../question/question'
                  })
                }, 2000)
              }

              else {
                wx.showToast({
                  title: '网络错误请稍后重试',
                  icon: 'loading',
                  duration: 2000
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '网络错误请稍后重试',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      failed: res =>{

      }
    })
  },
  globalData: {
    userInfo: null
  }
})