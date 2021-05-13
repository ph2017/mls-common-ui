# MlsCommonTable
MlsCommonTable组件是由[lb-element-table](https://github.com/liub1934/lb-element-table)这个组件二次封装而来。
主要能实现以下功能：  
1. 通过json配置生成表格，依赖父项目的ElementUI库
2. 支持所有el-table的原生props及事件
3. 简化操作，通过配置生成单选/多选，分页等功能的表格

## 参数Props
### pagination
* 类型：`Boolean`
* 默认值：`false`  
可控制表格是否有分页，true:有分页  false:无分页
::: demo
```html
<template>
  <mls-common-table v-loading="loading"
    :column="tableData.column"
    :data="tableData.data"
    pagination
    background
    :current-page.sync="currentPage"
    :total="100"
    :page-size="pageSize"
    @size-change="handleSizeChange"
    @p-current-change="handleCurrentChange">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: []
      },
      loading: false,
      currentPage: 1,
      pageSize: 5,
    }
  },
  created () {
    this.createData(this.pageSize)
  },
  methods: {
    createData (length) {
      this.loading = true
      let data = []
      for (let i = 0; i < length; i++) {
        data.push({
          date: '2016-05-02',
          name: `王小虎-${this.currentPage}-${i + 1}`,
          address: `上海市普陀区金沙江路 -${this.currentPage}-${i + 1} 弄`
        })
      }
      setTimeout(() => {
        this.tableData.data = data
        this.loading = false
      }, 1000)
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.createData(this.pageSize)
    },
    handleCurrentChange () {
      this.createData(this.pageSize)
    }
  }
}
</script>
```
:::

### hasRatioSelect
* 类型：`Boolean`
* 默认值：`false`  
是否有ratio单选列，true:表示有单选 false:表示没有单选
::: tip
`hasRatioSelect`为true时，必须要同时传入`row-key`参数，否则将不生效，单选列不会显示。`row-key`表示`el-ratio`以哪个字段作为值。
:::
::: demo 由`current-change`事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`。 如果需要显示索引，可设置索引列`type`属性为`index`即可显示从 1 开始的索引号。
```html
<template>
  <div>
    <mls-common-table ref="mlsTable" border
      highlight-current-row
      :column="tableData.column"
      :data="tableData.data"
      :hasRatioSelect="true"
      row-key="name"
      @current-change="handleCurrentChange">
    </mls-common-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData.data[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'index',
            align: 'center',
            label: '序号'
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      },
      currentRow: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.mlsTable.$refs.table.setCurrentRow(row);
    },
    // 可以监听单选行变化
    handleCurrentChange (val) {
      this.currentRow = val;
      this.$message.success('当前选中行：' + JSON.stringify(val))
    }
  }
}
</script>
```
:::
### 多选列
通过在`column`列配置中加入`type=selection`属性的列，可以开启多选功能。
::: tip
列配置的`reserve-selection`为true时，可以开启数据更新后保留之前选中(跨页选中)的功能，需指定`row-key`，与原生`el-table`用法相同。
:::
::: demo
```html
<template>
  <mls-common-table v-loading="loading"
    :column="tableData.column"
    :data="tableData.data"
    pagination
    row-key="name"
    :total="100"
    :page-size="pageSize"
    :current-page.sync="currentPage"
    @size-change="handleSizeChange"
    @p-current-change="handleCurrentChange"
    @selection-change="handleSelectionChange">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'selection',
            label: '选择',
            reserveSelection: true, // 数据刷新后，保留之前选择行
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: []
      },
      loading: false,
      currentPage: 1,
      pageSize: 5,
    }
  },
  created () {
    this.createData(this.pageSize)
  },
  methods: {
    createData (length) {
      this.loading = true
      let data = []
      for (let i = 0; i < length; i++) {
        data.push({
          date: '2016-05-02',
          name: `王小虎-${this.currentPage}-${i + 1}`,
          address: `上海市普陀区金沙江路 -${this.currentPage}-${i + 1} 弄`
        })
      }
      setTimeout(() => {
        this.tableData.data = data
        this.loading = false
      }, 1000)
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.createData(this.pageSize)
    },
    handleCurrentChange () {
      this.createData(this.pageSize)
    },
    handleSelectionChange(selection) {
      this.$message.success(`已选中${selection.length}行数据：${selection.map(item => item.name)}`)
    }
  }
}
</script>
```
:::
### hasSelectedSumary
* 类型：`Boolean`
* 默认值：`false`  
是否有已选中明细显示，true: 有已选中明细 false:没有  
点击左下角的已选中数量的数字，可以查看已选中行的明细
::: demo
```html
<template>
  <mls-common-table ref="mlsTable" border
    highlight-current-row
    :column="tableData1.column"
    :data="tableData1.data"
    :hasRatioSelect="true"
    :hasSelectedSumary="true"
    row-key="name"
    @current-change="handleRatioChange">
  </mls-common-table>
  <mls-common-table v-loading="loading"
    :column="tableData.column"
    :data="tableData.data"
    pagination
    :hasSelectedSumary="true"
    row-key="name"
    :total="100"
    :page-size="pageSize"
    :current-page.sync="currentPage"
    style="margin-top: 40px;"
    @size-change="handleSizeChange"
    @p-current-change="handleCurrentChange"
    @selection-change="handleSelectionChange">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData1: {
        column: [
          {
            type: 'index',
            align: 'center',
            label: '序号'
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王大虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王大虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王大虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      },
      tableData: {
        column: [
          {
            type: 'selection',
            label: '选择',
            reserveSelection: true, // 数据刷新后，保留之前选择行
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: []
      },
      loading: false,
      currentPage: 1,
      pageSize: 5,
    }
  },
  created () {
    this.createData(this.pageSize)
  },
  methods: {
    createData (length) {
      this.loading = true
      let data = []
      for (let i = 0; i < length; i++) {
        data.push({
          date: '2016-05-02',
          name: `王小虎-${this.currentPage}-${i + 1}`,
          address: `上海市普陀区金沙江路 -${this.currentPage}-${i + 1} 弄`
        })
      }
      setTimeout(() => {
        this.tableData.data = data
        this.loading = false
      }, 1000)
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.createData(this.pageSize)
    },
    handleCurrentChange () {
      this.createData(this.pageSize)
    },
    handleSelectionChange(selection) {
      this.$message.success(`多选table已选中${selection.length}行数据：${selection.map(item => item.name)}`)
    },
    handleRatioChange(val) {
      this.$message.success('单选table选中行：' + JSON.stringify(val))
    }
  }
}
</script>
```
:::
### selectedColumn
* 类型：`Array`
* 默认值：`undefinded`  
控制已选中行table显示的列，不传的情况下，默认显示已选数据的前3列
::: demo
```html
<template>
  <div>
    <mls-common-table ref="mlsTable" border
      highlight-current-row
      :column="tableData.column"
      :data="tableData.data"
      :hasRatioSelect="true"
      :selectedColumn="selectedColumn"
      :hasSelectedSumary="true"
      row-key="name"
      @current-change="handleCurrentChange">
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'index',
            align: 'center',
            label: '序号'
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      },
      selectedColumn: [{
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'address',
        label: '地址'
      }],
      currentRow: null
    }
  },
  methods: {
    // 可以监听单选行变化
    handleCurrentChange (val) {
      this.currentRow = val;
      this.$message.success('当前选中行：' + JSON.stringify(val))
    }
  }
}
</script>
```
:::


### el-table组件原生的props
- el-table组件原有的props全部都可以直接使用，使用方式及说明请参考[文档](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)

## 事件Emit Event
- `mlsCommonTable` 组件拥有所有 `el-table` 组件的事件，事件列表见[文档](https://element.eleme.cn/#/zh-CN/component/table#table-events)。监听事件的方式与`el-table`的监听事件方式一样。  
1. `selection-change` 事件例子 [多选](#多选)

## 方法Methods
- `mlsCommonTable` 组件拥有所有 `el-table` 组件的方法，方法列表见[文档](https://element.eleme.cn/#/zh-CN/component/table#table-methods)。
:::tip
`mlsCommonTalbe`组件中包含了一个`ref='table'`的`lb-table`组件。要调用`el-table`组件的原生方法，可以这样调用`this.$refs.mlsTable.$refs.table.clearSelection()`
:::
1. `setCurrentRow()`方法例子 [单选](#hasratioselect)

## 基本使用
### 基础表格
基础的表格展示用法。
::: demo
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 表格对齐
表格头部及内容的对齐方式。
::: demo
```html
<template>
  <div>
    <mls-common-table :column="tableData.column"
      :data="tableData.data"
      border
      align="center">
    </mls-common-table>

    <mls-common-table :column="tableData.column2"
      :data="tableData.data"
      border
      align="center"
      style="margin-top: 20px">
    </mls-common-table>

    <mls-common-table :column="tableData.column3"
      :data="tableData.data"
      border
      align="center"
      header-align="right"
      style="margin-top: 20px">
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            width: '120'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        column2: [
          {
            prop: 'date',
            label: '日期',
            width: '120',
            align: 'right'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120',
            align: 'left'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        column3: [
          {
            prop: 'date',
            label: '日期',
            width: '120',
            align: 'left'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120',
            align: 'left'
          },
          {
            prop: 'address',
            label: '地址',
            headerAlign: 'left'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  }
}
</script>
```
:::


### 带斑马纹表格
使用带斑马纹的表格，可以更容易区分出不同行的数据。
::: demo
```html
<template>
  <mls-common-table stripe
    :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  }
}
</script>
```
:::


### 带边框表格
::: demo
```html
<template>
  <mls-common-table border
    :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 带状态表格
