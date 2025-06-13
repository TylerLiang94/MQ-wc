// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

/**
 * 主页面逻辑
 */
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    isLoggedIn: false,
    nickname: ''
  },

  /**
   * 页面加载时检查登录状态
   */
  onLoad: function() {
    // 从本地存储获取昵称
    const nickname = wx.getStorageSync('nickname');
    if (nickname) {
      this.setData({
        isLoggedIn: true,
        nickname: nickname
      });
    }
  },

  /**
   * 处理昵称输入
   * @param {Object} e - 输入事件对象
   */
  onNicknameInput: function(e) {
    const nickname = e.detail.value;
    this.setData({
      nickname: nickname
    });
  },

  /**
   * 处理昵称输入完成
   * @param {Object} e - 输入完成事件对象
   */
  onNicknameConfirm: function(e) {
    this.handleLogin();
  },

  /**
   * 处理输入框失去焦点
   * @param {Object} e - 失去焦点事件对象
   */
  onNicknameBlur: function(e) {
    this.handleLogin();
  },

  /**
   * 处理登录逻辑
   */
  handleLogin: function() {
    const nickname = this.data.nickname.trim();
    if (nickname) {
      // 保存昵称到本地存储
      wx.setStorageSync('nickname', nickname);
      
      // 更新页面状态
      this.setData({
        isLoggedIn: true,
        nickname: nickname
      });

      // 显示欢迎提示
      wx.showToast({
        title: '欢迎 ' + nickname,
        icon: 'success',
        duration: 2000
      });
    }
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
