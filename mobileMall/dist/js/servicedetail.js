/**
 * Created by chenksoft on 2017/5/2.
 */
$(function(){

    /*轮播图*/
    var width = $(window).width();
    var initslide = function(){
    	new auiSlide({
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
    };

    
    var params = getQueryString();
    var id = params.id;
    
    console.log('item id :' + id);
    
    $('#aui-slide .aui-slide-wrap').html('');
	$('.tab-detail').html('');
	$('.list-name').html('');
	$('.choose-name').html('');
	$('#appraise').html('');
    
    /*项目信息*/
    function getItemContent(){
    	
        var mydata = {
            type:'servicedetail',
            func:'item',
            sessionId:sessionStorage.sId,
            curPage:1,
            pageSize:'20',
            itemid: id
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    var items = data.list;
                    var content = '';
                    var chooseimg = 'dist/imgs/详情1.jpg';
                    for(var i=0; i<items.length;i++){
                        var item = items[i];
                        content += '<div class="aui-slide-node bg-dark">\
                            <img src="'+item.img+'" />\
                        </div>';
                        if(i=0){
                        	chooseimg = item.img;
                        }
                    }       
                    $('#aui-slide .aui-slide-wrap').append(content);
                    initslide();
                    
                    var item = data.item;
                    $('.product-name').text(item.name);
                    $('.productPrice').text(item.price);
                    $('.choose-price').text(item.price);
                    $('.choose-img img').attr('src', chooseimg);
                    
                    if(data.lsSkt13.length>0){
                    	var techhtml = '';
                    	var techchoose = '';
                    	for(var j=0; j<data.lsSkt13.length; j++){
                    		var skt13 = data.lsSkt13[j];
                    		techhtml += ' <li class="text-center" data-id="'+skt13.skf2312+'">\
                                <img class="technicianImg" src="dist/imgs/small1.jpg" alt="" >\
                            <b class="technicianName">'+skt13.skf4032+'</b>\
                            <p class="aui-font-size-12 techniciangrade">'+skt13.levelname+'</p>\
                        </li>';
                    		techchoose += '<span id="technicianId'+skt13.skf151+'" data-id="'+skt13.skf151+'">'+skt13.skf4032+'</span>';
                    	}
                    	$('.techlist').html(techhtml).owlCarousel({
                            items: 4,
                            lazyLoad: true,
                            loop: true,
                            margin: 10
                        });
                    	$('.choose2').html(techchoose);
                    }
                    
                    $('.tab-detail').html(item.detail);
                    
                    if(data.stores.length>0){
                    	var storehtml = '';
                    	for(var i=0; i<data.stores.length; i++){
                    		storehtml += '<span id="productSecId'+data.stores[i].id+'" data-id="'+data.stores[i].id+'">'+data.stores[i].name+'</span>';
                    	}
                    	$('.choose1').html(storehtml);
                    }
                    
                    
                    if(data.lsSkt32.length>0){
                    	var skt32html = '';
                    	for(var i=0; i<data.lsSkt32.length; i++){
                    		var skt32 = data.lsSkt32[i];
                    		skt32html += '<div class="aui-card-list">\
                    	        <div class="aui-card-list-header aui-card-list-user">\
		                            <div class="aui-card-list-user-name">\
		                                <div class="ev-userName">'+skt32.skf2926+'</div>\
		                                <small class="ev-time">'+skt32.sf_last_change_time+'</small>\
		                            </div>\
                    			<div class="aui-card-list-user-info ev-content">';
                    		switch(skt32.skf3948)
                    		{ 
                    		case '0':
                    			skt32html += '一星';
                    			break; 
                    		case '1':
                    			skt32html += '二星';
                    			break;
                    		case '2':
                    			skt32html += '三星';
                    			break; 
                    		case '3':
                    			skt32html += '四星';
                    			break;
                    		case '4':
                    			skt32html += '五星';
                    			break; 
                    		default: "差评"; 
                    		}
                    		
                    		skt32html  +='</div>\
                    			</div></div>';
                    	}
                    	$('#appraise').html(skt32html);
                    	
                    }
                    
                }
            }
        });
    }
    
    getItemContent();
	


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
        }else if(ret.index==2){
            $('.tab-detail').addClass('hide');
            $('.tab-evaluate').removeClass('hide');
        }
    });

    /*选择条件*/
    $('#popup1-bottom').on('click',function(){
        $('.aui-popup1').fadeIn();
        $('.mask').removeClass('hide');
    });

    /*选项 切换*/
    var arr = [];
    //$('.choose-name').html(arr[0]+','+arr[1]);
    $(document).on('click','.choose1 span',function(){
        $(this).addClass('active').siblings('span').removeClass('active');
       // $(this).addClass('active');
        var chooseOne1 = $(this).html();

        $('#storeid').val($(this).attr('data-id'));
        
        arr[0] = chooseOne1;
        if(arr[1] == undefined){arr[1] = '';}
        $('.choose-name').html(arr[0]+','+arr[1]);
        $('.chooseOne').html(arr[0]+','+arr[1]);
    });

    $(document).on('click', '.choose2 span', function(){
        $(this).addClass('active').siblings('span').removeClass('active');
       // $(this).addClass('active');
        var chooseOne2 = $(this).html();
        $('#techid').val($(this).attr('data-id'));
        
        if(arr[0] == undefined){arr[0] = '';}
        arr[1] = chooseOne2;
        $('.choose-name').html(arr[0]+','+arr[1]);
        $('.chooseOne').html(arr[0]+','+arr[1]);
    });

    /*点击隐藏弹框*/
    $('.mask').on('click',function(){
        $('.aui-popup1').fadeOut();
        $(this).addClass('hide')
    });

    $(document).on('click','.owl-carousel li',function(){
    	var id = $(this).attr('data-id');
        window.location.href='technicianDetail.html?id='+id;
    });

    /*立即预约*/
    $('.btn-toorder-a').on('click',function(){
    	var itemid = id;
    	var storeid = $('#storeid').val();
    	var techid = $('#techid').val();
    	
    	var toast = new auiToast();
    	if(storeid == ''){
    		toast.fail({
    		    title:"请选择门店",
    		    duration:2000
    		});
    		return false;
    	}
    	if(techid == ''){
    		toast.fail({
    			title:"请选择技师",
     		    duration:2000
    		});
    		return false;
    	}
    	
        window.location.href = 'orderService.html?itemid='+itemid+'&storeid='+storeid+'&techid='+techid;
    });

    $('.btn-toorder-b').on('click',function(){
        $('.aui-popup1').fadeIn();
        $('.mask').removeClass('hide');
    })

});