可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。
::: demo
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data"
    :row-class-name="tableRowClassName">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

```
:::



### 固定表头
纵向内容过多时，可选择固定表头。
::: demo
```html
<template>
  <mls-common-table :column="column"
    :data="data"
    border
    height="250">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: []
    }
  },
  created () {
    for (let i = 0; i < 20; i++) {
      this.data.push({
        date: `2016-05-${i + 1}`,
        name: `王小虎${i + 1}`,
        address: `上海市普陀区金沙江路 ${i + 1} 弄`
      })
    }
  }
}
</script>

```
:::

### 固定列
横向内容过多时，可选择固定列。
::: demo
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            width: '150',
            fixed: true
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'province',
            label: '省份',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址',
            width: '300'
          },
          {
            prop: 'zip',
            label: '邮编',
            width: '120',
            fixed: 'right'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333
          }
        ]
      }
    }
  }
}
</script>

```
:::

### 流体高度 
当数据量动态变化时，可以为 Table 设置一个最大高度。
::: demo 通过设置`max-height`属性为 Table 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data"
    max-height="250">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            width: '150',
            fixed: true
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'province',
            label: '省份',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址',
            width: '300'
          },
          {
            prop: 'zip',
            label: '邮编',
            width: '120',
            fixed: 'right'
          }
        ],
        data: []
      }
    }
  },
  created () {
    for (let i = 0; i < 20; i++) {
      this.tableData.data.push({
        date: `2016-05-${i + 1}`,
        name: `王小虎${i + 1}`,
        province: '上海',
        city: '普陀区',
        address: `上海市普陀区金沙江路 ${i + 1} 弄`,
        zip: 200333
      })
    }
  }
}
</script>

