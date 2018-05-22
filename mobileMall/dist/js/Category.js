$(function(){
	var _hash = window.location.hash;
	console.log(_hash);
	
	var getItems = function(category_code){
		$('.item-list').children().remove();
        var mydata = {
            type:'Product',
            func:'category',
            sessionId:sessionStorage.sId,
            category: category_code,
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
                //console.log(data);
                if(data.rs==100){
                	var items = data.list;
                	var content = '';
                	for(var i=0;i<items.length; i++){
                		 var item = items[i];
                		 //console.log(item);
                		 content += '<div class="c-product-list" onclick="window.location.href=\'shopdetail.html?productId='+item.productID+'\'">\
                	        <div class="imgbox">\
                         	<img src="'+item.images+'" alt="">\
                		 </div>\
                		 <div class="product-name2">'+item.productName+'</div>\
                		 <div class="card-footer2 cs34">&yen;&nbsp;<span class="product-price">'+item.ordinarysale+'</span><p class="product-yuanlai">&yen;&nbsp;'+item.retail+'</p></div>\
                		 <div class="tolook">点击购买&gt;</div>\
                		 </div>';
                	}
                	$('.item-list').append(content);
                }
            }
        });  
	};
	
	
	var imgarr = ['b1.png','b2.png','b3.png','b4.png','b5.png','b6.png','b7.png','b8.png','b9.png','b10.png','b11.png','b12.png'];
	$('.banner2>img').attr('src', ' ');
	switch(_hash){
		case "#jichu":
			$('.aui-title').html('基础护理');
		    $('.banner2>img').attr('src','dist/imgs/b7.png');
		    getItems('0188');
			break;
		case "#xiz":
			$('.aui-title').html('卸妆专区');
		    $('.banner2>img').attr('src','dist/imgs/b11.png');
		    getItems('0388,0389,0390,0391,0392');
			break;
		case "#mianm":
			$('.aui-title').html('面膜专区');
		    $('.banner2>img').attr('src','dist/imgs/b8.png');
		    getItems('0209');
			break;
		case "#yanbu":
		    $('.aui-title').html('眼部护理');
		    $('.banner2>img').attr('src','dist/imgs/b12.png');
		    getItems('0296');
			break;
		case "#doudou":
			$('.aui-title').html('痘痘护理');
		    $('.banner2>img').attr('src','dist/imgs/b3.png');
		    getItems('0311');
			break;
		case "#chunbu":
			$('.aui-title').html('唇部护理');
		    $('.banner2>img').attr('src','dist/imgs/b2.png');
		    getItems('0304');
			break;
		case "#fangs":
		    $('.aui-title').html('防晒护理');
		    $('.banner2>img').attr('src','dist/imgs/b4.png');
		    getItems('0316');
			break;
		case "#hushou":
		    $('.aui-title').html('护手专区');
		    $('.banner2>img').attr('src','dist/imgs/b5.png');
		    getItems('0349');
			break;
		case "#shenti":
		    $('.aui-title').html('身体护理');
		    $('.banner2>img').attr('src','dist/imgs/b9.png');
		    getItems('0321');
			break;
		case "#sheng":
		    $('.aui-title').html('生活日用');
		    $('.banner2>img').attr('src','dist/imgs/b10.png');
		    getItems('0374');
			break;
		case "#caiz":
		    $('.aui-title').html('彩妆专区');
		    $('.banner2>img').attr('src','dist/imgs/b1.png');
		    getItems('ZLBH0050');
			break;
		case "#huazh":
			$('.aui-title').html('化妆工具');
		    $('.banner2>img').attr('src','dist/imgs/b6.png');
		    getItems('0257');
			break;
	};
})