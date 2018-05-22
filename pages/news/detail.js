// pages/news/detail.js
var Util = require('../../utils/util.js')
var NewsUtil = require('../../utils/news.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null,
    nid: 0,
    comments: []
  },

  fetchData: function () {
    let newsID = this.data.nid
    Util.request('news/' + newsID, 'GET', {}, res => {
      this.setData({
        news: NewsUtil.format(res.data, this)
      })
    }, () => {
      wx.stopPullDownRefresh()
    })
  },

  fetchComments: function () {
    Util.request('comment?typ=NEWS&idcd=' + this.data.nid, 'GET', {}, res => {
      this.setData({
        comments: res.data.items.map(item => {
          return NewsUtil.formatComment(item, this)
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nid: options.id
    })
    this.fetchData()
    this.fetchComments()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(getApp().globalData)
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