```
:::

### 多级表头 
数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。
::: demo 通过设置`column`中的`children`进行表格头嵌套，理论支持无限极嵌套，嵌套也支持自定义表头及列数据。
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data"
    height="450">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            fixed: true,
            width: '120',
            renderHeader: (h, scope) => {
              return <span><i class="el-icon-time"></i>{ scope.column.label }</span>
            }
          },
          {
            label: '配送信息',
            children: [
              {
                prop: 'name',
                label: '姓名',
                width: '120',
                render: (h, scope) => {
                  return <el-tag>{ scope.row[scope.column.property] }</el-tag>
                }
              },
              {
                label: '地址',
                children: [
                  {
                    prop: 'province',
                    label: '省份',
                    width: '120'
                  },
                  {
                    prop: 'city',
                    label: '市区',
                    width: '120'
                  },
                  {
                    prop: 'address',
                    label: '地址',
                    width: '300px',
                    renderHeader: (h, scope) => {
                      return <span><i class="el-icon-location-outline"></i>{ scope.column.label }</span>
                    }
                  }
                ]
              }
            ]
          }
        ],
        data: []
      }
    }
  },
  created () {
    for (let i = 0; i < 20; i++) {
      this.tableData.data.push({
        date: `2016-05-${i + 1}`,
        name: `王小虎${i + 1}`,
        province: '上海',
        city: '普陀区',
        address: `上海市普陀区金沙江路 ${i + 1} 弄`,
        zip: 200333
      })
    }
  }
}
</script>
```
:::

