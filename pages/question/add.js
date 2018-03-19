// pages/question/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '推荐', value: 'c' },
      { name: '头条', value: 'h' },
      { name: '加粗', value: 'b' },
      { name: '特荐', value: 'a' },
      { name: '幻灯', value: 'f' },
    ],
    type_list: {},
    from_data: {
      question: '',
      flag: [],
      content_paragraph: '',
      type_id: '',
      type_name: ''
    }
  },
  checkboxChange: function (e) {
    this.setData({
      'from_data.flag': e.detail.value
    })
  },
  questionChange: function (e) {
    this.setData({
      'from_data.question': e.detail.value
    })
  },
  content_paragraphChange: function (e) {
    this.setData({
      'from_data.content_paragraph': e.detail.value
    })
  },
  formSubmit: function () {
    wx.request({
      url: 'http://bn.sjy/wx_question',//仅为示例，并非真实的接口地址
      data: this.data.from_data,
      method: "POST",
      header: {
        'content-type': 'application/json',// 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.data.status=='success'){
          wx.navigateBack();
        }else{
          wx.showModal({
            title: res.data.status,
            content: res.data.msg,
            showCancel:false,
          });
        }
        
        console.log(res);
      }
    })
  },
  questiontypeChange: function (e) {
    let index = e.detail.value[0] - 1;
    if (index >= 0) {
      this.setData({
        'from_data.type_id': this.data.type_list[index]['id'],
        'from_data.type_name': this.data.type_list[index]['name']
      });
    }else{
      this.setData({
        'from_data.type_id': '',
        'from_data.type_name': ''
      });
    }
  },
  getQuestionTypeList: function () {
    let _this = this
    wx.request({
      url: 'http://bn.sjy/get_type_list',//仅为示例，并非真实的接口地址
      data: {
        module_type: 'question',
        notgroup: '1'
      },
      method: "GET",
      header: {
        'content-type': 'application/json',// 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res.data.data)
        _this.setData({
          type_list: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestionTypeList();
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