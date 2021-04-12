// miniprogram/pages/homePage/homePage.js
const db = wx.cloud.database()

import Dialog from '/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    published_data: [
      {message: 'foo',},
      {message: 'bar'}
    ],
    // 分享数据
    showShare: false,
    options: [
      [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    ],// 分享数据终

    option1: [
      { text: '全部', value: "all" },
      { text: '今天', value: "today" },
      { text: '指定日期', value: "select" },
    ],
    option2: [
      { text: '价格降序', value: 'a' },
      { text: '价格升序', value: 'b' },
    ],
    value1: "all",
    value2: 'a',

    show: false,
    category_active: 'published',


  },
  addData: function () {
   db.collection("completed_list").add({
    // data 字段表示需新增的 JSON 数据
    data: {
      desc: '帮忙取快递',
      title: '12312',
    }
  })
  .then(res => {
    console.log(res)
  })
  },
  getData: function () {
        db.collection("completed_list")
        .get().then((res) => {
          console.log("成功", res.data)
          this.setData({
            published_data: res.data 
          })
        })
  },
  showShareAction: function () {
    this.setData({
      showShare: true
    })
  },
  closeShareAction: function () {
    this.setData({
      showShare: false
    })
  },
  accept: function () {
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容',
    })
    .then(() => {
      // on confirm
      console.log("确认")
    })
    .catch(() => {
      // on cancel
      console.log("取消")
    })
  },
  new_publish: function () {
    wx.navigateTo({
      url: '/pages/new_publish/new_publish',
    })
  },
  to_task_detail: function () {
    wx.navigateTo({
      url: '/pages/task_detail/task_detail',
    })
  },
  select_date: function (value) {
    console.log(value)
    console.log(this.data.value1,"value1")
    if (value.currentTarget.dataset.detail == 'select'|| value.detail== 'select') {
      this.setData({
        show: true
      })
    }
  },
  onClose_select_date: function () {
    this.setData({
      show: false
    })
  },
  onConfirm_select_date: function () {
    this.setData({
      show: false
    })
  },
  selector: function (e) {
    console.log(e.detail.name)
    if (e.detail.name===0) {
     wx.navigateTo({
       url: '/pages/homePage/indexBar/indexbar',
     })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.addData()
    this.setData({
      published_data: []
    })
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