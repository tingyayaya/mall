<?php
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);


$money = $_GET['money'];
$xfdh = $_GET['XFDH'];
$weight = $_GET['weight'];
$fare = $_GET['fare'];
$price = $_GET['price'];
$total = $_GET['total'];

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}



function payinit(){

    require_once "../lib/WxPay.Api.php";
    require_once "WxPay.JsApiPay.php";
    require_once 'log.php';
    //初始化日志
    $logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
    $log = Log::Init($logHandler, 15);

    //①、获取用户openid
    $tools = new JsApiPay();
    $openId = $tools->GetOpenid();
  

    global $input,$money,$xfdh,$weight,$fare,$price,$total,$jsApiParameters,$editAddress;
    
    
    //②、统一下单
    $input = new WxPayUnifiedOrder();
    $input->SetBody("妍集订单");
    $input->SetAttach("妍集订单");
    //$input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
    $input->SetOut_trade_no($xfdh);
    $input->SetTotal_fee($money);
    $input->SetTime_start(date("YmdHis"));
    $input->SetTime_expire(date("YmdHis", time() + 600));
    $input->SetGoods_tag("妍集订单");
    $input->SetNotify_url("http://beautytwice.com/mobileMall/wxpay/notify.php");
    $input->SetTrade_type("JSAPI");
    $input->SetOpenid($openId);
    $order = WxPayApi::unifiedOrder($input);
    echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
    echo $openId;
    printf_info($order);
    $jsApiParameters = $tools->GetJsApiParameters($order);

    //获取共享收货地址js函数参数
    $editAddress = $tools->GetEditAddressParameters();
}
if ($_GET['paystatus']=="pay"){
    payinit();
/*    echo "<script type='javascript'>
            alert('$php变量');
            var s1 = "."$jsApiParameters".";
            var s2 = "."$editAddress".";
    </script>";*/
}

//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>确认订单</title>
    <meta charset="utf-8">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <link rel="stylesheet" type="text/css" href="../dist/css/aui.css" />
    <link rel="stylesheet" type="text/css" href="../dist/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="../dist/css/main.css" />
    <script type="text/javascript" src="../dist/js/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../dist/js/api.js"></script>
    <script type="text/javascript" src="../dist/js/aui-toast.js"></script>
    <script type="text/javascript" src="../dist/js/main.js"></script>
    <script type="text/javascript" src="../dist/js/wxpayDetail.js"></script>


    <script type="text/javascript">

        function getUrlParam(name){

                   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                   var r = window.location.search.substr(1).match(reg);
                   if (r!=null) return decodeURI(r[2]); return null;
        }

        /*提示*/
        apiready = function(){
            api.parseTapmode();
        };
        var toast = new auiToast({
        });

        if(getUrlParam("paystatus")){
            console.log(1);
            payJarge();
        }
 
    //调用微信JS api 支付
    	function jsApiCall()
    	{
    		WeixinJSBridge.invoke(
    			'getBrandWCPayRequest',
    			<?php echo $jsApiParameters; ?>,
    			function(res){
    				WeixinJSBridge.log(res.err_msg);
    				//alert(res.err_code+res.err_desc+res.err_msg);
    			}
    		);
    	}

    	function payJarge()
    	{
    	    var mydata = {
                 type:"pay",
                 func:"payPreCheck",
                 sessionId:sessionStorage.sId,
                 XFDH:getUrlParam("XFDH")
    	    };
    	    var mydata = JSON.stringify(mydata);
    	    console.log(mydata);
    	    $.ajax({
    	        type:'post',
                url:'../../data.php',
                data:{data:mydata},
                success:function(data){
                    console.log(data);
                    if(data.rs==100){
                        callpay();
                    }else if(data.rs==410){
                       toast.fail({
                          title:"订单已支付",
                          duration:2000
                       });
                       var t=setTimeout("window.location.href='../Order.html'",500);

                    }else if(data.rs==412){
                        toast.fail({
                           title:"库存不足",
                           duration:2000
                        });
                        var t=setTimeout("window.location.href='../Order.html'",500);
                    }else if(data.rs==411){
                         toast.fail({
                            title:"价格不统一,联系客服",
                            duration:2000
                         });
                         var t=setTimeout("window.location.href='../Order.html'",500);
                     }
                }
    	    })
    	}

    	function callpay()
    	{
    		if (typeof WeixinJSBridge == "undefined"){
    		    if( document.addEventListener ){
    		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    		    }else if (document.attachEvent){
    		        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
    		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    		    }
    		}else{
    		    jsApiCall();
    		}
    	}
    	</script>
    	<script type="text/javascript">
    	//获取共享地址
    	function editAddress()
    	{
    		WeixinJSBridge.invoke(
    			'editAddress',
    			<?php echo $editAddress; ?>,
    			function(res){
    				var value1 = res.proviceFirstStageName;
    				var value2 = res.addressCitySecondStageName;
    				var value3 = res.addressCountiesThirdStageName;
    				var value4 = res.addressDetailInfo;
    				var tel = res.telNumber;

    				//alert(value1 + value2 + value3 + value4 + ":" + tel);
    			}
    		);
    	}

    	window.onload = function(){
    		if (typeof WeixinJSBridge == "undefined"){
    		    if( document.addEventListener ){
    		        document.addEventListener('WeixinJSBridgeReady', editAddress, false);
    		    }else if (document.attachEvent){
    		        document.attachEvent('WeixinJSBridgeReady', editAddress);
    		        document.attachEvent('onWeixinJSBridgeReady', editAddress);
    		    }
    		}else{
    			editAddress();
    		}
    	};

    </script>
</head>
<body>
<div class="aui-content payment">
    <div class="aui-card-list">
        <div class="aui-card-list-header aui-border-b">
            <span style="margin:0 auto;">付款详情</span>
           <!-- <div class="imgbox pull-right">
                <i class="aui-icon-close aui-iconfont"></i>
            </div>-->
        </div>
        <div class="aui-card-list-footer">
            <span>商品金额</span>
            <span class="payMoney"></span>
        </div>
        <div class="aui-card-list-footer">
            <span>包裹重量 (包含包装系数1.2)</span>
            <span class="payweight"></span>
        </div>
        <div class="aui-card-list-footer">
            <span>运费 (首重15元/kg,续重3元/kg)</span>
            <span class="payFare"></span>
        </div>
        <div class="aui-card-list-footer">
            <span class="aui-font-size-14" style="color: #000;">需付款</span>
            <span class="aui-font-size-18 payTotal" style="color: #000;">100.0元</span>
        </div>
        <div class="aui-content aui-padded-10" style="margin-top: 50px">
            <div class="aui-btn-success btn-up2 btn-toorder-a" onclick="window.location.href='wxpayDetail.php?paystatus=pay&money=<?=$money?>&XFDH=<?=$xfdh?>&weight=<?=$weight?>&fare=<?=$fare?>&price=<?=$price?>&total=<?=$total?>'">确认付款</div>
        </div>
    </div>
</div>
</body>
</html>