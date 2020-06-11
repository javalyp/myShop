// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 点击登录
    handelGetUserInfo(e) {
        const { userInfo } = e.detail
            // 放入缓存
        wx.setStorageSync('userInfo', userInfo)
            // 回到上一页面
        wx.navigateBack({
            delta: 1
        })
    }
})