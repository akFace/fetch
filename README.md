## eeui封装全局请求

#### 安装方法，下载到自己的项目中，放到src目录下


Api：

- method（String）：请求方式，分为GET、POST、HEAD、PUT、DELETE、PATCH。(必须大写)
- name（String）：请求地址，如果已经在api/apis.js下配置了接口的请求别名，则可以直接调用别名。
- url（String）: 如果你不想配置别名，可以直接输入相对路径或者绝对路径来请求。
- data（Object）：请求携带的参数。
- headers（Object）：当前请求的请求头设置。
- then（Promise）：Promise接口返回时候会触发。


### 示例：

```vue
<template>
    <div class="app">
        <text>首页</text>
    </div>
</template>
<style>
.app {
    width: 750px;
    flex: 1;
}
</style>
<script>
const eeui = app.requireModule('eeui');
require("../fetch"); // 导入当前页面

export default {
    data() {
        return {
        }
    },
    created() {
        this.getArticleList()
    },
    methods: {
        getArticleList() {
            let params = {};
            params.size = 10;
            params.page = 1;
            this.$fetch({
                name: 'getArticleList', // api.js文件中的key
                method: 'GET',
                data: params,
            }).then((res) => {
            	// 返回数据
                eeui.alert({
                    title: '温馨提示',
                    message: JSON.stringify(res),
                }, () => {
                });
            }).catch((err) => {
            	console.log(err)
            });
        },
    }
};
</script>

```