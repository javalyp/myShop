import request from '../../utils/promiseRequest.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import { requestPayment } from '../../utils/asyncWx.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        receiveInfo: {},
        cartInfo: [],
        totalPrice: 0,
        totalNum: 0
    },

    // 获取收货信息
    getReceive() {
        const receiveInfo = wx.getStorageSync('address')
        this.setData({ receiveInfo })
    },

    // 获取cartInfo信息
    getCart() {
        let cartInfo = wx.getStorageSync('cart') || []
        let totalPrice = 0
        let totalNum = 0
            // 过滤，只存选中了的商品
        cartInfo = cartInfo.filter(v => v.checked)
        cartInfo.forEach(v => {
            // 计算选中的商品的总价和总数量
            totalPrice += v.goods_price * v.num,
                totalNum += v.num
        })
        this.setData({
            cartInfo,
            totalPrice,
            totalNum
        })
    },

    // 支付
    async handelPay() {
        const token = wx.getStorageSync("token")
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return
        }
        // 设置请求头内容
        const header = { Authorization: token }
            // 设置请求体内容
        const order_price = this.data.totalPrice
        const consignee_addr = this.data.receiveInfo
        const cart = this.data.cartInfo
        let goods = []
        cart.forEach(v => goods.push({
            goods_id: v.goods_id,
            goods_number: v.num,
            goods_price: v.goods_price
        }))
        let params = {
                order_price,
                consignee_addr,
                goods
            }
            // 创建订单获取订单号order_number（账号原因无法真实获取）
        const res1 = await request({ url: '/api/public/v1/my/orders/create', data: params, method: 'POST', header })
            // 发起预支付（账号原因无法真实发起）
            // const order_number = res1.message.order_number
        const order_number = "123456789" //此处模拟数据
        let orderParams = {
            order_number
        }
        const res2 = await request({ url: '/api/public/v1/my/orders/req_unifiedorder', data: orderParams, method: 'POST', header })
            // 模拟res2返回的pay的数据
        const pay = {
            nonceStr: '111',
            package: '222',
            paySign: '333',
            signType: 'MD5',
            timeStamp: '1591698962'
        }
        await requestPayment(pay)
            // 查询后台支付状态
        const res3 = await request({ url: '', data: orderParams, method: 'POST', header })
        if (res3.status.code === 200) {
            wx.showToast({
                title: '支付成功',
                icon: 'success'
            })
            let newCart = wx.getStorageSync('cart')
            newCart = newCart.filter(v => !v.checked)
                // 重新填充回缓存
            wx.setStorageSync('cart', newCart)
                // 跳转至订单页面
            wx.navigateTo({
                url: '/pages/order/order'
            })

        } else {
            wx.showToast({
                title: '支付失败',
                icon: 'none'
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
        this.getReceive()
        this.getCart()
    }
})