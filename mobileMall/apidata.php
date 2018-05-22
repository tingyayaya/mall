<?php
session_start();
header('Access-Control-Allow-Origin:*');
header ( 'Content-Type: text/json' );
require_once dirname(__FILE__).'/../data/db.php';
require_once dirname(__FILE__).'/../class/function.php';
require_once dirname(__FILE__).'/../class/login.php';
require_once dirname(__FILE__).'/../class/product.php';
require_once dirname(__FILE__).'/../class/cart.php';
require_once dirname(__FILE__).'/../class/order.php';
require_once dirname(__FILE__).'/../class/account.php';
require_once dirname(__FILE__).'/../class/aftersale.php';
require_once dirname(__FILE__).'/../class/customer.php';
require_once dirname(__FILE__).'/../class/Services.php';
require_once dirname(__FILE__).'/../class/platform.php';
require_once dirname(__FILE__).'/../class/user.php';
require_once dirname(__FILE__).'/../class/platform.php';
require_once dirname(__FILE__).'/../enums/OrderStatus.php';
require_once dirname(__FILE__).'/../class/dictionary.php';
require_once dirname(__FILE__).'/../class/news.php';
require_once dirname(__FILE__).'/../class/comments.php';

try {

$dirname= dirname(__FILE__)."/log";
if(!is_dir($dirname)) {
	mkdir($dirname, 0777, true);
}
$json = str_replace ( "\\", "", $_REQUEST ['data'] );
$arr = json_decode ( $json, true );

if ($arr == null) {
	echo json_encode ( array (
			'rs' => 101,
			'msg' => 'empty json data!' 
	) );
	saveLog(101,"错误的JSON格式");
	exit;
}
$type = $arr['type']; // 模块
@$func = $arr['func']; // 模块
$openid = $arr['openid'];
validationOpenId($openid);
switch ($type) {

	case 'serviceitem':
		//全部服务项目展示
		if($func=='list'){
			$searchkey = $arr['searchkey'];
			$cag = $arr['cag'];
			Services::AllList($searchkey, $cag);
		}
		if($func == 'cags'){
			Services::cags();
		}
		break;
	case 'servicedetail':
		if($func=='item'){
			$itemid = $arr['itemid'];
			Services::getItem($itemid);
		}
		break;
	case 'orderService':
		if($func == 'add'){
			/*
			 "itemid":"26","technicianid":"6","orderdate":"2017-05-7 10:41","phone":"3234342","storeid":"31"}
			 */
// 			$openid = $_SESSION['openid'];
			$muser = $db->get_row("select * from SKT1 where SKF19262='".$openid."'"); 
			
			$itemid = $arr['itemid'];
			$item = $db->get_row("select * from skt148 where SKF2269='".$itemid."'");
			//var_dump($db->last_query);
			$bno = Platform::getSN(52494350);
			$itemname = $item->skf2946;
			$technicianid = $arr['technicianid'];
			$tech = $db->get_row("select * from SKT13 where SKF2312='".$technicianid."'");
			
			//$orderdate = $arr['orderdate'];
			$ordertype = '3';
			$ordertime = '30';
			$orderno = Platform::getSN(52494374);
			$member = $muser->skf2;
			$phone = $arr['phone'];
			$storeid = $arr['storeid'];
			$technicianlevel = $tech->skf152;
			$ordernum = '1';
			$itemprice =  $item->skf2273;
			$orderprice = $item->skf2273;
			$technicianprice = '0';
			$itemretailprice = $item->skf2273;
			$memberid = $muser->skf1;

			$te = date_parse_from_format("Y-m-j G:i", $arr['orderdate']);
			$dt = new DateTime();
			$dt->setDate($te['year'], $te['month'], $te['day']);
			$dt->setTime($te['hour'], $te['minute'], 0);
			$orderdate = $dt->format('Y-m-d H:i:s');
			/*
			 * $itemid md_预约信息表.项目编号
			 * $bno 预约信息表.消费单号
			 * $itemname md_预约信息表.项目名称
			 * $technicianid md_预约信息表.服务技师
			 * $orderdate md_预约信息表.预约时间
			 * $ordertype md_预约信息表.预约类型
			 * $ordertime md_预约信息表.预计用时
			 * $orderno md_预约信息表.预约单号
			 * $member md_预约信息表.客户姓名
			 * $phone md_预约信息表.手机号码
			 * $storeid md_预约信息表.门店
			 * $technicianlevel md_订单明细.服务技师等级
			 * $ordernum md_订单明细.数量
			 * $itemprice md_订单明细.单价
			 * $orderprice md_订单明细.小计金额
			 * $technicianprice md_订单明细.技师服务费
			 * $itemretailprice md_订单明细.零售价
			 */
			Services::addOrder($itemid, $bno, $itemname, $technicianid, $orderdate, $ordertype, $ordertime, $orderno, $member, $phone, $storeid, $technicianlevel, $ordernum, $itemprice, $orderprice, $technicianprice, $itemretailprice,$memberid);
		}
		if($func == 'cancel'){
			$bno = $arr ['bno'];
			Services::cancelOrder($bno);
		}
		break;
		
	case 'servicerecord':
		if($func=='list'){
			$cardnumber = $arr['cardnumber'];
			Services::getRecords($membername);
		}
		break;
	case 'techniciandetail':
		if($func=='item'){
			$itemid = $arr['itemid'];
			Services::getTechItem($itemid);
		}
	break;	
	case 'address':
		if($func=='list'){
			User::addresslist($uid);
		}
		if($func=='setdefault'){
			$id = 	$arr['id'];
			User::addressSetdefault($id, $uid, true);
		}
		if($func=='getdefault'){
		    User::getdefault($uid);
		}
		if($func=='del'){
			$id = 	$arr['id'];
			User::addressDel($id, $uid);
		}
		if($func=='info'){
			$id = 	$arr['id'];
			User::addressinfo($id);
		}
		if($func=='edit'){
			$id = 	$arr['id'];
			/*
			 * id: id,
                        skf2972: $(username).val(),
                        skf2974: $(phonenum).val(),
                        skf3967: $(city).val()+$(addressdetail).val(),
                        skf2991: isdefault,
                        skf3964: values[0],
                        skf3965: values[1],
                        skf3966: values[2]
			 */
			$skf2972 = $arr['skf2972'];
			$skf2973 = $arr['skf2973'];
			$skf2974 = $arr['skf2974'];
			$skf3967 = $arr['skf3967'];
			$skf2991 = $arr['skf2991'];
			$skf3964 = $arr['skf3964'];
			$skf3965 = $arr['skf3965'];
			$skf3966 = $arr['skf3966'];
			$skf3839 = $arr['skf3839'];
			
			User::addressEdit($id, $uid, $skf2972, $skf2974, $skf3967, $skf2991, $skf3964, $skf3965, $skf3966,$skf2973,$skf3839);
		}
		if($func=='add'){
			$skf2972 = $arr['skf2972'];
			$skf2973 = $arr['skf2973'];
			$skf2974 = $arr['skf2974'];
			$skf3967 = $arr['skf3967'];
			$skf2991 = $arr['skf2991'];
			$skf3964 = $arr['skf3964'];
			$skf3965 = $arr['skf3965'];
			$skf3966 = $arr['skf3966'];
			$skf3839 = $arr['skf3839'];
			$skf4030 = Platform::getSN(52494375);
				
			User::addressAdd($uid, $skf2972, $skf2974, $skf3967, $skf2991, $skf3964, $skf3965, $skf3966, $skf4030, $skf2973,$skf3839);
		}
		break;

	default :
		break;
}
} catch(Exception $e) {
	saveLog(-1, $e->getMessage());
}
exit ();
?>