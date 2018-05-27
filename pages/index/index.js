//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
data: {

  sercherStorage: [],

    inputValue: "",             //搜索框输入的值  

      StorageFlag: false,         //显示搜索记录标志位

}

 

//获取输入框的输入信息
bindInput: function (e) {
  this.setData({
    inputValue: e.detail.value
  })
},

//清楚输入框数据
clearInput: function() {
  this.setData({
    inputValue: ""
  })
},
//清楚缓存历史并关闭历史搜索框
clearSearchStorage: function () {
  wx.removeStorageSync('searchData')
  this.setData({
    sercherStorage: [],
    StorageFlag: false,
  })
},
//点击缓存搜索列表
tapSercherStorage: function(e) {
  var that = this;
  var index = parseInt(e.currentTarget.id);
  for (var j = 0; j < that.data.sercherStorage.length; j++) {
    if (j == index) {
      //将所选的搜索历史加到搜素框
      this.setData({
        inputValue: that.data.sercherStorage[j].name,
        StorageFlag: false,
      })
    }
  }
  if (this.data.inputValue != '') {
    //请求搜索记录
  }

},  
//打开历史记录列表
openLocationsercher: function(e) {
  this.setData({
    sercherStorage: wx.getStorageSync('searchData') || [],   //调用API从本地缓存中获取数据
    StorageFlag: true,
    listFlag: true,
  })
},
//添加搜索记录并搜索
setSearchStorage: function () {
  //let data;
  var that = this;
  //let localStorageValue = [];
  if (this.data.inputValue != '') {
    //将搜索记录更新到缓存
    var searchData = that.data.sercherStorage;
    searchData.push({
      id: searchData.length,
      name: that.data.inputValue
    })
    wx.setStorageSync('searchData', searchData);
    that.setData({ StorageFlag: false, })

    //请求搜索
    /*wx.request({
      url: '',
      data: {SercherValue:that.data.inputValue,
          SercherTypeNum:that.data.SercherTypeNum,
          typeItem:that.data.typeItem },
      header: {},
      method: '',
      dataType: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })*/
    //wx.navigateTo({
    //  url: '../result/result'
    // })
    // console.log('马上就要跳转了！')
  } else {
    console.log('空白')
  }
  // this.onLoad();
}

