// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: [],
        collectNums: 0
    },

    // 跳转至订单页面
    goorder(e) {
        const { type } = e.currentTarget.dataset
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.showToast({
                title: '您还未授权哦~',
                icon: 'none',
                success: function() {
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/auth/auth'
                        })
                    }, 1000);
                }
            })
            return
        } else {
            wx.navigateTo({
                url: `/pages/order/order?type=${type}`
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        const userInfo = wx.getStorageSync('userInfo')
        const collectNums = wx.getStorageSync('collect').length
        this.setData({ userInfo, collectNums })
    }

})