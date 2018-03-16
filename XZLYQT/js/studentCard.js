/**
 * Created by Administrator on 2018/1/9 0028.
 */
angular.module('myApp')
    .controller("studentCard",function($scope,$state,$http){
        // // 保存id
        // sessionStorage.setItem("userId",55)
        // console.log("保存id")

        var userId = sessionStorage.getItem('userId');
        console.log(userId);
        $http({
            method:'get',
            url:'/a/u/user/'+ userId
        }).then(function successCallback(response){
            $scope.UserParams=response.data.data;
            $scope.params=$scope.UserParams;
            if($scope.UserParams.bean==""){
                $scope.UserParams.bean=0;
                console.log(true)
            }
        });
   //赋值
        console.log($scope.params)
    $scope.StudentCeCk=function(){
        console.log($scope.params)
        if ($scope.params.status == 0) {     //用户已冻结判断
            bootbox.alert({
                message: "账号已冻结！"
            })
        } else {
            console.log("编辑");
            $state.go("studentCompile", {reload: true});
        }
    }
    // 我的收藏
    $scope.stCt=function(){
            console.log($scope.params.status)
            if ($scope.params.status == 0) {     //用户已冻结判断
                bootbox.alert({
                    message: "账号已冻结！",
                })
            } else {
                console.log("收藏")
                $state.go("studentCollect", {reload: true});
                console.log("收藏加一")
            }
        }
        // 账号绑定
    $scope.stBg=function(){
        console.log($scope.params.status)
        if ($scope.params.status == 0) {     //用户已冻结判断
            bootbox.alert({
                message: "账号已冻结！",
            })
        } else {
            console.log("绑定");
            $state.go("binding", {reload: true});
        }
    }
})
.filter('grade',function(){
    return function(text) {
        var retext = ["未选择", "初一", "初二", "初三","高一","高二","高三"];
        return retext[text];
    }
});