### 单选 
选择单行数据时使用色块表示。
::: demo 同 `El-Table` 组件，只需要配置`highlight-current-row`属性即可实现单选。之后由`current-change`事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`。 如果需要显示索引，可设置索引列`type`属性为`index`即可显示从 1 开始的索引号。
```html
<template>
  <div>
    <mls-common-table ref="mlsTable"
      highlight-current-row
      :column="tableData.column"
      :data="tableData.data"
      @current-change="handleCurrentChange">
    </mls-common-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData.data[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'index',
            align: 'center'
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      },
      currentRow: null
    }
  },
  methods: {
    setCurrent (row) {
      this.$refs.mlsTable.$refs.table.setCurrentRow(row);
    },
    handleCurrentChange (val) {
      this.currentRow = val;
    }
  }
}
</script>
```
:::




### 多选 
选择多行数据时使用 Checkbox。
::: demo 设置`type`为`selection`即可。
```html
<template>
  <div>
    <mls-common-table ref="mlsTable"
      :column="tableData.column"
      :data="tableData.data"
      @selection-change="handleSelectionChange">
    </mls-common-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData.data[1], tableData.data[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        column: [
          {
            type: 'selection'
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.mlsTable.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.mlsTable.$refs.table.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
```
:::

### 筛选 
对表格进行筛选，可快速查找到自己想看的数据。
::: demo 在列中设置 `filters` `filter-method``属性即可开启该列的筛选，filters` 是一个数组，`filter-method` 是一个方法，它用于决定某些数据是否显示，会传入三个参数：`value`, `row` 和 `column`。
```html
<template>
  <div>
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <mls-common-table ref="filterTable"
      :column="tableData.column"
      :data="tableData.data">
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            sortable: true,
            columnKey: 'date',
            filters: [
              {text: '2016-05-01', value: '2016-05-01'},
              {text: '2016-05-02', value: '2016-05-02'},
              {text: '2016-05-03', value: '2016-05-03'},
              {text: '2016-05-04', value: '2016-05-04'}
            ],
            filterMethod: this.filterHandler
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          },
          {
            prop: 'tag',
            label: '标签',
            filters: [
              { text: '家', value: '家' },
              { text: '公司', value: '公司' }
            ],
            filterMethod: this.filterTag,
            filterPlacement: 'bottom-end',
            render: (h, scope) => {
              return (
                <el-tag type={ scope.row.tag === '家' ? 'primary' : 'success' }>
                  { scope.row.tag }
                </el-tag>
              )
            }
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '家'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag: '公司'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '家'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '公司'
          }
        ]
      }
    }
  },
  methods: {
    resetDateFilter () {
      this.$refs.filterTable.$refs.table.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.$refs.table.clearFilter()
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value;
    }
  }
}
</script>
```
:::









### 展开行 
当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。
::: demo 通过设置 `type="expand"`可以开启展开行功能，展开行的内容可以通过`render`自定义
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'expand',
            render: (h, props) => {
              return  (
                <el-form label-position="left" 
                  inline 
                  class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{ props.row.name }</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{ props.row.shop }</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{ props.row.id }</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{ props.row.shopId }</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{ props.row.category }</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{ props.row.address }</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{ props.row.desc }</span>
                  </el-form-item>
                </el-form>
              )
            }
          },
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '商品名称'
          },
          {
            prop: 'desc',
            label: '描述'
          }
        ],
        data: [
          {
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }
        ]
      }
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
```
:::




