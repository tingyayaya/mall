$(function(){
    
	
	
	
    var getNews = function(){
		$('#item-list').children().remove();
        var mydata = {
            type:'news',
            func:'list',
            sessionId:sessionStorage.sId
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            data:{data:mydata},
            url:'../data.php',
            success:function(data){
            	
            	//data = JSON.parse(data);
                if(data.rs==100){
                	var list = data.list;
                	var content = '';
                	for(var i=0; i<list.length; i++){
                		 var item = list[i];
                		 var images = item.content;
                		 var imgcontent = '';
                		 //if(images.length>0){
                			// for(var k=0; k<images.length; k++){
                				 imgcontent += '<img src="'+images+'" alt="" style="width:100%;" />';
                			// }
                		// }
                		 content += '<div class="aui-card-list">\
                		        <div class="aui-card-list-header aui-card-list-user aui-border-b" onclick="window.location.href=\'finder-detail.html?id='+item.id+'\'">\
                         <div class="aui-card-list-user-avatar">\
                             <img src="dist/imgs/bozhuia.png" class="aui-img-round" />\
                         </div>\
                         <div class="aui-card-list-user-name aui-list-item-arrow">\
                             <div>博主最爱</div>\
                         </div>\
                     </div>\
                     <div class="aui-card-list-content" onclick="window.location.href=\'finder-detail.html?id='+item.id+'\'">\
                         '+imgcontent+'\
                     </div>\
                     <div class="aui-card-list-header aui-card-list-user aui-border-b">\
                         <div class="aui-card-list-user-name">\
                             <div>'+item.title+'</div>\
                         </div>\
                     </div>\
                     <div class="aui-card-list-footer aui-border-t">\
                         <div><i class="aui-iconfont iconfont icon-find"></i> '+item.viewnum+'</div>\
                         <div>'+item.uptime+'</div>\
                     </div>\
                 </div>';
                	}
                	$('#item-list').append(content);
                }
            }
        });  
	};
	getNews();
});