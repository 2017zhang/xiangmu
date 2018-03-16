/**
 * Created by hasee on 2017/11/13.
 */
var myApp = angular.module('myApp',[]);
myApp.controller('videoCtrl',function ($http,$scope,$timeout,$stateParams,$sce) {

    var userId = sessionStorage.getItem('userId');

    $http({
        method: 'get',
        url: "/a/u/video/" + $stateParams.targetId
        // params: {"userId": 1}
    }).then(function success(res) {
        console.log(res.data);
        $scope.videoMsg = res.data.data;
        console.log($scope.videoMsg);
        //时间戳转化
        var oldDate = $scope.videoMsg.video.createAt;
        var newDate = Date.parse(new Date());

        var hour = Math.ceil((newDate - oldDate) / 3600000);
        if (hour < 24) {
            $scope.videoMsg.video.createAt = hour + "小时内";
        } else {
            var temp = new Date(Number(oldDate));
            $scope.videoMsg.video.createAt=temp.toLocaleDateString();
        }


        //点赞/收藏初始状态
        $scope.like = $scope.videoMsg.praiseStatus;
        $scope.col = $scope.videoMsg.collectStatus;

        $scope.success = true;
        $scope.cancel = true;

        $scope.content = $sce.trustAsHtml($scope.videoMsg.video.content);

    });


    // //点赞
    // $scope.clickLike1 = function () {
    //     $http({
    //         method:"put",
    //         url:"/a/u/collect-like/"+$stateParams.targetId,
    //         params:{
    //             "targetId":$stateParams.targetId,
    //             "userId":4,
    //             "status":1,
    //             "targetType":2,
    //             "relationType":1
    //         }
    //     }) .then(function (res) {
    //         console.log(res.data);
    //         $scope.like = !$scope.like;
    //         $scope.videoMsg.video.praise++;
    //     })
    // };
    //
    // //取消点赞
    // $scope.clickLike2 = function () {
    //     $http({
    //         method:"put",
    //         url:"/a/u/collect-like/"+$stateParams.targetId,
    //         params:{
    //             "targetId":$stateParams.targetId,
    //             "userId":4,
    //             "status":0,
    //             "targetType":2,
    //             "relationType":1
    //         }
    //     }).then(function () {
    //         $scope.like = !$scope.like;
    //         $scope.videoMsg.video.praise--;
    //     })
    //
    // };
    //
    // //收藏
    // $scope.clickCol1 = function () {
    //     $http({
    //         method:"put",
    //         url:"/a/u/collect-like/"+$stateParams.targetId,
    //         params:{
    //             "targetId":$stateParams.targetId,
    //             "userId":4,
    //             "status":1,
    //             "targetType":2,
    //             "relationType":2
    //         }
    //     }) .then(function (res) {
    //         console.log(res);
    //         $scope.col = !$scope.col;
    //         $scope.videoMsg.video.collection++;
    //         $scope.success = false;
    //         $scope.cancel = true;
    //         $timeout.cancel($scope.timer2);
    //
    //         $scope.timer1 = $timeout(function () {
    //             $scope.success = true;
    //         }, 2000);
    //     })
    //
    // };
    //
    // //取消收藏
    // $scope.clickCol2 = function () {
    //     $http({
    //         method:"put",
    //         url:"/a/u/collect-like/"+$stateParams.targetId,
    //         params:{
    //             "targetId":$stateParams.targetId,
    //             "userId":4,
    //             "status":0,
    //             "targetType":2,
    //             "relationType":2
    //         }
    //     }).then(function (res) {
    //         console.log(res.data);
    //         $scope.col = !$scope.col;
    //         $scope.videoMsg.video.collection--;
    //         $scope.cancel = false;
    //         $scope.success = true;
    //         $timeout.cancel($scope.timer1);
    //
    //         $scope.timer2 = $timeout(function () {
    //             $scope.cancel = true;
    //         }, 2000);
    //     })
    // };

    $scope.clickPraise = function () {
        $scope.videoMsg.praiseStatus = !$scope.videoMsg.praiseStatus;
        if($scope.videoMsg.praiseStatus == true){//
            $scope.videoMsg.video.praise = $scope.videoMsg.video.praise+1;
        }
        else{
            $scope.videoMsg.video.praise = $scope.videoMsg.video.praise-1;
        }
        $scope.praisestatus = Number($scope.videoMsg.praiseStatus);
        // console.log($scope.praisestatus)
        $http({
            method:"put",
            url:"/a/u/collect-like/"+$stateParams.targetId,
            params:{
                targetId :$stateParams.targetId,
                userId :userId,
                status: $scope.praisestatus,
                targetType:2,
                relationType:1
            }
        }).then(function (res) {
            console.log(res.data);
        })
    };
    $scope.clickCollect = function () {
        $scope.videoMsg.collectStatus = !$scope.videoMsg.collectStatus;
        $scope.colstatus = 1;
        if( $scope.videoMsg.collectStatus== true ){
            $scope.colsuccess = 1;
            $scope.videoMsg.video.collection = $scope.videoMsg.video.collection+1
        }
        else{
            $scope.colsuccess = 0;
            $scope.videoMsg.video.collection = $scope.videoMsg.video.collection-1;
        }
        $scope.collection = Number($scope.videoMsg.collectStatus);
        $timeout.cancel($scope.coldispear);
        $scope.coldispear = $timeout(function () {
            $scope.colstatus = 0;
        },3000);
        $http({
            method:"put",
            url: "/a/u/collect-like/"+$stateParams.targetId,
            params:{
                targetId :$stateParams.targetId,
                userId :userId,
                status: $scope.collection,
                targetType:2,
                relationType:2
            }
        }) .then (function (res) {
            console.log(res.data)
        })
    };
    
    
    
    
    
    
    
    
    var he = $('.head').height() + 15;
    var vhe = $('video').height();
    $(window).scroll(function(){
        if($("html").scrollTop()>he){
            $('video').css({"position":"fixed","top":"0","left":"0","margin":"0"});
            $(".head").css("margin-bottom" , vhe)
        } else if ($("html").scrollTop()==0){
            $('video').css({"position":"relative"});
            $(".head").css("margin-bottom" ,15)
        }


    });


});



