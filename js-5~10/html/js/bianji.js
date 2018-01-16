app.controller('mybianji', function($timeout,$scope,$http,$state,$stateParams,$compile,type,industry,FileUploader) {
    $scope.id=parseInt($stateParams.id);
    //引入value
    $scope.addParams = {};
    $scope.type= type;
    $scope.industry= industry;
    console.log($scope.type);

//     富文本
    $scope.config = {};
    $scope.CompleteModel = {
        text: '<p></p>'
    };
// 编辑、新增
    if($stateParams.id!=undefined) {
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/" + $scope.id,
        })
            .then(function successCallback(response) {
                $scope.addParams = response.data.data.article;
                console.log(response.data.data.article)
                $scope.title = $scope.addParams.title;
                $scope.CompleteModel.text= $scope.addParams.content;//服务器返回的addParams.content赋值给CompleteModel.text
                // console.log($scope.addParams.content);
                $scope.concelEdit = function () {
                    alert('取消成功！');
                    $state.go('backstage.list', {
                            page: 1,
                            total: $scope.articleNum,
                        }
                    );
                };
            }, function errorCallback(response) {
                alert("编辑任务，请求服务器失败，请重试！")
            })
    }
// 立即上线、存为草稿
    $scope.upload = function (x) {
    $scope.addParams.content=$scope.CompleteModel.text;//CompleteModel.text赋值给addParams.content
        console.log($scope.addParams.url);
        $scope.addParams.status = x;
        console.log($scope.addParams);
        if ($scope.addParams.id !== undefined) {
            $http({
                method: 'put',
                url: '/carrots-admin-ajax/a/u/article/' + $scope.addParams.id,
                params: $scope.addParams,
            }).then(function successCallback(response) {
                if(response.data.code===-100000){
                    alert("请登录账号！")
                }else{
                    if(response.data.code===0){
                        $state.go('backstage.list', { //向url传递page。
                            page: 1,
                        }, {reload: true});
                        alert("修改成功！");
                    }else{
                        console.log(response);
                        alert("出现错误！")
                    }
                }

            }, function errorCallback(response) {
                alert("请求服务器失败，请重试！")
            });
        } else {
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article',
                params : $scope.addParams,
            }).then(function successCallback(response) {
                if(response.data.code===-100000){
                    alert("请登录账号！")
                }else{
                    if(response.data.code===0){
                        $state.go('backstage.list', { //向url传递page。
                            page: 1,
                        }, {reload: true});
                        alert("新增成功！");

                    }else{
                        console.log(response);
                        alert("出现错误！")
                    }
                }

            }, function errorCallback(response) {
                alert("请求服务器失败，请重试！")
            });
        }
    }
    $scope.cancel=function(){
        r=confirm("确定放弃正在编辑的内容吗？")
        if (r==true) {
            $state.go("backstage.list",{ //向url传递page。
                page: 1,
            })
        }
    }
});
