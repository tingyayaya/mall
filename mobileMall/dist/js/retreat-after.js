$(function(){
	apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({  });

	var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);
	
    
    var getItems = function(){
		$('#item-list').children().remove();
        var mydata = {
            type:'Order',
            func:'getOrderRefundItems',
            openid:sessionStorage.openId,
            xdfh: params.xdfh
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
                console.log(data);
                if(data.rs==100){
                	var items = data.list;
                	var content = '';
                	for(var i=0;i<items.length; i++){
                		 var item = items[i];
                		 content += '<div class="aui-card-list aui-border-t clearfix cartItem aui-margin-b-0 ">\
                	        <div class="sizebox2 hide">\
                	            <input class="text_box aui-font-size-30" type="number" value="'+item.num+'" name="item-num" />\
                			 	<input class="" type="hidden" value="'+item.productID+'" name="item-id"/>\
                			 	<input class="" type="hidden" name="item-max" value="'+item.num+'" />\
                	            <span class="add add-able">+</span>\
                	            <span class="reduce reduce-able">-</span>\
                	        </div>\
                	        <div class="aui-list-item-label checkdiv pull-left ">\
                	            <input class="aui-radio checkbox" type="checkbox" name="item-check">\
                	        </div>\
                	        <div class=" aui-card-list-header aui-padding-l-0  aui-card-list-user pull-right width90Percent aui-border-b-light">\
                	            <div class="aui-card-list-user-avatar pr-img">\
                	                <img src="'+item.images+'">\
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
                	$('#item-list').append(content);
                }
            }
        });  
	};
	getItems();
    
	
	/*添加图片*/
    var thumb = {};

    $('#upload').change(function(e){
    	

        var content = '';
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
        	content ='<div class="imgidv fileimg">\
                        <img src="'+e.target.result+'" >\
                        <div class="imgmore"></div>\
                    </div>'
            $('.addigm').prepend(content);
            var arr = e.target.result.split('base64,');
            var imgsrc =[];
            var type =[];
            imgsrc[0] = arr[1];
            var typearr = file.type.split('/');
            type[0] = typearr[1];
            
            	 var mydata = {
    	            data:e.target.result
    	        };
    	        mydata = JSON.stringify(mydata);
    	        $.ajax({
    	            type:'post',
    	            data: {data: e.target.result},
    	            dataType: 'json',
    	            url:'../upload.php',
    	            success:function(data){
    	                if(data.rs == 100){
    	                	var fids = $('#fids').val();
    	                	$('#fids').val(data.msg+";");
    	                	thumb.img = imgsrc;
    	                    thumb.ext = type;
    	                }
    	            }
    	        });
            	            
            
            
        };
        more6();
    });
    
    /*删除图片*/
    $(document).on('click','.imgmore',function(){
    	more6();
    	$(this).parent('.imgidv').remove();
    })

    /*判断是否超过6*/
    function more6(){
    	var num = $('.fileimg').length+1;
    	if(num==6){
    		$('#upload').parent('.imgidv').addClass('hide');
    	}else if(num==7){
    		$('#upload').parent('.imgidv').removeClass('hide');
    	}
    }

    
    $('.btn-upto').click(function(){
    	var remark = $('#miaoshu').val();
    	var fids = $('#fids').val();
    	var items = '';
    	var nums = '';
    	$('#item-list').find('[class*="cartItem"]').each(function(index, obj){
    		var checked = $(obj).children().find('input[name="item-check"]').is(":checked");
    		if(checked){
    			if(items == ''){
    				items += $(obj).children().find('input[name="item-id"]').val();
        			nums += $(obj).children().find('input[name="item-num"]').val();
    			} else {
    				items += ";"+$(obj).children().find('input[name="item-id"]').val();
        			nums += ";"+$(obj).children().find('input[name="item-num"]').val();
    			}
    		}
    	});
    	if(items == ''){
    		return;
    	}

    	 var mydata = {
            type:'Order',
            func:'refund',
            openid:sessionStorage.openId,
            xdfh: params.xdfh,
            remark: remark,
            fids: fids,
            items: items,
            nums: nums
        };
        mydata = JSON.stringify(mydata);
        //console.log(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
                console.log(data);
                if(data.rs==100){
                	 toast.success({  title:"申请成功", duration:2000  });
                	 location.href='retreat.html';
                } else {
                	toast.fail({  title:"申请失败", duration:2000  });
                }
            }
        });  
    });
    
    //以下是编辑内容
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
    
    $('.text_box').each(function(i){
        var max_ = $('.num-a').eq(i).html();
        this.value=parseInt(max_);
        this.setAttribute('max',max_);
    })

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
    
     /*增加*/
    $(document).on('click','.add',function(){
        var t = $(this).siblings('.text_box');
        var max = $(this).closest('.cartItem').find('input[name="item-max"]').val();
        
        if(parseInt(t.val())>=1&&parseInt(t.val())<parseInt(max)) {
            t.val(Math.abs(parseInt(t.val()))+1);
            $(this).closest('.cartItem').find('.num-a').text(t.val());
        }else{
             toast.fail({
                title:"不能在增加啦",
                duration:2000
            });
        }
    });

    /*减少*/
    $(document).on('click','.reduce',function(){
    	var t = $(this).siblings('.text_box');
    	 var max = $(this).closest('.cartItem').find('input[name="item-max"]').val();
        if(parseInt(t.val())>=2){
            t.val(Math.abs(parseInt(t.val()))-1);
            $(this).closest('.cartItem').find('.num-a').text(t.val());
        }else if(parseInt(t.val())==1){
            showDefault('fail');
        }
    });

    /*input 改变数量*/
    $(document).on('keyup','.text_box',function(){
        var num = $(this).val();
        var max = $(this).closest('.cartItem').find('input[name="item-max"]').val();
        if(parseInt(num) < 1 || parseInt(num)>parseInt(max)){
        	$(this).val(1);
        } 
        $(this).closest('.cartItem').find('.num-a').text(t.val()); 
    });
    
    $(document).on('click','.checkbox',function(){
        countcheck();
    });

    function countcheck(){
        var count = 0;
        $('.checkbox').each(function(i){
            if(this.checked){
                count++;
            }
        });
        if(count){
                $('.btn-primary2').addClass('btn-primary');
            }else{
                $('.btn-primary2').removeClass('btn-primary');
        }
    }
    
    $('#miaoshu').on('input', function(){
        var _value = $(this).val();
        $('.miaoshu-sum').html(_value.length+'/500');
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