$(function () {
    function getCetagory() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status == 0) {
                    let imgStr = template('addCategory',res);
                    $('tbody').html(imgStr);
                }
            }
        })

    }
    getCetagory();

    // 点击弹框出现
    var index;
    $(".btn-add").on('click',function () {
        index = layer.open({
            type: 1,
            content: $('#addBounced').html(),
            title: '添加文章分类',
            area: '500px',
            // closeBtn: 0
          });
    })

    // 验证输入的数据
    let form = layui.form;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
          if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return '用户名不能有特殊字符'
          }
          if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return '用户名首尾不能出现下划线\'_\''
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
        }
        
    })

    // 添加类别
    $('body').on('submit','.addform' ,function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 0) {
                    layer.close(index);
                    getCetagory();
                }
            }
        })
    })
    
    // 实现删除
    $('tbody').on('click','.btn-del', function () {
        let categoryId = $(this).data('id');
        layer.confirm('是否真的要删除此分类吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + categoryId,
                success: function (res) {
                    if (res.status == 0) {
                        getCetagory();
                    }
                }
            })

            layer.close(index);
          });
    })

    // 点击编辑——弹框
    let edit;
    $('tbody').on('click','.btn-edit', function () {
        let editId = $(this).data('id');

        edit = layer.open({
            type: 1,
            content: $('#editform').html(),
            title: '更新文章分类',
            area: '520px',
            // closeBtn: 0
          });
        
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + editId,
            success: function (res) {
                if (res.status == 0) {
                    layui.form.val('editform',res.data)
                }
            }
        })
    })

    // 确认修改
    $('body').on('submit','.editform', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status == 0) {
                    getCetagory();
                    layer.close(edit);
                }
            }
        })
    })

})