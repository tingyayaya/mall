/**
 * Created by chenksoft on 2017/4/21.
 */
$(function(){



    /*省市区三级*/
    var area = new LArea();
    area.init({
        'trigger': '#city', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#value', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'name',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'data': LAreaData //数据源
    });

    /*添加地址*/
    $('.btn-save').on('click',function(){
    	
       var username,addressdetail,phonenum,city,sum,idcard;
       username = $('#username');
       phonenum = $('#phonenum');
       idcard = $('#idcard');
       city = $('#city');
       addressdetail = $('#addresslast');
       //var isdefault = ($('#isdefault').prop('checked'))?1:0;
       var values = $('#value').val().split(',');
   	   var cityval = $(city).val().replace(/,/g, '');
    	
       sum = checkname(username)&&checkphonenum(phonenum)&&checkcity(city)&&checkaddressdetail(addressdetail)&&checkidcard(idcard);
       if(sum){
        	
        	var mydata = {
                type:'address',
                func:'add',
                openid:sessionStorage.openId,
                skf2972: $(username).val(),
                skf2973: $(addressdetail).val(),
                skf2974: $(phonenum).val(),
                skf3967: cityval+$(addressdetail).val(),
                //skf2991: isdefault,
                skf3964: values[0],
                skf3965: values[1],
                skf3966: values[2],
                skf3839: idcard.val()
            };
                mydata = JSON.stringify(mydata);
                $.ajax({
                    type:'post',
                    url:'apidata.php',
                    data:{data:mydata},
                    success:function(data){
                        if(data.rs==100){
                        	showDefault('success');
                        	 var t = setTimeout(function(){
                             	window.location.href='addressList.html'+location.search+'&t='+Math.random();
                             }, 1000);
                        } else {
                        	showDefault('fail');
                        }
                    },
                    error: function(){
                    	showDefault('fail');
                    }
                });

        }

    });


    /*表单验证*/
    function checkname(e){
        var content;
        var val = e.val();
        if(val==''){
            content = '请填写姓名';
            showDefault('custom',content);
            return false;
        }else {
            return true;
        }

    }

    function checkcity(e){
        var content;
        var val = e.val();
        if(val==''){
            content = '请选择所在地区';
            showDefault('custom',content);
            return false;
        }else {
            return true;
        }

    }

    function checkaddressdetail(e){
        var content;
        var val = e.val();
        if(val==''){
            content = '请填写详细地址';
            showDefault('custom',content);
            return false;
        }else {
            return true;
        }
    }

    function checkphonenum(e){
        var content;
        var phone = e.val();
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(phone == ''){
            content = '手机号码不能为空';
            showDefault('custom',content);
            return false;
        }else if(phone.length !=11){
            content = '请输入有效的手机号码';
            showDefault('custom',content);
            return false;
        }else if(!myreg.test(phone)){
            content = '请输入有效的手机号码';
            showDefault('custom',content);
            return false;
        }else{
            return true;
        }
    }

    /*身份证*/
    function checkidcard(e){
        var value = e.val();
        var message = e.siblings('.error');
        var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(value == ''){
            toast.fail({
                title: "身份证不能为空",
                duration: 2000
            });
            return false;
        }else if(!myreg.test(value)){
            toast.fail({
                title: "请输入正确的身份证",
                duration: 2000
            });
            return false;
        }else {
            message.html("");
            return true;
        }
    }

    /*提示*/
    apiready = function(){
        api.parseTapmode();
    };
    var toast = new auiToast({
    });
    function showDefault(type,content){
        switch (type) {
            case "success":
                toast.success({
                    title:"添加成功",
                    duration:2000
                });
                break;
            case "fail":
                toast.fail({
                    title:"添加失败",
                    duration:2000
                });
                break;
            case "custom":
                toast.custom({
                    title:content,
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
