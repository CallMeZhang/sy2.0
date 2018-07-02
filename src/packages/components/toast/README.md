# toast
##功能
* toast信息提示
## 使用范围
* 全局&局部
## 相关参数及函数描述
|  参数   | 说明    |  类型  | 可选值	| 默认值 |
| --------   | -----   | ---- |  ---- |  ---- |
| message    | 文本内容     |   String    |     |     |
| position   | Toast 的位置      |   String    |  'top' 'bottom' 'middle'|'middle'   |
| duration   | 持续时间（毫秒），若为 -1 则不会自动关闭      |  Number    |
| className  | Toast 的类名。可以为其添加样式      |   String    |  |   3000  |
| iconClass(暂无) | icon 图标的类名      |   String    |

## 使用方法
1. import局部导入

Toast({
  message: '提示',
  position: 'bottom',
  duration: 5000
});
2. this.$toast方法全局调用

this.$toast({
  message: '提示',
  position: 'bottom',
  duration: 5000
});
><font color=#ff0000  face="黑体">样式 脚本逻辑谨慎修改</font>
