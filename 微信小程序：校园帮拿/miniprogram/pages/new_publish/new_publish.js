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
        task_accepter_contact_qq: '',
        task_accepter_contact_wechat: '',
        task_accepter_contact_tel: '',
        task_publisher: app.globalData.userInfo.userid,
        task_img_url: app.globalData.userInfo.avatarUrl
      }
    })
      .then(res => {
        console.log(res)
      })
  },
  confirm_publish: function () {
    let numReg = /^[0-9]+(\.[0-9]{1,2})?$/ // 验证是否是数字
    let qqReg = /^\d{5,10}$/
    let telReg = /^\d{11}$/
    // let timeReg = new RegExp('^\d{4}-\d{1,2}-\d{1,2}')
    let timeReg = /^\d{4}-\d{1,2}-\d{1,2}/  //验证时间格式
    if(this.data.task_title === '') {
      Toast({
        message: '请填写标题',
        forbidClick: true,
      });
    }
    else if(!timeReg.test(this.data.task_description) || this.data.task_description === '') {
      console.log(timeReg.test(this.data.task_description))
     if (this.data.task_description === '') {
        Toast({
        message: '请填写任务时间',
        forbidClick: true,
      });
    }
      else if (!timeReg.test(this.data.task_description)) {
        Toast({
          message: '请正确填写任务时间',
          forbidClick: true,
        });
      }
    }
    else if(this.data.task_detail === '') {
      Toast({
        message: '请填写任务详情',
        forbidClick: true,
      });
    }
    else if(!numReg.test(this.data.task_price) || this.data.task_price === '') {
      if(!numReg.test(this.data.task_price)) {
        Toast({
          message: '请正确填写打赏价格(数字)',
          forbidClick: true,
        });
      }
      else{
        Toast({
          message: '请填写打赏价格',
          forbidClick: true,
        });
      }
    }
    else if((!qqReg.test(this.data.task_contact_qq)) && this.data.task_contact_wechat ==='' && (!telReg.test(this.data.task_contact_tel))) {
    //  if (!qqReg.test(this.data.task_contact_qq)) {
    //    Toast({
    //      message: '正确填写QQ号',
    //      forbidClick: true,
    //    });
    //  }
     if (!telReg.test(this.data.task_contact_tel)) {
       Toast({
         message: '正确填写手机号',
         forbidClick: true,
       });
     }
     else{
      Toast({
        message: '请填写至少一种联系方式',
        forbidClick: true,
      });
     }
    }
    else{
      this.addData()
      Toast.loading({
        message: '发布中',
        forbidClick: true,
        onClose: () => {
          wx.navigateBack({   //然后返回上一个页面
            delta: 1
          })      
        },
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