/**
 * Created by chenksoft on 2017/5/10.
 */
/**
 * Created by chenksoft on 2017/5/9.
 */

$(function(){

    /*验证手机号码*/
    function checkphone(e){

        var phone=e.val();
        var message = e.siblings(".error");
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        /*var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;*/

        if(myreg.test(phone)){
            return true;
        }

    }

    $(".phone-Old").keyup(function(){
        var e= $(this);

        if(checkphone(e)){
            $('.btn-code-old').removeClass('aui-label-primary').addClass('aui-label-info');
        }else{
            $('.btn-code-old').removeClass('aui-label-info').addClass('aui-label-primary');
        }
    });

    $(".phone-New").keyup(function(){
        var e= $(this);
        if(checkphone(e)){
            $('.btn-code-new').removeClass('aui-label-primary').addClass('aui-label-info');
        }else{
            $('.btn-code-new').removeClass('aui-label-info').addClass('aui-label-primary');
        }
    });

    $('.user-old').find('.btn-code-old').on('click',function(){
        var mydata = {
            type:'login',
            func:'sendSMS',
            phone:$(".phone-Old").val(),
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
                    var s=60,t;
                    $('.btn-code-old').removeClass('aui-label-info').addClass('aui-label-primary');

                    t = setInterval(function(){
                        s--;
                        $('.btn-code-old').html(s+'s');

                        if(s<0){
                            clearInterval(t);
                            $('.btn-code-old').removeClass('aui-label-primary').addClass('aui-label-info');
                            $('.btn-code-old').html('重新发送');
                        }

                    },1000);
                }
            }
        })
    });

    $('.user-New').find('.btn-code-new').on('click',function(){
        var mydata = {
            type:'login',
            func:'sendSMS',
            phone:$(".phone-New").val(),
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
                    $('.btn-code-new').removeClass('aui-label-info').addClass('aui-label-primary');

                    t = setInterval(function(){
                        s--;
                        $('.btn-code-new').html(s+'s');

                        if(s<0){
                            clearInterval(t);
                            $('.btn-code-new').removeClass('aui-label-primary').addClass('aui-label-info');
                            $('.btn-code-new').html('重新发送');
                        }

                    },1000);
                }
            }
        })
    });

    $('.btn-yes').on('click',function(){
        var newPhone,oldPhone,newCode,oldCode;

        newPhone = $('.phone-New').val();
        oldPhone = $('.phone-Old').val();
        newCode = $('.code-New').val();
        oldCode = $('.code-Old').val();

        var mydata = {
            type:'usercenter',
            func:'resetphonebyuser',
            sessionId:sessionStorage.sId,
            phone:oldPhone,
            SMSCode:oldCode,
            newphone:newPhone,
            newSMSCode:newCode
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
                    toast.success({
                        title:"修改成功",
                        duration:2000
                    });
                    var t = setInterval(function(){window.location.href = 'personalcenter.html'},2000)
                }else if(data.rs==102){
                    toast.fail({
                        title:"请填写完整",
                        duration:2000
                    });
                }else if(data.rs==115){
                    toast.fail({
                        title:"验证码不正确",
                        duration:2000
                    });
                }else if(data.rs==103){
                    toast.fail({
                        title:"新手机号码已绑定过",
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