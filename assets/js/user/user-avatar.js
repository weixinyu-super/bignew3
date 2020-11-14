$(function () {
    let $img = $("#img")
    let option = {
        aspectRatio: 1, // 裁切比例 纵横比
        // 设置预览的区域
        preview: '.avatar-img'
    }
    $img.cropper(option);

    $('.btn-up').on('click',function () {
        $('#avatar').click();
    })
    $("#avatar").on('change',function () {
        let img = this.files[0]

        let imgUrl = URL.createObjectURL(img);

        $img.cropper('replace',imgUrl)
    })

    $(".btn-sure").on('click',function () {
        let imgData = $img.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
          })
          .toDataURL() 
          $.ajax({
              type: 'post',
              url: '/my/update/avatar',
              data: {
                  avatar: imgData
              },
              success: function (res) {
                if (res.status == 0) {
                    parent.window.getUserinfo();
                }
              }
          })
    })
})