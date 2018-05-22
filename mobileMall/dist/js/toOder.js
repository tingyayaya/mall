/**
 * Created by chenksoft on 2017/4/19.
 */
$(function(){

    /*获取URL参数*/

    var linkURL, params,linkSearch;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);

    var type = (params.type)?params.type:'';
    var ch_num = (params.ch_num)?params.ch_num:'';
    var ch_product = (params.ch_product)?params.ch_product:'';
    
    $('.header-left').click(function(){
 	   if(type && type == 'shopdetail'){
 		   window.location.href='shopdetail.html?_='+Math.random()+'&productId='+ch_product;
 	   } else {
 		   history.go(-1);
 	   }
    });
    
    
    /*支付*/
    $('.btn-up').on('click',function(){
        toBeOder();
    });
    
    $('.showdetail').click(function(){
    	location.href = 'toOrder-list.html'+location.search;
    });

   /* $('.btn-up2').on('click',function(){
        //$('.payment').addClass('hide');
        $.ajax({
            async: false,
            url: "../sample.php", //这是我的服务端处理文件php的
            type: "get",
            data: {data:'1'},
            success: function (result) {
                console.log(result);
                /!*toast.success({
                    title: "下单成功",
                    duration: 2000
                });
                // $('.inputPassword').removeClass('hide');
                var t = setInterval('window.location.href="Order.html"',1500);*!/
            }
        })
    });
*/
    /*循环地址列表 拿到默认地址*/
    function getAddressList() {
        var mydata = {
            type: 'address',
            func: 'getdefault',
            openid: sessionStorage.openId
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs == 100){
                    var item = data.list;
                    $('.no-address-list').addClass('hide');
                    $('.have-address-list').removeClass('hide');
                        if(item.skf2991=='1'){
                            $('.have-address-list').attr('id',item.skf2970);
                            $('.consigneeName').html(item.skf2972);
                            $('.consigneePhone').html(item.skf2974);
                            $('.consigneeAddress').html(item.skf3967);
                            $('.consigneeIdcard').html(item.skf3839);
                        }
                } else {
                    $('.no-address-list').removeClass('hide');
                    $('.have-address-list').addClass('hide');

                }
            }
        })
    }
    
    var getCardList = function(){
    	var arrid = params.ch_product;
        var arrnum = params.ch_num;
        $('#item-list').html('');
        var mydata = {
                type:'productDetails',
                func:'listCart',
                openid:sessionStorage.openId,
                arrid: arrid,
                arrnum: arrnum
            };
            mydata = JSON.stringify(mydata);
            $.ajax({
                type:'post',
                url:'../data.php',
                data:{data:mydata},
                success:function(data){
                    console.log(data);
                    if(data.rs == 100){
                        var content = '';
                        var items = data.list;
                        if(items && items.length>0){
                        	for(var i=0; i<items.length; i++){
                        		var item = items[i];
                        		content +=' <div class="product23">\
    	    	                    <img src="'+item.images+'" alt="">\
    	                        	</div>';
                        	}
	                        $('#item-list').append(content);
                        }   
                       $('.price-offer').html(data.priceoffer);
                       $('.price-fare').html(data.pricefare);
                       $('.price-item').html(data.priceitem);
                       $('.price-total').html(data.realmoney);
                       $('.money-all').html(data.realmoney);
                       $('.pronum').html('共'+data.totalnum+'件');
                       
                    }
                }
            })
        
    };
    
    getCardList();
    /*循环购买列表*/
