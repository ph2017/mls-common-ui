<template>
    <div class="mls-common-table">
        <lb-table
            ref="table"
            v-bind="{ ...getPaginationConfig, ...getRestConfig, pagination }"
            :column="getColumn"
            highlight-current-row
            v-on="$listeners"
            @selection-change="onTableSelectionChange"
            @current-change="onTableCurrentChange"
        />
        <div :class="getSelectInfoBoxStyle">
            <div class="page-text" v-if="hasSelection">
                <!-- 已选数量 -->
                <span>{{ selectedTitleText }}</span>
                <el-popover placement="top" width="400" trigger="manual" ref="selectPopover" v-model="visible">
                    <div class="pop-head">
                        <!-- 已选项详情 -->
                        <span class="title">{{ selectedDetailTitleText }}</span>
                        <i class="el-icon-close close" @click="visible = !visible"></i>
                    </div>
                    <!-- 设置最大高度 -->
                    <lb-table :column="getSelectedTableColumn" :data="selectedRows" border :max-height="300"/>
                </el-popover>
                <el-link v-popover:selectPopover type="primary" class="selected-num" @click="visible = !visible">{{
                    checkedNum
                }}</el-link>
                <!-- 个 -->
                <span>{{ itemUnitText }}</span>
            </div>
            <slot name="selectButtonSlot" class="function-button-group">
                <!-- 这里可以放按钮或其他组件 -->
            </slot>
        </div>
    </div>
</template>
<script>
import LbTable from './lb-table'
import { pick, omit } from 'lodash-es'

// 分页组件默认配置
const defaultPaginationConfig = {
    pageSizes: [10, 20, 30, 50, 100],
    layout: 'total, sizes, prev, pager, next',
    pageSize: 10,
    pagerCount: 5,
    background: true
}
/**
 * 二次封装了lb-table组件，
 * 使用方式跟el-table一样，可以传入el-table的所有属性
 * 也可以监听el-table的原生事件
 */
export default {
    name: 'MlsCommonTable',
    components: {
        LbTable
    },
    props: {
        // 是否有分页
        pagination: {
            type: Boolean,
            default: false
        },
        // 已选中行table显示的列
        selectedColumn: {
            type: Array
        },
        // 是否有ratio单选
        hasRatioSelect: {
            type: Boolean,
            default: false
        },
        // 是否有已选中项显示
        hasSelectedSumary: {
            type: Boolean,
            default: false
        },
        selectedTitleText: {
            type: String,
            default: '已选数量'
        },
        selectedDetailTitleText: {
            type: String,
            default: '已选项详情'
        },
        itemUnitText: {
            type: String,
            default: '个'
        },
        operationColText: {
            type: String,
            default: '操作'
        },
        cancelSelectText: {
            type: String,
            default: '取消选中'
        },
        selectText: {
            type: String,
            default: '选择'
        }
    },
    data () {
        return {
            visible: false,
            selectedRows: [],
            selectedRowKey: ''
        }
    },
    computed: {
        getPaginationConfig () {
            if (this.pagination) {
                return {
                    ...defaultPaginationConfig,
                    ...pick(this.$attrs, Object.keys(defaultPaginationConfig))
                }
            }
            return {
                ...pick(this.$attrs, Object.keys(defaultPaginationConfig))
            }
        },
        getRestConfig () {
            return {
                paginationTop: '10px',
                ...omit(this.$attrs, Object.keys(defaultPaginationConfig))
            }
        },
        hasSelection () {
            if (this.hasSelectedSumary) {
                if (this.$attrs.column) {
                    return this.$attrs.column.find(item => item.type === 'selection') || this.hasRatioSelect
                }
                return this.hasRatioSelect
            }
            return false
        },
        getSelectedTableColumn () {
            let defaultColumn = []
            if (this.selectedColumn) {
                defaultColumn = [...this.selectedColumn]
            } else {
                defaultColumn = this.$attrs.column.filter(item => item.type !== 'selection' && item.type !== 'index').slice(0, 3).map(item => {
                    return {
                        ...omit(item, ['render']) // 清除所有的render字段，只显示，不渲染编辑的内容 2021-07-12
                    }
                })
            }
            defaultColumn.push({
                label: this.operationColText, // '操作'
                fixed: 'right',
                render: (h, scope) => {
                    return (
                        <div>
                            <el-button type='text' onClick={() => this.onUnselectItem(scope.row)}>
                                {this.cancelSelectText}
                            </el-button>
                        </div>
                    )
                }
            })
            return defaultColumn
        },
        checkedNum () {
            if (this.selectedRows) {
                return this.selectedRows.length
            } else if (this.selectedRowKey) {
                return 1
            }
            return 0
        },
        getColumn () {
            let column = []
            if (this.$attrs.column) {
                column = [...this.$attrs.column]
            }
            if (this.hasRatioSelect && this.$attrs['row-key']) {
                const ratioColumn = {
                    label: this.selectText, // 选择
                    width: '50',
                    fixed: true,
                    render: (h, scope) => {
                        return (
                            <el-radio
                                label={scope.row[this.$attrs['row-key']]}
                                v-model={this.selectedRowKey}
                                onChange={() => this.onTableRatioChange(scope.row)}>
                                &nbsp;
                            </el-radio>
                        )
                    }
                }
                column.unshift(ratioColumn)
            }
            return column
        },
        // 计算选中数量box的样式
        getSelectInfoBoxStyle () {
            let styleClass = 'select-info-box'
            if (!this.pagination) {
                styleClass += ' relative-box'
            }
            return styleClass
        }
    },
    methods: {
        onUnselectItem (row) {
            if (this.$attrs.column.find(item => item.type === 'selection')) {
                this.$refs['table'].toggleRowSelection(row, false) // 取消选中
            } else if (this.hasRatioSelect) {
                this.selectedRows = []
                this.selectedRowKey = ''
                this.$refs['table'].setCurrentRow(); // 修复bug，取消选中行
            }
        },
        onTableSelectionChange (selection) {
            this.selectedRows = selection // 保存已选中的row
        },
        onTableRatioChange (row) {
            this.selectedRows = [{...row}]
            this.selectedRowKey = row[this.$attrs['row-key']]
        },
        onTableCurrentChange (row) {
            // 单选默认是跨页的
            if (this.hasRatioSelect) {
                // 有单选的情况下，更新单选
                if (typeof row === 'object' && row !== null) {
                    // row 为object类型时才处理， 翻页情况下，row 会是number
                    this.selectedRows =[{...row}]
                    this.selectedRowKey = row[this.$attrs['row-key']]
                }
            }
        }
    }
}
</script>
<style lang="less">
.mls-common-table {
    position: relative;
    .select-info-box {
        display: flex;
        position: absolute;
        left: 0;
        bottom: 5px;
        .page-text {
            display: flex;
            font-size: 13px;
            line-height: 28px;
            text-align: center;
            margin-right: 15px;
            .selected-num {
                padding: 0 5px;
                line-height: 1.2;
                font-size: 14px;
                color: #00bcbf;
            }
        }
        .function-button-group {
        }
    }
    .relative-box {
        position: relative;
        margin-top: 10px;
    }
}
.pop-head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .title {
        font-size: 14px;
        line-height: 20px;
        color: #303133;
    }
    .close {
        font-size: 18px;
        color: #909399;
        cursor: pointer;
    }
}
</style>
