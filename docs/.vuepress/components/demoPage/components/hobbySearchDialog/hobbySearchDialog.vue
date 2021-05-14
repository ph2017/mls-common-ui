<template>
    <div class="workorder-search-dialog">
        <el-dialog :visible.sync="dialogVisible" @close="onClose" v-bind="$attrs">
            <div class="form-box">
                <hobby-search-form @search="onHobbyFormSearch" @inputSearchFieldSearch="onInputFieldSearch" />
            </div>
            <div class="table-box">
                <hobby-table ref="hobbyTable" :searchCondition="searchCondition"></hobby-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onHobbyConfirm">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import HobbySearchForm from './components/hobbySearchForm'
import HobbyTable from './components/hobbyTable'
export default {
    name: 'WorkorderSearchDialog',
    components: {
        HobbySearchForm,
        HobbyTable
    },
    props: {},
    data () {
        return {
            dialogVisible: this.$attrs.visible,
            searchCondition: {}
        }
    },
    computed: {
        getVisible () {
            return this.$attrs.visible
        }
    },
    watch: {
        getVisible: {
            handler (newVal) {
                this.dialogVisible = newVal
            }
        }
    },
    methods: {
        onHobbyFormSearch (params) {
            if (params.validate) {
                this.searchCondition = this._convertFormToSearchCondition(params.formData)
                this.$nextTick(() => {
                    this.$refs['hobbyTable'].searchHobbyData()
                })
            }
        },
        onClose () {
            this.dialogVisible = false
            this.$emit('update:visible', this.dialogVisible)
        },
        onInputFieldSearch (params) {
            console.log('onInputFieldSearch params = ', params)
        },
        onHobbyConfirm () {
            const hobbyTable = this.$refs['hobbyTable']
            const selectedRows = hobbyTable.getSelectedRows()
            if (selectedRows && selectedRows.length > 0) {
                this.$emit('workorderConfirm', {
                    data: selectedRows[0]
                })
            } else {
                this.$message.warning('请先选择行数据')
            }
        },
        _convertFormToSearchCondition (fromData) {
            let searchCondition = { ...fromData }
            return searchCondition
        }
    }
}
</script>
<style lang="less">
.workorder-search-dialog {
}
</style>
