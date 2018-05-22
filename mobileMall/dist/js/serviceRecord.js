/**
 * Created by chenksoft on 2017/4/26.
 */
$(function(){
	
	var getStatus = function(status){
		var str = '';
		switch (status) {
		case '0':
			str = '已预约'; 
			break;
		case '1':
			str = '等待中'; 
			break;
		case '2':
			str = '正在服务'; 
			break;
		case '3':
			str = '服务结束'; 
			break;
		case '4':
			str = '已取消'; 
			break;	
		default:
			break;
		}
		return str;
	};
	
    $(document).on('click','.products',function(){
    	var id = $(this).attr('data-id');
        window.location.href='servicedetailOn.html?id='+id;
    });
    
    $('#recordlist').html('');
    var page = 1;
    
    function getlist(openid, curpage){	
    	page ++;
        var mydata = {
            type:'servicerecord',
            func:'list',
            /*SHID:sessionStorage.SHID,
             token:sessionStorage.token,
             sessionId:sessionStorage.sId*/
            token:'1d28f53a0ac9ec00ea39e6d3799c751d8a64c7b3',
            sessionId:'ec155d757e1cb14682f715f8c410a8c8',
            SHID:'BH00082',
            curPage: curpage,
            pageSize:'20',
            openid: openid
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
                        var itemimg = 'dist/imgs/large1.jpg';
                        if(item.img != null){
                        	itemimg = item.img;
                        }
                        
                        content += '<div class="aui-card-list">\
                            <div class="aui-card-list-header aui-card-list-user aui-border-b">\
                        <div class="aui-card-list-user-name">\
                            <div>'+getStatus(item.skf2933)+'</div>\
                            <small>'+item.sf_last_change_time+'</small>\
                        </div>\
                    </div>\
                    <div class="aui-card-list-content-padded clearfix products" data-id="'+item.skf2928+'">\
                        <div class="product-imgs">\
                            <img src="'+itemimg+'" alt="">\
                        </div>\
                        <div class="product-names">\
                           '+item.skf4033+'\
                        </div>\
                        <span class="aui-font-size-14" style="margin-left:10px;">¥'+item.skf421+'</span>\
                        <div class="font-light-a pull-right aui-font-size-14">X<span>1</span></div>\
                    </div>\
                </div>';
                    }       
                    $('#recordlist').append(content);
                }
            }
        });
    }
    getlist('', page);
    
    
	    var scroll = new auiScroll({
	        listen:false,
	        distance:60 //判断到达底部的距离，isToBottom为true
	    },function(ret){
	    	setTimeout(function(){
		        if(ret.isToBottom){
		            console.log("已到达底部");            
		            getlist('', page); 
		        } else{
		           // console.log("滚动高度："+ret.scrollTop);
		        }
	    	}, 3000);
	    });
  
    
});