/**
 * Created by chenksoft on 2017/4/25.
 */
$(function(){
    $('.praise-t').on('click',function(){
        $('.praise-t').removeClass('active');
        $(this).addClass('active');
    });

    $('.btn-upup').on('click',function(){
        var text = $('textarea[name=myevaluates]').val();
        if(text){
            showDefault('success');
            var t=setTimeout("window.location.href='Order.html'",700);
        }else{
            showDefault('fail');
        }

    });

    /*提示*/
    apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({
    });
    function showDefault(type){
        switch (type) {
            case "success":
                toast.success({
                    title:"评价完成",
                    duration:2000
                });
                break;
            case "fail":
                toast.fail({
                    title:"要记得填写您的评价哦",
                    duration:2000
                });
                break;
            case "custom":
                toast.custom({
                    title:"您还没有选择商品",
                    html:'<i class="aui-iconfont aui-icon-no"></i>',
                    duration:2000
                });
                break;
            case "loading":
                toast.loading({
                    title:"加载中",
                    duration:2000
                },function(ret){
                    console.log(ret);
                    setTimeout(function(){
                        toast.hide();
                    }, 3000)
                });
                break;
            default:
                // statements_def
                break;
        }
    }
});