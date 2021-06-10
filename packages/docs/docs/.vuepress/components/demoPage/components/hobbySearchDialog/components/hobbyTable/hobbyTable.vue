<template>
    <mls-common-table
        ref="table"
        v-loading="loading"
        :column="tableData.column"
        :data="tableData.data"
        :hasRatioSelect="true"
        :hasSelectedSumary="true"
        height="250"
        row-key="hobby"
        pagination
        border
        :current-page.sync="currentPage"
        :total="total"
        @size-change="onSizeChange"
        @p-current-change="onCurrentChange"
    ></mls-common-table>
</template>
<script>
import { MlsCommonTable } from 'mls-common-ui'

export default {
    name: 'WorkorderTable',
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
                        prop: 'hobby',
                        label: '爱好',
                        sortable: true,
                        showOverflowTooltip: true
                    }
                ],
                data: []
            },
            total: 22,
            loading: false,
            currentPage: 1,
            pageSize: 10
        }
    },
    created() {
        this.createData(this.pageSize)
    },
    methods: {
        onSizeChange (pageSize) {
            this.pageSize = pageSize
            this.createData(pageSize)
        },
        onCurrentChange (pageNo) {
            this.currentPage = pageNo
            this.createData(this.pageSize)
        },
        searchHobbyData () {
            this.currentPage = 1
            this.createData(this.pageSize)
        },
        createData (length) {
            this.loading = true
            let data = []
            for (let i = 0; i < length; i++) {
                const hobby = `爱好-${this.currentPage}-${i + 1}`
                data.push({
                    hobby
                })
            }
            setTimeout(() => {
                this.tableData.data = data
                this.loading = false
            }, 1000)
        },
        getSelectedRows () {
            return this.$refs['table'].selectedRows
        }
    }
}
</script>
