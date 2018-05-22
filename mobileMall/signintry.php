<?php
require_once "../jssdk.php";
$jssdk = new JSSDK("wx88a22c148d2b61a0", "f3877c9e85c4e88c21217685c66b46ae");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <meta charset="utf-8">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <link rel="stylesheet" type="text/css" href="dist/css/aui.css" />
    <link rel="stylesheet" type="text/css" href="dist/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="dist/css/main.css" />
    <script type="text/javascript" src="dist/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
    <script type="text/javascript" src="dist/js/api.js"></script>
    <script type="text/javascript" src="dist/js/aui-toast.js"></script>
    <script type="text/javascript" src="dist/js/aui-tab.js"></script>
    <script type="text/javascript" src="dist/js/main.js"></script>
    <script type="text/javascript" src="dist/js/signin.js"></script>

<style type="text/css">
    body{
        line-height: 1.5;
        font-size: 0.8rem;
        color: #212121;
        background-color: #f5f5f5;
        outline: 0;
    }
</style>
<!--订单列表-->
</head>
<body>
<div class="aui-content" id="fixed_header">
    <header class="aui-bar aui-bar-nav aui-border-b">
        <a class="aui-pull-left aui-btn">
            <span class="aui-iconfont aui-icon-left btn-left" onclick="javascript:history.back(-1);"></span>
        </a>
        <div class="aui-title">登录</div>
    </header>
</div>

<div class="aui-content margin-contain-t aui-margin-b-15">
    <ul class="aui-list">
        <li class="aui-list-item2 aui-border-b">
            <div class="aui-list-item-inner2 ">
                <span class="title-text">用户名</span>
                <input class="input-text" type="text"  placeholder="用户名">
            </div>
        </li>
    </ul>
</div>
<div class="aui-content">
    <ul class="aui-list">
        <li class="aui-list-item2 aui-border-b">
            <div class="aui-list-item-inner2 ">
                <span class="title-text">密码</span>
                <input class="input-text" type="text"  placeholder="密码">
            </div>
        </li>
    </ul>
</div>
<!--<div class="aui-content aui-padded-15 clearfix">
    <div class="resigter pull-left" onclick="window.location.href='forgetpassword.html'">注册</div>
    <div class="forgetpassword pull-right" onclick="window.location.href='forgetpassword.html'">忘记密码?</div>
</div>-->
<div class="aui-content">
    <div class="aui-content-padded">
        <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm btn-yes">确认</div>
    </div>
</div>
</body>
<script>
  wx.config({
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
    ]
  });
  wx.ready(function () {
    console.log();
    // 在这里调用 API
  });

    $.ajax({
        type:'get',
        url:'https://api.weixin.qq.com/cgi-bin/token',
        data:{grant_type:'client_credential',appid:'wx88a22c148d2b61a0',secret:'f3877c9e85c4e88c21217685c66b46ae'},
        success:function(data){
            console.log(data);
            sessionStorage.token = data.access_token;
        }
     })

  $.ajax({
        type:'get',
        url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
        data:{access_token:sessionStorage.token,type:'jsapi'},
        success:function(data){
            console.log(data);
            sessionStorage.ticket = data.ticket;
        }
   })
</script>
</html>