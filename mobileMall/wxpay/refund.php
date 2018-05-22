<?php
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
//require_once 'log.php';
require_once '../../data/db.php';
require_once '../../class/classes.php';

function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#f00;'>$key</font> : $value <br/>";
    }
}

/* if(isset($_REQUEST["transaction_id"]) && $_REQUEST["transaction_id"] != ""){
	$transaction_id = $_REQUEST["transaction_id"];
	$total_fee = $_REQUEST["total_fee"];
	$refund_fee = $_REQUEST["refund_fee"];
	$input = new WxPayRefund();
	$input->SetTransaction_id($transaction_id);
	$input->SetTotal_fee($total_fee);
	$input->SetRefund_fee($refund_fee);
    $input->SetOut_refund_no(WxPayConfig::MCHID.date("YmdHis"));
    $input->SetOp_user_id(WxPayConfig::MCHID);
	printf_info(WxPayApi::refund($input));
	exit();
} */

//$_REQUEST["out_trade_no"]= "122531270220150304194108";
///$_REQUEST["total_fee"]= "1";
//$_REQUEST["refund_fee"] = "1";
if(isset($_REQUEST["out_trade_no"]) && $_REQUEST["out_trade_no"] != ""){
	$out_trade_no = $_REQUEST["out_trade_no"];
	$total_fee = $_REQUEST["total_fee"];
	$refund_fee = $_REQUEST["refund_fee"];
	
	
	$input = new WxPayRefund();
	$input->SetOut_trade_no($out_trade_no);
	$input->SetTotal_fee($total_fee);
	$input->SetRefund_fee($refund_fee);
    $input->SetOut_refund_no(WxPayConfig::MCHID.date("YmdHis"));
    $input->SetOp_user_id(WxPayConfig::MCHID);
	$result = WxPayApi::refund($input);
	
	//printf_info($result);
	if($result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS'){
	    $count = $db->get_var("select count(*) from SKT419 where SKF19503='".$out_trade_no."'");
	    if($count == 0){
	        $db->query("insert into SKT419 (SKF19503,SKF19506,SKF19507,SKF19508,SKF19509,SKF19510,SKF19511,SKF19512) values ('".$out_trade_no."','".$out_trade_no."', $total_fee/100, $total_fee/100, '".$_REQUEST['miaoshu']."', now(), '".$_SESSION['openid']."', '".$_SESSION['uid']."')");   
	    }
	    $count = $db->get_var("select count(*) from SKT419 where SKF19503='".$out_trade_no."' and SKF19513=1");
	    if($count == 0){
	        $db->query("update SKT419 set SKF19513=1, SKF19514=now() where  SKF19503='".$out_trade_no."'");
	        $db->query("update skt31 set SKF2992=0,SKF408=2 where SKF395='".$out_trade_no."' ");
	        $db->query("update SKT417 set SKF19475=now() where SKF19471='".$out_trade_no."'");
	        Order::unlockOrder($out_trade_no);
	        $count = $db->get_var("select count(*) from SKT412 where SKF19422=2 and SKF19415='".$out_trade_no."'");
	        if($count == 1){
	            //更新退货表审核状态退款完成
	            $db->query("update SKT412 set SKF19422=4 where SKF19415='".$out_trade_no."'");
	        }
	    }
	    //header("location.href='../order.html'");
	    $jscode = <<<eof
<script type="text/javascript">
alert('退款申请成功, 请留意退款消息');
var t=setTimeout("window.location.href='../Order.html?r='+Math.random()",1000);
</script>
eof;
	    echo $jscode;
	    exit();
	} else if(isset($result['err_code'])){
	    $err_code_des = $result['err_code_des'];
$jscode = <<<eof
<script type="text/javascript">
alert('$err_code_des');
var t=setTimeout("window.location.href='../Order.html?r='+Math.random()",1000);
</script>
eof;
echo $jscode;
exit();
	} else {
	    
	}

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>提交退款</title>
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
    </head>
    
<body>
<header class="aui-bar aui-bar-nav aui-bar-light" id="fixed_header">
    <a class="aui-pull-left aui-btn" onClick="javascript:window.location.href='../personalcenter.html?r=<?php echo mt_rand(); ?>'">
        <span class="aui-iconfont aui-icon-left"></span>
    </a>
    <div class="aui-title">申请退款</div>
</header> 
<div class="aui-content margin-contain-t3 order-list">
    <div class="aui-card-list">
        <div class="aui-card-list-content">
            <ul class="aui-list aui-media-list" id="item-list">
                <li class="aui-list-item aui-list-item-middle product-list aui-border-b-light aui-border-t-light">
                    <div class="aui-media-list-item-inner">
                        <div class="aui-list-item-media aui-pull-left">
                            <img src="../dist/imgs/large1.jpg">
                        </div>
                        <div class="aui-list-item-inner aui-pull-left width200">
                            <div class="aui-list-item-text productname">后 拱振享 阴阳平衡气津水溶液面霜三件套 组合套装</div>
                            <span class="margin4b aui-font-size-30 aui-text-danger">¥500.0 <i class="font-light-a">x1</i></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="aui-card-list">
        <div class="aui-card-list-content">
            <ul class="aui-list aui-media-list">
                <li class="aui-list-item order-list-header  aui-border-t-light">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-title pull-left aui-font-size-26">服务类型</div>
                    </div>
                    
                </li>
                <li class="aui-list-item aui-border-b-light">
                    <div class="list4 aui-list-item-inner">
                        <span>退款</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="aui-card-list">
        <div class="aui-card-list-content">
            <ul class="aui-list aui-media-list">
                <li class="aui-list-item order-list-header  aui-border-t-light">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-title pull-left aui-font-size-26">描述</div>
                    </div>
                    
                </li>
                <li class="aui-list-item miaoshu">
                    <textarea name="miaoshu" id="miaoshu" placeholder="请您在此描述问题"></textarea>
                    <span class="miaoshu-sum">0/500</span>
                </li>
            </ul>
        </div>
    </div>
    <form action="#" method="post">
    	<input type="hidden" style="width:96%;height:35px;margin-left:2%;" name="transaction_id" />
    	<input type="hidden" style="width:96%;height:35px;margin-left:2%;" name="out_trade_no" value="<?php echo $_REQUEST['XFDH'];?>" />
    	<input type="hidden" style="width:96%;height:35px;margin-left:2%;" name="total_fee" value="<?php echo $_REQUEST['money'];?>" />
    	<input type="hidden" style="width:96%;height:35px;margin-left:2%;" name="refund_fee" value="<?php echo $_REQUEST['money'];?>" />
    	<div class=" btn-upto"><button type="submit" class="btn-primary" style="border:none;">提交</button></div>
    
    </form>
</div>

<script type="text/javascript">

	$(function(){

		var linkURL, params;
	    linkURL = window.location.href;
	    linkURL = decodeURI(linkURL);
	    params = getQueryString(linkURL);

	    var getItems = function(){
			$('#item-list').children().remove();
	        var mydata = {
	            type:'Order',
	            func:'getOrderItems',
	            openid:sessionStorage.openId,
	            xdfh: params.XFDH
	        };
	        mydata = JSON.stringify(mydata);
	        $.ajax({
	            type:'post',
	            data:{data:mydata},
	            url:'../../data.php',
	            success:function(data){
	                console.log(data);
	                if(data.rs==100){
	                	var items = data.list;
	                	var content = '';
	                	for(var i=0;i<items.length; i++){
	                		 var item = items[i];
	    	                 content += '<li class="aui-list-item aui-list-item-middle product-list aui-border-b-light aui-border-t-light">\
	    	                     <div class="aui-media-list-item-inner">\
	                         <div class="aui-list-item-media aui-pull-left">\
	                             <img src="'+item.images+'">\
	                         </div>\
	                         <div class="aui-list-item-inner aui-pull-left width200">\
	                             <div class="aui-list-item-text productname">'+item.productName+'</div>\
	                             <span class="margin4b aui-font-size-30 aui-text-danger">¥'+item.ordinarysale+' <i class="font-light-a">x'+item.num+'</i></span>\
	                         </div>\
	                     </div>\
	                 </li>';
	                	}
	                	$('#item-list').append(content);
	                }
	            }
	        });  
		};
		getItems();

	});

</script>
	
</body>
</html>