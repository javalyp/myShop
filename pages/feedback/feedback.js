// pages/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                name: '体验问题',
                isCheck: true
            },
            {
                id: 1,
                name: '商品/商家投诉',
                isCheck: false
            }
        ],
        chooseImgs: [],
        textValue: ''
    },
    onLineImgs: [], //  定义外网图片路径数组
    // 切换tabs
    handelTabChange(e) {
        const index = e.detail
        let { tabs } = this.data
        tabs.forEach((v, i) => i === index ? v.isCheck = true : v.isCheck = false)
        this.setData({ tabs })
    },

    // 用户选择图片
    hendelChooseImg() {
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: (res) => {
                // success
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...res.tempFiles]
                })
            }
        })
    },

    // 点击移除图片
    handleRemoveImg(e) {
        const { index } = e.currentTarget.dataset
        let { chooseImgs } = this.data
        chooseImgs.splice(index, 1)
        this.setData({
            chooseImgs
        })
    },

    // 文本域输入内容事件
    handelInput(e) {
        this.setData({
            textValue: e.detail.value
        })
    },

    // 提交操作
    handleFormSubmit() {
        const { chooseImgs, textValue } = this.data
        if (!textValue.trim()) {
            wx.showToast({
                title: '输入内容不能为空',
                icon: 'none',
                mask: true
            })
            return
        }
        if (chooseImgs.length != 0) {
            chooseImgs.forEach((v, i) => {
                wx.uploadFile({
                    url: 'https://images.ac.cn/Home/Index/UploadAction/',
                    filePath: v.path,
                    name: 'img',
                    success: (res) => {
                        let url = JSON.parse(res.data).url
                        this.onLineImgs.push(url)
                    },
                    fail: function(err) {
                        console.log(err)
                    }
                })
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

    },
})