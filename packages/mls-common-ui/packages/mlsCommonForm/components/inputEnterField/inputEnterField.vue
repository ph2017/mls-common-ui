<template>
    <div class="input-enter-field genFormItem">
        <el-form-item
            :label="selectProps.title"
            :prop="curNodePath"
            :rules="[
                {
                    validator(rule, value, callback) {
                        const errors = schemaValidate.validateFormDataAndTransformMsg({
                            formData: value,
                            schema: $props.rootSchema.properties[$props.curNodePath],
                            customFormats: $props.customFormats,
                            errorSchema: $props.errorSchema,
                            required: $props.rootSchema.required.includes($props.curNodePath),
                            propPath: $props.curNodePath
                        });
                        if (errors.length === 0) return callback();

                        return callback(errors[0].message);
                    },
                }
            ]"
            :required="elItemRequired"
        >
            <el-input v-model="inputModel" v-bind="selectProps" type="text" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
    </div>
</template>

<script>
/**
 * 这是个能向commonForm组件发射事件的input组件
 * 按自定义field的规则编写
 */
import { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form'

export default {
    name: 'InputEnterField',
    props: {
        ...fieldProps
    },
    inject: ['formEventBus'],
    data () {
        return {
            schemaValidate,
            vueUtils
        }
    },
    computed: {
        elItemRequired () {
            // 配置了 required 的属性提示小红点
            return this.rootSchema.required.indexOf(this.curNodePath) > -1;
        },
        selectProps () {
            return formUtils.getUiOptions({
                schema: this.schema,
                uiSchema: this.uiSchema
            })
        },
        curValue () {
            return vueUtils.getPathVal(this.rootFormData, this.curNodePath)
        },
        inputModel: {
            get () {
                return this.curValue
            },
            set (value) {
                vueUtils.setPathVal(this.rootFormData, vueUtils.computedCurPath('', this.curNodePath), value)
            }
        }
    },
    created () {},
    methods: {
        onEnter (event) {
            this.formEventBus.$emit('customFieldEmitEvent', {
                data: this.inputModel,
                fieldKey: this.curNodePath,
                event,
                emitEvent: 'inputFieldEnter'
            })
        }
    }
}
</script>

<style module lang="less">
.input-enter-field {
}
</style>
