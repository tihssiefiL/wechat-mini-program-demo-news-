//index.js
//获取应用实例
const app = getApp()
const apiKey = '&appkey=d5ce053479913ce6415de573f1103e75'
const channelApi = 'https://way.jd.com/jisuapi/channel?'
const newsApi = 'https://way.jd.com/jisuapi/get?'
const searchNewsApi = 'https://way.jd.com/jisuapi/newSearch?'
Page({
  data: {
    currChannelIndex: 0,
    currChannelName: '头条',
    channels: [],
    news: [],
    num:15,
    start:0,
    myNews: {
      keyword: '新闻',
      channel: '头条',
      num: 15,
      start: 0
    }
  },
  onLoad: function() {
    this.getChannel()
    this.getNews()
    // console.log(this.getChannelApi())
    // console.log(this.getNewsApi())
    // console.log(this.getSearchNewsApi())

  },
  onShow: function() {},
  getChannel: function() {
    this.http(this.getChannelApi())
      .then(data => {
        this.setData({
          channels: data.data.result.result
        })
      })
      .catch(err => {
        console.error(err)
      })
  },
  getNews: function() {
    this.http(this.getNewsApi())
      .then(data => {
        // news = this.data.news
        this.setData({
          news: data.data.result.result.list
        })
        wx.setStorageSync(this.data.currChannelName, data.data.result.result.list)
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.info(err)
      })
  },
  searchNwes: function() {
    wx.request({
      url: this.getSearchNewsApi(),
      success: (res) => {}
    })
  },
  getChannelApi: function() {
    return channelApi + apiKey
  },
  getNewsApi: function() {
    return newsApi + 'channel=' + this.data.currChannelName + '&num=' + this.data.num + '&start=' + this.data.start + apiKey
  },
  getSearchNewsApi: function() {
    return newsApi + 'keyword=' + this.data.myNews.keyword + apiKey
  },
  changeChannel: function(e) {
    console.log(e.target.dataset.index)
    console.log(this.data.currChannelIndex)
    if (e.target.dataset.index != this.data.currChannelIndex) {
      this.setData({
        currChannelIndex: e.target.dataset.index,
        currChannelName: this.data.channels[e.target.dataset.index]
      })
      console.log(this.data.currChannelName)
      console.log(wx.getStorageSync(this.data.currChannelName))
      this.getNews()
    } else {
      console.log('未切换')
    }
  },
  http: app.http,
  chackNews: function (e) {
    let newsIndex = e.currentTarget.dataset.index
    console.log(newsIndex)
    wx.setStorage({
      key: 'currnews',
      data: this.data.news[newsIndex],
    })
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },
  onPullDownRefresh: function () {
    this.getNews()
  },
  onReachBottom: function () {
    this.setData({
      start: this.data.start + this.data.num
    })
    this.getNews()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  }
})