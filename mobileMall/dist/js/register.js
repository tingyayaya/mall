/**
 * Created by chenksoft on 2017/5/9.
 */

$(function(){

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

    $(document).on('click','.aui-label-info',function(){

        var mydata = {
            type:'login',
            func:'sendSMS',
            phone:$(".phone").val(),
            usertype:'new'
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    var s=60,t;
                    $('.btncode').removeClass('aui-label-info').addClass('aui-label-primary');

                    toast.success({
                        title:"验证码已发送",
                        duration:2000
                    });

                    t = setInterval(function(){
                        s--;
                        $('.btncode').html(s+'s');

                        if(s<0){
                            clearInterval(t);
                            $('.btncode').removeClass('aui-label-primary').addClass('aui-label-info');
                            $('.btncode').html('重新发送');
                        }

                    },1000);
                }else if(data.rs==307){
                    toast.fail({
                        title:"手机号码错误",
                        duration:2000
                    });
                }
            }
        })
    });

    $('.btn-yes').on('click',function(){
        var name,phone,code;
        name = $('.name').val();
        phone = $('.phone').val();
        code = $('.code').val();
        var mydata = {
            type:'login',
            func:'RegUser',
            openid:localStorage.openId,
            phone:phone,
            name:name,
            SMSCode:code
        };
        mydata = JSON.stringify(mydata);
        console.log(mydata);
        $.ajax({
            type:'post',
            url:'../data.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                var t;
                if(data.rs==100){
                    toast.success({
                        title:"注册成功",
                        duration:2000
                    });
                    t = setInterval(function(){ window.location.href='personalcenter.html?r='+Math.random() },2000)
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
        })
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