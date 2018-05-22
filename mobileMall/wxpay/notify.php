<?php
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);



require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';

//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

Log::DEBUG("sid:" . $sid);

class PayNotifyCallBack extends WxPayNotify
{


	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{

		    //$tradeno = substr($result["out_trade_no"],0,15);
            //http://beautytwice.com/data.php?data={"type":"Order","func":"getOrderByUser","sessionId":"0eeae358d3a1d03246440cb411036045"}
		   $tradeno = $result["out_trade_no"]; 

/*		   session_start();
		   $sid = session_id();*/
		   
           $post_data = array (
           	 	"openid" =>$result["openid"],
                "type"=> "pay",
                "func"=> "payOrderByUser",
                "XFDH"=> $tradeno,     
                "wechatpayid"=> $result["transaction_id"],
                "random"=>''
           );
           $post_data = json_encode($post_data);
           //$json = str_replace ( "\\", "", $_REQUEST ['data'] );
			//$arr = json_decode ( $json, true );
			$url = "http://beautytwice.com/data.php?data=".$post_data;
			Log::DEBUG("data:" . $post_data);

           $ch = curl_init();
    /*       curl_setopt($ch, CURLOPT_POST, true);
           curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
           curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
           curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
           curl_setopt($ch, CURLOPT_POSTFIELDS,  . $post_data);*/
           curl_setopt($ch, CURLOPT_URL, $url);
           curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
           curl_setopt($ch, CURLOPT_HTTPHEADER, 0);
           //curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($post_data)));

           $ret = curl_exec($ch);
           /*$curlInfo = curl_getinfo($ch);*/

           curl_close($ch);
           /*json转数组*/
           $res=json_decode($ret,true);
           /*json_encode()*/

           if($res[rs]==432){
				echo '<script type="text/javascript">window.location.href="../Order.html";</script>';
				//exit();
           }
           Log::DEBUG("result:" . $ret);

			return true;
		}
		return false;
	}
	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		Log::DEBUG("call back:" . json_encode($data));
		$notfiyOutput = array();
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败";
			return false;
		}
		return true;
	}

}

Log::DEBUG("begin notify");
$notify = new PayNotifyCallBack();
$notify->Handle(false);
