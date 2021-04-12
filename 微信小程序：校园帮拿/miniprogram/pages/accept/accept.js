//index.js
import Dialog from '/@vant/weapp/dialog/dialog'
Page({
  data: {
    published_data: [{
      price: "1",
      desc: "1",
      title: "12"
    }]
  },
  giveup_task: function () {
    Dialog.confirm({
      title: '放弃任务需要发布者确认',
      message: '请与发布者沟通之后确认是否放弃'
    })
    .then(() => {

    })
    .catch(() => {
      
    })
  },
  completed_task: function () {
    Dialog.confirm({
      title: '确认完成？',
      message: '请确认已经完成任务'
    })
    .then(() => {

    })
    .catch(() => {

    })
  },

  onLoad: function () {
  },
})
