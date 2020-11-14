$(function () {
    let form = layui.form;
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
         repass: function(value) {
             let passval = $('.myform .pass').val();
             if (passval !== value) {
                 $('.myform .repass, .myform .pass').val('')
                 return '两次输入的密码不一致，请重新输入';
             }
             if ($(".myform input[name=oldPwd]").val() === value) {
                $('.myform .repass, .myform .pass').val('')
                return '新密码不能和旧密码一致，请重新输入';
             }
         }
      });      
})

$('.myform').on('submit',function (e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            layer.msg(res.message)
            
        }
    })
})