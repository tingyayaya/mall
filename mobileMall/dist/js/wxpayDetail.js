/**
 * Created by chenksoft on 2017/6/29.
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

    var linkURL, params,linkSearch;
    linkURL = window.location.href;
    linkURL = decodeURI(linkURL);
    params = GetQueryString(linkURL);

  /*  console.log(params.fare);
    console.log(params.weight);
    console.log(params.total);
    console.log(params.price);*/

    if(params.fare==0){
        $('.payFare').html('包邮');
        $('.payTotal').html(params.total+'元');

    }else{

        $('.payFare').html(params.fare+'元');
        $('.payTotal').html(params.total+'元');

    }

    $('.payweight').html(parseFloat(params.weight)/1000+'kg');
    $('.payMoney').html(params.price+'元');


});