$(function () {
    function getUserinfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            /* complete: function (res){
                console.log(res);
            }, */
            success: function (res) {
                layer.msg(res.message)
                // console.log(res);
                if (res.status == 0) {
                    $('.welcome').html(`欢迎&nbsp;&nbsp;${res.data.nickname? res.data.nickname:res.data.username}`)
                    if (!res.data.user_pic) {
                        // 如果没有图片
                        if (!res.data.nickname) {
                            // 没有昵称
                            $('.layui-layout-right .log-text,.userinfo .log-text').text(res.data.username.slice(0,1))
                        } else {
                            $('.layui-layout-right .log-text,.userinfo .log-text').text(res.data.nickname.slice(0,1))

                        }
                    } else {
                        $('.layui-nav-img').show().attr('src',res.data.user_pic).prev().hide();
                    }

                }
            }
        })
    }
    getUserinfo();
    window.getUserinfo = getUserinfo;


    $('.logout').on('click', function () {
        layer.confirm('真的要退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            window.localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
          });
    })
})