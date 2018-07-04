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
        item.con = '非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。非常抱歉地通知大家，前端情报局目前阶段已不再维护，请各位同学将收藏或喜欢的情报通过自己的方式保存下来，目前是支持访问的，只是停止更新。'
        return NewsUtil.format(item, this)
      })
      let arr = (empty ? [] : this.data.newss)
      arr = (empty ? [] : this.data.newss).concat(items)
      pagetotal = res.data.count
      let aritem = arr[0]
      this.setData({
        newss: aritem,
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
    // page += 1
    // this.fetchData()
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    page = 1
    this.fetchData(true)
  }
})
