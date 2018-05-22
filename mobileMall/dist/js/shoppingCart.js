/**
 * Created by chenksoft on 2017/4/17.
 */
$(function(){

    /*编辑删除 完成*/

    function checkCartNum (){
        var flag=1;
        $('.text_box').each(function(i){
            if(this.value==0){
                flag=0;
                return flag;
            }
        })
        return flag;
    }

    $('.edit-cart').click(function(){
        if($(this).html()=='编辑'){
            $(this).html('完成');
            $('.btn-up').hide();
            $('.btn-del').removeClass('hide');
            $('.delete2').removeClass('hide');
            $('.sizebox2').removeClass('hide');
        }else if($(this).html()=='完成'){
            var flag = checkCartNum();
            if(flag){
                $(this).html('编辑');
                $('.btn-up').show();
                $('.btn-del').addClass('hide');
                $('.delete2').addClass('hide');
                $('.sizebox2').addClass('hide');
            }else{
                alert('数量错误');
            }
            
        }
    });
    

    /*结算1*/
    $('.btn-up').click(function(){

        var num = $('#total-num').val();
        if(parseInt(num)> 0){

            var totalPrice = $('.price-total').html();
            var url_num = chooseNum.join(",");
            var url_id = chooseId.join(",");
            /*if(parseFloat(totalPrice)>0&&parseFloat(totalPrice)<150){
                $('.sty-dialog').removeClass('hide');
                $('.mask').removeClass('hide');
                $(document).on('click','.dialog-btn1',function(){
                    window.location.href='index.html';
                });

                $(document).on('click','.dialog-btn2',function(){
                    window.location.href='toOrder.html?ch_num='+url_num+'&ch_product='+url_id;
                });
            }else{*/
                window.location.href='toOrder.html?ch_num='+url_num+'&ch_product='+url_id;
            //}
        }else{
        	showDefault('fail');
        }
    });

    /*全选*/
    $(document).on('click','.checkall',function(){
        if(this.checked){
            $('.checkbox').prop('checked',true)
        }else{
            $('.checkbox').prop('checked',false)
        }
        countcheck();
    });

    $(document).on('click','.checkbox',function(){
        countcheck();
    });

    /*单个选择*/
    var chooseList,chooseId,chooseNum;
    function  countcheck(){
        chooseList = []; /*价格*/
        chooseId = [];   /*商品id*/
        chooseNum = [];   /*商品数量*/
        var count0=0,count1=0;
        $('.checkbox').each(function(i){
            count0++;
            if(this.checked){
                count1++;
                
                /*获取价格*/
                var price = $(this).parents('.aui-card-list').find('.product-price').html();
                /*获取数量*/
                var num=  $(this).parents('.aui-card-list').find('.text_box').val();
                /*获取productId*/
                var id = $(this).parents('.cartItem').attr('id');
                /*存给对象*/
                var total = parseFloat(price)*parseFloat(num);
                chooseList.push(total);
                chooseId.push(id);
                chooseNum.push(num);
            }

        });
        var sum=0;
        
        for(var i=0; i<chooseList.length; i++){
            sum+=chooseList[i];
        }
        
        if(count0==count1){
             $('.checkall').prop('checked',true);

        }else{
            $('.checkall').prop('checked',false);
        }

        
        if (count1) {
          $('.btn-up').addClass('aui-btn-danger');
          $('#total-num').val('1');
        }else{
          $('.btn-up').removeClass('aui-btn-danger');
          $('#total-num').val('0');
        }

        $('.price-total').html(sum.toFixed(2));
        $('.money-all').html('￥'+sum.toFixed(2));
        
        var needFare = (99.0-sum).toFixed(2);
        var needContent  = (needFare>0)? "还差<span class='font-obvious-a'>"+needFare+"</span>元即可包邮":"满99元已包邮"
        $('.need-title').html('');
        $('.need-title').append(needContent);

    }

    /*增加*/
    $(document).on('click','.add',function(){
        var productid,num,t;
        t = $(this).siblings('.text_box');
        var productId = $(this).parents('.table-border').attr('id');
        var inventory = $(this).siblings('.stock').children('i').html();

        if(parseInt(t.val())>=1) {
            t.val(Math.abs(parseInt(t.val()))+1);
        }
        productid = $(this).parents('.cartItem').attr('id');
        num = $(this).siblings('.text_box').val();

        editCartnum(productid,num);
        countcheck();

        $(this).parents('.cartItem').find('.num-a').html(num);

    });

    /*减少*/
    $(document).on('click','.reduce',function(){
        var productid,num,t;
        t = $(this).siblings('.text_box');
        var productId = $(this).parents('.table-border').attr('id');
        if(parseInt(t.val())>=2){
            t.val(Math.abs(parseInt(t.val()))-1);
        }else if(parseInt(t.val())==1){
            showDefault('fail');
        }
        productid = $(this).parents('.cartItem').attr('id');
        num = $(this).siblings('.text_box').val();

        editCartnum(productid,num);
        countcheck();
        $(this).parents('.cartItem').find('.num-a').html(num);
    });

    /*input 改变数量*/
    $(document).on('keyup','.text_box',function(){
        var productid,num, t,nums;
       /* t = $(this).val();
        nums = /^[1-9]\d*$/;
        if(!nums.test(t)){
            $(this).val(1);
        }*/
        productid = $(this).parents('.cartItem').attr('id');
        num = $(this).val();
        $(this).parents('.cartItem').find('.num-a').html(num);
        editCartnum(productid,num);
        countcheck();
    });

    /*获取购物车列表*/
    function getcartList(){
        $('.shopcartList').children().remove();
        var mydata = {
            type:'shopCar',
            func:'getCarbyUser',
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
                    $('.shopcartNo').addClass('hide');
                    $('#settlement').removeClass('hide');
                    $('#count-banner').removeClass('hide');
                    var cartList = data.msg;
                    var content = '';
                    for(var i =0;i<cartList.length; i++){
                    	var item = cartList[i];
                    	//item.ordinarysale = parseFloat(item.ordinarysale).toFixed(1);
                    	//item.num = parseFloat(item.num).toFixed(0);
                    	//item.inventory = parseFloat(item.inventory).toFixed(0); 
                        content += '<div class="aui-card-list clearfix cartItem aui-margin-b-0" id="'+item.productID+'">\
                            <div class="sizebox2 hide">\
                        <input class="text_box aui-font-size-30" type="number" value="'+item.num+'"/>\
                        <span class="add add-able">+</span>\
                        <span class="reduce reduce-able">-</span>\
                    </div>\
                    <div class="delete2 hide" data-ids="'+item.productID+'">\
                        <img src="dist/imgs/delete.png" class="icon-ads-delete">\
                    </div>\
                    <div class="aui-list-item-label checkdiv pull-left ">\
                        <input class="aui-radio checkbox" type="checkbox" name="radio">\
                    </div>\
                    <div class=" aui-card-list-header aui-padding-l-0  aui-card-list-user pull-right width90Percent aui-border-b" onclick="window.location.href=\'shopdetail.html?_='+Math.random()+'&v=ShoppingCart&productId='+item.productID+'\'">\
                        <div class="aui-card-list-user-avatar pr-img">\
                            <img src="'+item.images160+'">\
                        </div>\
                        <div class="aui-card-list-user-name">\
                            <div class="aui-font-size-24 pruduct-name">'+item.productName+'</div>\
                        </div>\
                        <div class="pull-left aui-margin-t-5">\
                            <div class="card-footer2 widthauto pull-left">RMB<span class="product-price">'+item.ordinarysale+'</span></div>\
                            <div class="pull-left aui-font-size-26 aui-margin-l-10 ">x <span class="num-a">'+item.num+'</span></div>\
                        </div>\
                    </div>\
                </div>';
                    }
                    $('.shopcartList').append(content);

                } else {
                    $('.shopcartNo').removeClass('hide');
                    $('#settlement').addClass('hide');
                    $('#count-banner').addClass('hide');
                }
            }
        })
    }
    getcartList();

    
    $(document).on('click','.cartItemclick',function(){
        var productid = $(this).parents('.cartItem').attr('id');
        window.location.href = 'shopdetail.html?productId='+productid;
    });


    /*用户编辑购物车*/
    function editCartnum(productid,num){
        var mydata = {
            type:'shopCar',
            func:'editCarbyUser',
            openid:sessionStorage.openId,
            productID:productid,
            num:num
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
            }
        })
    }

    /*用户删除购物车*/
    function delCart(productid){
        var mydata = {
            type:'shopCar',
            func:'delCarbyUser',
            openid:sessionStorage.openId,
            productID:productid
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
                    getcartList();
                }
            }
        })
    }
    $(document).on('click','.btn-del',function(){
        delCart(chooseId);
    })

    /*单个删除*/
    function deleteCart(productid){
        var mydata = {
            type:'shopCar',
            func:'deleteCart',
            openid:sessionStorage.openId,
            productID:productid
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
                    getcartList();
                }
            }
        })
    }
    
    
    $(document).on('click','.delete2',function(){
    	var ids = $(this).attr('data-ids');
        $('.popup-box2').removeClass('hide');
        $('.mask').removeClass('hide');
        
        $('.popup-box2').find('.bt-quere').attr('ids', ids);
        
    })

    $('.bt-quere').on('click',function(){
            var id =$(this).attr('ids');
            deleteCart(id);
            $('.popup-box2').addClass('hide');
            $('.mask').addClass('hide');
    })

});

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
                title:"提交成功",
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
                }, 200)
            });
            break;
        default:
            // statements_def
            break;
    }
}