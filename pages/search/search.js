import request from '../../utils/promiseRequest.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFoucs: false,
        inputValue: ''
    },
    timeId: -1,

    // 获取商品信息
    async getGoods(query) {
        const res = await request({ url: '/api/public/v1/goods/qsearch', data: { query } })
        this.setData({
            goods: res.message
        })
    },

    // 输入框输入内容事件
    handelSearchinput(e) {
        const { value } = e.detail
        if (!value.trim()) {
            this.setData({ goods: [], isFoucs: false, inputValue: '' })
            return
        }
        this.setData({ isFoucs: true, inputValue: value })
        clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
            this.getGoods(this.data.inputValue)
        }, 1000)
    },

    // 点击取消按钮
    handelCanel() {
        this.setData({ inputValue: '', goods: [], isFoucs: false })
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

    },
})