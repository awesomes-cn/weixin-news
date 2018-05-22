//app.js
var Util = require('./utils/util.js')

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    let that = this
    var token = wx.getStorageSync('token')
    if (token) {
      that.globalData.token = token
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
                that.globalData.token = res.data.token
                wx.setStorageSync('token', res.data.token)
              })
            }
          })
        }
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (lores) {
          // if (res.code) {
          //   //发起网络请求
          //   wx.request({
          //     url: 'https://test.com/onLogin',
          //     data: {
          //       code: res.code
          //     }
          //   })
          // } else {
          //   console.log('登录失败！' + res.errMsg)
          // }
          // wx.getUserInfo({
          //   success: function (res) {
          //     that.globalData.userInfo = res.userInfo
          //     typeof cb == "function" && cb(that.globalData.userInfo)
          //   }
          // })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})