// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionlist: {},
    row: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(() => {
      wx.request({
        url: 'http://bn.sjy/wx_question',//仅为示例，并非真实的接口地址
        data: {
          page: 1,
          row: that.data.row
        },
        header: {
          'content-type': 'application/json',// 默认值
          'cookie': wx.getStorageSync("sessionid")
        },
        success: function (res) {
          that.setData({
            questionlist: res.data.data.rows
          })
      
        }
      })
    }, 2000)
  },
  addquestion(){
    wx.navigateTo({
      url: '../question/add'
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
    var that = this;
    setTimeout(() => {
      wx.request({
        url: 'http://bn.sjy/wx_question',//仅为示例，并非真实的接口地址
        data: {
          page: 1,
          row: 10
        },
        header: {
          'content-type': 'application/json',// 默认值
          'cookie': wx.getStorageSync("sessionid")
        },
        success: function (res) {
          that.setData({
            questionlist: res.data.data.rows
          })
    
        }
      })
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //wx.startPullDownRefresh()
   
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(111)
  }
})