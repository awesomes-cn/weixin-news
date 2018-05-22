// components/news-item.js
var Util = require('../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    previewImage: function (e) {
      var current = e.currentTarget.dataset.src
      wx.previewImage({
        current: current,
        urls: [current]
      })
    },
    gotoComment: function (e) {
      wx.navigateTo({
        url: '../news/detail?id=' + this.data.item.id
      })
    },
    gotoShare: function (e) {
      wx.navigateTo({
        url: '../news/share?id=' + this.data.item.id
      })
    },

    // 切换喜欢
    switchFavor: function (e) {
      let item = e.currentTarget.dataset.item
     
      Util.request('oper', 'POST', {
        opertyp: 'FAVOR',
        typ: 'NEWS',
        idcd: item.id
      }, res => {
        item.favor = res.data.amount
        item.isFavor = res.data.has
        this.setData({
          item: item
        })
      })
    },

     // 切换收藏
    switchCollect: function (e) {
      let item = e.currentTarget.dataset.item
      Util.request('oper', 'POST', {
        opertyp: 'COLLECT',
        typ: 'NEWS',
        idcd: item.id
      }, res => {
        item.isCollect = res.data.has
        this.setData({
          item: item
        })
      })
    }
  }
})
