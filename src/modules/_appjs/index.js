// 首次调用，建立通讯
syJsbGetAppInfo(function (appInfo) {
});

//判断是否是ios
function isIos() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

//判断是否是android
function isAndroid() {
  if (/(Android)/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

//加号显示菜单（右上角）
function syJsbShowMoreMenu() {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      syJsb.showMenuBar("true");
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("showMenuBar", "true", function (response) {
        });
      });
    }
  });
}

//ios app与页面交互的方法
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  if (!WVJBIframe.attachEvent) {
    window.WVJBCallbacks = "";
    callback(false);
  }
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

//ios  registerHandler
function syJsbIosRegisterHandler(callback) {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.registerHandler(callback, function (data) {
      eval(callback + "('" + data + "')");
    });
  });
}

//获取appinfo
function syJsbGetAppInfo(callback) {
  var appInfo = false;
  if (isAndroid()) {
    try {
      appInfo = syJsb.getAppInfo();
      callback(appInfo);
    } catch (error) {
      callback(appInfo);
    }
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      if (!bridge) {
        callback(appInfo);
      } else {
        bridge.callHandler("getAppInfo", null, function (appinfo) {
          appInfo = appinfo;
          callback(appInfo);
        });
      }
    });
  } else {
    callback(appInfo);
  }
}

//已经废弃
function syJsbIosInfoPromise() {
  var info = new Promise(function (resolve, reject) {
    setupWebViewJavascriptBridge(function (bridge) {
      if (!bridge) {
        return false;
      } else {
        bridge.callHandler("getAppInfo", null, function (appinfo) {
          var version = appinfo.split("|")[5];
          resolve(version);
        });
      }
    });
  });
  return info;
}

//获取APP版本号（分android和ios）废弃
function syJsbGetAppVersion() {
  var info = [];
  info['platform'] = 'none';
  info['version'] = 'none';
  var appInfo = false;
  if (isAndroid()) {
    try {
      appInfo = syJsb.getAppInfo();
    } catch (error) {
      return info;
    }
  } else if (isIos()) {
    info['platform'] = 'ios';
    info['version'] = syJsbIosInfoPromise();
    return info;
  } else {
    return info;
  }
  var platform = appInfo.split("|")[1];
  var version = appInfo.split("|")[5];
  info['platform'] = platform;
  info['version'] = parseInt(version);
  return info;
}

function syJsbIosClientInfo() {
  return new Promise(function (resolve, reject) {
    setupWebViewJavascriptBridge(function (bridge) {
      if (!bridge) {
        resolve(false);
      } else {
        bridge.callHandler("getAppInfo", null, function (appinfo) {
          var version = appinfo.split("|")[5];
          resolve(version);
        });
      }
    });
  });
}

async function syJsbGetClientInfo() {
  let info = [];
  info['platform'] = 'web';
  info['version'] = '0';
  if (isAndroid()) {
    try {
      let appInfo = syJsb.getAppInfo();
      info['platform'] = appInfo.split("|")[1];
      info['version'] = parseInt(appInfo.split("|")[5]);
      return info;
    } catch (error) {
      return info;
    }
  } else if (isIos()) {
    let appInfo = await syJsbIosClientInfo()
    if(!appInfo) {
      return info
    }
    info['platform'] = appInfo.split("|")[1];
    info['version'] = parseInt(appInfo.split("|")[5]);
    return info;
  }
  return info
}

function syJsbStoreToken(token, member_id = 0) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      var Cookie = require('tiny-cookie');
      Cookie.setRaw('token', token, {
        expires: 1
      })
      return
    }
    var Cookie = require('tiny-cookie');
    Cookie.setRaw('token', token, {
      expires: 365
    })
    var platform = appInfo.split("|")[1]
    var version = appInfo.split("|")[5]
    if (platform == 'android') {
      var params = {method: "saveToken",params:{ token : token ,member_id : member_id}}
      var jsonParam = JSON.stringify(params)
      if (version > 70){
        syJsbCallApp(jsonParam)
      }
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function(bridge) {
        let params = {
          'token': token,
          'member_id': member_id
        };
        var jsonParam = JSON.stringify(params);
        bridge.callHandler('storeToken',jsonParam, function(response) {
        });
      });
    }
  })
}


//定制app在浏览器打开新的链接
function syJsbLaunchBrowser(launch_url) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      window.open(launch_url);
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      syJsb.launchBrowser(launch_url);
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('launchBrowser', launch_url, function (response) {
        });
      });
    }
  });
}

/**
 * 定制打开qq客服
 * @param qq_num
 */
