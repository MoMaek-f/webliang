// miniprogram/pages/new_publish/new_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [
      { navimg: '../../images/class.png', navtext: '快递代取', alias: 'jianjie' },
      { navimg: '../../images/weather.png', navtext: '外卖代取', alias: 'weather' },
      { navimg: '../../images/jiangshi.png', navtext: '跑腿服务', alias: 'jiangshi'},
      { navimg: '../../images/ziliao.png', navtext: '打印服务', alias: 'ziliao'},
      { navimg: '../../images/anpai.png', navtext: '组队邀请', alias: 'date'},
      { navimg: '../../images/jihua.png', navtext: '失物招领', alias: 'jihua'},
      { navimg: '../../images/huodong.png', navtext: '二手交易', alias: 'huodong' },
      { navimg: '../../images/shunfeng.png', navtext: '求助校友', alias: 'renwu' },
    ], 
    navs2: [
      { navimg: '../../images/class.png', navtext: '其他帮助', alias: 'list' },
     
    ],
  },
  onClickBack: function () {
    wx.navigateBack({ delta: 1 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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