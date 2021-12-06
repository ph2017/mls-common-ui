import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/theme/index.css'
import DemoPage from './components/demoPage'
import { MlsCommonForm, MlsCommonTable } from 'mls-common-ui'
// import 'mls-common-ui/lib/@yueyun/mls-common-ui.css'

export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.component('MlsCommonForm', MlsCommonForm);
  Vue.component('MlsCommonTable', MlsCommonTable);
  Vue.component('DemoPage', DemoPage);
}