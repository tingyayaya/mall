/**
 * Created by chenksoft on 2017/10/10.
 */



/*提示*/

apiready = function(){
    api.parseTapmode();
};
var toast = new auiToast({
});


function addcart(){
    toast.success({
                    title:"添加成功",
                    duration:2000
                });
}


$(function(){
	
	function list(){
        $('#list').html('');
        var mydata = {
            type:'usercenter',
            func:'listcollect',
            openid:sessionStorage.openId
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
               console.log(data);
                if(data.rs==100){
                        var items = data.list;
                        var content = '';
                        for(var i=0; i<items.length;i++){
                                var item = items[i];
                                
                             content += '<div class="aui-card-list aui-margin-b-0 aui-padded-l-2 product-list" onclick="window.location.href=\'shopdetail.html?_='+Math.random()+'&v=mycollect&productId='+item.productID+'\'">\
                                 <div class="product-img-div">\
                             <img src="'+item.images+'" alt="">\
                         </div>\
                         <div class=" aui-border-b aui-pull-left product-text-div">\
                            <p>'+item.productName+'</p>\
                            <div class="card-footer">RMB <span class="product-price">'+item.ordinarysale+'</span><span class="product-yuanlai">RMB'+item.retail+'</span></div>\
                            <img src="dist/imgs/jumpcart.png" alt="" class="jumpcart" onclick="addcart()">\
                         </div>\
                     </div>';   
                         }
                    $('#list').html(content);
                }else{
                    $('.shopcartNo').removeClass('hide');
                }
            }
        });
    }
    list();
	
});