// miniprogram/pages/mine/myPublished/mypublished.js
const db = wx.cloud.database()
const app = getApp()
import Dialog from '/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    published_data: [],
    userid: ''
  },
  getData: function () {
    db.collection("published_list").where({
      task_publisher: app.globalData.userid
    })
      .get().then((res) => {
        // console.log("成功", res.data)
        this.setData({
          published_data: res.data
        })
      })
  },
  undo: function(e) {
    let task_id = e.currentTarget.dataset['task_id'];
    let task_status = e.currentTarget.dataset['task_status'];
    if(task_status != 0) {
      Dialog({
        title: '不可删除此任务',
        message: '只有未被接受的任务可执行删除，已接受但尚未完成的任务请联系接受者取消',
      })
    }
    else{
      Dialog.confirm({
        title: '取消任务',
        message: '取消后他们将无法看见此任务，确认取消任务？',
      }).then(()=> {
        db.collection("published_list").doc(task_id).remove().then((res) => {
            this.getData()
          })
      })
    }
  },
  myPublish_detail: function (e) {
    console.log(e.currentTarget)
    wx.navigateTo({
      url: '/pages/mine/myPublished/myPublish_detail/myPublish_detail?task_id='+ e.currentTarget.dataset['task_id'],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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