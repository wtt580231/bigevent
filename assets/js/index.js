$(function() {
    getUserInfo()

    // var layer = layui.layer
    // $('#btnLogout').on('click', function() {
    //     // 提示用户是否确认退出
    //     layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
    //         //do something
    //         // 1. 清空本地存储中的 token
    //         localStorage.removeItem('token')
    //             // 2. 重新跳转到登录页面
    //         location.href = '/login.html'

    //         // 关闭 confirm 询问框
    //         layer.close(index)
    //     })
    // })


    var layer = layui.layer
    $('#btnLogout').on('click', function() {

        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1 清空本地存储中的token
            localStorage.removeItem('token')
                // 2  重新跳转到登录页面
            location.href = '/login.html'
                // 关闭confirm 询问框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);

            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)

        },
        complete: function(res) {
            // console.log('执行了 complete 回调：')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })
}



// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
        // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show() // attr 设置属性
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}