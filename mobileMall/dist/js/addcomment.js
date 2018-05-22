/**
 * Created by chenksoft on 2017/4/21.
 */
$(function(){

	 var linkURL, params;
	    linkURL = window.location.href;
	    linkURL = decodeURI(linkURL);
	    params = getQueryString(linkURL);
	
	
	var getComments = function(xdfh){
		$('.order-list').html('');
		var mydata = {
                type:'Comments',
                func:'list',
                openid:sessionStorage.openId,
                xdfh:params.xdfh
            };
            mydata = JSON.stringify(mydata);
            $.ajax({
                type:'post',
                url:'../data.php',
                data:{data:mydata},
                success:function(data){
                    if(data.rs==100){
                    	var content = '';
                    	var items = data.list;
                    	if(items.length>0){
                    		for(var i=0; i<items.length; i++){
                    			var item = items[i];
                    			var comments = item.comments;
                    			
                    			
                    			content += '<div class="aui-card-list">\
                    		        <div class="aui-card-list-content">\
                                <ul class="aui-list aui-media-list">\
                                    <li class="aui-list-item aui-list-item-middle product-list aui-border-b-light">\
                                        <div class="aui-media-list-item-inner">\
                                            <img src="'+item.images+'" class="pinglun-img">\
                                            <span class="aui-list-item-text pinglun-name">'+item.productName+'</span>\
                                            <input name="productIds[]" type="hidden" value="'+item.productID+'" />\
                                            <input name="ids[]" type="hidden" value="'+item.id+'" />\
                                        </div>\
                                    </li>\
                                    <li class="aui-border-b aui-list-item-inner order-list-end" style="padding-right: 0">';
                    				if(comments.length>0){
                    					for(var k=0; k<comments.length; k++){
                    						var comment = comments[k];
                    						content += '<div><span>'+comment.comment+'</span><span>'+comment.commenttime+'</span></div>';
                    					}
                    				}
                    				if(comments.length < 2){
                    					content += '<div class="clearfix">\
                                            <div class="bar-red"></div>\
                                            <textarea name="comments[]"  class="textarea-pinglun" placeholder="已经用了一段时间了，有更多宝贝使用心得？分享给想买的他们吧"></textarea>\
                                        </div>';
                    				} else {
                    					content += '<div class="clearfix" style="display:none;">\
                                            <div class="bar-red"></div>\
                                            <textarea name="comments[]"  class="textarea-pinglun" placeholder="已经用了一段时间了，有更多宝贝使用心得？分享给想买的他们吧"></textarea>\
                                        </div>';
                    				}
                                    content +='</li>\
                                </ul>\
                            </div>\
                        </div>';
                    			
                    			
                    			
                    		}
                    	}
                    	
                    	$('.order-list').append(content);
                    	
                    } 
                },
                error: function(){
                	
                }
            });
	};
	
	getComments(params.xdfh);

    /*添加评论*/
    $('#h-save').on('click',function(){
    		var comments = $('[name="comments[]"]').serialize();
    		var ids = $('input[name="ids[]"]').serialize();
    		var productIds = $('input[name="productIds[]"]').serialize();
    		console.log(productIds);
        	var mydata = {
                type:'Comments',
                func:'add',
                openId:sessionStorage.openId,
                comments: comments,
                ids: ids,
                productIds: productIds,
                orderid:params.xdfh 
            };
            mydata = JSON.stringify(mydata);
            $.ajax({
                type:'post',
                url:'data.php',  
                dataType: 'json',
                data: 'type=Comments&func=add&orderid='+params.xdfh+'&openId='+sessionStorage.openId+'&'+productIds+'&'+ids+'&'+comments,
                success:function(data){
                    if(data.rs==100){
                    	window.location.href='Order.html?_='+Math.random()+'#all';
                    } 
                },
                error: function(){
                	
                }
            });

    });


    
});
