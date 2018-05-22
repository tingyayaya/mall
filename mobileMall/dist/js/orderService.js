/**
 * Created by chenksoft on 2017/5/5.
 */
$(function(){

    function checknull(e){
        if(e.val()){
            return true;
        }else{
            content = '请选择时间';
            showDefault('custom',content);
            return false;
        }
    }

    function checkphonenum(e){
        var content;
        var phone = e.val();
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
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

    var params = getQueryString();
    var id = params.itemid;
    var storeid = params.storeid;
    var techid = params.techid;
    
    /*项目列表*/
    function getItemContent(){
    	
        var mydata = {
            type:'servicedetail',
            func:'item',
            token:sessionStorage.token,
            sessionId:sessionStorage.sId,
            curPage:1,
            pageSize:'20',
            itemid: id
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
                if(data.rs==100){
                    var items = data.list;
                    var content = '';
                    var chooseimg = 'dist/imgs/large1.jpg';
                    for(var i=0; i<items.length;i++){
                        var item = items[i];
                        content += '<div class="aui-slide-node bg-dark">\
                            <img src="'+item.img+'" />\
                        </div>';
                        if(i=0){
                        	chooseimg = item.img;
                        }
                    }        
                    var item = data.item;
                    $('.productname').text(item.name);
                    $('.productprice').text(item.price);
                    $('.productimg img').attr('src', chooseimg);

                    var item2 = data.stores;

                    for(var j=0; j<item2.length;j++){

                        if(params.storeid == item2[j].id){
                            $('.storeName').html(item2[j].name);
                        }
                    }
                }
            }
        });
    }
    
    getItemContent();
    
    var addOrder = function(){
    	/*showDefault('loading');*/
    	var orderdate = $('#Time').val();
    	var phone = $('#Phone').val();
    	var mydata = {
                type:'orderService',
                func:'add',
                token:sessionStorage.token,
                sessionId:sessionStorage.sId,
                curPage:1,
                pageSize:'20',
                itemid: id,
                technicianid:  techid,     //技师
                orderdate: orderdate,     //日期
                phone: phone,            //手机
                storeid: storeid         //店铺id
            };
            mydata = JSON.stringify(mydata);
            $.ajax({
                type:'post',
                url:'apidata.php',
                data:{data:mydata},
                success:function(data){
                    console.log(data);
                    if(data.rs==100){
                    	showDefault('success');
                    	/*setTimeout("window.location.href='serviceRecord.html'",1000);*/
                    } else {
                    	showDefault('error');
                    }
                },
                error: function(){
                	showDefault('error');
                }
            });
    };
    

    $('.btnOrder').on('click',function(){
        var flag;
        flag = checknull($('#Time'))+checkphonenum($('#Phone'));
        if(flag){
            addOrder();
        }

    });

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
                    title:"您已成功预约",
                    duration:2000
                });
                break;
            case "fail":
                toast.fail({
                    title:"信息要填写完整哦",
                    duration:2000
                });
                break;
            case "error":
                toast.fail({
                    title:"预约失败",
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