/**
 * Created by chenksoft on 2017/4/26.
 */
$(function(){

    /*仿ios滚动选择方式*/
    var showBankDom = document.querySelector('#showBank');
    var bankIdDom = document.querySelector('#bankId');
    showBankDom.addEventListener('click', function () {
        var bankId = showBankDom.dataset['id'];
        var bankName = showBankDom.dataset['value'];

        var bankSelect = new IosSelect(1,
            [data],
            {
                container: '.container',
                title: '银行卡选择',
                itemHeight: 50,
                itemShowCount: 3,
                oneLevelId: bankId,
                callback: function (selectOneObj) {
                    bankIdDom.value = selectOneObj.id;
                    showBankDom.innerHTML = selectOneObj.value;
                    showBankDom.dataset['id'] = selectOneObj.id;
                    showBankDom.dataset['value'] = selectOneObj.value;
                }
            });
    });

    /*密码输入框*/
    var $input = $(".fake-box input");
    $("#pwd-input").on("input", function() {
        var pwd = $(this).val().trim();
        for (var i = 0, len = pwd.length; i < len; i++) {
            $input.eq("" + i + "").val(pwd[i]);
        }
        $input.each(function() {
            var index = $(this).index();
            if (index >= len) {
                $(this).val("");
            }
        });
        if (len == 6) {
            //执行其他操作
        }
    });
});


