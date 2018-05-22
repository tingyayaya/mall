/**
 * Created by chenksoft on 2017/4/24.
 */
$(function(){
    var page = 1;
    var screenHeight = window.screen.height;
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();               //滚动条距离顶部的高度
        var scrollHeight = $(document).height();                   //当前页面的总高度
        var windowHeight = $(this).height();
        
        //当前可视的页面高度
        if(scrollTop + windowHeight >= scrollHeight){          //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
            page++;
            getItems(params.type, params.keyWord, page);
        }
    })


    /*获取URL参数*/

    var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);

    if(params.keyWord){
        $('#search-input').val(params.keyWord);
    }
  
	var getItems = function(type, keyword, page){
        
        var mydata = {
            type:'Product',
            func:'search',
            sessionId:sessionStorage.sId,
            catgroy: type,
            keyword: keyword,
            curPage: page
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
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
                		 //console.log(item);
                		 content += '<div class="aui-card-list aui-margin-b-0 aui-padded-l-2 product-list" onclick="window.location.href=\'shopdetail.html?_='+Math.random()+'&v=productList&productId='+item.productID+'\'">\
                	        <div class="product-img-div">\
		                         <img src="'+item.images+'" alt="" style="width:128px; height:128px;">\
		                     </div>\
		                     <div class="aui-pull-left product-text-div">\
		                        <p>'+item.productName+'</p>\
		                        <div class="card-footer">RMB&nbsp;<span class="product-price">'+item.ordinarysale+'</span><span class="product-yuanlai">RMB&nbsp;'+item.retail+'</span></div>\
		                        <img src="dist/imgs/jumpcart.png" alt="" class="jumpcart" onclick="addcart()">\
		                     </div>\
		                 </div>';
                	}
                	$('#item-list').append(content);
                }
            }
        });  
	};
	getItems(params.type, params.keyWord);
    
    

    function judgetype(){
        switch (params.type) {
            case 'hotList':
                hotlist();
                break;
            case 'goodsList':
                goodslist();
                break;
            case 'serviceList':
                servicelist();
                break;
            case 'goodsClassify':
                goodslist(null,params.categoryId,params.level);

                $('.navContent li').find('a').css('color','#6d6d6d');
                $('.navContent li').eq(params.eqs).find('a').css('color','#3ab373');
                break;
            case 'content':
                goodslist(null,null,null,params.keyWord);
                $('#search-input').val(params.keyWord);
                break;
            default:
                goodslist();
                break;
        }
    }
    //judgetype();


    /*点击进入商品详情*/
    $(document).on('click','.productId',function(){
        var pID = $(this).attr('id');
        window.location.href = "shopdetail.html?productId="+pID;
    });


    /*点击搜索更多*/
    $(document).on('click','#btn-search',function(){
        var content = $('#search-input').val();
        //if(content){
        	window.location.href='productList.html?type=content&keyWord='+content;  
        //}
    });

    /*回车绑定*/
    $('input').keydown(function(event){
        if(event.keyCode == 13){
            var content = $(this).val();
            //if(content){
                window.location.href='productList.html?type=content&keyWord='+content;
            //}
        }
    });

    /*热门列表*/
    function hotlist(page){
        var mydata = {
            type:'hotProduct',
            func:'detailsforwshop',
            sessionId:sessionStorage.sId,
            curPage:page,
            pageSize:'20'
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
                    $('.shopcartNo').addClass('hide');

                    var GoodsList = data.msg;
                    for(var i=0;i<GoodsList.length; i++){
                        GoodsList[i].retail=parseFloat(GoodsList[i].retail).toFixed(1);
                        content += '<li class="aui-list-item aui-list-item-middle productId" id="'+GoodsList[i].productID+'">\
                                        <div class="aui-media-list-item-inner">\
                                            <div class="aui-list-item-media" style="width: 5rem;">\
                                                <img src="'+GoodsList[i].images+'" alt="图片" class="imgSrc">\
                                            </div>\
                                            <div class="aui-list-item-inner">\
                                                <div class="aui-list-item-text">\
                                                    <div class="aui-list-item-title aui-font-size-14 productName">'+GoodsList[i].productName+'</div>\
                                                </div>\
                                                <div class="aui-list-item-text ">\
                                                    <span class="font-obvious-b productPrice">'+GoodsList[i].retail+'</span>\
                                                    <span class="productSalenum">库存:'+GoodsList[i].inventory+'</span>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </li>';
                    }
                    $('.GoodList').append(content);
                }else{
                    if(!page){
                        setTimeout(function(){
                            $('.shopcartNo').removeClass('hide');
                        },200);
                    }
                }
            }
        })
    }

    /*美容服务列表*/
    function servicelist(){
        console.log('美容服务项目');
    }

    /*商品列表*/
    function goodslist(page,cid,level,keyword,brand){
        //console.log('商品列表');
        var mydata = {
            type:'allProduct',
            func:'detailsforwshop',
            sessionId:sessionStorage.sId,
            brand:brand,
            cateid:cid,
            catelevel:level,
            keyWord:keyword,
            curPage:page,
            pageSize:'20'
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
                    $('.shopcartNo').addClass('hide');
                    var GoodsList = data.msg;
                    for(var i=0;i<GoodsList.length; i++){
                        GoodsList[i].retail=parseFloat(GoodsList[i].retail).toFixed(1);
                        content += '<li class="aui-list-item aui-list-item-middle productId" id="'+GoodsList[i].productID+'">\
                                        <div class="aui-media-list-item-inner">\
                                            <div class="aui-list-item-media" style="width: 5rem;">\
                                                <img src="'+GoodsList[i].images+'" alt="图片" class="imgSrc">\
                                            </div>\
                                            <div class="aui-list-item-inner">\
                                                <div class="aui-list-item-text">\
                                                    <div class="aui-list-item-title aui-font-size-14 productName">'+GoodsList[i].productName+'</div>\
                                                </div>\
                                                <div class="aui-list-item-text ">\
                                                    <span class="font-obvious-b productPrice">'+GoodsList[i].retail+'</span>\
                                                    <span class="productSalenum">库存:'+GoodsList[i].inventory+'</span>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </li>';
                    }
                    $('.GoodList').append(content);
                }else{
                    if(!page){
                        setTimeout(function(){
                            $('.shopcartNo').removeClass('hide');
                        },200);
                    }
                }
            }
        })
    }

    /*搜索内容列表*/
    function searchinputlist(e){
        console.log(e);
    }

    /*分类选择列表*/
    function classifylist(e){
        console.log(e)
    }
    /*商品列表分类*/
    function getclassify(index){

        var mydata = {
            type:'allProduct',
            func:'categoryforwshop',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                /*console.log(data);*/
                var fristCategory='',secondCategory='';
                if(data.rs==100){

                    if(index+1){
                        $('#gradet').find('li').remove();
                        for(var j=0; j<data.list[index].list.length; j++){
                            secondCategory +=' <li id="'+data.list[index].list[j].secondCategoryID+'" class="sort-list-second">'+data.list[index].list[j].secondCategoryName+'</li>';
                        }
                        $('#gradet').append(secondCategory);
                    }else{
                        for(var i =0; i<data.list.length;i++){
                            fristCategory +=' <li id="'+data.list[i].fristCategoryID+'" class="sort-list-first">'+data.list[i].fristdCategoryName+'</li>';
                        }
                        $('#gradew').append(fristCategory);
                    }
                }
            }
        })
    }
   // getclassify();

    $(document).on('click','.sort-list-first',function(){
        var index = $(this).index();
        getclassify(index);
    });

    $(document).on('click','.sort-list-second',function(){
        /*字体*/
       /* $(this).siblings().css('color','#6d6d6d');
        $(this).css('color','#3ab373');*/

        $('.grade-eject').removeClass('grade-w-roll');
        $(this).removeClass('current');
        $('.screening').attr('style',' ');

        window.location.href='productList.html?type=goodsClassify'+'&categoryId='+$(this).attr('id')+'&level=2';

    });
});