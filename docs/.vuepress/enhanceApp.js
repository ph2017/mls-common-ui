import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/theme/index.css'
// import MlsCommonForm from '../../src/packages/mlsCommonForm';
// import MlsCommonTable from '../../src/packages/mlsCommonTable';
import DemoPage from './components/demoPage'
import { MlsCommonForm, MlsCommonTable } from '../../lib/@yueyun/mls-common-ui.umd'
import '../../lib/@yueyun/mls-common-ui.css'

export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.component('MlsCommonForm', MlsCommonForm);
  Vue.component('MlsCommonTable', MlsCommonTable);
  Vue.component('DemoPage', DemoPage);
}