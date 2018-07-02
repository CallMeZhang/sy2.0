// window.Array.prototype.remove = function(val) {
//   var index = this.indexOf(val);
//   if (index > -1) {
//     this.splice(index, 1);
//   }
// };
// window.Array.prototype.isHave = function(val) {
//   var i = this.length;
//   while (i--) {
//     if (this[i] === val) {
//       return true;
//     }
//   }
//   return false;
// };
export function checkPhone(phone) {
  var phone = phone || ''
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  } else {
    return true
  }
}

export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

export function setCookie(c_name,value,expiredays) {
  var expdate=new Date();
  expdate.setDate(expdate.getDate()+expiredays*86400);
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+expdate.toGMTString());
}

export function checkPlatform() {
  var browser = {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq", //是否QQ
        qz: u.indexOf('Qzone/') !== -1, //是否是QQ空间
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  return browser.versions
}

export function checkBrowser() {
  /*
  * 浏览器相关信息
  * */
  var Browser = {
    getBrowser: function () {
      var UA = navigator.userAgent || ''
      var isAndroid = (function () {
        return UA.match(/Android/i) ? true : false
      })();
      var isQQ = (function () {
        return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)
      })();
      var isIOS = (function () {
        return UA.match(/iPhone|iPad|iPod/i) ? true : false
      })();
      var isSafari = (function () {
        return /iPhone|iPad|iPod\/([\w.]+).*(safari).*!/i.test(UA)
      })();
      var isWx = (function () {
        return UA.match(/micromessenger/i) ? true : false
      })()
      var isWb = (function () {
        return UA.match(/weibo/i) ? true : false
      })();
      var isAndroidChrome = (function () {
        return (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ
      })();
      var isQZ = (function () {
        return UA.indexOf('Qzone/') !== -1
      })();
      var newBrowser = {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isSafari: isSafari,
        isQQ: isQQ,
        isWb: isWb,
        isWx: isWx,
        isQZ: isQZ,
        isAndroidChrome: isAndroidChrome
      }
      return newBrowser
    }()
  }
  return Browser.getBrowser
}

//实现深拷贝
export function deepCopy(target) {
  if (typeof target !== 'object') return;
  var newObj = target instanceof Array ? [] : {};
  for (var item in target) {
    if (target.hasOwnProperty(item)) {
      newObj[item] = typeof target[item] == 'object' ? deepCopy(target[item]) : target[item] //判断属性值类型
    }
  }
  return newObj
}
