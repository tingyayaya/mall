/**
 * Created by chenksoft on 2017/4/18.
 */
$(function(){
	
	var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);
	//支付成功判断忆登录
    if(params.r){
    	sessionStorage.islogin = 1;
    }
	
	if(sessionStorage.islogin == 1){
		
	} else {
		window.location.href='signin.html';
	}
	
	var hash = location.hash;	
	var changeHash = function(h){
		switch(h){
        case "#all":
            $('.aui-tab-item').eq(0).addClass('aui-active');
            getOrderList('');
            break;
        case "#pay":
            $('.aui-tab-item').eq(1).addClass('aui-active');
            getOrderList('1');
            break;
        case "#deliver":
            $('.aui-tab-item').eq(2).addClass('aui-active');
            getOrderList('2');
            break;
        case "#receiving":
            $('.aui-tab-item').eq(3).addClass('aui-active');
           getOrderList('8');
            break;
        case "#appraise":
            $('.aui-tab-item').eq(4).addClass('aui-active');
           getOrderList('16');
            break;
        default:
       	 $('.aui-tab-item').eq(0).addClass('aui-active');
        	 getOrderList('');
            break;
   	 }
	};
	
	changeHash(hash);
	
	window.addEventListener("hashchange",  function(event){
	   	var _hash = window.location.hash;
    	 changeHash(_hash);
	});
	
    /*tab切换*/
    
    $('#tab').find('.aui-tab-item').on('click',function(){
        $('#tab').find('.aui-tab-item').removeClass('aui-active');
        $(this).addClass('aui-active');  
        switch ($(this).index()){
                case 0:
                   window.location.href = "Order.html?_="+Math.random()+"#all";
                    break;
                case 1:
                	window.location.href = "Order.html?_="+Math.random()+"#pay";
                    break;
                case 2:
                	window.location.href = "Order.html?_="+Math.random()+"#deliver";                 
                    break;
                case 3:
                	window.location.href = "Order.html?_="+Math.random()+"#receiving";                   
                    break;
                case 4:
                	window.location.href = "Order.html?_="+Math.random()+"#appraise";
                    break;
                default:
                    break;
        }
    });
   
    /*回车绑定*/
    $('input').keydown(function(event){
        if(event.keyCode == 13){
            var content = $(this).val();

        }
    });
    
    /* 订单计数 */
    function getOrderStateCount(){
        var mydata = {
            type:'Order',
            func:'getOrderStateCount',
            openid:sessionStorage.openId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    if(data.info.pay > 0){ $('#pay-number').addClass('msg-num').text(data.info.pay); }
                    if(data.info.deliver > 0){ $('#deliver-number').addClass('msg-num').text(data.info.deliver); }
                    if(data.info.receiving > 0){ $('#receiving-number').addClass('msg-num').text(data.info.receiving); }
                    if(data.info.appraise > 0){ $('#appraise-number').addClass('msg-num').text(data.info.appraise); }
                    if(data.info.refund > 0){ $('#refund-number').addClass('msg-num').text(data.info.refund); }
                }
            }
        })
    }
    getOrderStateCount();

    /*获取订单列表*/
    function getOrderList(state){
    	//return;
        $('.order-list').children().remove();
        var mydata = {
            type:'Order',
            func:'getOrderByUser',
            openid:sessionStorage.openId,
            tiaojian:'',
            states:state
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    $('.shopcartNo').addClass('hide');
                    var content = '',content2 = '',content3='', statusclass='';
                    var oderList = data.list;

                    for(var i=0;i<oderList.length; i++){
                        content2 = '';
                        var item = oderList[i];
                        for(var j=0; j<item.list.length;j++){
                               content2 +='<div class="aui-list-item-media aui-pull-left">\
                                            	<img src="'+item.list[j].pic+'">\
                                            </div>';                 
                        }

                        switch (parseInt(item.states)){
                        	case 0:
                        		item.status = '订单已取消';
                        		statusclass = 'pay2';
                        		content3 = '<div class="aui-btn aui-btn-success aui-btn-sm pull-right aui-margin-r-10 btn-tobuy" data-xfdh="'+item.XFDH+'">再次购买</div>';
                        		break;
                       		case 1:
                                item.status = '未支付';
                                statusclass = 'pay';
                                content3 = '<div class="pull-left aui-font-size-28 aui-text-danger"><img src="dist\/imgs\/times2.png" class="times2-icon">'+item.expdate+'</div>\
                                    <div class="aui-btn aui-btn-success aui-btn-sm pull-right aui-margin-r-10 btn-payorder">去支付</div>\
                                    <div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right btn-delOrder">取消订单</div>';
                                break;
                            case 2:
                                item.status = '待发货';
                                statusclass = 'deliver'; 
                                content3 = '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right btn-refund">退款</div>';
                                break;
                            case 8:
                                item.status = '待收货';
                                statusclass = 'token'; 
                                content3 = '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right btn-receive" data-xfdh="'+item.XFDH+'">确认收货</div>\
                                    <div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right" onclick="window.location.href=\'logistics.html?bid='+item.XFDH+'\'">查看物流</div>';
                                break;
                            case 16:
                                item.status = '待评价';
                                statusclass = 'eval'; 
                                content3 = '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right">查看详情</div>\
                                	<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right " onclick="window.location.href=\'addcomment.html?xdfh='+item.XFDH+'\'">追加评价</div>';
                                break;  
                            case 99:
                                item.status = '已完成';
                                statusclass = 'finished';
                                content3 = '';
                                if(item.shipped == '1' && item.returned==0){
	                                if(item.appraise==1){
	                                	content3 = '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right " onclick="window.location.href=\'addcomment.html?xdfh='+item.XFDH+'\'">追加评价</div>';
	                                } else {
	                                	content3 = '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right " onclick="window.location.href=\'addcomment.html?xdfh='+item.XFDH+'\'">评价</div>';
	                                }
                                }
                                if(item.returned==1){
                                	if(item.refund == 1){
                                		//content3 += '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right btn-refund">退款</div>';
                                		 item.status = '退货完成';
                                	} else {
                                		 item.status = '售后审核中';
                                	}
                                } else {
                                	content3 += '<div class="aui-btn aui-btn-outlined aui-btn-danger aui-btn-sm  aui-margin-r-10 pull-right " onclick="location.href=\'retreat-after.html?xdfh='+item.XFDH+'\'">申请售后</div>';
                                }
                                break;        
                            default:
                                break;
                        }

                        var timeArr = item.date.split(' ');
                     content += '<div class="aui-card-list"  xfdh="'+item.XFDH+'">\
                            <div class="aui-card-list-content">\
                        <ul class="aui-list aui-media-list">\
                            <li class="aui-list-item order-list-header aui-border-b-light aui-border-t-light">\
                                <div class="aui-list-item-inner">\
                                    <div class="aui-list-item-title pull-left aui-font-size-28 font-light-a">'+timeArr[0]+'</div>\
                                    <div class="pull-right font-obvious-a aui-font-size-28">'+item.status+'</div>\
                                </div>\
                            </li>\
                            <li class="aui-list-item aui-list-item-middle product-list aui-border-b-light '+statusclass+'">\
                                <div class="aui-media-list-item-inner">\
                                    '+content2+'\
                                </div>\
                            </li>\
                            <li class="aui-border-b-light height-100">\
                                <div class="aui-list-item-inner aui-pull-left">\
                                    <div class="pull-right aui-font-size-30 aui-text-danger aui-text-primary">¥'+item.total+'</div>\
                                    <div class="pull-right aui-font-size-30 aui-text-primary">共<span>'+item.list.length+'</span>件&nbsp;&nbsp;实付款:&nbsp;</div>\
                                </div>\
                                <div class="aui-list-item-inner">\
                                    <div class="pull-right aui-font-size-30 aui-text-info">可返<span>'+item.integral+'</span>积分</div>\
                                    <div class="pull-right aui-font-size-30 aui-text-danger aui-text-primary">含运费'+item.totalfare+'&nbsp;&nbsp;</div>\
                                </div>\
                            </li>\
                            <li class="aui-border-b aui-list-item-inner order-list-end" style="padding-right: 0">\
                                <div class="clearfix">\
                                    '+content3+'\
                                </div>\
                            </li>\
                            <div class="hiddenFare" style="visibility: hidden;height: 0;">'+item.totalfare+'</div>\
                            <div class="hiddenWeight" style="visibility: hidden;height: 0;"">'+item.totalweight+'</div>\
                            <div class="hiddenprice" style="visibility: hidden; height: 0;"">'+item.total+'</div>\
                        </ul>\
                    </div>\
                </div>';
                    }
                    $('.order-list').append(content);
                }else{
                    $('.shopcartNo').removeClass('hide');
                }
            }
        })
    }

    function getdist(){

        var mydata = {
            sessionId:sessionStorage.sId,
            type:"pay",
            func:"payPreCheck",
            XFDH:"HYJ201706290048",
            wechatpayid:"4006262001201707140750090038"
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'get',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
            }
        })

    }
   // getdist();


    /*支付啊*/

    $(document).on('click','.btn-payorder',function(){

        /*订单号*/
        var xfdh = $(this).parents('.aui-card-list').attr('xfdh');

        /*get商品价格 运费 总共需要付款*/
        var price,fare,weight,total;
        price = $(this).parents('.aui-card-list').find('.hiddenprice').html();
        fare = $(this).parents('.aui-card-list').find('.hiddenFare').html();
        weight = $(this).parents('.aui-card-list').find('.hiddenWeight').html();
        total = parseFloat(price)+parseFloat(fare);

        window.location.href = 'wxpay/wxpayDetail.php?weight='+weight+'&fare='+fare+'&price='+price+'&total='+total+'&money='+total*100+'&XFDH='+xfdh+'&sid='+sessionStorage.openId;

/*        $('.payMoney').html('¥'+price);
        $('.payweight').html(parseFloat(weight)/1000+'kg');
        $('.payFare').html('¥'+fare);
        $('.payTotal').html(total+'元');*/
/*
        $('.payment').removeClass('hide');
        $('.mask').removeClass('hide');*/
    });


    /*关闭 支付弹框*/
   /* $('.aui-icon-close').on('click',function(){
        $('.inputPassword').addClass('hide');
        $('.payment').addClass('hide');
        $('.mask').addClass('hide');
    });

    $('.btn-toorder-a').on('click',function(){
        $('.inputPassword').addClass('hide');
        $('.payment').addClass('hide');
        $('.mask').addClass('hide');
    });*/


    //退款
    $(document).on('click','.btn-refund',function(){
        /*订单号*/
        var xfdh = $(this).parents('.aui-card-list').attr('xfdh');

        /*get商品价格 运费 总共需要付款*/
        var price,fare,weight,total;
        price = $(this).parents('.aui-card-list').find('.hiddenprice').html();
        fare = $(this).parents('.aui-card-list').find('.hiddenFare').html();
        weight = $(this).parents('.aui-card-list').find('.hiddenWeight').html();
        total = parseFloat(price)+parseFloat(fare);

        window.location.href = 'wxpay/refund.php?money='+total*100+'&XFDH='+xfdh;

    });

    /*取消订单*/
    $(document).on('click','.btn-delOrder',function(){
        var mydata = {
            type:'Order',
            func:'cancelOrder',
            openid:sessionStorage.openId,
            XFDH:$(this).parents('.aui-card-list').attr('xfdh')
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                   toast.success({
                        title:"取消成功",
                        duration:2000
                    });
                   getOrderList();
                }else if(data.rs==405){
                    toast.fail({
                        title:"取消失败",
                        duration:2000
                    });
                }else if(data.rs==408){
                    toast.fail({
                        title:"该订单无法取消",
                        duration:2000
                    });
                }
            }
        })
    });

    /*获取订单详情*/
    $(document).on('click','.btn-wuliu',function(){
        window.location.href = 'Orderdetail.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');

    });

    /*点击跳转到详情页*/
    $(document).on('click','.finished',function(){
        window.location.href='Orderdetail.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });
    $(document).on('click','.pay',function(){
        window.location.href='Orderdetail_pay.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });
    $(document).on('click','.pay2',function(){
        window.location.href='Orderdetail_pay2.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });

    $(document).on('click','.deliver',function(){
        window.location.href='Orderdetail_deliver.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });
    
    $(document).on('click','.deliver3',function(){
        window.location.href='Orderdetail_deliver3.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });


    $(document).on('click','.deliver2',function(){
        window.location.href='Orderdetail_deliver2.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });
    
    $(document).on('click','.token',function(){
        window.location.href='Orderdetail_token.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });

    $(document).on('click','.eval',function(){
        window.location.href='Orderdetail_eval.html?xfdh='+$(this).parents('.aui-card-list').attr('xfdh');
    });
    
    
    $(document).on('click','.btn-tobuy',function(){
    	var xfdh = $(this).attr('data-xfdh');
    	var mydata = {
                type:'Order',
                func:'updateOrderToReBuy',
                openid:sessionStorage.openId,
                XFDH:xfdh,
                state: 1
            };
            mydata = JSON.stringify(mydata);
            $.ajax({
                type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                	window.location.href='Orderdetail_pay.html?xfdh='+xfdh;
                } 
                else if(data.rs==105){
                	toast.fail({ title: data.msg,  duration: 2000  });
                }
                else {
                	toast.fail({ title: "操作失败",  duration: 2000  });
                }
            }
        });
    });
    

 /*   $(document).on('click','.btn-wuliu',function(){
        window.location.href='logistics.html';
    });*/

  /*  /!*确认收货*!/
    $(document).on('click','.btn-receipt',function(){
        showDefault('success');
        $(this).remove();
        var t=setTimeout("window.location.href='Confirmreceipt.html'",500);
    });*/

    /*提示*/
    apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({
    });
    function showDefault(type){
        switch (type) {
            case "success":
                toast.success({
                    title:"确认收货成功",
                    duration:2000
                });
                break;
            case "fail":
                toast.fail({
                    title:"不能在减少啦",
                    duration:2000
                });
                break;
            case "custom":
                toast.custom({
                    title:"您还没有选择商品",
                    html:'<i class="aui-iconfont aui-icon-no"></i>',
                    duration:2000
                });
                break;
            case "loading":
                toast.loading({
                    title:"加载中",
                    duration:2000
                },function(ret){
                    console.log(ret);
                    setTimeout(function(){
                        toast.hide();
                    }, 3000)
                });
                break;
            default:
                // statements_def
                break;
        }
    }
    
    var updateOrderState = function(state, xfdh){
    	var mydata = {
                type:'Order',
                func:'updateOrder',
                openid:sessionStorage.openId,
                XFDH:xfdh,
                state: state
            };
            mydata = JSON.stringify(mydata);
            console.log(mydata);
            $.ajax({
                type:'post',
                url:'../data.php',
                data:{data:mydata},
                success:function(data){
                    console.log(data);
                    if(data.rs==100){
                    	 toast.success({
                             title:"操作成功",
                             duration:2000
                         });
                    	 if(state == 99){
                    		 window.location.href='Order.html?_='+Math.random()+'#appraise';
                    	 } else {
                    		 window.location.href='Order.html?_='+Math.random();
                    	 }
                    } else {
                    	toast.fail({ title: "操作失败",  duration: 2000  });
                    }
                }
            });
    };
    
  //确认收货
    $(document).on('click', '.btn-receive', function(){
    	var xfdh = $(this).attr('data-xfdh');
    	updateOrderState(99, xfdh);
    });
    
});
