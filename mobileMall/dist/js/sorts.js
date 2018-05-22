$(function(){
    $('#tab').find('.aui-tab-item ').on('click',function(){
        $('#tab').find('.aui-tab-item span').removeClass('aui-active');
        $(this).find('span').addClass('aui-active');

        var length = $(this).index();
        
        $('.tab-list-1').addClass('hide');
        $('.tab-list-1').eq(length).removeClass('hide');

    })
    
    /*回车绑定*/
    $('input').keydown(function(event){
        if(event.keyCode == 13){
            var content = $(this).val();
            window.location.href='productList.html?type=content&keyWord='+content;
        }
    });
   
    
    var getItems = function(fun){
    	switch (fun) {
		case 'category':
			$('#list1').children().remove();
			break;
		case 'efficacy':
			$('#list2').children().remove();
			break;
		case 'brand':
			$('#list3').children().remove();
			break;	
		default:
			break;
		}
		
        var mydata = {
            type:'Dictionary',
            func: fun,
            sessionId:sessionStorage.sId
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
                	switch (fun) {
            		case 'category':
            			for(var i=0;i<items.length; i++){
                   		 	var item = items[i];
                   		 	//console.log(item);
                   		 	content += '<div class="outline-box" onclick="window.location.href=\'productList.html?type=category&keyWord='+item.name+'\'">'+item.name+'</div>';
            			}
            			$('#list1').append(content);
            			break;
            		case 'efficacy':
            			for(var i=0;i<items.length; i++){
                   		 	var item = items[i];
                   		 	content += '<div class="outline-box" onclick="window.location.href=\'productList.html?type=efficacy&keyWord='+item.name+'\'">'+item.name+'</div>';
            			}
            			$('#list2').append(content);
            			break;
            		case 'brand':
            			for(var i=0;i<items.length; i++){
                   		 	var item = items[i];
                   		 	content += '<div class="out-box" onclick="window.location.href=\'productList.html?type=brand&keyWord='+item.name+'\'">\
                   	        <img src="'+item.icon+'" alt="">\
                   		    </div>';
            			}
            			$('#list3').append(content);
            			break;	
            		default:
            			break;
            		}
                	
                }
            }
        });  
	};
	
	getItems('category');
	getItems('efficacy');
	getItems('brand');
    
});