### 自定义列模板 
自定义列的显示内容，可组合其他组件使用。  
自定义模板会用到JSX语法，JSX语法请参考[文档](https://github.com/vuejs/babel-plugin-transform-vue-jsx#difference-from-react-jsx)
::: demo 暂不支持官方`<template slot-scope="scope"></template>`用法自定义，统一使用`render`和`JSX`写法。`render`参考[官网文档](https://cn.vuejs.org/v2/guide/render-function.html)。个人觉得`JSX`写法更简洁舒服些，后面的相关示例都是`JSX`写法， `vue-cli-2`脚手架搭建的项目如需支持`JSX`，请参考配置：[点击前往](https://github.com/vuejs/babel-plugin-transform-vue-jsx)，如需支持`v-model`写法，请安装配置：[点击前往](https://github.com/nickmessing/babel-plugin-jsx-v-model)。 `vue-cli-3`脚手架自带，可直接使用`JSX`,`JSX`写法参考同上地址。
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'expand',
            render: (h, props) => {
              return  (
                <el-form label-position="left" 
                  inline 
                  class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{ props.row.name }</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{ props.row.shop }</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{ props.row.id }</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{ props.row.shopId }</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{ props.row.category }</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{ props.row.address }</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{ props.row.desc }</span>
                  </el-form-item>
                </el-form>
              )
            }
          },
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '商品名称'
          },
          {
            prop: 'desc',
            label: '描述'
          }
        ],
        data: [
          {
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }
        ]
      }
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
```
:::


### 树形数据与懒加载
::: demo 用法同`el-table`，当 `row` 中包含 `children` 字段时，被视为树形数据。渲染树形数据时，必须要指定 `row-key`。支持子节点数据异步加载。设置 `Table` 的 `lazy` 属性为 `true` 与加载函数 `load` 。通过指定 `row` 中的 `hasChildren` 字段来指定哪些行是包含子节点。`children` 与 `hasChildren` 都可以通过 `tree-props` 配置。
```html
<template>
  <div>
    <mls-common-table :column="tableData1.column"
      :data="tableData1.data"
      border
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    </mls-common-table>
    <br />
    <mls-common-table :column="tableData1.column"
      :data="tableData2.data"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData1: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [
              {
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              },
              {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }
            ]
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      },
      tableData2: {
        data: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            hasChildren: true
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
```
:::


### 表尾合计行
若表格展示的是各类数字，可以在表尾显示各列的合计。
::: demo 将`show-summary`设置为`true`就会在表格尾部展示合计行。默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过`sum-text`配置），其余列会将本列所有数值进行求合操作，并显示出来。当然，你也可以定义自己的合计逻辑。使用`summary-method`并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，具体可以参考本例中的第二个表格。
```html
<template>
  <div>
    <mls-common-table :column="tableData.column"
      :data="tableData.data"
      border
      show-summary>
    </mls-common-table>

    <mls-common-table :column="tableData.column"
      :data="tableData.data"
      :summary-method="getSummaries"
      style="margin-top: 20px"
      height="250"
      border
      show-summary>
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'amount1',
            label: '数值1',
            sortable: true
          },
          {
            prop: 'amount2',
            label: '数值2',
            sortable: true
          },
          {
            prop: 'amount3',
            label: '数值3',
            sortable: true
          }
        ],
        data: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3',
            amount3: 10
          },
          {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '4',
            amount3: 12
          },
          {
            id: '12987124',
            name: '王小虎',
            amount1: '324',
            amount2: '1',
            amount3: 9
          },
          {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2',
            amount3: 17
          },
          {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4',
            amount3: 15
          }
        ]
      }
    }
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0);
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>
```
:::


### 自定义索引
若表格展示的是各类数字，可以在表尾显示各列的合计。
::: demo 通过给 `type=index` 的列传入 `index` 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。也可以传入一个方法，它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示。
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            type: 'index',
            index: this.indexMethod
          },
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  },
  methods: {
    indexMethod (index) {
      return index * 2
    }
  }
}
</script>
```
:::