function syJsbOpenQQ(qq_num) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      var launch_url = "http://wpa.qq.com/msgrd?v=3&uin=" + qq_num + "&site=qq&menu=yes";
      window.open(launch_url);
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      var launch_url = "mqqwpa://im/chat?chat_type=wpa&uin=" + qq_num;
      syJsb.launchBrowser(launch_url);
    } else if (platform == 'ios') {
      var launch_url = "mqq://im/chat?chat_type=wpa&uin=" + qq_num + "&version=1&src_type=web";
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('launchBrowser', launch_url, function (response) {
        });
      });
    }
  });
}

//定制app在浏览器打开新的链接通过platform
function syJsbLaunchBrowserByPlatform(launch_url, platform) {
  if (platform == 'android') {
    syJsb.launchBrowser(launch_url);
  } else if (platform == 'ios') {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler('launchBrowser', launch_url, function (response) {
      });
    });
  } else {
    window.open(launch_url);
  }
}

//调用app的接口  android 版本 59  ios 版本 7 后支持
function syJsbCallApp(jsonParam) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      syJsb.call(jsonParam);
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("call", jsonParam, function (response) {
        });
      });
    } else {
      return false;
    }
  });
}

//页面跳转时
function showMessage(message) {
  var params = {method: "notice", params: {content: message, contentType: 'success'}};
  var jsonParam = JSON.stringify(params);
  if (platform == 'ios') {
    if (version > 14) {
      syJsbCallApp(jsonParam);
    } else {
      syJsbAlert(message);
    }
  } else if (platform == 'android') {
    if (version > 67) {
      syJsbCallApp(jsonParam);
    } else {
      syJsbAlert(message);
    }
  } else {
    syJsbAlert(message);
  }
}


//调用app的接口通过platform android 版本 59  ios 版本 7 后支持
function syJsbCallAppByPlatform(jsonParam, platform) {
  if (platform == 'android') {
    syJsb.call(jsonParam);
  } else if (platform == 'ios') {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler("call", jsonParam, function (response) {
      });
    });
  } else {
    return false;
  }
}

//设置定制返回的url
function syJsbSetGoBackUrl(url) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      console.log(url);
      syJsb.setBackUrl("javascript:" + url + ";");
    } else if (platform == 'ios') {
      var params = {backUrl: url};
      var jsonParam = JSON.stringify(params);
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("setBackUrl", jsonParam, function (response) {
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler(url, function (data) {
          eval(url);
        });
      });
    }
  });
}

//定制confirm
function syJsbConfirm(msgText, posText, negText, callback) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      callback(confirm(msgText));
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      callback(confirm(msgText + "|" + posText + "|" + negText + "|"));
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        var params = {title: "提示", text: msgText, label1: posText, label2: negText, onConfirmed: "onConfirm"};
        var jsonParam = JSON.stringify(params);
        bridge.callHandler("confirm", jsonParam, function (response) {
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("onConfirm", function (data) {
          if (data == 'true') {
            data = true;
          }
          if (data == 'false') {
            data = false;
          }
          callback(data);
        });
      });
    }
  });
}

//定制alert
function syJsbAlert(msgText) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      alert(msgText);
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      alert(msgText);
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        var params = {title: "提示", text: msgText, label: "确定"};
        var jsonParam = JSON.stringify(params);
        bridge.callHandler("alert", jsonParam, function (response) {
        });
      });
    }
  });
}

//定制分享 android 版本55版本以上支持图文定制分享
/*function syJsbShare(jsonParam, shareText, shareUrl) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      var version = appInfo.split("|")[5];
      if (version > 55) {
          syJsb.share2(jsonParam);
      } else {
          syJsb.share(shareText, shareUrl);
      }
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("share", jsonParam, function (response) {
        });
      });
    }
  });
}*/
function syJsbShare(jsonParam,shareText,shareUrl){
  syJsbGetAppInfo(function (appInfo){
    if(!appInfo){
      return false;
    }
    var platform=appInfo.split("|")[1];
    if(platform=='android'){
      var version=appInfo.split("|")[5];
      if(version>55){
        syJsb.share2(jsonParam);
      }else{
        syJsb.share(shareText, shareUrl);
      }
    }else if(platform=='ios'){
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("share", jsonParam, function(response) {
        });
      });
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler("callbackShareResult", function(json_data) {
          // 处理ios分享结果
          var data = eval('(' + json_data + ')');
          //platform 分享的平台 (weixin weixin_circle qq qzone)   status分享的状态（click点击状态   success分享成功状态）
          callbackShareResult(data.platform, data.status);
        });
      });
    }
  });
}
//定制加入购物车显示红点
function syJsbCarPotUpdate() {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      syJsb.carPotUpdate();
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("carPotUpdate", "", function (response) {
        });
      });
    }
  });
}

