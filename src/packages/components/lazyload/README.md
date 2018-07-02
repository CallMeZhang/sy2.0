# lazyload
## 功能
* 图片懒加载
## 使用范围
* 全局&局部
## 相关参数及函数描述

### API

|参数|	说明|	类型	|	默认值|
| --------   | -----   |  ---- |  ---- |
|preLoad	|proportion of pre-loading height（预加载高度比例）	|	Number|1.3|
|error	|src of the image upon load fail（图片路径错误时加载图片）	|String		| 'data-src'|
|loading|		src of the image while loading（预加载图片）	|String	|	'data-src'	|
|attempt|	attempts count（尝试加载图片数量）	|	Number	|3 |
|listenEvents	|events that you want vue listen for|	Desired Listen Events|	'scroll'（默认）,'wheel','mousewheel','resize','animationend','transitionend','touchmove'	|
|adapter	|	dynamically modify the attribute of element（动态修改元素属性）|Date|	Element Adapter	|
|filter	|the image's listener filter|	Number|{ }		|
|lazyComponent	|lazyload component|	Number|Lazy Component	|
|dispatchEvent|	trigger the dom event	|Boolean	|	false	|
|throttleWait|	throttle wait|	Number|	200	|
|observer	|use IntersectionObserver	|	Boolean|		false	|
|observerOptions	|IntersectionObserver options|	IntersectionObserver|	{ rootMargin: '0px', threshold: 0.1 }	|	

### Events
>[链接地址](https://github.com/hilongjw/vue-lazyload)
## 使用方法
```
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
```
><font color=#ff0000  face="黑体">样式 脚本逻辑谨慎修改</font>
