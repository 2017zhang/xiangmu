/**
 * Created by Administrator on 2017/12/19 0019.
 */
angular.module("myApp").controller("collect",function($scope,$rootScope,$state,$http,$filter,$stateParams){


    $scope.targetType=JSON.parse(sessionStorage.getItem('targetType'));
    console.log($scope.targetType);
    $scope.UserParams={};
    $scope.UserParams.userId=JSON.parse(sessionStorage.getItem('userId'));
    $scope.UserParams.relationType=2;   //点赞为1，收藏为2
    // $scope.UserParams.userId=1;
        //---------------- 隐藏显示--------------------
$scope.ctHeardL = function (str) {  //教学楼

    sessionStorage.setItem('targetType',2);
    $scope.UserParams.targetType=str;
    console.log($scope.UserParams);

    $scope.cthHeardLWire = {
        "display": "block",
    }
    $scope.videoBody = {
        "display": "block",
    }
    $scope.cthHeardRWire = {     //右侧隐藏线划线
        "display": "none",
    }
    $scope.articleBody={      //文章内容
        'display':'none',
    }

        //----------------视频----------------------
        //渲染cardList信息
        $http({
            method:'get',
            url:'/a/u/user/collection/video',
            params:$scope.UserParams,
        }) .then (function success(res) {

            console.log(res.data);
            $scope.a=res.data.data;     //获取信息列表
            $scope.sum = [];            //摘要内容
            $scope.nowLength = [];      //摘要长度
            $scope.newSummary = [];     //截取后的摘要内容
            $scope.more = [];           //是否显示“更多/收起”选项
            $scope.status = [];         //点击切换“更多/收起”选项

            var oldDate = [];
            var newDate = Date.parse(new Date());

            var hour = [];

            for (var i=0; i<$scope.a.length; i++) {

                oldDate.push(res.data.data[i].createAt);
                hour[i] = Math.ceil((newDate-oldDate[i])/3600000);
                if( hour[i]<24 ){
                    $scope.a[i].createAt=hour[i]+"小时内";
                } else {
                    var temp = [];
                    temp[i] = new Date(Number(oldDate[i]));
                    $scope.a[i].createAt=temp[i].toLocaleDateString();
                }



                $scope.sum.push(res.data.data[i].summary);                    //存储摘要内容
                $scope.nowLength.push($scope.sum[i].length);                  //存储每项摘要字数
                $scope.status.push(1);                                        //初始“更多”状态
                if ($scope.nowLength[i] > 27){                                //大于27个字的情况下
                    $scope.newSummary[i] = $scope.sum[i].substr(0,27)+'...';  //截取27个字，并在后面添加...
                    $scope.more.push(1);                                      //显示“更多/收起”选项
                } else {
                    $scope.newSummary[i] = $scope.sum[i];                     //小于27个字情况下
                    $scope.more.push(0);                                      //不显示“更多/收起”选项
                }
                $scope.a[i].summary= $scope.newSummary[i];                    //将截取后的摘要赋值给渲染列表
                $scope.a[i].more = $scope.more[i];                            //是否显示“更多/收起”选项
                $scope.a[i].status = $scope.status[i];                        //点击切换“更多/收起”选项
            }

            if (res.data.page==Math.ceil($scope.a.total/10)){
                $scope.morem = 0
            }

            //点击获取信息按钮的次数
            var times = 0;
               var page=1;
            //点击获取更多信息
            $scope.moreMsg = function () {
                times++;
                $scope.UserParams.page=page++;
                console.log($scope.UserParams)
                console.log($scope.UserParams.length);
                $http({
                    method:"get",
                    url:' /a/u/user/collection/video',
                    params:$scope.UserParams,
                }).then (function (res) {
                    console.log(res.data);

                    $scope.b = res.data.data;
                    console.log($scope.b)
                    console.log($scope.b.length);  //data的长度

                    for (var i=0; i<$scope.b.length; i++) {

                        oldDate.push(res.data.data[i].createAt);
                        hour[10*times+i] = Math.ceil((newDate-oldDate[10*times+i])/3600000);
                        if( hour[10*times+i]<24 ){
                            $scope.b[i].createAt=hour[10*times+i]+"小时内";
                        } else {
                            var temp = [];
                            temp[i] = new Date(Number(oldDate[10*times+i]));
                            $scope.b[i].createAt=temp[i].toLocaleDateString();
                        }

                        $scope.sum.push(res.data.data[i].summary);                    //存储摘要内容
                        $scope.nowLength.push($scope.sum[10*times+i]);                  //存储每项摘要字数
                        $scope.status.push(1);                                        //初始“更多”状态
                        if ($scope.nowLength[10*times+i] > 27){                                //大于27个字的情况下
                            $scope.newSummary[10*times+i] = $scope.sum[10*times+i].substr(0,27)+'...';  //截取27个字，并在后面添加...
                            $scope.more.push(1);                                      //显示“更多/收起”选项
                        } else {
                            $scope.newSummary[10*times+i] = $scope.sum[10*times+i];                     //小于27个字情况下
                            $scope.more.push(0);                                      //不显示“更多/收起”选项
                        }
                        $scope.b[i].summary= $scope.newSummary[10*times+i];                    //将截取后的摘要赋值给渲染列表
                        $scope.b[i].more = $scope.more[10*times+i];                            //是否显示“更多/收起”选项
                        $scope.b[i].status = $scope.status[10*times+i];                        //点击切换“更多/收起”选项
                    }

                    console.log("当前页数：" + $scope.UserParams.page)
                    console.log("总条数共页：" + Math.ceil($scope.a.length/10))
                    $scope.a = $scope.a.concat($scope.b);
                    // 判断当前页数等于最大页数时为ture
                    console.log($scope.UserParams.total);
                    if($scope.UserParams.total==undefined){
                        $scope.morem = 0
                    }
                    else {
                        if ($scope.UserParams.page == Math.ceil($scope.a.length / 10)) {
                            $scope.morem = 0
                        }
                    }
                })
            }



        });

    $scope.morem=1;
    console.log($scope.a);

    //点击显示全部摘要
    $scope.show = function (x) {
        $scope.a[x].summary=$scope.sum[x];               //将完整的摘要赋给渲染列表
        $scope.status[x]=0;
        $scope.a[x].status = $scope.status[x];           //显示“收起”
    };

    //点击收起摘要
    $scope.hide = function (x) {
        $scope.a[x].summary=$scope.newSummary[x];        //将截取后的摘要赋给渲染列表
        $scope.status[x]=1;
        $scope.a[x].status = $scope.status[x];           //显示“全部”
    };


    //点击进入详情页
    $scope.goVideo = function (x) {
        console.log("打开视频")
        $state.go('video',{targetId:x});
    };


}

//  ----------------------浏览室-------------------------
$scope.ctHeardR = function (str) {        //  浏览室
    console.log($scope.UserParams);
    $scope.UserParams.targetType=str;
    console.log($scope.UserParams);

    $scope.cthHeardLWire = {     //左侧隐藏线划线
        "display": "none",
    }
    $scope.videoBody = {
        "display": "none",
    }
    $scope.cthHeardRWire = {
        "display": "block",
    }
    $scope.articleBody={      //文章内容
        'display':'block',
    }
    // --------------------获取文章---------------
    $scope.loadtext = "点击加载更多";
    $http({
        method: 'get',
        url: '/a/u/user/collection/article',
        params:$scope.UserParams,
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
            var timegap = Math.ceil((today/1000-myDate/1000)/3600);

            if(timegap>24){
                $scope.dataArray[m] = $filter('date')(myDate, 'yyyy-MM-dd');
            }
            else{
                $scope.dataArray[m] = timegap + "小时内"
            }
            $scope.a[m].createAt = $scope.dataArray[m];
        }
    });
    $scope.gotoArticle = function (x) {
        $state.go('CollectArticle', {
                'articleid':x
            }
        )
    };
    $scope.loaded = function () {
        console.log( $scope.a.length);
        console.log( $scope.page);

        $scope.page = $scope.page + 1;
        console.log( $scope.page);
        console.log( $scope.pagetotal);
        if ( $scope.page > $scope.pagetotal ){
            $scope.loadtext = "已经到头了，点击也出不来！"
        }
        else{
            $http({
                method: 'get',
                url: ' /a/u/user/collection/article',
                params:$scope.UserParams,
                // params: {
                //     page : $scope.page
                // }
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
                        $scope.a.push($scope.b[n]);
                    }
                    console.log($scope.a);


                })
        }
    }

}
    if($scope.targetType == 1){
        $scope.ctHeardR(1);     //加载文章
        console.log("true")
    } else{
        $scope.ctHeardL(2);  // 加载收藏视频
    }


})

