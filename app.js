//app.js
var Util = require('./utils/util.js')

// 获取当前的用户信息
let fetchMemInfo = (that, cb) => {
  Util.request('session', 'GET', {}, res => {
    that.globalData.session = res.data
  })
}

App({
  onLaunch: function () {
    let that = this
    var session = wx.getStorageSync('session')
    if (session) {
      that.globalData.session = session
      return
    }
    wx.login({
      success: function (lores) {
        if (lores.code) {
          wx.getUserInfo({
            success: function (res) {
              Util.request('auth/wxsp', 'POST', {
                code: lores.code,
                info: res.userInfo
              }, res => {
                that.globalData.session = {
                  token: res.data.token
                }
                fetchMemInfo(that, function () {
                  wx.setStorageSync('session', that.globalData)
                })
              })
            }
          })
        }
      }
    })
  },
  globalData:{
    userInfo:null
  }
})