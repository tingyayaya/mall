/**
 * Created by chenksoft on 2017/4/17.
 */
$(function(){
    /* $("#footer-nav").load("footer.html");*/
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

    var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = GetQueryString(linkURL);
    
    //支付成功判断忆登录
    if(params.r){
    	sessionStorage.islogin = 1;
    }

    var clearData = function(){
    	 $('#my-name').text('');
         $('#my-integral').html('');
         $('#my-store').html('');
        $('#pay-number').removeClass('msg-num').text(''); 
        $('#deliver-number').removeClass('msg-num').text(''); 
        $('#receiving-number').removeClass('msg-num').text(''); 
        $('#appraise-number').removeClass('msg-num').text(''); 
        $('#refund-number').removeClass('msg-num').text(''); 
    };
    clearData();

    function getPageData(){
        var mydata = {
            type:'usercenter',
            func:'userinfo',
            openid:sessionStorage.openId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                //alert(JSON.stringify(data));
                if(data.rs==100){
                    $('#my-name').text(data.info.name);
                    $('#my-integral').html(data.info.integral);
                    $('#my-store').html(data.info.store);
                    
                    
                    if(data.info.pay > 0){ $('#pay-number').addClass('msg-num').text(data.info.pay); }
                    if(data.info.deliver > 0){ $('#deliver-number').addClass('msg-num').text(data.info.deliver); }
                    if(data.info.receiving > 0){ $('#receiving-number').addClass('msg-num').text(data.info.receiving); }
                    if(data.info.appraise > 0){ $('#appraise-number').addClass('msg-num').text(data.info.appraise); }
                    if(data.info.refund > 0){ $('#refund-number').addClass('msg-num').text(data.info.refund); }
                } else if(data.rs == 204){
                	sessionStorage.islogin = 0;
                }
            }
        })
    }
    
    function getloginstatus(){
        if(sessionStorage.islogin == 1){
            $('.in-login').removeClass('hide');
            $('.out-login').addClass('hide');
            getPageData();
        }else{
            $('.in-login').addClass('hide');
            $('.out-login').removeClass('hide');
        }
    }
    getloginstatus();

    $(document).on('.out-login','click',function(){
        if(sessionStorage.islogin == 1){
            window.location.href='personalcenter.html?_='+Math.random();
        }else{
            window.location.href='signin.html';
        }
    });
    
   

    /*获取电话号码*/
/*    function getPhoneNum(){
        var mydata = {
            type:'usercenter',
            func:'getPhone',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    telhide(data.phone)
                }
            }
        })
    }
*/

    /*余额和卡券信息*/
/*    function getBanlanceAndCoupons(){
        var mydata = {
            type:'usercenter',
            func:'blancebyuser',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    $('.my-balance').html(data.balance);
                    $('.my-count').html(data.count);
                }
            }
        })
    }*/

    /*卡券列表*/
/*    function getCouponsList(){
        var mydata = {
            type:'usercenter',
            func:'cardandcoupons',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
            }
        })
    }*/


    function telhide(e){
        var mtel = e.substr(0, 3) + '****' + e.substr(7);

        $('#tel').html(mtel);
    }

    /*列表进入*/
    $('.address-list').on('click',function(){
    	if(sessionStorage.islogin == 1){
    		window.location.href='addressList.html';
    	} else {
    		 window.location.href='signin.html';
    	}
    });

    $('#myintg').on('click',function(){
    	if(sessionStorage.islogin == 1){
    		window.location.href='myintg.html';
    	} else {
    		 window.location.href='signin.html';
    	}
    });

    $('#mycollect').on('click',function(){
    	if(sessionStorage.islogin == 1){
    		window.location.href='mycollect.html';
    	} else {
    		 window.location.href='signin.html';
    	}
    });
 
    /*评价列表进入*/
    $('.evaluate-list').on('click',function(){
    	if(sessionStorage.islogin == 1){
    		window.location.href='myevaluation.html';
	    } else {
			 window.location.href='signin.html';
		}
    });

    /*评价列表进入*/
    $('.service-list').on('click',function(){
        window.location.href='serviceRecord.html';
    });
    
    $('.btn-width').on('click',function(){
        $('.mask').addClass('hide');
        $('.popup-box2').addClass('hide');
    })

   
});

function popup1(){
    $('.mask').removeClass('hide');
    $('.popup-box2').removeClass('hide');
}