### 合并行或列
多行或多列共用一个数据时，可以合并行或列。
::: demo 通过给`lb-table`传入`span-method`方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行`row`、当前列`column`、当前行号`rowIndex`、当前列号`columnIndex`四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表`rowspan`，第二个元素代表`colspan`。 也可以返回一个键名为`rowspan`和`colspan`的对象。
```html
<template>
  <div>
    <mls-common-table :column="tableData.column"
      :data="tableData.data"
      :span-method="arraySpanMethod"
      border>
    </mls-common-table>

    <mls-common-table :column="tableData.column"
      :data="tableData.data"
      :span-method="objectSpanMethod"
      style="margin-top: 20px"
      border>
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'amount1',
            label: '数值1',
            sortable: true
          },
          {
            prop: 'amount2',
            label: '数值2',
            sortable: true
          },
          {
            prop: 'amount3',
            label: '数值3',
            sortable: true
          }
        ],
        data: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3',
            amount3: 10
          },
          {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '4',
            amount3: 12
          },
          {
            id: '12987124',
            name: '王小虎',
            amount1: '324',
            amount2: '1',
            amount3: 9
          },
          {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2',
            amount3: 17
          },
          {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4',
            amount3: 15
          }
        ]
      }
    }
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
```
:::




## 扩展使用
### 表格分页
表格支持开启分页显示
::: tip 
由于分页和表格的`current-change`冲突，所以分页请使用`p-current-change` 
:::
::: demo `mls-common-table`设置属性`pagination`即可开启分页，分页相关参数及用法同`el-pagination`。暂时新增几个新参数，`paginationTop`表示分页距离表格的间距，默认`15px`
```html
<template>
  <mls-common-table v-loading="loading"
    :column="tableData.column"
    :data="tableData.data"
    pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[5, 10, 20, 30]"
    :pager-count="5"
    :current-page.sync="currentPage"
    :total="100"
    :page-size="pageSize"
    @size-change="handleSizeChange"
    @p-current-change="handleCurrentChange">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        data: []
      },
      loading: false,
      currentPage: 1,
      pageSize: 5,
    }
  },
  created () {
    this.createData(this.pageSize)
  },
  methods: {
    createData (length) {
      this.loading = true
      let data = []
      for (let i = 0; i < length; i++) {
        data.push({
          date: '2016-05-02',
          name: `王小虎-${this.currentPage}-${i + 1}`,
          address: `上海市普陀区金沙江路 -${this.currentPage}-${i + 1} 弄`
        })
      }
      setTimeout(() => {
        this.tableData.data = data
        this.loading = false
      }, 1000)
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.createData(this.pageSize)
    },
    handleCurrentChange () {
      this.createData(this.pageSize)
    }
  }
}
</script>
```
:::

