import request from '../../utils/promiseRequest.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                name: '综合',
                isCheck: true
            },
            {
                id: 1,
                name: '销量',
                isCheck: false
            },
            {
                id: 2,
                name: '价格',
                isCheck: false
            }
        ],
        goodsList: [],
    },
    queryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1, //总页数
    // 切换tab事件
    handleTabChange(e) {
        const index = e.detail
        let tabs = this.data.tabs
        tabs.forEach((t, idx) => {
            idx === index ? t.isCheck = true : t.isCheck = false
        })
        this.setData({
            tabs
        })
    },
    async getGoodLists() {
        const res = await request({ url: '/api/public/v1/goods/search', data: this.queryParams })
        const totalCount = res.message.total //获取总条数
        this.totalPages = Math.ceil(totalCount / this.queryParams.pagesize) //计算总页数
        this.setData({
                goodsList: [...this.data.goodsList, ...res.message.goods]
            })
            //  获取数据赋值成功后关闭下拉刷新，如果没有调用下拉也不会报错
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取传入的分类id，并赋值给查询条件数组的cid字段
        this.queryParams.cid = options.cid || ""
        this.queryParams.query = options.query || ""
        this.getGoodLists()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        // 先将商品列表数组置为空
        this.setData({
            goodsList: []
        })
        this.queryParams.pagenum = 1
        this.getGoodLists()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.queryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '已经到底了~',
                icon: 'none'
            })
        } else {
            this.queryParams.pagenum++ //当前页码+1
                this.getGoodLists()
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
})