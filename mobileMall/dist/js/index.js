/**
 * Created by chenksoft on 2017/4/18.
 */

$(function(){
	//localStorage.clear();
	//sessionStorage.clear();
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
    
/* 特价商品 */
    var getItems = function(){
		$('#swiper2-list').children().remove();
        var mydata = {
            type:'Product',
            func:'discount',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
                if(data.rs==100){
                	var items = data.list;
                	var content = '';
                	for(var i=0;i<items.length; i++){
                		 var item = items[i];
                		 console.log(item);
                		 content += '<div class="swiper-slide" onclick="window.location.href=\'shopdetail.html?productId='+item.productID+'\'">\
                         	<img src="'+item.images+'" alt="" width="144" height="100">\
                         	<div class="card-footer2">RMB&nbsp;<span class="product-price">'+item.ordinarysale+'</span><p class="product-yuanlai">RMB&nbsp;'+item.retail+'</p></div>\
                		 	</div>';
                	}
                	$('#swiper2-list').append(content);
                    var swiper = new Swiper('.swiper2', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 2.5,
                        paginationClickable: true,
                        spaceBetween: 10,
                        freeMode: true
                    });
                } else {
                	$('#index-area2').hide();
                	$('.swiper2').hide();
                }
            }
        });  
	};
	getItems();
	
	var getBrands = function(){
		$('#brand-list').children().remove();
        var mydata = {
            type:'Product',
            func:'brands',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
                if(data.rs==100){
                	var list = data.list;
                	var content = '';
                	//console.log(items);
                	for(var i=0; i<list.length; i++){
                		 var brand = list[i];
                		 if(i%4==0 || i==0){
                			 var brand1 = list[i];
                			 var brand2 = list[i+1];
                			 var brand3 = list[i+2];
                			 var brand4 = list[i+3];
                			
                			 content += '<div class="all-pinpai">\
                				    <ul class="pinpai-nav">';
                			 	if(brand1 != null){
                			 		content += '<li class="active nav-item">'+brand1.name+'</li>';
                			 	}
                			 	if(brand2 != null){
                			 		content += '<li class="nav-item">'+brand2.name+'</li>';
                			 	}
                			 	if(brand3 != null){
                			 		content += '<li class="nav-item">'+brand3.name+'</li>';
                			 	}
                			 	if(brand4 != null){
                			 		content += '<li class="nav-item">'+brand4.name+'</li>';
                			 	}
                		    content += '</ul>';
                		    
                		    if(brand1 != null){
                		    content += '<div class="pinpai-pro">\
                	        <div class="pinpai-big" onclick="window.location.href=\'brand.html?name='+brand1.id+'\'">\
                	            <img src="'+brand1.images+'" alt="">\
                	            <span>查看全部</span>\
                	        </div>';
                			 if(brand1.items != null && brand1.items.length>0){
                				 for(var k=0; k<brand1.items.length; k++){
                					 var item = brand1.items[k];
                					 content += '<div class="pinpai-small" onclick="window.location.href=\'shopdetail.html?productId='+item.productID+'\'">\
                                         <img src="'+item.images+'" alt="" style="width:80px; height:80px;">\
                                         <div class="card-footer2 card-footer3">RMB&nbsp;<span class="product-price">'+item.ordinarysale+'</span></div>\
                                         </div>';
                				 }
                	       
                			 }
                	        content += '</div>';
                		    }
                	        if(brand2 != null){
                	        content += '<div class="pinpai-pro" style="display:none;">\
                    	        <div class="pinpai-big" onclick="window.location.href=\'brand.html?name='+brand2.id+'\'">\
                    	            <img src="'+brand2.images+'" alt="" style="width:120px; height:170px;">\
                    	            <span>查看全部</span>\
                    	        </div>';
                    			 if(brand2.items != null && brand2.items.length>0){
                    				 for(var k=0; k<brand2.items.length; k++){
                    					 var item = brand2.items[k];
                    					 content += '<div class="pinpai-small" onclick="window.location.href=\'shopdetail.html?productId='+item.productID+'\'">\
                                             <img src="'+item.images+'" alt="" style="width:80px; height:80px;">\
                                             <div class="card-footer2 card-footer3">RMB&nbsp;<span class="product-price">'+item.ordinarysale+'</span></div>\
                                             </div>';
                    				 }
                    	       
                    			 }
                    	        content += '</div>';
                	        }
                    	        if(brand3 != null){
                    	        content += '<div class="pinpai-pro" style="display:none;">\
                        	        <div class="pinpai-big" onclick="window.location.href=\'brand.html?name='+brand3.id+'\'">\
                        	            <img src="'+brand3.images+'" alt="" style="width:120px; height:170px;">\
                        	            <span>查看全部</span>\
                        	        </div>';
                        			 if(brand3.items != null && brand3.items.length>0){
                        				 for(var k=0; k<brand3.items.length; k++){
                        					 var item = brand3.items[k];
                        					 content += '<div class="pinpai-small" onclick="window.location.href=\'shopdetail.html?productId='+item.productID+'\'">\
                                                 <img src="'+item.images+'" alt="" style="width:80px; height:80px;">\
                                                 <div class="card-footer2 card-footer3">RMB&nbsp;<span class="product-price">'+item.ordinarysale+'</span></div>\
                                                 </div>';
                        				 }
                        	       
                        			 }
                        	        content += '</div>';
                    	        }  
                        	        if(brand4 != null){
                        	        content += '<div class="pinpai-pro" style="display:none;">\
                            	        <div class="pinpai-big" onclick="window.location.href=\'brand.html?name='+brand4.id+'\'">\
                            	            <img src="'+brand4.images+'" alt="" style="width:120px; height:170px;">\
                            	            <span>查看全部</span>\
                            	        </div>';
                            			 if(brand4.items != null && brand4.items.length>0){
                            				 for(var k=0; k<brand4.items.length; k++){
                            					 var item = brand4.items[k];
                            					 content += '<div class="pinpai-small" onclick="window.location.href=\'shopdetail.html?productId='+item.productID+'\'">\
                                                     <img src="'+item.images+'" alt="" style="width:80px; height:80px;">\
                                                     <div class="card-footer2 card-footer3">RMB&nbsp;<span class="product-price">'+item.ordinarysale+'</span></div>\
                                                     </div>';
                            				 }
                            	       
                            			 }
                            	        content += '</div>';
                        	        }
                        	        
                        	        content += '</div>';
                	        
                		 } 
                		
                		
                	}
                	$('#brand-list').append(content);
                }
            }
        });  
	};
	//getBrands();

    //获取首页轮播图片
    var getSlide = function(){
    	var mydata = {
            type:'news',
            func:'slide',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
               // console.log(data);
                if(data.rs==100){
                    
                	var items = data.list;
                	var content = '';
                	for(var i=0;i<items.length; i++){
                		 var item = items[i];
                		 content += '<div class="swiper-slide" onclick="window.location.href=\'finder-detail.html?id='+item.id+'\'">\
                		 	<img src="'+item.images+'">\
                		 	</div>';
                	}
                	$('.index-top').html(content);

                } 
                /*swiper 自动循环播放*/
                var swiper = new Swiper('.swiper1', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay : 2000,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true//修改swiper的父元素时，自动初始化swiper
                });
            }
        })
    };
    getSlide();
    //首页轮播图片跳转
    $(document).on('click', '.index-img', function(){
    	var dataid = $(this).attr('data-id');
    	if(dataid != ''){
    		location.href='finder-detail.html?id='+dataid;
    	}
    })
    
    $(document).on('click','.nav-item',function(){
        var index1 = $(this).index();
    	$(this).addClass('active').siblings().removeClass('active');
    	$(this).parent().siblings('.pinpai-pro').eq(index1).show().siblings('.pinpai-pro').hide();
    });

    
    /*热门推荐3个展示*/
    function hotgoods(){
        var mydata = {
            type:'hotProduct',
            func:'partforwshop',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
               // console.log(data);
                if(data.rs==100){
                    var GoodsList = data.msg;
                    var content = '';
                    for(var i=0;i<GoodsList.length; i++){
                        GoodsList[i].ordinarysale=parseFloat(GoodsList[i].ordinarysale).toFixed(1);
                        content += '<div class="aui-col-xs-4 aui-padded-10 hotlist" id="'+GoodsList[i].productID+'">\
                                        <img src="'+GoodsList[i].images+'" alt="图片">\
                                        <div class="aui-grid-label aui-font-size-12 list-name">'+GoodsList[i].productName+'</div>\
                                        <span class="font-obvious-b aui-font-size-12">&yen;<i class="list-price">'+GoodsList[i].ordinarysale+'</i></span>\
                                    </div>'
                    }
                    $('.hot-product-list').append(content);

                }else if(data.rs==204||data.rs==205){

                    toast.fail({
                        title: "登录失败",
                        duration: 2000
                    });
                }
            }
        })
    }
    //hotgoods();

    $(document).on('click','.hotlist',function(){

        var productId = $(this).attr('id');
        //document.location = 'shopdetail.html?productId='+productId;
        window.location.href='shopdetail.html?productId='+productId;
    });


    /*商家推荐*/
    var Totalpages1;
    function recommendgoods(page){
        var mydata;
        mydata = {
            type:'recommended',
            func:'detailsforwshop',
            sessionId:sessionStorage.sId,
            curPage:page,
            pageSize:'10'
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
                    Totalpages1 = data.TotalPages;
                    var GoodsList = data.msg;
                    for(var i=0;i<GoodsList.length; i++){
                        GoodsList[i].ordinarysale=parseFloat(GoodsList[i].ordinarysale).toFixed(1);
                        content += '<li class="aui-list-item aui-list-item-middle hotlist" id="'+GoodsList[i].productID+'" >\
                                        <div class="aui-media-list-item-inner">\
                                            <div class="aui-list-item-media" style="width: 5rem;">\
                                                <img src="'+GoodsList[i].images+'" alt="图片">\
                                            </div>\
                                            <div class="aui-list-item-inner">\
                                                <div class="aui-list-item-text">\
                                                    <div class="aui-list-item-title aui-font-size-14">'+GoodsList[i].productName+'</div>\
                                                </div>\
                                                <div class="aui-list-item-text">'+GoodsList[i].ordinarysale+'</div>\
                                            </div>\
                                        </div>\
                                    </li>'
                    }
                    $('.recommend-product-list').append(content);

                }else if(data.rs==103){

                    $('.recommend-more').remove();

                }else if(data.rs==204||data.rs==205){

                    toast.fail({
                        title: "登录失败",
                        duration: 2000
                    });
                }
            }
        })
    }
   recommendgoods();

    /*点击查看更多*/
    var page = 1;
    function getomoreList(){
        $('.icon-more').on('click',function(){
            window.location.href = 'productList.html?type=hotList';
        });

        $('.recommend-more').on('click',function(){
            page++;
            /*window.location.href = 'productList.html?type=recommendList';*/
            recommendgoods(page);
            if(page>=Totalpages1){
                $('.recommend-more').remove();
            }
        })
    }
    getomoreList();

    /*点击搜索更多*/
    $(document).on('click','.aui-text-info',function(){
        var content = $('#search-input').val();
        window.location.href='productList.html?type=content&keyWord='+content;
    });
    
    $(document).on('click','#btn-search',function(){
        var content = $('#search-input').val();
        window.location.href='productList.html?type=content&keyWord='+content;
    });

    /*回车绑定*/
    $('input').keydown(function(event){
        if(event.keyCode == 13){
            var content = $(this).val();
            window.location.href='productList.html?type=content&keyWord='+content;
        }
    });

    /*提示*/
    apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({
    });
});