### 表格动态合并
支持表格动态合并
::: demo `mls-common-table`上配置`merge`,`merge`为一个包含需要合并的`column`中`prop`的数组，配置后会自动将值相同的项自动合并。
```html
<template>
  <div>
    <mls-common-table :column="tableData.column"
      :data="tableData.data"
      :merge="['name', 'proportion', 'material', 'value3']"
      border>
    </mls-common-table>

    <mls-common-table :column="tableData2.column"
      :data="tableData2.data"
      :merge="['name', 'proportion']"
      border
      style="margin-top: 20px">
    </mls-common-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'name',
            label: '行业'
          },
          {
            prop: 'proportion',
            label: '市场规模占比'
          },
          {
            prop: 'material',
            label: '主原材料'
          },
          {
            prop: 'value1',
            label: '最新价格'
          },
          {
            prop: 'value2',
            label: '比年初'
          },
          {
            prop: 'value3',
            label: '比上年同期'
          }
        ],
        data: [
          {
            name: ' 氮肥、复合肥',
            proportion: '15.23%',
            material: '尿素',
            value1: '2.04',
            value2: '2.00%',
            value3: '	13.97%'
          },
          {
            name: ' 氮肥、复合肥',
            proportion: '15.23%',
            material: '三元复合肥',
            value1: '2.74',
            value2: '0.37%',
            value3: '	2.24%'
          },
          {
            name: ' 氮肥、复合肥',
            proportion: '15.23%',
            material: '三元复合肥',
            value1: '3.05',
            value2: '0.33%',
            value3: '	2.35%'
          },
          {
            name: ' 种子生产',
            proportion: '6.83%',
            material: '玉米种子',
            value1: '24.3',
            value2: '-16.06%',
            value3: '	-5.70%'
          },
          {
            name: ' 种子生产',
            proportion: '6.83%',
            material: '水稻种子',
            value1: '24.3',
            value2: '-16.06%',
            value3: '	-5.70%'
          }
        ]
      },
      tableData2: {
        column: [
          {
            prop: 'name',
            label: '主要行业',
            width: '150'
          },
          {
            prop: 'proportion',
            label: '市场规模占比',
            width: '150'
          },
          {
            prop: 'indexName',
            label: '指标',
            width: '300'
          },
          {
            prop: 'value1',
            label: '2018年'
          },
          {
            prop: 'value2',
            label: '2017年'
          },
          {
            prop: 'value3',
            label: '2016年'
          }
        ],
        data: [
          {
            name: '房地产（商业住宅）',
            proportion: '60%',
            indexName: '住宅房地产开发投资累计同比增速',
            value1: '13.6%',
            value2: '9.4%',
            value3: '6.4%'
          },
          {
            name: '房地产（商业住宅）',
            proportion: '60%',
            indexName: '商品房销售面积累计累计同比增速',
            value1: '2.9%',
            value2: '7.7%',
            value3: '22.5%'
          },
          {
            name: '建筑业（商业住宅）',
            proportion: '60%',
            indexName: '住宅房屋建筑竣工面积累计同比增长率',
            value1: '0.05%',
            value2: '0.93%',
            value3: '0.24%'
          },
          {
            name: '房地产（公共建筑）',
            proportion: '40%',
            indexName: '办公楼房地产开发投资完成额累计同比增速',
            value1: '-12%',
            value2: '3.5%',
            value3: '5.2%'
          },
          {
            name: '房地产（公共建筑）',
            proportion: '40%',
            indexName: '商业营业用房房地产开发投资累计同比增速',
            value1: '-9.4%',
            value2: '-1.2%',
            value3: '8.4%'
          },
          {
            name: '建筑业（公共建筑）',
            proportion: '40%',
            indexName: '办公用房竣工面积累计值（万平方米）',
            value1: '-8.06%',
            value2: '0.82%',
            value3: '6.46%'
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 普通形式表格编辑
数据简单的情况下，可以通过点击编辑按钮直接进行表格的编辑、保存、取消操作
::: tip
由于`vuepress`不支持`JSX`的`v-model`，所以示例代码使用的`value`、`onChange`、`onInput`实现的双向绑定，正常环境下可直接使用`v-model`
:::
::: demo 由于编辑模式下数据格式不统一，如日期数据通过`DatePicker`选择，普通的文本通过`Input`，下拉选择的通过`ElSelect`等，所以就不进行整合了， 大家可以通过`render`自定义出任意效果的编辑模式，原理就是根据是否是编辑模式的字段，渲染不同的内容， 如本例中的`_edit`,为`true`的情况下渲染相应的编辑模式下的组件，否则就是普通的文本。  由于编辑模式中有取消，所以取消的时候得还原原数据，可以通过定义一个`defaultData`,该值为`JSON.parse(JSON.stringify(this.tableData.data))`, 加`JSON.parse`和`JSON.stringify`防止`defaultData`数据随着`this.tableData.data`的改变而改变，取消的时候通过`$index`索引从`defaultData`中拿到原数据， 然后根据`$index`索引修改`this.tableData.data`的数据
```html
<template>
  <mls-common-table :column="tableData.column"
    :data="tableData.data">
  </mls-common-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            width: '150',
            render: (h, scope) => {
              return (
                <div>
                  {
                    scope.row._edit
                      ? <el-date-picker
                        value={ scope.row[scope.column.property] }
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 140px"
                        onInput={ (val) => { scope.row[scope.column.property] = val } }>
                      </el-date-picker>
                      : <span>{ scope.row[scope.column.property] }</span>
                  }
                </div>
              )
            }
          },
          {
            prop: 'name',
            label: '姓名',
            render: (h, scope) => {
              return (
                <div>
                  {
                    scope.row._edit
                      ? <el-input value={ scope.row[scope.column.property] } onInput={ (val) => { scope.row[scope.column.property] = val } }></el-input>
                      : <span>{ scope.row[scope.column.property] }</span>
                  }
                </div>
              )
            }
          },
          {
            prop: 'tag',
            label: '标签',
            render: (h, scope) => {
              return (
                <div>
                  {
                    scope.row._edit
                      ? (
                        <el-select value={ scope.row[scope.column.property] }
                          style="width: 80px"
                          onChange={ (val) => { scope.row[scope.column.property] = val } }>
                          {
                            this.tagOptions.map(option => {
                              return (
                                <el-option label={ option.label } value={ option.value }></el-option>
                              )
                            })
                          }
                        </el-select>
                      )
                      : <el-tag type={ scope.row.tag === '家' ? 'primary' : 'success'}>{ scope.row[scope.column.property] }</el-tag>
                  }
                </div>
              )
            }
          },
          {
            label: '操作',
            render: (h, scope) => {
              return (
                <div>
                  {
                    scope.row._edit
                      ? <div>
                        <el-button type="primary" onClick={ () => { this.handleSave(scope) } }>保存</el-button>
                        <el-button onClick={ () => { this.handleCancle(scope) } }>取消</el-button>
                      </div>
                      : <el-button type="primary"
                        onClick={ () => { this.handleEdit(scope) } }>编辑</el-button>
                  }
                </div>
              )
            }
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            tag: '家'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            tag: '公司'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            tag: '公司'
          }
        ],
        defaultData: []
      },
      tagOptions: [
        {
          label: '家',
          value: '家'
        },
        {
          label: '公司',
          value: '公司'
        }
      ]
    }
  },
  created () {
    this.tableData.defaultData = JSON.parse(JSON.stringify(this.tableData.data))
  },
  methods: {
    handleEdit (scope) {
      this.$set(scope.row, '_edit', true)
    },
    handleSave (scope) {
      this.$set(scope.row, '_edit', false)
      this.$set(this.tableData.defaultData, scope.$index, JSON.parse(JSON.stringify(scope.row)))
    },
    handleCancle (scope) {
      this.$set(this.tableData.data, scope.$index, JSON.parse(JSON.stringify(this.tableData.defaultData[scope.$index])))
    }
  }
}
</script>
```
:::

### 弹窗形式表格编辑
数据复杂的情况，建议通过弹窗形式进行数据编辑的操作
::: tip
由于`vuepress`不支持`JSX`的`v-model`，所以示例代码使用的`value`、`onChange`、`onInput`实现的双向绑定，正常环境下可直接使用`v-model`
:::
::: demo 由于编辑模式下数据格式不统一，如日期数据通过`DatePicker`选择，普通的文本通过`Input`，下拉选择的通过`ElSelect`等，所以就不进行整合了， 大家可以通过`render`自定义出任意效果的编辑模式，原理就是根据是否是编辑模式的字段，渲染不同的内容， 如本例中的`_edit`,为`true`的情况下渲染相应的编辑模式下的组件，否则就是普通的文本。  由于编辑模式中有取消，所以取消的时候得还原原数据，可以通过定义一个`defaultData`,该值为`JSON.parse(JSON.stringify(this.tableData.data))`, 加`JSON.parse`和`JSON.stringify`防止`defaultData`数据随着`this.tableData.data`的改变而改变，取消的时候通过`$index`索引从`defaultData`中拿到原数据， 然后根据`$index`索引修改`this.tableData.data`的数据
```html
<template>
  <div>
    <mls-common-table :column="tableData.column"
      :data="tableData.data">
    </mls-common-table>

    <el-dialog :visible.sync="dialogVisible"
      title="编辑"
      append-to-body>
      <div class="dialog-content">
        <el-form v-if="currentEdit"
          label-width="100px">

          <el-form-item label="日期">
            <el-date-picker v-model="currentEdit.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="姓名">
            <el-input v-model="currentEdit.name"
              placeholder="请输入姓名">
            </el-input>
          </el-form-item>

          <el-form-item label="地址">
            <el-input v-model="currentEdit.address"
              type="textarea"
              placeholder="请输入地址">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          },
          {
            label: '操作',
            render: (h, scope) => {
              return <el-button type="primary" onClick={ () => { this.openDialog(scope) } }>编辑</el-button>
            }
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      },
      currentEdit: null,
      currentIndex: null,
      dialogVisible: false
    }
  },
  methods: {
    openDialog (scope) {
      this.currentEdit = JSON.parse(JSON.stringify(scope.row))
      this.currentIndex = scope.$index
      this.dialogVisible = true
    },
    confirm () {
      this.dialogVisible = false
      this.$set(this.tableData.data, this.currentIndex, this.currentEdit)
    }
  }
}
</script>
```
:::
