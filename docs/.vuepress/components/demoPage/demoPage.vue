<template>
    <div class="demo-page">
        <el-row :gutter="20">
            <el-col :span="20">
                <search-form ref="searchForm" @search="onFormSearch"> </search-form>
            </el-col>
            <el-col :span="4" class="right-function-box">
                <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
                    <el-button
                        type="default"
                        size="mini"
                        icon="el-icon-download"
                        @click="onExportData"
                        :loading="loading"
                    ></el-button>
                </el-tooltip>
            </el-col>
        </el-row>
        <user-info-table ref="userInfoTable" :searchCondition="searchCondition" class="table-box"/>
    </div>
</template>
<script>
import SearchForm from './components/searchForm'
import UserInfoTable from './components/userInfoTable'
import moment from 'moment'
import { omit } from 'lodash'
const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'

export default {
    name: 'labelQueryPage',
    components: {
        SearchForm,
        UserInfoTable
    },
    mounted() {
        this.$refs['userInfoTable'].searchUserData()
    },
    data () {
        return {
            loading: false,
            searchCondition: {}
        }
    },
    methods: {
        onExportData () {
            this.$refs['searchForm'].formSubmit().then(result => {
                if (result.validate) {
                    
                }
            })
            this.$message.success('点击导出')
        },
        onFormSearch (params) {
            if (params.validate) {
                 this.searchCondition = {
                    ...omit(params.formData, ['date']),
                    startTime: moment(params.formData.date[0]).format(defaultDateFormat),
                    endTime: moment(params.formData.date[1]).format(defaultDateFormat)
                }
                this.$message({
                    message: `校验成功，搜索条件：${JSON.stringify(this.searchCondition)}`,
                    type: 'success'
                });
            } else {
                this.$message({
                    message: `校验失败`,
                    type: 'warning'
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.demo-page {
    .right-function-box {
        text-align: right;
    }
    .table-box {
        margin-top: 20px;
    }
}
</style>
