import request from '../../utils/promiseRequest.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperItems: [],
        categoryLists: [],
        floorLists: []
    },
    // 获取banner图
    getSwiperItems() {
        request({ url: '/api/public/v1/home/swiperdata' }).then(res => {
            if (res.meta.status == 200) {
                this.setData({
                    swiperItems: res.message
                })
            }
        })
    },
    // 获取导航分类
    getCategoryLists() {
        request({ url: '/api/public/v1/home/catitems' }).then(res => {
            if (res.meta.status == 200) {
                this.setData({
                    categoryLists: res.message
                })
            }
        })
    },
    // 获取楼层数据
    getFloorLists() {
        request({ url: '/api/public/v1/home/floordata' }).then(res => {
            if (res.meta.status == 200) {
                this.setData({
                    floorLists: res.message
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getSwiperItems()
        this.getCategoryLists()
        this.getFloorLists()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})