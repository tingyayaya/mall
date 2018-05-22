$(function(){
	var _hash = window.location.hash;
	
	var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = getQueryString(linkURL);
	
    console.log(params);
    
    var brandname = params.name;
    $('.aui-title').html('');
    
    
    var getBrand = function(){
		$('#item-list').children().remove();
        var mydata = {
            type:'Product',
            func:'brandshow',
            brandname: brandname,
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
                	 //$('.banner2>img').attr('src','dist/imgs/hou.png');
                	$('.banner2>img').attr('src', data.brand.image);
                	$('.aui-title').html(data.brand.name);
                	var content = '';
                	//console.log(items);
                	for(var i=0; i<list.length; i++){
                		 var item = list[i];
                		 content += '<div class="c-product-list" onclick="window.location.href=\'shopdetail.html?_='+Math.random()+'&productId='+item.productID+'\'">\
                		        <div class="imgbox">\
                         		<img src="'+item.images+'" alt="" width="140" height="155">\
                         		</div>\
                         		<div>'+item.productName+'</div>\
                         		<div class="card-footer2 cs34">&yen; <span class="product-price">'+item.ordinarysale+'</span><p class="product-yuanlai">&yen; '+item.retail+'</p></div>\
                         		<div class="tolook">点击购买&gt;</div>\
                         		</div>';
                	}
                	$('#item-list').append(content);
                }
            }
        });  
	};
	getBrand();

});