# mls-common-ui
这是一个基于Vue,ElementUI的组件库项目，该组件库依赖父项目的Vue与ElementUI库。[查看文档](https://ph2017.github.io/mls-common-ui/dist/guide/)
mls公共组件库目前有两个组件：
- MlsCommonForm
- MlsCommonTable

MlsCommonForm组件是由[Vue JSON Schema Form](https://vue-json-schema-form.lljj.me/)这个组件二次封装而来。加入了按钮组插槽，规范了项目中表单的样式。能帮助我们通过json配置快速生成表单。  

MlsCommonTable组件是由[lb-element-table](https://github.com/liub1934/lb-element-table)这个组件二次封装而来。整合了分页组件，规范了table组件的单选/多选逻辑代码的写法。能帮助我们通过json配置快速生成table。


## 安装
```
## npm
npm install --save mls-common-ui

## yarn
yarn add mls-common-ui
```

### 使用
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
import { MlsCommonForm } from 'mls-common-ui';
import Vue from 'vue';

// 全局注册
Vue.component(MlsCommonForm.name, MlsCommonForm);

export default {
    name: 'Demo',
    components: {
      // MlsCommonForm // 或者可以在组件内注册
    }
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
