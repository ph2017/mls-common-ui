# MlsCommonForm
MlsCommonForm组件是由[Vue JSON Schema Form](https://vue-json-schema-form.lljj.me/)这个组件二次封装而来。
主要能实现以下功能：  
1. 通过json配置生成表单，依赖父项目的ElementUI库
2. 通过按钮组插槽，生成自定义按钮组
3. 可以通过自定义field，生成复杂的表单输入项

## 参数Props
### v-model
* 类型：`object`
* 默认值：`{}`  
表单绑定值

### buttonGroupPosition
* required：`true`
* 类型：`right | bottom`
* 默认值：`right`  
按钮组位置, bottom:底部  right:右边
::: demo
```html
<template>
    <el-radio-group v-model="position" style="margin-bottom: 20px;">
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
    </el-radio-group>
    <mls-common-form
        v-model="formData"
        :schema="schema"
        :hasExpand="false"
        :buttonGroupPosition="position"
    >
    </mls-common-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {

    },
    data() {
        return {
            formData: {
               name: 'xigua'
            },
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    name: {
                        title: '输入名字',
                        type: 'string'
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    }
                }
            },
            position: 'right'
        }
    }
};
</script>
```
:::

### submitText
* 类型：`string`
* 默认值：`搜索`  
默认按钮组有两个按钮(搜索&重置)，能控制搜索按钮的显示字符，默认显示搜索

### cancelText
* 类型：`string`
* 默认值：`重置`  
默认按钮组有两个按钮(搜索&重置)，能控制重置按钮的显示字符，默认显示重置

### hasExpand
* 类型：`boolean`
* 默认值：`true`  
按钮组是否有展开/收起按钮，true: 有   false: 无
:::tip
`uiSchema`的`ui:options`里的属性及`ui:canBeClose`这样写法的属性，都可以直接传到`mls-common-form`组件中的`form-item`组件。可以通过`ui:style:{color: 'red'}`的方式，修改组件的样式及属性
:::
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
                        // canBeClose: true // 这样写跟下面ui:canBeClose的写法效果一样
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

### Vue JSON Sechema Form组件原有的props
* 可以传入所有VueForm的props，例如：schema,ui-schema,form-props等，详细说明请查看[文档](https://vue-json-schema-form.lljj.me/zh/guide/basic-config.html#%E5%8F%82%E6%95%B0-props)

## 事件 Emit Event
emit所有的事件如下：
::: demo
```html
<template>
    <mls-common-form
        v-model="formData"
        :schema="schema"
        :hasExpand="false"
        @on-submit="handlerSubmit"
        @on-validation-failed="handlerValidationFailed"
        @on-cancel="handlerCancel"
        @on-change="handlerChange"
    >
    </mls-common-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        handlerSubmit(params) {
            const vNode = this.$createElement('pre', JSON.stringify(params, null, 4));
            this.$message({
                type: 'success',
                message: vNode
            });
        },
        handlerValidationFailed(params) {
            const vNode = this.$createElement('pre', JSON.stringify(params, null, 4));
            this.$message({
                type: 'warning',
                message: vNode
            });
        },
        handlerCancel() {
            this.$message.warning('点击了重置');
        },
        handlerChange({ oldValue, newValue }) {
            const vNode = this.$createElement('pre', JSON.stringify(newValue, null, 4));
            this.$notify({
                title: '输入数据',
                message: vNode
            });
        },
    },
    data() {
        return {
            formData: {
               name: 'xigua'
            },
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    name: {
                        title: '输入名字',
                        type: 'string'
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    }
                }
            }
        }
    }
};
</script>
```
:::
### on-submit
* 参数(formData)  
点击提交按钮，且表单通过校验

### on-validation-failed
* 参数(errorObj)  
点击提交按钮，且表单不通过，可以在这里获取到错误信息

### on-cancel
* 参数(无)  
点击重置按钮触发

### on-change
* 参数(newVal, oldVal)  
表单的值发生改变
> 引用类型，只有重新对对象赋值，否则newVal 等于 oldVal 参见 [vue watch](https://cn.vuejs.org/v2/api/#vm-watch)

### on-form-mounted
* 参数(formRef)  
通过该方法可以获取到当前ui框架的form组件实例，可用来执行form组件的一些方法，如(`validate`)

## 方法 Methods
### formSubmit
* 参数(无)
* 返回值 `promise<{validate: boolean, formData: Object}>`
通过调用mlsCommonForm实例的该方法，可以返回校验表单结果及表单值  

例子：
::: demo
```html
<template>
    <mls-common-form
        v-model="formData"
        :schema="schema"
        :hasExpand="false"
        ref="form"
        @on-submit="handlerSubmit"
    >
    </mls-common-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        async handlerSubmit() {
            const formSubmitData = await this.$refs['form'].formSubmit()
            this.$message({
                type: 'success',
                message: `formSubmit()方法调用：${ JSON.stringify(formSubmitData)}`
            });
        }
    },
    data() {
        return {
            formData: {
               name: 'xigua'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '输入名字',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```
:::


## 插槽 Scope-Slot
### buttonGroup
* name `buttonGroup`
这个插槽可以设置自定义的按钮组，按钮组位置由[props buttonGroupPosition](#buttongroupposition)这个参数控制

例子：
::: demo
```html
<template>
    <mls-common-form
        ref="form"
        v-model="formData"
        :schema="schema"
        :hasExpand="false"
    >
      <template slot="buttonGroup">
        <el-button type="primary" @click="onPrint">打印</el-button>
      </template>
    </mls-common-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        async onPrint() {
          const formSubmitData = await this.$refs['form'].formSubmit()
          this.$message({
              type: 'success',
              message: `打印按钮点击：${ JSON.stringify(formSubmitData)}`
          });
        }
    },
    data() {
        return {
            formData: {
               name: 'xigua'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '输入名字',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```
:::