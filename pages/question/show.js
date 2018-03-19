// pages/question/add.js
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: '<div>  Hello&nbsp;World!</div>'
      }]
    }]
  },
  tap() {
    console.log('tap')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    /**
     * 初始化emoji设置
     */
    wx.request({
      url: 'http://bn.sjy/wx_question/' + options.id,//仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',// 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.data.status === 'success') {
          WxParse.emojisInit('[]', "/wxParse/emojis/", {
            "00": "00.gif",
            "01": "01.gif",
            "02": "02.gif",
            "03": "03.gif",
            "04": "04.gif",
            "05": "05.gif",
            "06": "06.gif",
            "07": "07.gif",
            "08": "08.gif",
            "09": "09.gif",
            "09": "09.gif",
            "10": "10.gif",
            "11": "11.gif",
            "12": "12.gif",
            "13": "13.gif",
            "14": "14.gif",
            "15": "15.gif",
            "16": "16.gif",
            "17": "17.gif",
            "18": "18.gif",
            "19": "19.gif",
          });
          var article = res.data.data.content_paragraph;
          WxParse.wxParse('article', 'html', article, that, 5);
          that.setData({
            question: res.data.data,

          })

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