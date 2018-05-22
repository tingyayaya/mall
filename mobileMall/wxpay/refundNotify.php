<?php
require '../lib/WxPay.Config.php';
require_once '../../data/db.php';
require_once '../../class/classes.php';

class WxpayRefundNotifyHelper
{
	const MCH_KEY = 'Q6uqU3X0ehyPfkemVsYu5ip17wYf6idk';
	const CIPHER = MCRYPT_RIJNDAEL_128;
	const MCRYPT_MODE = MCRYPT_MODE_ECB;
	
	/**
	 * You should implements this method to handle you own business logic.
	 * @param array $decryptedData
	 * @param string $msg this message will return to wechat if something error.
	 * @return bool
	 */
	protected function handelInternal(array $decryptedData, string &$msg)
	{
	    $out_trade_no = $decryptedData["out_trade_no"];
	    $total_fee = $decryptedData["total_fee"];
	    $refund_fee = $decryptedData["refund_fee"];
	    
	    
	    $count = $db->get_var("select count(*) from SKT419 where SKF19503='".$out_trade_no."'");
	    if($count == 0){
	        $db->query("insert into SKT419 (SKF19503,SKF19506,SKF19507,SKF19508,SKF19509,SKF19510,SKF19511,SKF19512) values ('".$out_trade_no."','".$out_trade_no."', $total_fee/100, $total_fee/100, '', now(), '', '')");
	    }
	    $count = $db->get_var("select count(*) from SKT419 where SKF19503='".$out_trade_no."' and SKF19513=1");
	    if($count == 0){
	        $db->query("update SKT419 set SKF19513=1, SKF19514=now() where SKF19503='".$out_trade_no."'");
	        $db->query("update skt31 set SKF2992=0,SKF408=2  where SKF395='".$out_trade_no."' ");
	        $db->query("update SKT417 set SKF19475=now() where SKF19471='".$out_trade_no."'");
	        $count = $db->get_var("select count(*) from SKT412 where SKF19422=2 and SKF19415='".$out_trade_no."'");
	        if($count == 1){
	            //更新退货表审核状态退款完成
	            $db->query("update SKT412 set SKF19422=4 where SKF19415='".$out_trade_no."'");
	        }
	    }
	    return true;
	}
	
	/**
	 * handle wechat pay refund notify
	 */
	public function handle()
	{
		try {
			$xml = file_get_contents("php://input");
			$data = $this->xml2array($xml);
			$encryptData = $data['req_info'];
			$decryptedData = $this->xml2array($this->decryptData($encryptData, self::MCH_KEY));
			$msg = 'OK';
			$result = $this->handelInternal($decryptedData, $msg);
			$returnArray['return_msg'] = $msg;
			if (true === $result) {
				$returnArray['return_code'] = 'SUCCESS';
			} else {
				$returnArray['return_code'] = 'FAIL';
			}
			$this->replyNotify($returnArray);
		} catch (Exception $e) {
			throw new Exception($e);
		}
	}
	
	/**
	 * reply to wechat
	 * @param $xml
	 */
	public function replyNotify($xml)
	{
		if (is_array($xml)) {
			$xml = $this->toXml($xml);
		}
		echo $xml;
	}
	
	/**
	 * @param string $xml
	 * @return array
	 * @throws \Exception
	 */
	public function xml2array(string $xml)
	{
		if (empty($xml)) {
			throw new Exception('Error xml data!');
		}
		$p = xml_parser_create();
		xml_parse_into_struct($p, $xml, $values, $index);
		xml_parser_free($p);
		$result = [];
		foreach ($values as $val) {
			$result[strtolower($val['tag'])] = $val['value'];
		}
		return $result;
	}
	
	/**
	 * output xml
	 * @param array $array
	 * @return string
	 * @throws \Exception
	 */
	public function toXml(array $array)
	{
		if (empty($array)) {
			throw new Exception("array is empty！");
		}
		$xml = "<xml>";
		foreach ($array as $key => $val) {
			if (is_numeric($val)) {
				$xml .= "<" . $key . ">" . $val . "</" . $key . ">";
			} else {
				$xml .= "<" . $key . "><![CDATA[" . $val . "]]></" . $key . ">";
			}
		}
		$xml .= "</xml>";
		return $xml;
	}
	
	/**
	 * decrypt data
	 * @param string $encryptData
	 * @param string $md5LowerKey
	 * @return array
	 */
	public function decryptData(string $encryptData, string $Key = '')
	{
		//1. base64_decode
		// openssl_decrypt only accept base64 input param
		//2. md5 original key
		$md5LowerKey = strtolower(md5($Key));
		//3. decrypt AES ECB
		$decrypted = openssl_decrypt($encryptData, "AES-256-ECB", $md5LowerKey);
		return $decrypted;
	}
}

$refundNotify = new WxpayRefundNotifyHelper();
$refundNotify->handle();
