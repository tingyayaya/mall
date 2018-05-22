/**
 * Created by chenksoft on 2017/4/20.
 */
$(function(){

	if(sessionStorage.islogin == 1){
		
	} else {
		window.location.href='signin.html?_='+Math.random();
	}
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
    
    var type = (params.type)?params.type:'';
    var ch_num = (params.ch_num)?params.ch_num:'';
    var ch_product = (params.ch_product)?params.ch_product:'';
   /* $('.btn-add-address').on('click',function(){
        window.location.href='addAddress.html';
    });*/

    
    
    function list(){
        $('#listaddress').html('');
        var mydata = {
            type:'address',
            func:'list',
            openid:sessionStorage.openId
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
               console.log(data);
                if(data.rs==100){
                        var items = data.list;
                        var content = '';
                        for(var i=0; i<items.length;i++){
                                var item = items[i];
/*                                content += '<div class="aui-card-list chooseItem"  id="'+item.skf2970+'">\
                                    <div class="aui-card-list-header aui-card-list-user aui-border-b">\
                                <div class="aui-card-list-user-name">\
                                    <div>'+item.skf2972+'</div>\
                                </div>\
                                <div class="aui-card-list-user-name">\
                                    <div>'+item.skf3839+'</div>\
                                    <small>'+item.skf2974+'</small>\
                                </div>\
                                <div class="aui-card-list-user-info">\
                                  '+item.skf3967+'\
                                </div>\
                            </div>\
                            <div class="aui-card-list-footer">\
                                    <div class="aui-list-item-label checkdiv-b pull-left ">\
                                        <input class="aui-radio checkbox" type="radio" name="setdefault" data-id="'+item.skf2970+'" data-uid="'+item.skf2971+'"  '+(item.skf2991==1?"checked":"")+'>&nbsp;&nbsp;设为默认\
                                    </div>\
                                    <div class="aui-list-item-label pull-right">\
                                        <i class="iconfont icon-edit btn-edit"></i><span class="btn-edit" data-id="'+item.skf2970+'">&nbsp;编辑&nbsp;&nbsp;</span>\
                                        <i class="iconfont icon-del btn-delete"></i><span class="btn-delete" data-id="'+item.skf2970+'">&nbsp;删除</span>\
                                    </div>\
                                </div>\
                            </div>';*/
                                
                             content += '<div class="aui-card-list myaddress-list ads-yes" id="'+item.skf2970+'">\
                                <div class="check-input pull-left ">\
                                    <input class="aui-radio checkbox" type="radio" name="setdefault" data-id="'+item.skf2970+'" data-uid="'+item.skf2971+'"  '+(item.skf2991==1?"checked":"")+'>\
                                </div>\
                                <div class="address-content btn-editaddress" data-id="'+item.skf2970+'">\
                                    <p>收货人：'+item.skf2972+' <span>'+item.skf2974+'</span></p>\
                                    <p class="address-a">'+item.skf3967+'</p>\
                                    <p>'+item.skf3839+'</p>\
                                </div>\
                                <div class="address-delete" data-id="'+item.skf2970+'">\
                                    <img src="dist/imgs/delete.png" class="icon-ads-delete btn-delete" data-id="'+item.skf2970+'">\
                                </div>\
                            </div>';
                                
                                
                         }
                    $('#listaddress').html(content);
                    $('.ads-text').show();
                }else{
                    $('.shopcartNo').removeClass('hide');
                    $('.ads-text').hide();
                }
            }
        });
    }
    list();
    
    /* 设置默认 */
    
    $(document).on('click', '.aui-radio', function(){
    	var id = $(this).attr('data-id');
    	var uid = $(this).attr('data-uid');
    	
    	 var mydata = {
            type:'address',
            func:'setdefault',
            openid:sessionStorage.openId,
            curPage:1,
            pageSize:'20',
            id: id,
            uid: uid
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
               console.log(data);
                if(data.rs==100){
                	console.log('success');

                }
            }   
        });
    	        
    });
    
    /* 删除  */
    $(document).on('click', '.address-delete', function(){
    	var id = $(this).attr('data-id');
    	/*var dialog = new auiDialog();*/
        $('.popup-box2').removeClass('hide');
        $('.mask').removeClass('hide');
        $('.bt-quere').attr('data-id', id);   
    });

    $(document).on('click','.bt-quere',function(){
    	var id = $(this).attr('data-id');
        $('.popup-box2').addClass('hide');
        $('.mask').addClass('hide');
        deleteAddress(id)
    });
    
    $(document).on('click','.btn-cancel',function(){
        $('.popup-box2').addClass('hide');
        $('.mask').addClass('hide');
    });

    function deleteAddress(id){
        var mydata = {
            type:'address',
            func:'del',
            openid:sessionStorage.openId,
            curPage:1,
            pageSize:'20',
            id: id
        };
        mydata = JSON.stringify(mydata);
        var toast = new auiToast();
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
                if(data.rs==100){
                    $('#cell'+id).remove();
                    toast.success({
                        title:"删除成功",
                        duration:2000
                    });
                    list();
                } else {
                    toast.fail({
                        title:"删除失败",
                        duration:2000
                    });
                }
            },
            error:function(){
                toast.fail({
                    title:"删除失败",
                    duration:2000
                });
            }
        });
    }


    /*判断是否是选择地址*/
/*    if(params.type){
        $(document).on('click','.chooseItem',function(){
            var addId,name,address,phone;
            addId = $(this).attr('id');
            name = $(this).find('.aui-card-list-user-name').children('div').html();
            address = $(this).find('.aui-card-list-user-info').html();
            phone = $(this).find('.aui-card-list-user-name').children('small').html();
            var mydata = {
                type:'chooseone',
                ch_num:params.ch_num,
                ch_product:params.ch_product,
                ch_addressid:addId,
                ch_name:name,
                ch_address:address,
                ch_phone:phone
            };
            mydata = JSON.stringify(mydata);
            console.log(mydata);
           // window.location.href = 'toOrder.html?type=chooseOne&ch_num='+params.ch_num+'&ch_product='+params.ch_product+'&ch_addressid='+addId;
        })
    }*/


    /*编辑*/
   $(document).on('click','.btn-editaddress',function(){
	   var id = $(this).attr('data-id');
	   if(type != ''){
		   window.location.href = 'editaddress.html?_='+Math.random()+'&id='+id+'&type='+type+'&ch_num='+ch_num+'&ch_product='+ch_product;
	   } else {
		   window.location.href = 'editaddress.html?id='+id;
	   }
    });


   /**
    * 新增地址
    */
   $('.btn-add-address').click(function(){
	   if(type != ''){
		   window.location.href='addAddress.html?_='+Math.random()+'&type='+type+'&ch_num='+ch_num+'&ch_product='+ch_product;
	   } else {
		   window.location.href='addAddress.html';
	   }
   });
   
   $('.header-left').click(function(){
	   if(type != ''){
		   window.location.href='toOrder.html?_='+Math.random()+'&type='+type+'&ch_num='+ch_num+'&ch_product='+ch_product;
	   } else {
		   window.location.href='personalcenter.html?_='+Math.random();
	   }
   });
   
});