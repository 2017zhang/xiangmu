
app.controller('quit',function($http,$scope,$state){

    //退出
    $scope.quit=function(){
        console.log("点击退出！")
        r=confirm("确定退出当前账号？")
        if (r==true) {
            $http({
                method:"post",
                url:"/carrots-admin-ajax/a/logout"
            })
                .then(function() {
                    $state.go('login', {}, {reload: true});
                })
        }
    }
})
