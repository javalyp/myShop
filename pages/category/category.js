// pages/category/category.js
import request from '../../utils/promiseRequest.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftCates: [],
        rightContents: [],
        // 被点击的左侧菜单
        currentIndex: 0,
        scrollTop: 0
    },
    // 定义数组接收分类及内容所有数据
    Cates: [],
    async getCates() {
        // request({ url: '/api/public/v1/categories' }).then(res => {
        //     // 为大数组赋值
        //     this.Cates = res.message
        //         // 将Cates存入本地缓存
        //     wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
        //         // 通过大数组赋值给左侧分类
        //     let leftCates = this.Cates.map(v => v.cat_name)
        //         // 通过大数组赋值给右侧内容块
        //     let rightContents = this.Cates[0].children
        //     this.setData({
        //         leftCates,
        //         rightContents
        //     })
        // })
        const res = await request({ url: '/api/public/v1/categories' })
            // 为大数组赋值
        if (res.meta.status === 200) {
            this.Cates = res.message
                // 将Cates存入本地缓存
            wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
                // 通过大数组赋值给左侧分类
            let leftCates = this.Cates.map(v => v.cat_name)
                // 通过大数组赋值给右侧内容块
            let rightContents = this.Cates[0].children
            this.setData({
                leftCates,
                rightContents
            })
        }

    },
    // 点击分类事件
    handelCate(e) {
        const index = e.currentTarget.dataset.index
            // 根据选择的分类存取右侧商品内容
        let rightContents = this.Cates[index].children
        this.setData({
            // 赋值给被点击的左侧菜单索引值
            currentIndex: index,
            rightContents,
            scrollTop: 0
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const localCates = wx.getStorageSync('cates')
            // 如果本地不存在
        if (!localCates) {
            // 通过网络获取
            this.getCates()
        } else {
            // 本地存在。。。继续判断是否过期
            if (Date.now() - localCates.time > 1000 * 10) {
                this.getCates()
            } else {
                this.Cates = localCates.data
                let leftCates = this.Cates.map(v => v.cat_name)
                let rightContents = this.Cates[0].children
                this.setData({
                    leftCates,
                    rightContents
                })
            }
        }
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