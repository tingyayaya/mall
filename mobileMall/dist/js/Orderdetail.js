/**
 * Created by chenksoft on 2017/4/20.
 */
$(function(){

    /*获取URL参数*/

    var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);
 
    $(document).on('click','.btn-wuliu',function(){
        window.location.href='logistics.html?bid='+params.xfdh;
    });

    $('.logistics-list').on('click',function(){
        window.location.href='logistics.html?bid='+params.xfdh;
    });

    $(document).on('click','.product-list',function(){
        var productid = $(this).attr('id');
        window.location.href = 'shopdetail.html?productId='+productid;
    });

    $('.btn-apprise').hide();
    var bid;
    var paymoney,payprice;
    function getOrderDetail(){
    	$('#item-list').html('');
        var mydata = {
            type:'Order',
            func:'getOrderDetailsByUser',
            openid:sessionStorage.openId,
            XFDH:params.xfdh
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                var content = '';
                if(data.rs==100){
                	bid = data.msg.bid; //物流单号
                    $('.order-num').html(params.xfdh);
                    $('.totalfare').html(data.msg.totalfare);
                    payprice = data.msg.total;
                     paymoney= parseFloat(data.msg.total) + parseFloat(data.msg.totalfare);
                    for(var i =0 ;i<data.msg.list.length; i++){
                    	var item = data.msg.list[i];
                        item.num = parseInt(data.msg.list[i].num);
                        content += '<li class="aui-list-item aui-list-item-middle product-list aui-border-t-light" id="'+item.productID+'">\
                            <div class="aui-media-list-item-inner">\
                        <div class="aui-list-item-media aui-pull-left">\
                            <img src="'+item.pic+'">\
                        </div>\
                        <div class="aui-list-item-inner aui-pull-left width200">\
                            <div class="aui-list-item-text productname">'+item.name+'</div>\
                            <span class="margin4b aui-font-size-30 aui-text-danger">¥'+item.wholesale+'<i class="font-light-a">x'+item.num+'</i></span>\
                        </div>\
                    </div>\
                </li>';
                    }
                    $('#item-list').append(content);

                    $('.ctime').html(data.msg.date);
                    
                    switch (data.msg.states){
                        case '0':
                            $('.order-status').html('已取消');
                            $('.logistics-info').addClass('hide');
                            break;
                        case '1':
                            $('.order-status').html('待支付');
                            $('#expdate').html(data.msg.expdate);
                            break;
                        case '2':
                            $('.order-status').html('已支付');
                            break;
                        case '8':
                            $('.order-status').html('待收货');
                            break;  
                        case '16':
                            $('.order-status').html('已收货');
                            break;      
                        case '32':
                            $('.order-status').html('申请退货中');
                            break;   
                        case '99':
                            $('.order-status').html('已完成');
                            //$('.btn-wuliu').removeClass('hide');
                           // $('.btn-toPay').remove();
                            if(data.msg.shipped == '1'){
                            	$('.btn-apprise').show();
                            }
                            break;      
                        default:
                            break;
                    }
                    if(data.msg.returned == 1){
                    	if(data.msg.refund == 1){
                    		$('.order-status').html('退货完成');
                    	} else {
                    		$('.order-status').html('售后审核中');
                    	}
                    }
                    
                    $('.consignee-card').html(data.msg.idCard);
                    $('.consignee-name').html(data.msg.name);
                    $('.consignee-phone').html(data.msg.phoneNum);
                    $('.consignee-address').html(data.msg.province+data.msg.city+data.msg.area+data.msg.address);
                    $('.price-total').html(data.msg.price);
                    $('.order-total').html(data.msg.total);


                     

                }else if(data.rs==401){
                    toast.fail({
                        title: "获取订单详情失败",
                        duration: 2000
                    });
                }
            }
        })
    }
    getOrderDetail();


    /*订单运费*/
    function getFare(){
        var mydata = {
            type:'Order',
            func:'getOrderFareByUser',
            openid:sessionStorage.openId,
            XFDH:params.xfdh
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
                    $('.price-fare').html(data.fare);
                     var paymoney2 = parseFloat(payprice)+parseFloat(data.fare);
                    /*支付啊*/
                    $(document).on('click','.btn-toPay',function(){
                      
                        window.location.href = 'wxpay/wxpayDetail.php?weight='+data.weight+'&fare='+data.fare+'&price='+payprice+'&total='+paymoney2+'&money='+paymoney2*100+'&XFDH='+params.xfdh+'&sid='+sessionStorage.openId;
                        /*
                         $('.payment').removeClass('hide');
                         $('.mask').removeClass('hide');*/
                    });

                }
            }
        });
    }
    getFare();

   
    var updateOrderState = function(state){
    	var mydata = {
                type:'Order',
                func:'updateOrder',
                openid:sessionStorage.openId,
                XFDH:params.xfdh,
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
                    	toast.fail({ title: "操作成功", duration: 2000 });
                    	location.href='Order.html';
                    } else {
                    	toast.fail({ title: "操作失败",  duration: 2000  });
                    }
                }
            });
    };
    

    /*关闭 支付弹框*/
    $('.aui-icon-close').on('click',function(){
        $('.inputPassword').addClass('hide');
        $('.payment').addClass('hide');
        $('.mask').addClass('hide');
    });

    $('.btn-toorder-a').on('click',function(){
        $('.inputPassword').addClass('hide');
        $('.payment').addClass('hide');
        $('.mask').addClass('hide');
    });

    /*提示*/
    apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({
    });
    
    $('#logistics').click(function(){
    	location.href='logistics.html?bid='+params.xfdh;
    });
    
    //确认收货
    $('.btn-receive').click(function(){
    	console.log('确认收货');
    	updateOrderState(99);
    });
    
    /*取消订单*/
    $(document).on('click','.btn-delOrder',function(){
        var mydata = {
            type:'Order',
            func:'cancelOrder',
            openid:sessionStorage.openId,
            XFDH:params.xfdh
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
    
   
    
    $('.btn-apprise').click(function(){
    	window.location.href='addcomment.html?xdfh='+params.xfdh;
    });
    
    
});