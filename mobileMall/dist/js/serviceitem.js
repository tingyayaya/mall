/**
 * 
 */
$(function(){
	
    $('.btn-sort').on('click',function(){
        $('.sidebarBox').show();
    });

    $('.navContent li').on('click',function(){
        /*字体*/
        $('.navContent li').find('a').css('color','#6d6d6d');
        $(this).find('a').css('color','#3ab373');
        $('.sidebarBox').hide();
    });

    $('.bgdiv').on('click',function(){
        $('.sidebarBox').hide();
    });
    
    
    /*项目分类*/
    function getcags(){
    	$('.sidebar .navContent').html('<li><a href="serviceitem.html">全部</a></li>');
        var mydata = {
            type:'serviceitem',
            func:'cags',
            SHID:sessionStorage.SHID,
            token:sessionStorage.token,
            sessionId:sessionStorage.sId,
            curPage:1,
            pageSize:'20'
        };
        mydata = JSON.stringify(mydata);
        //console.log(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
               //console.log(data);
                if(data.rs==100){
                    var items = data.list;
                    var content = '';
                    for(var i=0; i<items.length;i++){
                        var item = items[i];
                        content += '<li><a href="serviceitem.html?cag='+item.id+'">'+item.name+'</a></li>';
                    }       
                    $('.sidebar .navContent').append(content);
                }
            }
        });
    }
    getcags();
    
    var params = getQueryString();
    var cag = (params.cag == undefined || params.cag == null)?'':params.cag;
	
	/*项目列表*/
    function getlist(page, skey, cag){
    	$('.aui-list').html('');
        var mydata = {
            type:'serviceitem',
            func:'list',
            SHID:sessionStorage.SHID,
            token:sessionStorage.token,
            sessionId:sessionStorage.sId,
            curPage:page,
            pageSize:'20',
            searchkey: skey,
            cag: cag
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
              // console.log(data);
                if(data.rs==100){
                    var items = data.list;
                    var content = '';
                    for(var i=0; i<items.length;i++){
                        var item = items[i];
                        content += '<li class="aui-list-item aui-list-item-middle" onclick="window.location.href=\'servicedetail.html?id='+item.id+'\'">\
                        	<div class="aui-media-list-item-inner">\
                            <div class="aui-list-item-media" style="width: 5rem;">\
                                <img src="'+(item.img == ''?'dist/imgs/small1.jpg':item.img)+'">\
                            </div>\
                            <div class="aui-list-item-inner">\
                                <div class="aui-list-item-text">\
                                    <div class="aui-list-item-title aui-font-size-14">'+item.name+'</div>\
                                </div>\
                                <div class="aui-list-item-text ">\
                                    <span class="font-obvious-b"> ¥'+item.price+'</span>\
                                    <span>已售:'+item.total+'</span>\
                                </div>\
                            </div>\
                        </div>\
                    </li>';
                    }       
                    $('.aui-list').append(content);
                }
            }
        });
    }
    getlist(1, '', cag);
    
    $('.aui-icon-search').on('click',function(){
        var keywords = $('#search-input').val();
        getlist(1, keywords, cag);
    });

    
    $('#search-input').keydown(function(event){
        if(event.keyCode == 13){  //绑定回车
            var keywords = $('#search-input').val();      
            getlist(1, keywords, cag);          
        }
        return;
    });
    
})