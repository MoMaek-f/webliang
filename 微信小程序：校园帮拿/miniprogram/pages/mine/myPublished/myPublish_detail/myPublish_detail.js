const db = wx.cloud.database()
const app = getApp()
import Dialog from '/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_info: [],
    task_contact_wechat:'',
    task_contact_qq:'',
    task_contact_tel:''
  },
  getdata: function () {
  },
  onChangeqq: function (e) {
        this.setData({
          task_contact_qq: e.detail
        })
  },
  onChangewechat: function (e) {
        this.setData({
          task_contact_wechat: e.detail
        })
  },
  onChangetel: function (e) {
        this.setData({
          task_contact_tel: e.detail
        })
  },
  update: function (e) {
    let _this = this
    let task_id = e.currentTarget.dataset['task_id'];
    Dialog.confirm({
      title: '确认修改嘛？',
      message: '请确认输入内容'
    })
      .then(() => {
              db.collection('published_list').doc(task_id).update({
                data: {
                  task_contact_wechat: _this.data.task_contact_wechat==''?_this.data.task_info.task_contact_wechat:_this.data.task_contact_wechat,
                  task_contact_qq: _this.data.task_contact_qq==''?_this.data.task_info.task_contact_qq:_this.data.task_contact_qq,
                  task_contact_tel: _this.data.task_contact_tel==''?_this.data.task_info.task_contact_tel:_this.data.task_contact_tel,
                },
                success: function(res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
          }).catch(() => {
            // on cancel
            console.log("取消")
          })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
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
    this.getdata()
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