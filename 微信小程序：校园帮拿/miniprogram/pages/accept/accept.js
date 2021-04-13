const db = wx.cloud.database()
const app = getApp()
import Dialog from '/@vant/weapp/dialog/dialog'
Page({
  data: {
    published_data: [],
    userid: ''
  },
  getData: function () {
    db.collection("published_list").where({
      task_status : 1,
      task_accepter: app.globalData.userid
    })
      .get().then((res) => {
        // console.log("成功", res.data)
        this.setData({
          published_data: res.data
        })
      })
  },
  giveup_task: function (e) {
    let _this = this
    let task_id = e.currentTarget.dataset['task_id'];
    Dialog.confirm({
      title: '放弃任务需要发布者确认',
      message: '请与发布者沟通之后确认是否放弃'
    })
      .then(() => {
        console.log("确认")
        db.collection("published_list").doc(task_id)
          .get().then((res) => {
            console.log(res)
            if (res.data.task_status == 1) {
              console.log("成功放弃")
              db.collection('published_list').doc(task_id).update({
                // data 传入需要局部更新的数据
                data: {
                  task_status: 0,
                  task_accepter: ''
                },
                success: function(res) {
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
  },
  completed_task: function (e) {
    let _this = this
    let task_id = e.currentTarget.dataset['task_id'];
    Dialog.confirm({
      title: '确认完成？',
      message: '请确认已经完成任务'
    })
      .then(() => {
        console.log("确认")
        db.collection("published_list").doc(task_id)
          .get().then((res) => {
            console.log(res)
            if (res.data.task_status == 1) {
              console.log("成功放弃")
              db.collection('published_list').doc(task_id).update({
                // data 传入需要局部更新的数据
                data: {
                  task_status: 2
                },
                success: function(res) {
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
  },
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/homePage/task_detail/task_detail?task_id=' + e.currentTarget.dataset['task_id'],
    })
  },
  onPullDownRefresh: function () {
    if (app.globalData.loginStatus == true){
      this.getData()
    }
  },
  onLoad: function () {
    if (app.globalData.loginStatus == true){
      this.getData()
    }
  },
  onShow: function () {
    if (app.globalData.loginStatus == true){
      this.getData()
    }
  }
})
