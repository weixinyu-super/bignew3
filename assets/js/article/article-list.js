$(function () {
  // 分类名称渲染
  let form = layui.form;
    $.ajax({
      type: 'get',
      url: '/my/article/cates',      
      success: function (res) {
        // console.log(1);
        if (res.status == 0) {
          let add = template('addcategory',res);
          $('#addCategory').html(add);

          form.render()
        }
      }
    });
  
    // 初始化分页
    function paging(res) {
      // layui.use('laypage', function(){
        var laypage = layui.laypage;
        
        //执行一个laypage实例
        laypage.render({
          elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
          ,count: res.total, //数据总数，从服务端得到
          curr: pagrm.pagenum,
          limit: pagrm.pagesize,
          limits: [2,3,5,10],
          groups: 5,
          layout: ['count','limit','prev','page','next','skip'],
          jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            pagrm.pagenum = obj.curr;
            pagrm.pagesize = obj.limit;
            //首次不执行
            if(!first){
              //do something
              getlist()
            }
          }
        });
      // });
    }

    let pagrm = {
      pagenum: 1,
      pagesize: 3,
      cate_id: '',
      state: ''
    }
    // 列表渲染
    getlist();
    function getlist() {

      $.ajax({
        type: 'get',
        url: '/my/article/list',
        data: pagrm,
        success: function (res) {
          if (res.status == 0) {
            // console.log(1);
            let list = template('addlist',res);
            $('tbody').html(list)

            paging(res);
          }
        }
      })
    }
    

    // 筛选功能
    $('.myform').on('submit', function (e) {
      // console.log(1);
      e.preventDefault();

      pagrm.cate_id = $('#addCategory').val();
      pagrm.state = $('#state').val();
      getlist();
    });

    // 删除功能
    $('tbody').on('click','.btn-del',function () {
      let length = $("tbody .btn-del").length;
      var id = $(this).data('id');
      // console.log(id);
      layer.confirm('真的要删除这一项吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
          type: 'get',
          url: '/my/article/delete/' + id,
          success: function (res) {
            if (res.status == 0) {
              layer.msg(res.message);

              if (length == 1) {
                pagrm.pagenum = pagrm.pagenum == 1? 1: pagrm.pagenum - 1;
              }
              getlist();
            }
          }
        })
        layer.close(index);
      });

    })



})