//定制app拨打电话
function syJsbCallPhone(phone_number) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      syJsb.dial(phone_number);
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("dial", phone_number, function (response) {
        });
      });
    }
  });
}

//定制app打开新的链接
function syJsbOpenQq(qq_number) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      var launch_url = "http://wpa.qq.com/msgrd?v=3&uin=" + qq_number + "&site=qq&menu=yes";
      window.open(launch_url);
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      var launch_url = "mqqwpa://im/chat?chat_type=wpa&uin=" + qq_number;
      syJsb.launchBrowser(launch_url);
    } else if (platform == 'ios') {
      var launch_url = "mqq://im/chat?chat_type=wpa&uin=" + qq_number + "&version=1&src_type=web";
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('launchBrowser', launch_url, function (response) {
        });
      });
    }
  });
}

//获取app当前页面 android 版本59以后  ios版本7以后支持
function syJsbGetCurrentPage(callback) {
  syJsbGetAppInfo(function (appInfo) {
    var currentPage = "nonsupport";
    if (!appInfo) {
      callback(currentPage);
      return false;
    }
    var platform = appInfo.split("|")[1];
    var version = appInfo.split("|")[5];
    if (platform == 'android') {
      if (version >= 59) {
        currentPage = syJsb.getCurrPage();
        callback(currentPage);
      } else {
        callback(currentPage);
      }
    } else if (platform == 'ios') {
      if (version >= 7) {
        var params = {method: "getCurrPage"};
        var jsonParam = JSON.stringify(params);
        setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler("call", jsonParam, function (data) {
            currentPage = data;
            callback(currentPage);
          });
        });
      } else {
        callback(currentPage);
      }
    }
  });
}

//打开新页面
function syJsbLaunchWebview(url) {
  syJsbOpenNewPage('launchWebview', url);
}

//定制app打开新页面  android 版本59以后支持打开app新页面 61 以后支持打开购物车   ios 版本7以后支持打开app新页面
function syJsbOpenNewPage(method, url) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      window.location = url;
      return false;
    }
    var params = {method: method, params: {url: url}};
    var jsonParam = JSON.stringify(params);
    var platform = appInfo.split("|")[1];
    var version = appInfo.split("|")[5];
    if (platform == 'android') {
      switch (method) {
        case 'launchWebview':
          if (version >= 59) {
            syJsb.call(jsonParam);
          } else {
            window.location = url;
          }
          break;
        case 'launchCart':
          if (version >= 61) {
            syJsb.call(jsonParam);
          } else {
            window.location = url;
          }
          break;
        default:
          window.location = url;
          break;
      }
    } else if (platform == 'ios') {
      if (version >= 7) {
        setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler("call", jsonParam, function (response) {
          });
        });
      } else {
        window.location = url;
      }
    }
  });
}

//定制app关闭当前页面  android 版本59以后支持    ios 版本7以后支持
function syJsbCloseAppPage() {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      var params = {method: "closeActivity"};
      var jsonParam = JSON.stringify(params);
      syJsb.call(jsonParam);
    } else if (platform == 'ios') {
      var params = {method: "close_page"};
      var jsonParam = JSON.stringify(params);
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("call", jsonParam, function (response) {
        });
      });
    }
  });
}

//app上传图片
function syJsbUploadImage(jsonParam) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var platform = appInfo.split("|")[1];
    if (platform == 'android') {
      syJsb.uploadFile(jsonParam);
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("uploadFile", jsonParam, function (response) {
        });
      });
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler("setImageByUrl", function (json_data) {
          // 处理ios上传后路径
          var data = eval('(' + json_data + ')');
          setImageByUrl(data.objId, data.fileUrl, data.fileName);
        });
      });
    }
  });
}

/*
 * 显示toast,如果老版本就弹alert
 * message: 内容
 * contentType: 显示正确还是错误提示
 */
function showToast(message, contentType) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      syJsbAlert(message);
      return false;
    }
    var params = {method: "notice", params: {content: message, contentType: contentType}};
    var jsonParam = JSON.stringify(params);
    var platform = appInfo.split("|")[1];
    var version = appInfo.split("|")[5];
    if (platform == 'ios') {
      if (version > 14) {
        syJsbCallApp(jsonParam);
      } else {
        syJsbAlert(message);
      }
    } else if (platform == 'android') {
      if (version > 67) {
        syJsbCallApp(jsonParam);
      } else {
        syJsbAlert(message);
      }
    } else {
      syJsbAlert(message);
    }
  });
}

/*
 * 保存channel
 * channel_val:channel的值
 */
