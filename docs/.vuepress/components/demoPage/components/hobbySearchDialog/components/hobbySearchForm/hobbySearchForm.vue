<template>
    <div class="workorder-search-form">
        <mls-form
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
            @on-submit="onFormSubmit"
            @on-cancel="onReset"
        >
        </mls-form>
    </div>
</template>
<script>
import MlsForm from '../../../../../../../../src/packages/mlsCommonForm'
import InputSearchField from '../../../../../../../../src/packages/mlsCommonForm/components/inputSearchField'
import Vue from 'vue'
Vue.component(InputSearchField.name, InputSearchField)
const defaultFormData = {
}
export default {
    name: 'WorkorderSearchForm',
    components: {
        MlsForm
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
            console.log('onInputFieldEnter params = ', params)
        }
    }
}
</script>
