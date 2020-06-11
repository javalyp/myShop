import request from '../../utils/promiseRequest.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncWx.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 用户点击授权
    async getUserInfo(e) {
        const { encryptedData, rawData, iv, signature } = e.detail
        const { code } = await login()
        let params = {
            encryptedData,
            rawData,
            iv,
            signature,
            code
        }
        const res = await request({ url: '/api/public/v1/users/wxlogin', data: params, method: 'post' })
        wx.setStorageSync('token', "TESTTOKEN")
        wx.navigateBack({
            delta: 1 // 回退前 delta(默认为1) 页面
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

    },
})