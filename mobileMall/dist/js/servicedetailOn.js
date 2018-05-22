/**
 * Created by chenksoft on 2017/5/27.
 */

$(function(){

    function getDetail(){
        var mydata = {
            type:'serviceitem',
            func:'cags',
            sessionId:sessionStorage.sId,
            curPage:1,
            pageSize:'20'
        };
        mydata = JSON.stringify(mydata);
        $.ajax({
            type:'post',
            url:'apidata.php',
            data:{data:mydata},
            success:function(data){
                console.log(data);
            }
        })
    }
    getDetail();
});

