<template>
    <div :class="['mls-common-form', getButtonBoxClass]">
        <vue-form
            v-model="formData"
            v-bind="$attrs"
            :formProps="getFormProps"
            :formFooter="getFormFooter"
            v-on="$listeners"
            @on-form-mounted="onFormMounted"
        >
            <!-- 没有设置底部按钮的情况下再显示 -->
            <div v-if="!getFormFooter.show" slot-scope="{ formData, formRefFn }" class="button-group-box">
                <slot name="buttonGroup"></slot>
                <div v-if="!hasButtonGroupSlot">
                    <el-button type="primary" @click="onFormSubmit(formData, formRefFn)">{{ submitText }}</el-button>
                    <el-button @click="onFormCancel">{{ cancelText }}</el-button>
                </div>
                <el-link v-if="hasExpand" type="primary" class="expand-button" @click="onExpand">{{
                    getExpandText
                }}</el-link>
            </div>
        </vue-form>
    </div>
</template>
<script>
import { debounce } from 'lodash'
import VueForm from '@lljj/vue-json-schema-form'
import Vue from 'vue'
const eventBus = new Vue() // 私有的事件总线

const defaultFormProps = {
    layoutColumn: 1, // 1~5 ，支持 1~5 列布局，如果使用inline表单这里配置无效
    inline: false, // 行内表单模式
    inlineFooter: false, // 如果想要保存按钮和表单元素一行显示，需要配置 true
    labelSuffix: ':', // label后缀
    labelPosition: 'top' // 表单域标签的位置
}
const defaultFormFooter = {
    show: false, // 是否显示默认底部
    okBtn: '保存', // 确认按钮文字
    cancelBtn: '取消', // 取消按钮文字

    // 透传给formFooter 中的formItem组件的参数
    // 例如 vue3-ant 配置wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
    formItemAttrs: {}
}
export default {
    name: 'MlsCommonForm',
    components: {
        VueForm
    },
    model: {
        prop: 'formData',
        event: 'change'
    },
    props: {
        // 按钮组位置 bottom:底部  right:右边
        buttonGroupPosition: {
            type: String,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['bottom', 'right'].indexOf(value) !== -1
            },
            default: 'right'
        },
        submitText: {
            type: String,
            default: '搜索'
        },
        cancelText: {
            type: String,
            default: '重置'
        },
        hasExpand: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        formData: {
            get () {
                return this.$attrs.formData
            },
            set (value) {
                this.$emit('change', value)
            }
        },
        getFormProps () {
            return {
                ...defaultFormProps,
                ...this.$attrs.formProps
            }
        },
        getFormFooter () {
            return {
                ...defaultFormFooter,
                ...this.$attrs.formFooter
            }
        },
        hasButtonGroupSlot () {
            return this.$slots.buttonGroup
        },
        getExpandText () {
            return this.isExpand ? '收起' : '展开'
        },
        getButtonBoxClass () {
            return `button-group-box--${this.buttonGroupPosition}`
        }
    },
    provide: {
        formEventBus: eventBus
    },
    data () {
        return {
            formRef: null,
            isExpand: false
        }
    },
    watch: {
        isExpand: {
            handler () {
                this.expandHandler()
            },
            immediate: true
        }
    },
    created () {
        this.$on('submit', this.submitHandler)
        eventBus.$on('inputFieldEnter', debounce(this.inputFieldEnterHandler, 200))
        eventBus.$on('inputSearchFieldSearch', debounce(this.inputFieldSearchHandler, 200))
    },
    beforeDestroy () {
        eventBus.$off(['inputFieldEnter', 'inputSearchFieldSearch'])
        eventBus.$destroy() // 销毁事件总线
    },
    methods: {
        onFormMounted (formRef) {
            this.formRef = formRef
        },
        async submitHandler (formData, formRefFn) {
            let elForm = this.formRef
            let form = this.$attrs.formData
            if (formData && formRefFn) {
                elForm = formRefFn()
                form = formData
            }
            const validate = await elForm.validate().catch(result => {
                return result
            })
            if (validate) {
                this.$emit('on-submit', {
                    formData: form,
                    validate
                })
            } else {
                this.$emit('on-validation-failed', {
                    formData: form,
                    validate
                })
            }

        },
        onFormSubmit (formData, formRefFn) {
            this.submitHandler(formData, formRefFn)
        },
        onFormCancel () {
            this.$emit('on-cancel')
        },
        onExpand () {
            this.isExpand = !this.isExpand
        },
        expandHandler () {
            for (const key in this.$attrs.uiSchema) {
                if (Object.hasOwnProperty.call(this.$attrs.uiSchema, key)) {
                    const item = this.$attrs.uiSchema[key]
                    if (item['ui:canBeClose']) {
                        item['ui:hidden'] = !this.isExpand
                    }
                }
            }
        },
        inputFieldEnterHandler (params) {
            this.$emit('inputFieldEnter', params)
        },
        inputFieldSearchHandler (params) {
            this.$emit('inputSearchFieldSearch', params)
        },
        async formSubmit () {
            const validate = await this.formRef.validate().catch(result => {
                return result
            })
            return {
                validate,
                formData: this.$attrs.formData
            }
        }
    }
}
</script>
<style lang="less">
.mls-common-form {
    &.button-group-box--right {
        display: flex;
        .el-form {
            display: flex;
            align-items: flex-start;
        }
        .el-form.formInline {
            .fieldGroupWrap {
                flex-basis: inherit; // formProps.inline:true 情况下生效，不设置默认占比
            }
        }
    }
    &.button-group-box--bottom {
        .el-form {
            .button-group-box {
                margin-left: 0;
                margin-top: 5px;
            }
        }
    }
    .genFromComponent {
        font-size: 0;
    }
    .el-form {
        width: 100%;
        .el-form-item {
            margin-bottom: 20px;
            .el-form-item__label {
                font-size: 13px;
                line-height: 1.2;
                padding-bottom: 5px;
            }
            .el-form-item__content {
                line-height: 1;
                > .el-select {
                    width: 100%;
                }
                > .el-date-editor {
                    width: 100%;
                }
                > .el-checkbox-group {
                    > .el-checkbox {
                        margin-right: 20px;
                    }
                }
            }
        }
        .fieldGroupWrap {
            flex-basis: 80%;
        }
        .button-group-box {
            display: flex;
            flex-basis: 20%;
            margin-left: 10px;
            margin-top: 20px;
            > .expand-button {
                margin-left: 10px;
            }
        }
        .button-group-box :first-child {
            display: flex;
            align-items: center;
        }
    }
    .el-form.layoutColumn {
        &.layoutColumn-4 {
            .fieldGroupWrap_box > .genFormItem {
                width: 25%;
                flex-basis: 25%;
            }
        }
        &.layoutColumn-5 {
            .fieldGroupWrap_box > .genFormItem {
                width: 20%;
                flex-basis: 20%;
            }
        }
    }
}
</style>
