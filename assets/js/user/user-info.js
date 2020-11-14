$(function () {
    let form = layui.form;

    function getInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                // layer.msg(res.message)
                if (res.status == 0) {
                    form.val('myform',res.data)
                }
            }
        })

    }
    getInfo();

    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          /* if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          } */
        }
      });
      
    $('.myform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    parent.window.getUserinfo();
                }
            }
        })
    })

    $('.myform .layui-btn-primary').on('click', function (e) {
        e.preventDefault();
        getInfo();
    })
})