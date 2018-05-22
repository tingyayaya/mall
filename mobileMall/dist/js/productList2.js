/**
 * Created by chenksoft on 2017/5/3.
 */
/**
 * Created by chenksoft on 2017/4/24.
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
        classifylist($(this).find('a').html());
    });

    $('.bgdiv').on('click',function(){
        $('.sidebarBox').hide();
    });

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

    function judgetype(){
        switch (params.type) {
            case 'hotList':
                hotlist();
                break;
            case 'goodsList':
                break;
            default:
                break;
        }
        if(params.content){
            searchinputlist(params.content);
            $('#search-input').val(params.content);
        }
    }
    judgetype();

    /*点击搜索更多*/
    $(document).on('click','.aui-text-info',function(){
        var content = $('#search-input').val();
        if(content){
            window.location.search='?content='+content;
        }
    });

    /*回车绑定*/
    $('input').keydown(function(event){
        if(event.keyCode == 13){
            var content = $(this).val();
            if(content){
                window.location.search='?content='+content;
            }
        }
    });

    /*热门列表*/
    function hotlist(page){
        var mydata = {
            type:'hotProduct',
            func:'details',
            /*SHID:sessionStorage.SHID,
             token:sessionStorage.token,
             sessionId:sessionStorage.sId*/
            token:'1d28f53a0ac9ec00ea39e6d3799c751d8a64c7b3',
            sessionId:'ec155d757e1cb14682f715f8c410a8c8',
            SHID:'BH00082',
            curPage:page,
            pageSize:'20'
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
            }
        })
    }

    /*搜索内容列表*/
    function searchinputlist(e){
        console.log(e);
    }

    /*分类选择列表*/
    function classifylist(e){
        console.log(e)
    }
});