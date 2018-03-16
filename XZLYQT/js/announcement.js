/**
 * Created by titi on 2017/11/20.
 */
angular.module("myApp").controller("announceCtrl",function ($scope,$rootScope,$http,$state) {

    $http({
        method:"get",
        url:" /a/u/notice"
    })
        .then(function successCallback(res){
           console.log(res.data.total);
            if(res.data.total == 0){ //若通告内容为空，显示近期无通告
               $scope.anshow = true;
               $scope.announcementinner = "近期无公告，欢迎随时来看！"
            }
            else{
                $scope.anshow = false; //若通告内容不为空，则渲染通告内容
                $scope.announcement = res.data.data;
            }

        });
    $scope.announceClose = function ( ) { //点击关闭通告页面跳转至主页
        $rootScope.x=true;        //点击后显示学生卡和签到图标。
        $state.go("background")
    };
});