/*    var list = [];
    function cycleGoods(){

        var arrid = params.ch_product.split(',');
        var arrnum = params.ch_num.split(',');
        var totalnum = 0;
        for(var i =0; i<arrid.length; i++){

            var obj = {};
            obj.num = arrnum[i];  //数量
            obj.productID= arrid[i];  //产品id
            list.push(obj);

            getShopDetail(arrid[i],arrnum[i]);
            totalnum += parseInt(obj.num);
        }
        $('#item-list').html('');
        $('.pronum').html('共'+totalnum+'件');
        
        var priceitem = $('.price-item').val();
        var priceoffer = $('.price-offer').val();
        var pricefare = $('.price-fare').val();
        console.log(priceitem+"---"+priceoffer+"---"+pricefare);
        var realmoney = (parseFloat(priceitem)+parseFloat(pricefare)-parseFloat(priceoffer)).toFixed(2);
        console.log("realmoney: "+realmoney);
        
        $('.price-total').val(realmoney);
        $('.money-all').val(realmoney);
    }
   cycleGoods();

    var totalptice = 0;

    function getShopDetail(id,num){
        var mydata = {
            type:'productDetails',
            func:'getDetailsforwshop',
            sessionId:sessionStorage.sId,
            productID:id
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs == 100){
                    var content = '';
                    var item = data.msg;
                    item.ordinarysale = parseFloat(item.ordinarysale).toFixed(2);
                    totalptice += item.ordinarysale*num;

                    content =' <div class="product23">\
	                    <img src="'+item.images+'" alt="">\
                    	</div>';
                    $('#item-list').append(content);
                    
                    //$('.orderAmount').html(parseFloat(totalptice).toFixed(2));
                    $('.price-item').html(parseFloat(totalptice).toFixed(2));
                }
            }
        })
    }
*/
    var list = [];
    var arrid = params.ch_product.split(',');
    var arrnum = params.ch_num.split(',');
    for(var i =0; i<arrid.length; i++){
        var obj = {};
        obj.num = arrnum[i];  //数量
        obj.productID= arrid[i];  //产品id
        list.push(obj);
    }
    
    /*确认订单*/
    function toBeOder(){
        var id = $('.have-address-list').attr('id');
        var mydata = {
            type:'Order',
            func:'CreateOrderByUser',
            openid:sessionStorage.openId,
            list:list,
            addressid:id
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

                    var arr = getFare(data.XFDH,data.total);
                    var total = parseFloat(data.total)+parseFloat(arr[0]);

                    window.location.href = 'wxpay/wxpayDetail.php?weight='+arr[1]+'&fare='+arr[0]+'&price='+data.total+'&total='+total+'&money='+total*100+'&XFDH='+data.XFDH+'&sid='+sessionStorage.openId+'&ch_num='+params.ch_num+'&ch_product='+params.ch_product+'&v=toOrder';
/*
                    $('.payment').removeClass('hide');
                    $('.mask').removeClass('hide');*/

                }else if(data.rs==416){
                    toast.fail({
                        title: "金额超过海关规定价格",
                        duration: 2000
                    });
                }else if(data.rs==417){
                    toast.fail({
                        title: "金额超过海关规定价格",
                        duration: 2000
                    });
                }else if(data.rs==419){
                    toast.fail({
                        title: "订单子表创建失败",
                        duration: 2000
                    });
                }else if(data.rs==420){
                    toast.fail({
                        title: "订单主表创建失败",
                        duration: 2000
                    });
                }else if(data.rs==422){
                    toast.fail({
                        title: "请选择地址",
                        duration: 2000
                    });
                }
            }
        })

    }


    /*订单运费*/
    function getFare(XFDH){
        var obj =[];
        var mydata = {
            type:'Order',
            func:'getOrderFareByUser',
            openid:sessionStorage.openId,
            XFDH:XFDH
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            async: false,
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    obj[0] = data.fare;
                    obj[1] = data.weight;
                }
            }

        });
        return obj;
    }



    /*密码输入框*/
    var $input = $(".fake-box input");
    $("#pwd-input").on("input", function() {
        var pwd = $(this).val().trim();
        for (var i = 0, len = pwd.length; i < len; i++) {
            $input.eq("" + i + "").val(pwd[i]);
        }
        $input.each(function() {
            var index = $(this).index();
            if (index >= len) {
                $(this).val("");
            }
        });
        if (len == 6) {
            //执行其他操作
        }
    });

    $('input').keydown(function(event){
        if(event.keyCode == 13){
            var content = $(this).val();
            if(content){
                showDefault('success');
                $('.payment').addClass('hide');
                $('.inputPassword').addClass('hide');
                $('.mask').removeClass('hide');
                var t = setInterval(function(){
                    window.location.href="order.html";
                },1000)
            }
        }
    });

    /*关闭*/
    $('.aui-icon-close').on('click',function(){
       /* $('.inputPassword').addClass('hide');
        $('.payment').addClass('hide');
        $('.mask').addClass('hide');*/
        window.location.href = 'Order.html';
    });

    /*提示*/
    apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({
    });
    function showDefault(type) {
        switch (type) {
            case "success":
                toast.success({
                    title: "支付成功",
                    duration: 2000
                });
                break;
            case "fail":
                toast.fail({
                    title: "不能再减少啦",
                    duration: 2000
                });
                break;
            case "custom":
                toast.custom({
                    title: "提交成功",
                    html: '<i class="aui-iconfont aui-icon-laud"></i>',
                    duration: 2000
                });
                break;
            case "loading":
                toast.loading({
                    title: "加载中",
                    duration: 2000
                }, function (ret) {
                    console.log(ret);
                    setTimeout(function () {
                        toast.hide();
                    }, 3000)
                });
                break;
            default:
                // statements_def
                break;
        }
    }
    /*修改地址*/
    function chooseaddress(){

        if(params.ch_addressid){
            $('.no-address-list').addClass('hide');
            $('.have-address-list').removeClass('hide');

            $('.have-address-list').attr('id',params.ch_addressid);
            $('.consigneeName').html(params.ch_name);
            $('.consigneePhone').html(params.ch_phone);
            $('.consigneeAddress').html(params.ch_address);
        }else{
            getAddressList();
        }
    }
    chooseaddress();

    $('#chooseaddress').on('click',function(){
        window.location.href = 'addressList.html?type='+type+'&ch_num='+params.ch_num+'&ch_product='+params.ch_product;
    });

    /*获取订单详情*/


});