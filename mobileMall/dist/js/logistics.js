/**
 * Created by chenksoft on 2017/4/20.
 */
$(function(){
    
	 var linkURL, params;
	    linkURL = window.location.href;
	    linkURL = decodeURI(linkURL);
	    params = getQueryString(linkURL);
	    
	    var orderid = params.bid;
	
	    var getinfo = function(oid){
	    	$('.logistics-list').html('');
	    	$('.logistic_company').text('');
     	    $('.logistic_number').text('');
	        var mydata = {
	            type:'Order',
	            func:'getExpress',
	            openid:sessionStorage.openId,
	            XFDH:oid
	        };
	        mydata = JSON.stringify(mydata);
	        $.ajax({
	            type:'post',
	            url:'../data.php',
	            data:{data:mydata},
	            success:function(data){
	               console.log(data);
	               if(data.rs == 100){
	            	   var items = data.list;
	            	   $('.logistic_company').text(data.expname);
	            	   $('.logistic_number').text(data.expid);
	            	   
	            	   if(items && items.length>0){
	            		   var content = '';
	            		   for(var i=0; i<items.length; i++){
	            			   var item = items[i];
			            	   content += ' <li class="aui-list-item list-height">\
		                           <div class="icon-box"><i class="icon-o icon-normal"></i></div>\
		                           <div class="info-box aui-border-b-light">\
		                               <p class="l-list-o">'+item.skf19533+'</p>\
		                               <p class="time-o">'+item.skf19532+'</p>\
		                           </div>\
		                       </li>';
		            	   }
	            		   $('.logistics-list').append(content);
	            	   } else {
	            		   $('.logistics-list').append('<li class="aui-list-item list-height"><span style="font-size:16px;">暂无物流信息</span></li>');
	            	   }
	               } else {
	            	   console.log('error');
	               }
	            },
	            error: function(xhr, status, e){
	            	console.log(e);
	            }
	        })
	    };
		getinfo(orderid);
	    
	function logistics(shipmentnumber){
        var plist;
        $.ajax({
            async:false,
            url: "http://114.215.194.151:8080/st/ddgj",
            type: "get",
            data: {ddh:shipmentnumber,type:'json'},
            dataType:"json",
            success: function(data){
                console.log(data);
                var content = '';
                if(data && data.length>0){
                    plist = data;

                    var len = plist[0].detail;
                    if(len && len.length>0){
                    for (var i=len.length-1; i>=0; i--){
                        if(i==len.length-1){
                            content += ' <li class="aui-list-item list-height">\
                                            <div class="icon-box"><i class="icon-o icon-new"></i></div>\
                                            <div class="info-box aui-border-b-light">\
                                                <p class="l-list-o">'+len[i].scantype+len[i].memo+'</p>\
                                                <p class="time-o">'+len[i].time+'</p>\
                                            </div>\
                                        </li>';
                        }else{

                            content += ' <li class="aui-list-item list-height">\
                                            <div class="icon-box"><i class="icon-o icon-normal"></i></div>\
                                            <div class="info-box aui-border-b-light">\
                                                <p class="l-list-o">'+len[i].scantype+len[i].memo+'</p>\
                                                <p class="time-o">'+len[i].time+'</p>\
                                            </div>\
                                        </li>';
                        }
                    }
                    }
                    $('.logistics-list').append(content);

                }
            }
        });
    }
	//logistics(params.bid);
    //logistics(1);

	//$('#logistic_number').html(params.bid);
	
	
	
	
	
});