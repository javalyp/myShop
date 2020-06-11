import base from './baseUrl.js'

let ajaxTimes = 0 //定义发送请求的次数
module.exports = function(params) {
    ajaxTimes++
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    return new Promise(function(resolve, reject) {
        wx.request({
            ...params,
            url: base.baseURL + params.url,
            success: function(res) {
                resolve(res.data)
            },
            fail: function(res) {
                reject(res.data)
            },
            complete: function() {
                ajaxTimes--
                if (ajaxTimes === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}