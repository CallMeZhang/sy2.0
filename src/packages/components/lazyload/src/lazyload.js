import vue from 'vue'
import Lazyload from 'vue-lazyload';

vue.use(Lazyload,{
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 3,
  listenEvents:[ 'scroll' ]
});
export default Lazyload;
