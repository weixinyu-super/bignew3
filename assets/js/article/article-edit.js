$(function () {
  // 富文本编辑器
  initEditor();

  // cropper初始化
  $img = $("#image");
  let option = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };
  $img.cropper(option);

  // 分类渲染
  let form = layui.form;
  $.ajax({
    type: "get",
    url: "/my/article/cates",
    success: function (res) {
      // console.log(res);
      if (res.status == 0) {
        let category = template("addcategory", res);
        $("#addCategory").html(category);
        form.render();
        ready();
      }
    },
  });

  let articleId = location.search.slice(4);
  // console.log(articleId);
  // 内容渲染
  function ready() {
    $.ajax({
      type: "get",
      url: "/my/article/" + articleId,
      success: function (res) {
        if (res.status == 0) {
          layui.form.val("myform", {
            Id: res.data.Id,
            title: res.data.title,
            cate_id: res.data.cate_id,
          });

          // 富文本编辑中的数据需要单独来渲染
          tinyMCE.activeEditor.setContent(res.data.content);
          // 渲染图片
          $("#image")
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src","http://ajax.frontend.itheima.net" + res.data.cover_img) // 重新设置图片路径
            .cropper(option);
        }
      },
    });
  }

  // 添加图片
  $(".btn-upload").on("click", function () {
    $("#avatar").click();
  });
  $("#avatar").on("change", function () {
    let avatar = this.files[0];

    let imgUrl = URL.createObjectURL(avatar);

    $img.cropper("replace", imgUrl);
  });

  // 发布或者存草稿
  $(".myform").on("click", ".btn", function (e) {
    e.preventDefault();

    let avatarData = new FormData($(".myform")[0]);

    avatarData.append("content", tinyMCE.activeEditor.getContent());

    if ($(this).hasClass("btn-release")) {
      // 发布
      avatarData.append("state", "已发布");
    } else {
      // 草稿
      avatarData.append("state", "草稿");
    }

    $img
      .cropper("getCroppedCanvas", {
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        avatarData.append("cover_img", blob);

        $.ajax({
          type: "post",
          url: "/my/article/add",
          data: avatarData,
          processData: false, // jQuery不要去处理发送的数据
          contentType: false, // jQuery不要去设置Content-Type请求头
          success: function (res) {
            if (res.status == 0) {
              window.location.href = "./article-list.html";
            }
          },
        });
      });
  });
});
