const eeui = app.requireModule('eeui');
const stream = app.requireModule('stream');
// import MD5 from 'blueimp-md5'  // 可以引入npm包，当你需要时

import apiList from './api/apis.js'
// root-api
const API_BaseUrl = 'http://10.0.0.140:8080'

Vue.mixin({
    data() {
        return {
        }
    },
    created() {},
    methods: {
        // 全局请求函数
        $fetch(options) {

            // 缓存获取登录token
            let user_token = eeui.getCachesString('user_token');
            let apiUrl = `${API_BaseUrl}${apiList[options.name]}`;

            options.data = options.data || {};

            // 添加自定义全局参数，比如APP版本号
            let versioncode = weex.config.env.appVersion;
            options.data.versioncode = versioncode;

            // 处理get请求
            if (options.methods.toLowerCase() === 'get' && options.data) {
                apiUrl += '?';
                for (let key in options.data) {
                    apiUrl += `&${key}=${options.data[key]}`
                }
            }
            return new Promise((resolve, reject) => {
                stream.fetch({
                    method: options.methods,
                    url: apiUrl,
                    type: 'json',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `token=${user_token}` // 设置cookie
                    },
                    body: JSON.stringify(options.data)
                }, (res) => {
                    if (res.ok && res.status === 200) {
                        let data = res.data || {}
                        // 可根据返回字段全局处理错误
                        // if (data.error === 1) {
                        //    eeui.toast('加载出错了');
                        // }
                        resolve(data);
                    } else {
                        reject(res)
                    }
                });
            })
        }
    }
});