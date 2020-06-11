import request from '../../utils/promiseRequest.js';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetail: {},
        isCollect: false //判断商品是否被收藏，默认false
    },
    goodInfo: {},
    // 获取商品详情数据
    async getGoodDetail(goods_id) {
        let params = {
            goods_id
        }
        const res = await request({ url: '/api/public/v1/goods/detail', data: params })
        this.goodInfo = res.message
            // 获取缓存中的收藏数据
        let collect = wx.getStorageSync('collect') || []
            // 判断当前商品是否被收藏
        let isCollect = collect.some(v => v.goods_id === this.goodInfo.goods_id)
        this.setData({
                goodDetail: {
                    goods_name: res.message.goods_name,
                    goods_price: res.message.goods_price,
                    goods_introduce: res.message.goods_introduce.replace(/\.webp/g, '.jpg'),
                    pics: res.message.pics
                },
                isCollect
            })
            // this.goodInfo = this.data.goodDetail
    },
    // 预览图片
    handelPreviewImage(e) {
        const urls = this.goodInfo.pics.map(v => v.pics_mid)
        const index = e.currentTarget.dataset.index
        wx.previewImage({
            current: urls[index], // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
        })
    },

    // 商品加购物车
    handelCartAdd() {
        // 步骤分析 获取缓存中的购物车数据，数组格式
        // 先判断当前购物车中是否存在该数据
        // 已经存在，修改数据，执行购物车的商品数量++，填充回缓存中
        // 不存在   直接给购物车添加一个新元素，带上num属性，填充回缓存
        // toast成功提示
        let cart = wx.getStorageSync('cart') || []
        let index = cart.findIndex(v => v.goods_id === this.goodInfo.goods_id)
        if (index !== -1) {
            // 判断已经存在
            cart[index].num++
        } else {
            // 不存在
            this.goodInfo.num = 1
            this.goodInfo.checked = true
            cart.push(this.goodInfo)
        }
        // 填充为缓存中
        wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        })
    },

    // 点击收藏
    handelSave() {
        let isCollect = false
            // 获取缓存中的收藏数组
        let collect = wx.getStorageSync('collect') || []
            // 判断该商品是否被收藏过
        const index = collect.findIndex(v => v.goods_id === this.goodInfo.goods_id)
            // 如果不存在 则返回-1
        if (index === -1) {
            // 不存在
            collect.push(this.goodInfo)
            isCollect = true
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true
            })
        } else {
            // 存在就删除
            collect.splice(index, 1)
            isCollect = false
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
            })
        }
        // 重新放回缓存
        wx.setStorageSync('collect', collect)
        this.setData({
            isCollect
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getGoodDetail(options.goods_id)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

})