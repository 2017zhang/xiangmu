/**
 * Created by Administrator on 2017/12/4 0004.
 */
angular.module("myApp").controller("binding",function($scope,$state,$http){
    $scope.UserParams={};
    $scope.UserParams.userId=JSON.parse(sessionStorage.getItem('userId'))
    // 获取用户绑定信息

    $http({
        method:'get',
        url:'/a/u/user/'+$scope.UserParams.userId
    }).then(function success(response){
        $scope.UserParams=response.data.data;
        console.log(response.data.data)
        console.log($scope.UserParams.phone)
        console.log($scope.UserParams.mail)
        // $scope.a=res.data.signMessage[0];
        // $scope.newPhone=$scope.a.phone;
        // console.log($scope.newPhone);
    });
    $scope.enmPeBgBdJp= function(){
        console.log("绑定");
        $state.go("emlPhoneBinding",{reload:true});
    }
})