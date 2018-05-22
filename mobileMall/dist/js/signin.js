/**
 * Created by chenksoft on 2017/4/26.
 */
$(function(){


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



    /*验证手机号码*/
    function checkphone(e){

        var phone=e.val();
        var message = e.siblings(".error");
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        /*var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;*/

        if(myreg.test(phone)){
            return true;
        }

    }

    $(".phone").keyup(function(){
        var e= $(this);
        if(checkphone(e)){
            $('.btncode').removeClass('aui-label-primary').addClass('aui-label-info');
        }else{
            $('.btncode').removeClass('aui-label-info').addClass('aui-label-primary');
        }
    });

    /*发送验证码*/
    $(document).on('click','.aui-label-info',function(){
        var mydata = {
           type:'login',
           func:'sendSMS',
           phone:$(".phone").val(),
           usertype:'c'
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    toast.success({
                        title:"验证码已发送",
                        duration:2000
                    });

                    var s=60,t;
                    $('.btncode').removeClass('aui-label-info').addClass('aui-label-primary');

                    t = setTimeout(function(){
                        s--;
                        $('.btncode').html(s+'s');

                        if(s<0){
                            clearInterval(t);
                            $('.btncode').removeClass('aui-label-primary').addClass('aui-label-info');
                            $('.btncode').html('重新发送');
                        }

                    },1000);
                }else if(data.rs==409){
                    toast.fail({
                        title:"该用户不存在,去注册",
                        duration:2000
                    });
                    setTimeout('window.location.href="register.html"',1500);
                }
            }
        })
    });

    /*绑定老用户登录*/

    $('.btn-yes').on('click',function(){
        var mydata = {
            type:'login',
            func:'BindAccount',
            openid:localStorage.openId,
            SMSCode:$('.code').val(),
            phone:$('.phone').val()
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
                    //sessionStorage.sId = data.sessionId;
                    toast.success({
                        title:"登陆成功",
                        duration:2000
                    });
                    var t = setInterval(function(){
                        window.location.href = 'personalcenter.html?r='+Math.random();
                    },2000)
                }else if(data.rs==302){
                    toast.fail({
                        title:"密码错误",
                        duration:2000
                    });
                }else if(data.rs==307){
                    toast.fail({
                        title:"手机号错误",
                        duration:2000
                    });
                }else if(data.rs==308){
                    toast.fail({
                        title:"验证码错误",
                        duration:2000
                    });
                }else if(data.rs==309){
                    toast.fail({
                        title:"验证码超时",
                        duration:2000
                    });
                }else if(data.rs==301){
                    toast.fail({
                        title:"请填写正确信息",
                        duration:2000
                    });
                }
            }
        });
    });

/*oneMgwIjWxAmAhqXjY1rZ_ZFqwTE*/
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
                    title:"登录成功",
                    duration:2000
                });
                break;
            case "fail":
                toast.fail({
                    title:"不能在减少啦",
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
