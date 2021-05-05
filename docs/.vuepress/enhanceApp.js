import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import MlsCommonForm from '../../src/packages/mlsCommonForm';
import { MlsCommonForm } from '../../lib/@yueyun/mls-common-ui.umd'

export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.component('MlsCommonForm', MlsCommonForm);
}