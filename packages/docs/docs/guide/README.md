# 介绍
## 说明
这是一个mls常用组件组成的组件库项目，该组件库依赖父项目的Vue与ElementUI库。  
mls公共组件库目前有两个组件：
- MlsCommonForm
- MlsCommonTable

MlsCommonForm组件是由[Vue JSON Schema Form](https://vue-json-schema-form.lljj.me/)这个组件二次封装而来。加入了按钮组插槽，规范了项目中表单的样式。能帮助我们通过json配置快速生成表单。  

MlsCommonTable组件是由[lb-element-table](https://github.com/liub1934/lb-element-table)这个组件二次封装而来。整合了分页组件，规范了table组件的单选/多选逻辑代码的写法。能帮助我们通过json配置快速生成table。

## 快速开始
``` bash
# 安装
npm install --save mls-common-ui

# 或者：
yarn add mls-common-ui
```
* 使用
```js
import { MlsCommonForm } from 'mls-common-ui';
import Vue from 'vue';

// 全局注册
Vue.component(MlsCommonForm.name, MlsCommonForm);

// 或者可以在组件内注册
export default {
  name: 'Demo',
  components: {
    MlsCommonForm
  }
}
```

## DEMO
演示渲染用户信息的表单，点击显示代码可查看源代码或者在codepen运行

::: demo
```html
<template>
    <mls-common-form
        v-model="formData"
        :uiSchema="uiSchema"
        :schema="schema"
    >
    </mls-common-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '用户名',
                        default: 'xigua',
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    },
                    bio: {
                        type: 'string',
                        title: '签名',
                        minLength: 10,
                        default: '知道的越多、就知道的越少',
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: '请输入你的签名',
                        type: 'textarea',
                        rows: 1
                    },
                    'ui:canBeClose': true // 这个参数表示这个项可以被收起
                }
            }
        };
    }
};
</script>
```
:::
