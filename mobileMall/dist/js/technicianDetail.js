/**
 * 
 */
$(function(){

	var params = getQueryString();
    var id = params.id;
	
	
	var getItem = function(techid){
		
    	$('.tech-img').attr('src', 'dist/imgs/hotgoods.png>');
    	$('.tech-name').html('');
    	$('.tech-level').html('');
    	$('.tech-remark').html('');
    	
        var mydata = {
            type:'techniciandetail',
            func:'item',
            /*SHID:sessionStorage.SHID,
             token:sessionStorage.token,
             sessionId:sessionStorage.sId*/
            token:'1d28f53a0ac9ec00ea39e6d3799c751d8a64c7b3',
            sessionId:'ec155d757e1cb14682f715f8c410a8c8',
            SHID:'BH00082',
            curPage:1,
            pageSize:'20',
            itemid: techid
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
                if(data.rs==100){
                    var item = data.item;
                    $('.tech-name').html(item.skf4032);
                	$('.tech-level').html(item.levelname);
                	$('.tech-remark').html(item.skf153);

                }
            }
        });
    }
	
	
	getItem(id);
	
});

