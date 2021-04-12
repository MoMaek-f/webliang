const db = wx.cloud.database()
const app = getApp()
 
Page({
  data: {
    username: '',
    password: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
    signup: function () {
    wx.navigateTo({
      url: '/pages/login/signup/signup',
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.hideTabBar({})
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.loginRequest()
    }
  },
  loginRequest: function () {
    db.collection('user_info')
    .where({
      user_name: this.data.username,
      user_password: this.data.password
    })
    .get().then((res) => {
      if (res.data[0] == undefined) {
        console.log("用户名不存在或密码错误")
      }
      else{
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          login_status: {
            islogin: true,
            login_username: "小亮"
          }
        })
        wx.setStorage({
          key:"login_status",
          data: true
        })
        wx.getStorage({
          key: 'login_status',
          success (res) {
            console.log(res.data,"res.data")
          },
          complete(res) {
            console.log(res,"res.data2")
          }
        })
        wx.navigateBack({ delta: 1 })
      }
    })
},
})