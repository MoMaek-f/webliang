const db = wx.cloud.database()
let app = getApp();
Page({
  // onPullDownRefresh () {
  //   wx.stopPullDownRefresh()
  // },

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showLoginPopup: false,
    loginStatus: false,
    userid: null
  },

  login: function () {
    this.setData({
      showLoginPopup: true
    })
  },
  check_info: function () {
    let _this = this
    wx.navigateTo({
      url: '/pages/mine/personal_info/personal_info',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.data.userInfo })
      }
    })
  },
  history: function () {
    let _this = this
    wx.navigateTo({
      url: '/pages/mine/history/history',
      // success: function(res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.data.userInfo })
      // }
    })
  },
  clickLogin: function () {
    let _this = this

    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'login',
      // 传递给云函数的event参数
    }).then(res => {
      let userid = res.result.openid
      _this.setData({
        userid: res.result.openid
      })
    }).catch(err => {
      // handle error
    })

    wx.getUserProfile({
      desc: '获取用户相关信息',
      success: res => {
        let userInfo = res.userInfo
        db.collection("user_info").where({
          userid: _this.data.userid
        })
          .get().then((res) => {
            console.log("登录成功", res.data)
            if (res.data.length == 0) {
              db.collection("user_info").add({
                data: {
                  userid: _this.data.userid,
                  ...userInfo
                }
              })
                .then(res => {
                  _this.setData({
                    userInfo: res.userInfo,
                    showLoginPopup: false,
                    loginStatus: true
                  })
                })
            }
          })
        _this.setData({
          userInfo: res.userInfo,
          showLoginPopup: false,
          loginStatus: true
        })
        app.globalData.userInfo = { task_publisher: _this.data.userid, ..._this.data.userInfo}
        app.globalData.loginStatus = true
        console.log(app.globalData.userInfo,"???")
        wx.setStorage({
          key: _this.data.userid,
          data: true
        })
      },
    })
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
    this.setData({
      userInfo: app.globalData.userInfo,
      loginStatus: app.globalData.loginStatus
    })
    console.log(app.globalData.userInfo)
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