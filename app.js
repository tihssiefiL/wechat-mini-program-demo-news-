//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    
  },
  http: function (url) {
    return new Promise(function (resolve, reject) {
      wx.showLoading({
        title: 'Loading'
      })
      wx.request({
        url,
        success: (res) => {
          resolve(res)
          wx.hideLoading()
        },
        fail: (err) => {
          reject(err)
          wx.hideLoading()
        }
      })
    })
  }
})