/**
 * Created by chenksoft on 2017/4/13.
 */
//localStorage.openId = 'oneMgwKhnKz_RCgCUT_CdszhBbEM';
//sessionStorage.setItem('openId', 'oneMgwMifkr4i5KNAjxk2JIkbp1s');

/*获取URL参数*/
function getQueryString() {
	var url, ret;
	url = window.location.href;
	url = decodeURI(url);

    var reg_url = /^[^\?]+\?([\w\W]+)$/, reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, arr_url = reg_url.exec(url), ret = {};
    if (arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;

    /*获取openid*/
/*    var id = '${id}';//服务端设置的id,用于下面拼接生成需要分享的link
    var timestamp = parseInt('${ret.timestamp}');//因为服务端是String类型，此处转化成数值类型
    var nonceStr = '${ret.nonceStr}';
    var signature = '${ret.signature}';*/
}

var linkURL, params;
linkURL = window.location.href;
linkURL = decodeURI(linkURL);
params = getQueryString(linkURL);

$(function(){

    if(params.code){ 
    	//sessionStorage.clear();
    	
        var appid = 'wx88a22c148d2b61a0';
        var secret = 'f3877c9e85c4e88c21217685c66b46ae';
        var code = params.code;

        $.ajax({
            async: false,
            url: "../oauth2.php", //这是我的服务端处理文件php的
            type: "GET",
            //下面几行是jsoup，如果去掉下面几行的注释，后端对应的返回结果也要去掉注释
            // dataType: 'jsonp',
            //jsonp: 'callback', //jsonp的值自定义,如果使用jsoncallback,那么服务器端,要返回一个jsoncallback的值对应的对象.
            // jsonpCallback:'callback',
            data: {code:code}, //传递本页面获取的code到后台，以便后台获取openid
            timeout: 5000,
            success: function (result) {
                console.log(result);
                sessionStorage.accessToken = result.access_token;
                localStorage.openId = result.openid;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
/*
        if(sessionStorage.openId){
           window.location.href='index.html';
        }*/
    }

    /*判断openId存在*/
    /*判断sessionId是否存在*/

    function loginIn(){
        var mydata = {
            type:'login',
            func:'loginByOpenid',
            openid:localStorage.openId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
              	//alert(JSON.stringify(data));
                if(data.rs==100){
                    sessionStorage.sId = data.sessionId;
                    sessionStorage.uId = data.uid;
                    sessionStorage.islogin = 1;
                    sessionStorage.openId = data.openId;
                    $('.in-login').removeClass('hide');
                    $('.out-login').addClass('hide');
                }else if(data.rs==109){
                    $('.in-login').addClass('hide');
                    $('.out-login').removeClass('hide');
                    sessionStorage.islogin = 0;
                } else {
                	sessionStorage.islogin = 0;
                }
            },
            error: function(){
            	sessionStorage.islogin = 0;
            }
        });
    }

    //alert(localStorage.openId);
    if(localStorage.openId && localStorage.openId != 'undefined' && typeof(localStorage.openId) != undefined){
    	//alert(sessionStorage.islogin);
    	if(sessionStorage.islogin == 1){
    		
    	} else {
    		loginIn();
    	}
    } else {
        /*登录跳转授权*/
        //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx88a22c148d2b61a0&redirect_uri=http%3A%2F%2Fbeautytwice.com%2FmobileMall%2Findex.html&response_type=code&scope=snsapi_base#wechat_redirect';
    }
});


function mall(){
    window.location.href='index.html';
}
function sorts(){
    window.location.href='sorts.html';
}
function shoppingcart(){
    window.location.href='ShoppingCart.html';
}
function finder(){
    window.location.href='finder.html';
}
function center(){
    window.location.href='personalcenter.html';
}



(function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          var frst = 20 * (clientWidth / 320);
          docEl.style.fontSize = frst*31.25+'%';
         //console.log(frst*31.25+'%');
        };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);