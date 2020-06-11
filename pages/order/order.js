import request from '../../utils/promiseRequest.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                typeId: 1,
                name: "全部订单",
                isCheck: true
            },
            {
                typeId: 2,
                name: "待付款",
                isCheck: false
            },
            {
                typeId: 3,
                name: "待发货",
                isCheck: false
            },
            {
                typeId: 4,
                name: "退货/退款",
                isCheck: false
            }
        ]
    },

    // 封装选项切换
    changeTabs(index) {
        let tabs = this.data.tabs
        tabs.forEach((v, i) => {
            i === index ? v.isCheck = true : v.isCheck = false
        });
        this.setData({ tabs })
    },

    // 点击切换选项
    handelItemChange(e) {
        // console.log(e.detail);
        const index = e.detail
        this.changeTabs(index)
        this.getOrderList(index + 1)
    },

    //  获取订单列表
    async getOrderList(type) {
        const token = wx.getStorageSync('token')
        const header = { Authorization: token }
        const res = await request({ url: '/api/public/v1/my/orders/all', data: { type }, header })
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
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return
        }
        let pages = getCurrentPages()
        const { type } = pages[pages.length - 1].options
            // 索引index = type - 1
        this.changeTabs(type - 1)
        this.getOrderList(type)
    }
})