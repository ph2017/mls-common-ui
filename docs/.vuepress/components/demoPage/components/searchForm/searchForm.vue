<template>
    <div class="search-form">
        <mls-form
            ref="mlsForm"
            v-model="formData"
            :schema="schema"
            :uiSchema="uiSchema"
            :custom-formats="customFormats"
            :error-schema="errorSchema"
            :formProps="formProps"
            :hasExpand="true"
            buttonGroupPosition="bottom"
            @on-submit="onSubmit"
            @on-validation-failed="onValidationFailed"
            @inputFieldEnter="onInputFieldEnter"
            @inputSearchFieldSearch="onInputFieldSearch"
        >
            <template #buttonGroup>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="onReset">重置</el-button>
            </template>
        </mls-form>
        <hobby-search-dialog
            v-bind:visible.sync="hobbyVisible"
            title="爱好"
            @workorderConfirm="onHobbyChangeConfirm"
        />
    </div>
</template>
<script>
import MlsForm from '../../../../../../src/packages/mlsCommonForm'
import InputEnterField from '../../../../../../src/packages/mlsCommonForm/components/inputEnterField'
import InputSearchField from '../../../../../../src/packages/mlsCommonForm/components/inputSearchField'
import HobbySearchDialog from '../hobbySearchDialog'
import Vue from 'vue'
Vue.component(InputEnterField.name, InputEnterField)
Vue.component(InputSearchField.name, InputSearchField)

function getLastWeekDate () {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    return [start, end]
}
const defaultFormData = {
    date: getLastWeekDate(),
    deleteFlag: 'all'
}
export default {
    name: 'SearchForm',
    components: {
        MlsForm,
        HobbySearchDialog
    },
    data () {
        return {
            formData: {
                ...defaultFormData
            },
            schema: {
                type: 'object',
                required: ['date'],
                properties: {
                    name: {
                        type: 'string',
                        title: '姓名'
                    },
                    address: {
                        type: 'string',
                        title: '地址'
                    },
                    date: {
                        title: '日期开始-日期结束',
                        type: 'array',
                        format: 'date-time',
                        items: {
                            type: 'string'
                        }
                    },
                    deleteFlag: {
                        title: '有效',
                        type: 'string',
                        'ui:widget': 'RadioWidget',
                        enum: ['all', 1, 2],
                        enumNames: ['全部','是','否']
                    },
                    hobby: {
                        title: '兴趣爱好'
                    },
                }
            },
            uiSchema: {
                name: {
                    'ui:field': 'InputEnterField',
                    'ui:placeholder': '请输入姓名'
                },
                address: {
                    'ui:field': 'InputEnterField',
                    'ui:placeholder': '请输入地址'
                },
                date: {
                    'ui:options': {
                        type: 'datetimerange',
                        'range-separator': '-',
                        'start-placeholder': '开始日期',
                        'end-placeholder': '结束日期',
                        pickerOptions: {
                            shortcuts: [
                                {
                                    text: '最近一周',
                                    onClick (picker) {
                                        const end = new Date()
                                        const start = new Date()
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                                        picker.$emit('pick', [start, end])
                                    }
                                },
                                {
                                    text: '最近一个月',
                                    onClick (picker) {
                                        const end = new Date()
                                        const start = new Date()
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                                        picker.$emit('pick', [start, end])
                                    }
                                },
                                {
                                    text: '最近三个月',
                                    onClick (picker) {
                                        const end = new Date()
                                        const start = new Date()
                                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                                        picker.$emit('pick', [start, end])
                                    }
                                }
                            ]
                        }
                    }
                },
                hobby: {
                    'ui:field': 'InputSearchField',
                    'ui:options': {
                        placeholder: '请输入/选择兴趣爱好',
                        clearable: true,
                        // canBeClose: true // 表示可以被收起隐藏 
                    },
                    'ui:canBeClose': true // 这样写与上面写法效果一样
                }
            },
            customFormats: {},
            errorSchema: {
                startTime: {
                    'err:options': {
                        required: '请选择日期范围'
                    }
                }
            },
            formProps: {
                layoutColumn: 2 // 每行显示的列数,范围：1~5
            },
            buttonEvent: '', // 按钮事件暂存
            hobbyVisible: false
        }
    },
    computed: {},
    methods: {
        onPrint () {
            this.buttonEvent = 'print'
        },
        onSearch () {
            this.$refs['mlsForm'].$emit('submit') // 发射组件的提交事件，在on-sumbit事件处理中可以得到表单数据
            this.buttonEvent = 'search'
        },
        onReset () {
            this.formData = defaultFormData
        },
        onSubmit (params) {
            this.buttonEventHandler(params)
        },
        onValidationFailed (err) {
            this.buttonEventHandler(err)
        },
        onInputFieldEnter (params) {
            
        },
        onInputFieldSearch (params) {
            if (params.fieldKey === 'hobby') {
                this.hobbyVisible = true
            }
        },
        onHobbyChangeConfirm (params) {
            this.formData.hobby = params.data.hobby
            this.hobbyVisible = false
        },
        /**
         * 处理按钮点击事件
         */
        buttonEventHandler (formParam) {
            if (this.buttonEvent) {
                this.$emit(this.buttonEvent, {
                    ...formParam
                })
                this.buttonEvent = '' // 发射事件后，清空
            }
        },
        async formSubmit () {
            const result = await this.$refs.mlsForm.formSubmit()
            return result
        }
    }
}
</script>
<style lang="less">
.search-form {
    .el-range-separator {
        line-height: 20px;
    }
    .el-range__icon {
        line-height: 20px;
    }
    .el-range__close-icon {
        line-height: 20px;
    }
}    
</style>
