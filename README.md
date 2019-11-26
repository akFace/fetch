## eeui封装全局请求
#### 用法和eros一模一样，方便使用 - [eros文档](https://bmfe.github.io/eros-docs/#/zh-cn/eros_widget?id=axios%ef%bc%88%e8%af%b7%e6%b1%82%ef%bc%89)
#### 安装方法，下载到自己的项目中，放到src目录下
示例：

```vue
<template>
    <div class="app">
        <text>组件</text>
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