function saveChannel(channel_val) {
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var params = {method: "saveVariant", params: {channel: channel_val}};
    var jsonParam = JSON.stringify(params);
    var platform = appInfo.split("|")[1];
    var version = appInfo.split("|")[5];
    if (platform == 'ios') {
      if (version > 14) {
        syJsbCallApp(jsonParam);
      }
    } else if (platform == 'android') {
      if (version > 70) {
        syJsbCallApp(jsonParam);
      }
    }
  });
}
/**
 * 长按保存图片
 * */
function syJsbClickImage(obj){
  var jsonParam = typeof obj === 'object'?JSON.stringify(obj):obj;
  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    console.log('syJsbClickImage');
    console.log(jsonParam);
    // var info='';
    var platform = appInfo.split("|")[1];
    console.log(platform);
    /*if( isAndroid()){
      var platform =appInfo.platform;
    }else {
      var data = eval('(' + appInfo + ')');
      var json_data = { platform: data.platform, from: data.from ,did: data.did,ver:data.ver,token:data.token};
      info = JSON.stringify(json_data);
      var platform = JSON.parse(info).platform;
    }*/
    if (platform == 'android') {
      console.log(123)
      syJsb.clickImage(jsonParam);
    } else if (platform == 'ios') {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("clickImage", jsonParam, function (response) {
        });
      });
    }
    console.log("end")
  });
}

/*
 * 更新toolbar显示或隐藏
 */
function syJsbShowToolBar(value) {

  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var params = {method: "showToolbar", params: {visible: value}};
    var jsonParam = JSON.stringify(params);
    var platform = appInfo.split("|")[1];
    var version = appInfo.split("|")[5];
    if (platform == 'ios') {
      if (version > 14) {
        syJsbCallApp(jsonParam);
      }
    } else if (platform == 'android') {
      if (version > 70) {
        syJsbCallApp(jsonParam);
      }
    }
  });

}

/*
 * 更新titlebar显示或隐藏
 */
function syJsbShowTitleBar(value) {

  syJsbGetAppInfo(function (appInfo) {
    if (!appInfo) {
      return false;
    }
    var params = {method: 'showTitleBar', params: {visible: value}};
    var jsonParam = JSON.stringify(params);
    var platform = appInfo.split("|")[1];
    var version = appInfo.split("|")[5];
    if (platform == 'ios') {
      if (version > 18) {
        syJsbCallApp(jsonParam);
      }
    } else if (platform == 'android') {
      if (version > 83) {
        syJsbCallApp(jsonParam);
      }
    }
  });

}

/**
* 设置titlebar的标题
* title 标题文本
*/
function syJsbSetTitleText(title,errTitle){
  syJsbGetAppInfo(function (appInfo){
    if(!appInfo){
      return false;
    }
    var params = { method: 'setTitleText', params: { title: title} };
    var jsonParam = JSON.stringify(params);
    var platform=appInfo.split("|")[1];
    var version=appInfo.split("|")[5];
    if(platform=='ios'){
      if (version > 18){
        syJsbCallApp(jsonParam);
      }
    }else if(platform=='android'){
      if (version>83){
        syJsbCallApp(jsonParam);
      }
    }
  });
}
// 支付宝支付
function syJsbAliPay(arg){
  let str = typeof arg === 'object'?JSON.stringify(arg):arg;
  if (isAndroid()) {
    syJsb.alipayPay(str)
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler("alipayPay", str, function (response) {
      });
    });
  } else {
    return false
  }
}
// 微信支付
function syJsbWxPay(arg){
  let str = typeof arg === 'object'?JSON.stringify(arg):arg;
  if (isAndroid()) {
    syJsb.wxPay(str)
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler("wxPay", str, function (response) {
      });
    });
  } else {
    return false
  }
}
// 唤起ali验证
function aliVerify(){
  if (isAndroid()) {
    syJsb.verifySuccess()
  } else if (isIos()) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler("verifySuccess", null, function (response) {

      });
    });
  } else {
    return false
  }
}
export default {
  syJsbWxPay,
  syJsbAliPay,
  isAndroid,
  isIos,
  saveChannel,
  syJsbShowMoreMenu,
  syJsbLaunchWebview,
  syJsbAlert,
  syJsbConfirm,
  syJsbCallApp,
  syJsbCallPhone,
  syJsbShowToolBar,
  syJsbClickImage,
  syJsbShowTitleBar,
  syJsbShare,
  syJsbOpenQq,
  showToast,
  syJsbGetClientInfo,
  syJsbStoreToken,
  syJsbSetTitleText,
  syJsbGetAppInfo,
  syJsbCloseAppPage,
  syJsbSetGoBackUrl,
  syJsbGetCurrentPage,
  aliVerify
}


