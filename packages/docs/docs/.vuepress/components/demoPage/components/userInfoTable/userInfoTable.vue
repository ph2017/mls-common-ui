<template>
    <div class="user-info-table">
        <mls-common-table
            ref="mlsTable"
            v-loading="loading"
            row-key="labelNo"
            :column="tableData.column"
            :data="tableData.data"
            pagination
            border
            :current-page.sync="currentPage"
            :total="total"
            :hasSelectedSumary="true"
            @selection-change="onSelectionChange"
            @size-change="onSizeChange"
            @p-current-change="onCurrentChange"
        >
            <template slot="selectButtonSlot">
                <el-button type="primary" @click="onBatchDelete">批量删除</el-button>
            </template>
        </mls-common-table>
    </div>
</template>
<script>
import { MlsCommonTable } from 'mls-common-ui'
import moment from 'moment'
import { uniq } from 'lodash'
export default {
    name: 'UserInfoTable',
    components: {
        MlsCommonTable
    },
    props: {
        searchCondition: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            tableData: {
                column: [
                    {
                        type: 'selection',
                        reserveSelection: true, // 数据刷新后，保留之前选择行
                        fixed: true,
                        selectable: (row, index) => {
                            // 控制行是否能选择
                            if (row.deleteFlag) {
                                return false
                            }
                            return true
                        }
                    },
                    {
                        prop: 'name',
                        label: '姓名',
                        sortable: true,
                        showOverflowTooltip: true
                    },
                    {
                        prop: 'address',
                        label: '地址',
                        sortable: true,
                        showOverflowTooltip: true
                    },
                    {
                        prop: 'date',
                        label: '日期',
                        sortable: true,
                        showOverflowTooltip: true
                    },
                    {
                        prop: 'deleteFlag',
                        label: '是否有效',
                        render: (h, scope) => {
                            return <el-switch
                                value={scope.row[scope.column.property]}
                                onChange={(val) => { 
                                    scope.row[scope.column.property] = val
                                    this.setRowDeleteFlag(scope.row.name, val)
                                    this.$refs.mlsTable.$refs.table.toggleRowSelection(scope.row, false)
                                }}
                                active-color="#F56C6C"
                                active-text="无效"
                                inactive-text="有效">
                            </el-switch>
                        }
                    }
                ],
                data: []
            },
            total: 100,
            loading: false,
            currentPage: 1,
            pageSize: 10,
            deleteRows: [],
            selectRows: []
        }
    },
    methods: {
        createData (length) {
            this.loading = true
            let data = []
            for (let i = 0; i < length; i++) {
                const name = `王小虎-${this.currentPage}-${i + 1}`
                const date = moment(new Date()).format('YYYY-MM-DD')
                data.push({
                    date,
                    name,
                    address: `上海市普陀区金沙江路 -${this.currentPage}-${i + 1} 弄`,
                    deleteFlag: this.deleteRows.indexOf(name) > -1
                })
            }
            setTimeout(() => {
                this.tableData.data = data
                this.loading = false
            }, 1000)
        },
        onSizeChange (pageSize) {
            this.pageSize = pageSize
            this.createData(pageSize)
        },
        onCurrentChange (pageNo) {
            this.currentPage = pageNo
            this.createData(this.pageSize)
        },
        searchUserData () {
            this.currentPage = 1
            this.createData(this.pageSize)
        },
        setRowDeleteFlag(name, deleteFlag) {
            if (deleteFlag) {
                this.deleteRows = uniq([name, ...this.deleteRows])
            } else {
                this.deleteRows = this.deleteRows.filter(r => r === name)
            }
            this.$message.success('操作成功')
        },
        onSelectionChange(rows) {
            this.selectRows = rows
        },
        onBatchDelete() {
            if (this.selectRows.length > 0) {
                this.deleteRows = uniq([...this.selectRows.map(r => r.name), ...this.deleteRows])
                this.selectRows.forEach(item => {
                    item.deleteFlag = true
                    this.$refs['mlsTable'].$refs['table'].toggleRowSelection(item, false) // 取消选中
                })
                this.$message.success('批量删除成功')
            } else {
                this.$message.error('请先选择要删除的行')
            }
        }
    }
}
</script>
<style lang="less" scoped>
.user-info-table {
}
</style>
