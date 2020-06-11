// pages/collect/collect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 1,
                name: "商品收藏",
                isCheck: true
            },
            {
                id: 2,
                name: "品牌收藏",
                isCheck: false
            },
            {
                id: 3,
                name: "店铺收藏",
                isCheck: false
            },
            {
                id: 4,
                name: "浏览足迹",
                isCheck: false
            }
        ],
        collect: []
    },

    // 获取收藏的数据
    getCollect() {
        let collect = wx.getStorageSync('collect')
        this.setData({
            collect
        })
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
        this.getCollect()
    },
})