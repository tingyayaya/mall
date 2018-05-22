/**
 * Created by chenksoft on 2017/4/18.
 */

$(function(){

    /*获取Url参数*/

    var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);
    
    var route = params.v;
    $('#goback').click(function(){
    	if(route && route != ''){
    		window.location.href=route+'.html?_='+Math.random();
    	} else {
    		window.location.href='index.html?_='+Math.random();
    	}
    });
    
    
    var clearData = function(){
    	$('.productName').html('');
        $('#productSecId1').html('');
        $('.productPrice').html('');
        $('.chooseOne').html('');
        $('.choose-price').html('');
        $('.choose-inventory').html('库存数 0件');
        $('.describe-img').html('');
        
        $('#salenumber').html('');
        $('#descriptiontext').html('');
        $('.brandname').html('');
        $('.brandicon').attr("src", '');
        $('.ordinarysale').html('');
        $('.retail').html('');
        $('#integral').html('');
        $('.sku').html('');
        $('.efficacy').html('');
       // $('.shelflife').html('');
        $('.fitfor').html('');
        $('.origin').html('');
        $('.detailImgs').html('');
        $('#comment-list').html('');
        $('#item-list').html('');
    };

    window.onload = function(){
    	clearData();
    };
    
    /*商品详情*/
    function getShopDetail(){
        var mydata = {
            type:'productDetails',
            func:'getDetailsforwshop',
            openid:sessionStorage.openId,
            productID:params.productId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                var contentImg = '';
                if(data.rs == 100){

                    var item = data.msg;
                    item.ordinarysale = parseFloat(item.ordinarysale).toFixed(2);
                    $('.productName').html(item.productName);
                    $('.productName2').html(item.productName);
                    $('#productSecId1').html(item.productName);
                    $('.productPrice').html(item.ordinarysale);
                    $('.chooseOne').html(item.productName);
                    $('.choose-price').html(item.ordinarysale);
                    $('.choose-inventory').html('库存数'+item.inventory+'件');

                    $('.bg-dark>img').attr('src',item.images);
                    $('.productThumb').attr('src',item.images160);
                    
                    for(var i=0; i<item.describe.length; i++){
                        contentImg +='<img src="'+item.describe[i]+'" class="detailImgs">'
                    }

                    //$('.describe-img').append(contentImg);
                    
                    $('#salenumber').html(item.salenumber);
                    $('#descriptiontext').html(item.descriptiontext);
                    $('.brandname').html(item.brandname);
                    $('.brandicon').attr("src", item.brandicon);
                    $('.ordinarysale').html(item.ordinarysale);
                    $('.retail').html(item.retail);
                    $('#integral').html(item.integral);
                    $('.sku').html(item.sku);
                    $('.efficacy').html(item.efficacy);
                   // $('.shelflife').html(item.shelflife);
                    $('.fitfor').html(item.fitfor);
                    $('.origin').html(item.origin);
                     
                    var imgs = item.describe;
                    var imgcontent = '';
                    for(var i=0; i<imgs.length; i++){
                    	imgcontent += '<img src="'+imgs[i]+'" alt="" style="width:100%;">';
                    }
                    $('.detailImgs').html(imgcontent);
                    
                    var comments = item.comments;
                    var commentcontent = "";
                    for(var i=0; i<comments.length; i++){
                    	var comment = comments[i];
                    	commentcontent += '<div class="aui-card-list">\
                            <div class="aui-card-list-header aui-card-list-user">\
                        <div class="aui-card-list-user-name">\
                            <div class="ev-userName">'+comment.skf2+'</div>\
                            <small class="ev-time">'+comment.skf19379+'</small>\
                        </div>\
                        <div class="aui-card-list-user-info ev-content">'+comment.skf19380+'</div>\
                    </div></div>';
                    }
                    $('#comment-list').html(commentcontent);
                    
                    
                    var relations = item.relations;
                    var itemcontent = "";
                    for(var i=0; i<relations.length; i++){
                    	var r = relations[i];
                    	itemcontent += '<div class="pro-5" onclick="window.location.href=\'shopdetail.html?productId='+r.productID+'\'">\
                    	<div class="imgboxdd"><img src="'+r.images+'" alt=""></div>\
                        <div class="product-name2">'+r.productName+'</div>\
                        <div class="p-p">\
                            <span class="product-price2 font-obvious-a aui-font-size-30">&yen;'+r.ordinarysale+'</span><span class="product-yuanlai2">&yen;'+r.retail+'</span>\
                        </div>\
                    </div>';
                    }
                    $('#item-list').html(itemcontent);
                    
                    if(item.store == "1"){
                    	 $('.btn-like').addClass('btn-liked');
                    } else {
                    	 $('.btn-like').removeClass('btn-liked');
                    }
                    
                    if(item.cartnum > 0){
                    	$('.cart-num').html('<span class="cart-mum">'+item.cartnum+'</span><i class="btn-gouwu btn-icon-2"></i>');
                    } else {
                    	$('.cart-num').html('<i class="btn-gouwu btn-icon-2"></i>');
                    }
                }
            }
        })
    }
    getShopDetail();

    /*轮播图*/
    var width = $(window).width();
    var slide = new auiSlide({
        container:document.getElementById("aui-slide"),
        /*"width":300,*/
        "height":width,
        "speed":300,
        "pageShow":true,
        "pageStyle":'dot',
        "loop":true,
        'dotPosition':'center'
        //currentPage:currentFun       /*函数名*/
    });

    /*tab切换*/
    apiready = function(){
        api.parseTapmode();
    };
    var tab = new auiTab({
        element:document.getElementById("tab")
    },function(ret){
        if(ret.index==1){
            $('.tab-detail').removeClass('hide');
            $('.tab-evaluate').addClass('hide');
            $('.tab-canshu').addClass('hide');
        }else if(ret.index==2){
            $('.tab-detail').addClass('hide');
             $('.tab-evaluate').addClass('hide');
            $('.tab-canshu').removeClass('hide');
        }else if(ret.index==3){
            $('.tab-detail').addClass('hide');
            $('.tab-evaluate').removeClass('hide');
            $('.tab-canshu').addClass('hide');
        }else if(ret.index==4){

        }
    });

    /*增加*/
    $(document).on('click','.add',function(){
        var t = $(this).siblings('.text_box');
        var _this = $(this);
        var productId = $(this).parents('.table-border').attr('id');
        var inventory = $(this).siblings('.stock').children('i').html();

        if(parseInt(t.val())>=1) {
            t.val(Math.abs(parseInt(t.val()))+1);
        }
    });

    /*减少*/
    $(document).on('click','.reduce',function(){
        var _this = $(this);
        var t = $(this).siblings('.text_box');
        var productId = $(this).parents('.table-border').attr('id');
        if(parseInt(t.val())>=2){
            t.val(Math.abs(parseInt(t.val()))-1);
        }else if(parseInt(t.val())==1){
            showDefault('fail');
        }
    });

    /*input 改变数量*/
    $(document).on('change','.text_box',function(){
        var t = $(this).val();
        var num = /^[1-9]\d*$/;
        if(!num.test(t)){
            $(this).val(1);
        }
    });

    /*选择条件*/
    $('#popup1-bottom').on('click',function(){
        $('.aui-popup1').fadeIn();
        $('.mask').removeClass('hide');
    });

    /*点击隐藏弹框*/
    $('.mask').on('click',function(){
/*        $('.aui-popup1').fadeOut();
        $(this).addClass('hide');*/      
        $('.popup-box2').addClass('hide');
        $('.mask').addClass('hide');
        $('.aui-popup1').addClass('hide');
    });

    /*选项 切换*/

   /* $('.spanbox .youhuo').on('click',function(){
        $(this).siblings('span').removeClass('active');
        $(this).addClass('active');
        var chooseOne = $(this).html();
        $('.choose-name').html('\"'+chooseOne+'\"');
        $('.chooseOne').html(chooseOne);
        $('.chooseContent').html($.trim(chooseOne));
    }); */

    /*获取URL参数*/

    function GetQueryString(url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/, reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, arr_url = reg_url.exec(url), ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }

    /* 加入收藏 */
    $('.btn-tolike-a').on('click',function(){
    	 var toast = new auiToast();
        //添加到购物车
        var mydata = {
            type:'usercenter',
            func:'addCollect',
            openid:sessionStorage.openId,
            productID:params.productId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs ==100){
                    //showDefault('success');
                    //$('.aui-popup1').fadeOut();
                    //$('.mask').addClass('hide');
                	toast.fail({ title:"收藏成功"  });
                    $('.btn-like').addClass('btn-liked');
                }
                else if(data.rs == 101){
                	toast.fail({ title:"取消收藏成功"  });
                    $('.btn-like').removeClass('btn-liked');
                }
                else if(data.rs == 204){
                    toast.fail({
                        title: "您还未登录哦",
                        duration: 2000
                    });
                    var t = setTimeout('window.location.href="signin.html"',1500);
                }
            }
        })
    });
    
    /*加入购物车*/
    $('.btn-tocart-b').on('click',function(){
    	toCart();
    });
    
    
    var toCart = function(){
    	var toast = new auiToast();
        var num = $('.text_box').val();
        //添加到购物车
        var mydata = {
            type:'shopCar',
            func:'addCarbyUser',
            openid:sessionStorage.openId,
            productID:params.productId,
            num:num
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs ==100){
                    //showDefault('success');
                    //$('.aui-popup1').fadeOut();
                    //$('.mask').addClass('hide');
                	toast.fail({ title:"加入购物车成功" });
                	$('.cart-num').html('<span class="cart-mum">'+data.msg+'</span><i class="btn-gouwu btn-icon-2"></i>');	
                } else if(data.rs == 204){
                    toast.fail({
                        title: "您还未登录哦",
                        duration: 2000
                    });
                    var t = setTimeout('window.location.href="signin.html"',1500);
                }
            }
        });
    };
    

  
    /*购买*/
    $('.btn-yes2').on('click',function(){

        /*判断是否是登录的状态*/
        if(sessionStorage.islogin == 1){
            /*选择数量和产品*/
            var num,product;
            num = $('.sizebox input').val();
            product = params.productId;
            window.location.href='toOrder.html?ch_num='+num+'&ch_product='+product+'&type=shopdetail';
        }else {
            toast.fail({
                title: "您还未登录哦",
                duration: 2000
            });
            var t = setTimeout('window.location.href="signin.html"',1500);
        }

    });
    $('.btn-tobuy-b').on('click',function(){
        
        var toast = new auiToast();
        var str = $('.chooseContent').html();
         popup2();
        /*if($.trim(str)=="请选择规格"){
        	popup2();
        	return;
        } else {

        	 var num = $('.text_box').val();
             //添加到购物车
             var mydata = {
                 type:'shopCar',
                 func:'addBuybyUser',
                 openid:sessionStorage.openId,
                 productID:params.productId,
                 num:num
             };
             mydata = JSON.stringify(mydata);
             $.ajax({
                 type:'post',
                 url:'../data.php',
                 data:{data:mydata},
                 success:function(data){
                     if(data.rs ==100){
                    	 var item = data.msg;
                    	 window.location.href='toOrder.html?ch_num='+num+'&ch_product='+params.productId;  
                    	 //window.location.href='toOrder.html?ch_num='+item.nums+'&ch_product='+item.pids;  	 
                     } else if(data.rs == 204){
                         toast.fail({
                             title: "您还未登录哦",
                             duration: 2000
                         });
                         var t = setTimeout('window.location.href="signin.html"',1500);
                     }
                 }
             });
        }
        */
    });
    

     /* 删除  */
    $(document).on('click', '.address-delete', function(){
        var id = $(this).attr('data-id');

        /*var dialog = new auiDialog();*/
       


        $(document).on('click','.bt-quere',function(){
            $('.popup-box2').addClass('hide');
            $('.mask').addClass('hide');
            deleteAddress(id)
        });
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
                    title: "添加成功,在购物车等亲~",
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

});
function qiDay(){
  /*  $('body').css({'height':'100%',"overflow":"hidden"});*/
    $('.popup-box2').removeClass('hide');
    $('.mask').removeClass('hide');
}
function close2(){
    $('.popup-box2').addClass('hide');
    $('.mask').addClass('hide');
    $('.aui-popup1').addClass('hide');
  /*  $('body').css({'height':'',"overflow":""});*/
}
/*
function chooseyes(){
    var toast = new auiToast();
    if($('.spanbox .active').length>0){
        $('.aui-popup1').addClass('hide');
        $('.mask').addClass('hide');
 
    }else{
        toast.fail({
            title:"请选择规格"
        });
    }
}
*/
function popup2(){
    $('.aui-popup1').removeClass('hide');
    $('.mask').removeClass('hide');
}
