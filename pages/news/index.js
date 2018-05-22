//index.js
var Util = require('../../utils/util.js')
var NewsUtil = require('../../utils/news.js')

var pageSize = 5
var page = 1
var pagetotal = 100

//获取应用实例
var app = getApp()
Page({
  data: {
    newss: [],
    tmpcon: {},
    isLoading: false,
    hasMore: true
  },

  // 加载数据
  fetchData: function (empty) {
    if (this.data.isLoading) {
      return
    }

    if (!this.data.hasMore) {
      return
    }

    this.setData({ isLoading: true })

    Util.request('news', 'GET', {
      limit: pageSize,
      skip: pageSize * (page - 1)
    }, res => {
      let items = res.data.items.map(item => {
        return NewsUtil.format(item, this)
      })
      let arr = (empty ? [] : this.data.newss)
      arr = (empty ? [] : this.data.newss).concat(items)
      pagetotal = res.data.count
      this.setData({
        newss: arr,
        hasMore: pagetotal > pageSize * page
      })
    }, () => {
      this.setData({
        isLoading: false
      })
      wx.stopPullDownRefresh()
    })
  },

  onLoad: function () {
    this.fetchData()
  },

  // 触底
  onReachBottom: function () {
    page += 1
    this.fetchData()
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    page = 1
    this.fetchData(true)
  }
})
