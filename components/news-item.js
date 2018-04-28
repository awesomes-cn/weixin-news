// components/news-item.js
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
    }
  }
})
