/**
 * Created by titi on 2017/11/23.
 */
angular.module("myApp").controller("articleCtrl",function ($scope,$http,$timeout,$filter,$stateParams,$state,$sce) {
$scope.targetId = $stateParams.articleid;
$scope.colstatus = 0;
$scope.createAt=1511523873*1000;
    var userId = sessionStorage.getItem('userId');
    $http({
        method:"get",
        url:"  /a/u/article/"+$scope.targetId,
        params: {
            targetId :$scope.targetId,
            userId :userId
        }
    })
        .then(function successCallback(res) {
            console.log(res);
            $scope.article = res.data.data;
            $scope.article.content = $sce.trustAsHtml($scope.article.content)
            console.log(!$scope.article.praiseStatus)

            $scope.clickPraise = function () {
                $scope.article.praiseStatus = !$scope.article.praiseStatus;
                if($scope.article.praiseStatus == true){
                    $scope.article.praise = $scope.article.praise+1;
                }
                else{
                    $scope.article.praise = $scope.article.praise-1;
                }
                $scope.praisestatus = Number($scope.article.praiseStatus);
                console.log($scope.praisestatus)
                $http({
                    method:"put",
                    url:" /a/u/collect-like/"+$scope.targetId,
                    params:{
                        targetId :$scope.targetId,
                        userId :userId,
                        status: $scope.praisestatus,
                        targetType:1,
                        relationType:1
                    }
                })
            };
            $scope.clickCollect = function () {
                $scope.article.collectionStatus = !$scope.article.collectionStatus;
                $scope.colstatus = 1;
                if( $scope.article.collectionStatus== true ){
                    $scope.colsuccess = 1;
                    $scope.article.collection = $scope.article.collection+1
                }
                else{
                    $scope.colsuccess = 0;
                    $scope.article.collection = $scope.article.collection-1;
                }
                $scope.collection = Number($scope.article.collectionStatus);
                $timeout.cancel($scope.coldispear);
                $scope.coldispear = $timeout(function () {
                    $scope.colstatus = 0;
                },3000)
                $http({
                    method:"put",
                    url:" /a/u/collect-like/"+$scope.targetId,
                    params:{
                        targetId :$scope.targetId,
                        userId :userId,
                        status: $scope.collection,
                        targetType:1,
                        relationType:2
                    }
                })
            };
        })
});