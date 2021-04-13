App({
  globalData: {
    userInfo: null,
    userid: null,
    loginStatus: false
  },

  // 页面加载时
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'ftl-l73vu',
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'login',
      // 传递给云函数的event参数
    }).then(res => {
      let userid = res.result.openid
      this.globalData.userid = userid;
      this.checkLoginStatus()
    }).catch(err => {
      // handle error
    })
  },
  checkLoginStatus: function () {
    const db = wx.cloud.database()
    let _this = this;
    wx.getStorage({
      key: _this.globalData.userid,
      success(res) {
        if (res.data == true) {
          db.collection("user_info").where({
            userid: _this.globalData.userid
          })
            .get().then((res) => {
              _this.globalData.userInfo = res.data[0]
              _this.globalData.loginStatus = true
            })
        }
      }
    })
  },
})
