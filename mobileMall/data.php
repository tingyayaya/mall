<?php
header('Access-Control-Allow-Origin:*');
header ( 'Content-Type: text/json' );

require_once dirname(__FILE__).'/../data/db.php';
require_once APP_PATH.'/class/function.php';
require_once APP_PATH.'/class/login.php';
require_once APP_PATH.'/class/product.php';
require_once APP_PATH.'/class/cart.php';
require_once APP_PATH.'/class/order.php';
require_once APP_PATH.'/class/account.php';
require_once APP_PATH.'/class/aftersale.php';
require_once APP_PATH.'/class/customer.php';
require_once APP_PATH.'/class/user.php';
require_once APP_PATH.'/class/platform.php';
require_once APP_PATH.'/enums/OrderStatus.php';
require_once APP_PATH.'/class/dictionary.php';
require_once APP_PATH.'/class/news.php';
require_once APP_PATH.'/class/comments.php';

//var_dump($_REQUEST);
$type = $_REQUEST['type']; // 模块
$func = $_REQUEST['func']; // 模块
switch ($type) {
    case 'Comments':
        if ($func == 'add') {
            //var_dump($_REQUEST);
            $openid = $_REQUEST['openId'];
            validationOpenId($openid);
            $ids = $_REQUEST['ids'];
            $comments = $_REQUEST['comments'];
            $productIds = $_REQUEST['productIds'];
            $uid = $_SESSION['uid'];
            $orderid = $_REQUEST['orderid'];
            Comments::save($ids, $comments, $productIds, $uid, $orderid);
        }
        
		break;
	default :
		break;
}
exit ();
?>