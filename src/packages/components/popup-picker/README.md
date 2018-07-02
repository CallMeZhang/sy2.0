# sy-popup-picker
## 功能
* 滚动选取
## 使用范围
* 局部(引用)
## 相关参数及函数描述

### API

|参数|	说明|	类型	|可选值|	默认值|
| --------   | -----   | ---- |  ---- |  ---- |
|type	|组件的类型	|String|	'datetime', 'date', 'time'	|'datetime'|
|cancelText	|取消按钮文本	|String		| |'取消'|
|confirmText|	确定按钮文本	|String	|	|'确定'|
|startDate	|日期的最小可选值|	Date|		|十年前的 1 月 1 日|
|endDate	|日期的最大可选值	|Date|		|十年后的 12 月 31 日|
|startHour	|小时的最小可选值|	Number|		|0|
|endHour	|小时的最大可选值|	Number|	|	23|
|yearFormat|	年份模板	|String	|	|'{value}'|
|monthFormat|	月份模板|	String|		|'{value}'|
|dateFormat	|日期模板	|String|		|'{value}'|
|hourFormat	|小时模板|	String|	|	'{value}'|
|minuteFormat|	分钟模板	|String	| |	'{value}'|

### Events

|事件名称	| 说明| 回调参数 |
| --------   | -----  | -----  |
|confirm	|点击确认按钮时的回调函数|	目前的选择值

## 使用方法
import { DatetimePicker } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);

<mt-datetime-picker
  v-model="pickerVisible" 
  type="time" 
  @confirm="handleConfirm">
</mt-datetime-picker>
>当点击确认按钮时会触发 confirm 事件，参数为当前 value 的值。
- v-model 属性为组件的绑定值。
- type 属性表示 datetime-picker 组件的类型，它有三个可能的值：
  + datetime: 日期时间选择器，可选择年、月、日、时、分，value 值为一个 Date 对象
  + date: 日期选择器，可选择年、月、日，value 值为一个 Date 对象
  + time: 时间选择器，可选择时、分，value 值为一个格式为 HH:mm 的字符串
- datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器。
  + this.$refs.picker.open(); 
  + this.$refs.picker.close();
  + <font color=#ff0000 >picker为当前datetime-picker的ref值</font>
><font color=#ff0000  face="黑体">样式 脚本逻辑谨慎修改</font>
