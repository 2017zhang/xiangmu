/**
 * Created by titi on 2017/11/21.
 */
angular.module("myApp").controller("articleListCtrl",function ($scope,$rootScope,$http,$filter,$state) {
    $scope.loadtext = "点击加载更多";
    $http({
        method: 'get',
        url: '/a/u/article/list'
    }).then(function success(res) {
        console.log(res)
        $scope.res = res.data;
        $scope.pagetotal = Math.ceil($scope.res.total/$scope.res.size); //总页数
        $scope.page = 1;
        $scope.a = res.data.data; //获取信息列表
        $scope.sum = [];            //摘要内容
        $scope.nowLength = [];      //摘要长度
        $scope.newSummary = [];     //截取后的摘要内容
        console.log($scope.a)
        for (var i = 0; i < $scope.a.length; i++) {
            $scope.sum.push(res.data.data[i].summary);                //存储摘要内容
            $scope.nowLength.push($scope.sum[i].length);                  //存储每项摘要字数
            if ($scope.nowLength[i] > 25) {                                //大于25个字的情况下
                $scope.newSummary[i] = $scope.sum[i].substr(0, 25) + '...';  //截取25个字，并在后面添加...
            } else {
                $scope.newSummary[i] = $scope.sum[i];                     //小于27个字情况下
            }
            $scope.a[i].summary = $scope.newSummary[i];                    //将截取后的摘要赋值给渲染列表
        }
        $scope.dataArray = [];    //存放判断后的时间数组
        for ( var m = 0; m < $scope.a.length; m++){
            var myDate = $scope.a[m].createAt;
            var today = Date.parse(new Date());
            var timegap = Math.ceil((today/1000-myDate/1000)/3600);  //计算文档时间与当前时间的时间差

            if(timegap>24){
                $scope.dataArray[m] = $filter('date')(myDate, 'yyyy-MM-dd');
            }
            else{
                $scope.dataArray[m] = timegap + "小时内"
            }
            $scope.a[m].createAt = $scope.dataArray[m];      //判断后的时间数组赋值给编辑时间数组，按照判断后的结果显示
        }
    });
    $scope.gotoArticle = function (x) {
        $state.go('article', {
            'articleid':x
            }
        )
    };
    $scope.loaded = function () {
        console.log( $scope.a.length);
        $scope.page = $scope.page + 1;
        if ( $scope.page > $scope.pagetotal ){            //判断是否最后一页
            $scope.loadtext = "已经到头了，点击也出不来！"
        }
        else{
            $http({
                method: 'get',
                url: '/a/u/article/list',
                params: {
                    page : $scope.page
                }
            })
                .then(function success(res){
                    $scope.b = res.data.data;
                    $scope.sum = [];            //摘要内容
                    $scope.nowLength = [];      //摘要长度
                    $scope.newSummary = [];     //截取后的摘要内容
                    for (var i = 0; i < $scope.b.length; i++) {
                        $scope.sum.push(res.data.data[i].summary);                //存储摘要内容
                        $scope.nowLength.push($scope.sum[i].length);                  //存储每项摘要字数
                        if ($scope.nowLength[i] > 25) {                                //大于25个字的情况下
                            $scope.newSummary[i] = $scope.sum[i].substr(0, 25) + '...';  //截取25个字，并在后面添加...
                        } else {
                            $scope.newSummary[i] = $scope.sum[i];                     //小于27个字情况下
                        }
                        $scope.b[i].summary = $scope.newSummary[i];                    //将截取后的摘要赋值给渲染列表

                    }
                    $scope.dataArray = [];    //存放判断后的时间数组
                    for ( var m = 0; m < $scope.b.length; m++){
                        var myDate = $scope.b[m].createAt;
                        var today = Date.parse(new Date());
                        var timegap = Math.ceil((today/1000-myDate/1000)/3600);

                        if(timegap>24){
                            $scope.dataArray[m] = $filter('date')(myDate, 'yyyy-MM-dd');
                        }
                        else{
                            $scope.dataArray[m] = timegap + "小时内"
                        }
                        $scope.b[m].createAt = $scope.dataArray[m];
                    }
                    for ( var n = 0; n < $scope.b.length; n++){
                        $scope.a.push($scope.b[n]);   //每次点击获取的数据push进第一次获取数据的数组
                    }
                    console.log($scope.a);
                })
        }
    }
});
