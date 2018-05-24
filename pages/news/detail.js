// pages/news/detail.js
var Util = require('../../utils/util.js')
var NewsUtil = require('../../utils/news.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null,
    nid: 270,
    comments: [],
    comcon: ''
  },

  fetchData: function () {
    Util.request('news/' + this.data.nid, 'GET', {}, res => {
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

  // 提交评论
  subcomment: function (e) {
    console.log(this.data.comcon)
    if (this.data.comcon.trim() === '') {
      return false
    }
    Util.request('comment', 'POST', {
      typ: 'NEWS',
      idcd: this.data.news.id,
      con: this.data.comcon
    }, res => {
      let _item = NewsUtil.formatComment(res.data.item, this)
      this.data.comments.push(_item)
      this.setData({
        comments: this.data.comments,
        comcon: ''
      })
    })
  },

  bindinput: function (e) {
    this.setData({
      comcon: e.detail.value
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
    this.fetchData()
    this.fetchComments()
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