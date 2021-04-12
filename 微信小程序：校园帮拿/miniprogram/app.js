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
      console.log(this.globalData.userid,res.result.openid)
    }).catch(err => {
      // handle error
    })
  //   wx.login({
  //     success: (res) => {
  //       if (res.code) {    // res.code 是临时登录凭证
  //         wx.request({
  //           url: 'https://api.weixin.qq.com/sns/jscode2session',
  //           data: {
  //             appid:'wx368d3c80463c7ef8',
  //             secret: '2a4d4e6459ace20a22991edaebab5e55',
  //             js_code: res.code,
  //             grant_type: 'authorization_code'
  //           },
  //           success: res => {
  //             let userid = res.data.openid
  //             this.globalData.userid = userid;
  //             this.checkLoginStatus()
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
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
              // _this.setData({
              //   userInfo: res.data[0],
              //   showLoginPopup: false,
              //   loginStatus: true
              // })
              console.log(res.data[0])
              _this.globalData.userInfo = res.data[0]
              _this.globalData.loginStatus = true
            })
        }
      }
    })
  },
})
