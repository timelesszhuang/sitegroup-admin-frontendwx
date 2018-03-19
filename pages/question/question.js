// pages/question/question.js

var p = 10
var url = 'http://bn.sjy/wx_question';
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: 1,
      rows: p,
    },
    header: {
      'content-type': 'application/json',// 默认值
      'cookie': wx.getStorageSync("sessionid")
    },
    success: function (res) {
      var l =[];
      for (var i = 0; i < res.data.data.rows.length; i++) {
        l.push(res.data.data.rows[i])
      }
      that.setData({
        list: l
      });
      p++;
      that.setData({
        hidden: true
      });
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    GetList(that)
  },
  addquestion() {
    wx.navigateTo({
      url: '../question/add'
    })

  },
  savequestion(event) {
    wx.navigateTo({
      url: '../question/add?id=' + event.target.id
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
    // wx.showNavigationBarLoading()
    // var that = this;
    // setTimeout(() => {
    //   wx.request({
    //     url: 'http://bn.sjy/wx_question',//仅为示例，并非真实的接口地址
    //     data: {
    //       page: 1,
    //       row: 10
    //     },
    //     header: {
    //       'content-type': 'application/json',// 默认值
    //       'cookie': wx.getStorageSync("sessionid")
    //     },
    //     success: function (res) {
    //       setTimeout(function () {
    //         // complete
    //         wx.hideNavigationBarLoading() //完成停止加载
    //         wx.stopPullDownRefresh() //停止下拉刷新
    //       }, 500);
    //       that.setData({
    //         questionlist: res.data.data.rows
    //       })

    //     }
    //   })
    // }, 2000)


    console.log("下拉");
    p = 10;
    this.setData({
      list: [],
    });
    var that = this
    GetList(that)
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    GetList(that)


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(111)
  }
})