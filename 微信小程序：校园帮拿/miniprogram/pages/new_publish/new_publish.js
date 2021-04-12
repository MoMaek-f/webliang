import Toast from '/@vant/weapp/toast/toast';
const db = wx.cloud.database()
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_title: '',
    task_detail: '',
    task_description: '',
    task_type: '',
    task_price: '',
    task_contact_qq: '',
    task_contact_wechat: '',
    task_contact_tel: '',
  },
  addData: function () {
    db.collection("published_list").add({
      // data 字段表示需新增的 JSON 数据
      data: {
        task_title:     this.data.task_title,
        task_detail:     this.data.task_detail,
        task_description:     this.data.task_description,
        task_type:     this.data.task_type,
        task_price:     this.data.task_price,
        task_contact_qq:     this.data.task_contact_qq,
        task_contact_wechat:     this.data.task_contact_wechat,
        task_contact_tel:     this.data.task_contact_tel,
        task_status: 0,
        task_accepter: '',
        task_publisher: app.globalData.userInfo.userid,
        task_img_url: app.globalData.userInfo.avatarUrl
      }
    })
      .then(res => {
        console.log(res)
      })
  },
  confirm_publish: function () {
    if(this.data.task_title!=='') {
      this.addData()
      Toast.loading({
        message: '已发布',
        forbidClick: true,
        onClose: () => {
          wx.navigateBack({   //然后返回上一个页面
            delta: 1
          })      
        },
      });
    }
    else{
      Toast.loading({
        message: '请填写信息',
        forbidClick: true,
      });
    }
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