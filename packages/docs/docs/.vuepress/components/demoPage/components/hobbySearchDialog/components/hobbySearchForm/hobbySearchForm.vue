<template>
    <div class="workorder-search-form">
        <mls-common-form
            ref="mlsForm"
            v-model="formData"
            :schema="schema"
            :uiSchema="uiSchema"
            :custom-formats="customFormats"
            :error-schema="errorSchema"
            :formProps="formProps"
            :hasExpand="false"
            submitText="查询"
            buttonGroupPosition="right"
            v-on="$listeners"
            @submit.native.prevent
            @on-submit="onFormSubmit"
            @on-cancel="onReset"
            @customEmitEvent="onCustomEmitEvent"
        >
        </mls-common-form>
    </div>
</template>
<script>
// import { MlsCommonForm, InputEnterField } from 'mls-common-ui'
import MlsCommonForm from '../../../../../../../../../mls-common-ui/packages/mlsCommonForm'
import InputEnterField from '../../../../../../../../../mls-common-ui/packages/mlsCommonForm/components/InputEnterField'
import Vue from 'vue'
Vue.component(InputEnterField.name, InputEnterField)
const defaultFormData = {
}
export default {
    name: 'WorkorderSearchForm',
    components: {
        MlsCommonForm
    },
    props: {
        workOrderName: {
            type: String
        }
    },
    data () {
        return {
            formData: {
                ...defaultFormData
            },
            schema: {
                type: 'object',
                required: ['startTime'],
                properties: {
                    hobby: {
                        type: 'string',
                        title: '爱好'
                    }
                }
            },
            uiSchema: {
                hobby: {
                    'ui:field': 'InputEnterField',
                    'ui:placeholder': '请输入爱好'
                }
            },
            customFormats: {},
            errorSchema: {},
            formProps: {
                // layoutColumn: '1'
                inline: true
            }
        }
    },
    methods: {
        onFormSubmit (params) {
            this.$emit('search', params)
        },
        onReset () {
            this.formData = { ...defaultFormData }
        },
        onValidationFailed (err) {
            console.log('onValidationFailed err = ', err)
        },
        onInputFieldEnter (params) {
            if (this.$refs['mlsForm']) {
                this.$refs['mlsForm'].$emit('submit') // 发射组件的提交事件，在on-sumbit事件处理中可以得到表单数据
            }
            console.log('onInputFieldEnter params = ', params)
        },
        onCustomEmitEvent (params) {
            if (params.emitEvent === 'inputFieldEnter') {
                this.onInputFieldEnter.call(this, params)
            }
        }
    }
}
</script>
