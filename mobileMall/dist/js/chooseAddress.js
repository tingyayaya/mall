/**
 * Created by chenksoft on 2017/5/11.
 */

$(function(){

    /*获取URL参数*/

    function GetQueryString(url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/, reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, arr_url = reg_url.exec(url), ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }

    var linkURL, params;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = GetQueryString(linkURL);



    $('.btn-add-address').on('click',function(){
        window.location.href='addAddress.html';
    });
    $('#listaddress').html('');
    function list(){
        var mydata = {
            type:'address',
            func:'list',
            sessionId:sessionStorage.sId
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
                        content += '<div class="aui-card-list chooseItem"  id="'+item.skf2970+'">\
                            <div class="aui-card-list-header aui-card-list-user aui-border-b">\
                        <div class="aui-card-list-user-name">\
                            <div>'+item.skf2972+'</div>\
                            <small>'+item.skf2974+'</small>\
                        </div>\
                        <div class="aui-card-list-user-info">\
                          '+item.skf3967+'\
                        </div>\
                    </div>\
                </div>';
                    }
                    $('#listaddress').html(content);
                }else{
                    $('.shopcartNo').removeClass('hide');
                }
            }
        });
    }
    list();


    /*判断是否是选择地址*/
    if(params.type){
        $(document).on('click','.chooseItem',function(){
            var addId,name,address,phone;
            addId = $(this).attr('id');

            name = $(this).find('.aui-card-list-user-name').children('div').html();
            address = $(this).find('.aui-card-list-user-info').html();
            address = Trim(address);
            phone = $(this).find('.aui-card-list-user-name').children('small').html();
            var mydata = {
                type:'chooseone',
                ch_num:params.ch_num,
                ch_product:params.ch_product,
                ch_addressid:addId,
                ch_name:name,
                ch_address:address,
                ch_phone:phone
            };
            var s='';
            for (var Key in mydata){
                s =s+'&'+''+Key+'='+mydata[Key];
            }
            window.location.href = 'toOrder.html?'+s;
        })
    }

    function Trim(str)
    {
        return str.replace(/\s/g, "");
    }
});