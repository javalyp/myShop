// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        receiveInfo: {
            name: '',
            address: '',
            phone: ''
        },
        cartInfo: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    // 获取收货地址信息
    getAddress() {
        const that = this
        wx.chooseAddress({
            success(res) {
                that.setData({
                        receiveInfo: {
                            name: res.userName,
                            address: res.cityName + res.countyName + res.detailInfo,
                            phone: res.telNumber
                        }
                    })
                    // 放入缓存中
                wx.setStorageSync('address', that.data.receiveInfo)
            }
        })
    },

    // 添加收货信息
    handelAddReceiveInfo() {
        const _this = this
        wx.getSetting({
            success(res) {
                const scopeAddress = res.authSetting['scope.address']
                if (scopeAddress === false) {
                    wx.openSetting({
                        success() {
                            _this.getAddress()
                        }
                    })
                }
                _this.getAddress()
            }
        })
    },

    // 设置购物车 设置总数量/总价格/全选状态
    setCart(cartInfo) {
        let totalPrice = 0
        let totalNum = 0
        let allChecked = true
        cartInfo.forEach(v => {
            if (v.checked) {
                // 计算选中的商品的总价和总数量
                totalPrice += v.goods_price * v.num,
                    totalNum += v.num
            } else {
                allChecked = false
            }
        })
        allChecked = cartInfo.length !== 0 ? allChecked : false
        this.setData({
                cartInfo,
                allChecked,
                totalPrice,
                totalNum
            })
            // 将设置好的购物车放回缓存
        wx.setStorageSync('cart', cartInfo)
    },

    // 单品选择/反选
    handelCheck(e) {
        const goods_id = e.currentTarget.dataset.id
        let cartInfo = this.data.cartInfo
        let index = cartInfo.findIndex(v => v.goods_id === goods_id)
        if (index !== -1) {
            cartInfo[index].checked = !cartInfo[index].checked
        }
        // 更新各项信息
        this.setCart(cartInfo)
    },

    // 点击全选
    handelAllCheck() {
        // 获取购物车数组及全选状态
        let { cartInfo, allChecked } = this.data
            // 修改全选值
        allChecked = !allChecked
            // 循环cart赋值
        cartInfo.forEach(v => v.checked = allChecked)
            // 重新放回数组
        this.setCart(cartInfo)
    },

    // 编辑数量
    handelNumEdit(e) {
        let { id, operation } = e.currentTarget.dataset
            // 获取原数组
        let cartInfo = this.data.cartInfo
            // 根据id获取要修改的商品索引
        let index = cartInfo.findIndex(v => v.goods_id === id)
            // 需要判断数量是否为0并且执行-的操作
        if (cartInfo[index].num === 1 && operation === -1) {
            // 执行删除操作,先进行是否删除的确认
            wx.showModal({
                title: '提示',
                content: '您是否要删除该商品',
                success: (res) => {
                    if (res.confirm) {
                        cartInfo.splice(index, 1)
                        this.setCart(cartInfo)
                    }
                }
            })
        } else {
            // 修改数量
            cartInfo[index].num += operation
            this.setCart(cartInfo)
        }
    },

    // 点击结算
    handelGoBuy() {
        // 获取接收人信息
        const receiveName = this.data.receiveInfo.name
            // 获取总数量
        const totalCount = this.data.totalNum
        if (!receiveName) {
            wx.showToast({
                title: '收货信息为空',
                icon: 'none'
            })
            return
        }
        if (totalCount === 0) {
            wx.showToast({
                title: '商品信息为空',
                icon: 'none'
            })
            return
        }
        wx.navigateTo({
            url: '/pages/pay/pay',
            success: function(res) {
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
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
        const receiveInfo = wx.getStorageSync('address')
        const cartInfo = wx.getStorageSync('cart') || []
            // const allChecked = cartInfo.length ? cartInfo.every(v => v.checked) : false
        this.setCart(cartInfo)
        this.setData({ receiveInfo })
    }
})