// miniprogram/pages/homePage/task_detail/task_detail.js
const db = wx.cloud.database()
const app = getApp()
import Dialog from '/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_info: {},
    task_accepter_contact_qq: '',
    task_accepter_contact_wechat: '',
    task_accepter_contact_tel: ''
  },

  accept: function (e) {
    let _this = this
    let task_id = e.currentTarget.dataset['task_id'];
    let task_publisher = e.currentTarget.dataset['task_publisher'];
    if (app.globalData.loginStatus == true) {
      if (app.globalData.userInfo.userid != task_publisher) {
        Dialog.confirm({
          title: '接受任务',
          message: '确认接受任务？',
        })
          .then(() => {
            db.collection("published_list").doc(task_id)
              .get().then((res) => {
                console.log(res)
                if (res.data.task_status == 0) {
                  console.log("成功接受")
                  db.collection('published_list').doc(task_id).update({
                    // data 传入需要局部更新的数据
                    data: {
                      task_status: 1,
                      task_accepter: app.globalData.userid,
                      task_accepter_contact_qq: this.data.task_accepter_contact_qq,
                      task_accepter_contact_wechat: this.data.task_accepter_contact_wechat,
                      task_accepter_contact_tel: this.data.task_accepter_contact_tel,
                    },
                    success: function (res) {
                      _this.getData()
                    }
                  })
                }
              })
          })
          .catch(() => {
            // on cancel
            console.log("取消")
          })
      }
      else {
        Dialog({
          title: '不可接受此任务',
          message: '接自己发布的任务，谁去帮你完成呢？',
        })
      }
    }
    else {
      Dialog({
        title: '请先登录',
        message: '登录之后才可以接受任务',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("published_list").doc(options.task_id).get().then((res) => {
      this.setData({
        task_info: res.data
      })
    })
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