/**
 * promise 形式  login
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

/**
 * promise 形式  requestPayment
 */
export const requestPayment = ({ params }) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...params,
            success: function(res) {
                resolve(res)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}