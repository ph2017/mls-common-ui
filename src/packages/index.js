import MlsCommonForm from './mlsCommonForm'
import MlsCommonTable from './mlsCommonTable'

const components = [
  MlsCommonForm,
  MlsCommonTable
]

// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  // 遍历并注册全局组件
  components.map(component => {
      Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 不能export default {}
export {
  // 导出的对象必须具备一个 install 方法
  install,
  MlsCommonForm,
  MlsCommonTable
}