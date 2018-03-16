/**
 * Created by hasee on 2017/11/2.
 */
var myApp = angular.module('myApp',['ui.bootstrap']);
myApp.controller('videoListCtrl',function ($scope,$http,classCons,subCons,$state) {


    //隐藏科目搜索
    $scope.select1 = true;
    $scope.select2 = true;

    //按钮初始状态
    $scope.isSelected = true;

    $scope.classCons = classCons;
    $scope.subCons = subCons;// 引入constant

    //点击切换隐藏显示状态
    $scope.showClass = function () {
        $scope.select1 = !$scope.select1;
        $scope.select2 = true;
    };
    $scope.showSub = function () {
        $scope.select2 = !$scope.select2;
        $scope.select1 = true;
    };


    //默认显示全部信息时按钮样式
    $scope.temp1 = 0;
    $scope.temp2 = 0;

    //存储搜索状态变量，第一项为科目，第二项为年级
    var subject = 0;
    var grade = 0;

    //点击年级搜索
    $scope.change1 = function (x) {
        $scope.temp1 = x;
        grade = x;
        console.log(subject);
        console.log(grade);
        $http({
            method:'get',
            url:'/a/u/video/list',
            params: {
                "type": 2,
                "subject": subject,
                "gradeId": grade
            }
        }) .then(function (res) {
            $scope.a=res.data.data;

            console.log(res.data);

            if (res.data.page==Math.ceil(res.data.total/10)){
                $scope.morem = 0
            } else {
                $scope.morem = 1
            }

            $scope.sum = [];            //摘要内容
            $scope.nowLength = [];      //摘要长度
            $scope.newSummary = [];     //截取后的摘要内容
            $scope.more = [];           //是否显示“更多/收起”选项
            $scope.status = [];         //点击切换“更多/收起”选项


            var oldDate = [];
            var newDate = Date.parse(new Date());

            var hour = [];

            console.log($scope.a);//a
            for (var i=0; i<$scope.a.length; i++) {

                oldDate.push(res.data.data[i].createAt);
                hour[i] = Math.ceil((newDate - oldDate[i]) / 3600000);
                if (hour[i] < 24) {
                    $scope.a[i].createAt = hour[i] + "小时内";
                } else {
                    var temp = [];
                    temp[i] = new Date(Number(oldDate[i]));
                    $scope.a[i].createAt = temp[i].toLocaleDateString();
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

            //点击获取信息按钮的次数
            var times = 0;


            //点击获取更多信息
            $scope.moreMsg = function () {
                times++;
                $http({
                    method:"get",
                    url:'/a/u/video/list',
                    params:{
                        "type":2,
                        "subject":subject,
                        "gradeId":grade,
                        "page":++res.data.page
                    }
                }).then (function (res) {
                    console.log(res.data);

                    $scope.b = res.data.data;
                    console.log($scope.a);

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
                        $scope.nowLength.push($scope.sum[10*times+i].length);                  //存储每项摘要字数
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


                    $scope.a = $scope.a.concat($scope.b);
                    if (res.data.page==Math.ceil($scope.a.length/10)){
                        $scope.morem = 0
                    }
                })
            }


            })



    };


    //点击科目搜索
    $scope.change2 = function (x) {

        subject=x;
        console.log(subject);
        console.log(grade);
        $scope.temp2 = x;
        $http({
            method:'get',
            url:'/a/u/video/list',
            params: {
                "type": 2,
                "subject": subject,
                "gradeId": grade
            }
        }) .then(function (res) {
            console.log(res.data);
            $scope.a=res.data.data;
            if (res.data.page==Math.ceil(res.data.total/10)){
                $scope.morem = 0
            } else {
                $scope.morem = 1
            }


            $scope.sum = [];            //摘要内容
            $scope.nowLength = [];      //摘要长度
            $scope.newSummary = [];     //截取后的摘要内容
            $scope.more = [];           //是否显示“更多/收起”选项
            $scope.status = [];         //点击切换“更多/收起”选项


            var oldDate = [];
            var newDate = Date.parse(new Date());

            var hour = [];

            console.log($scope.a);
            for (var i=0; i<$scope.a.length; i++) {

                oldDate.push(res.data.data[i].createAt);
                hour[i] = Math.ceil((newDate - oldDate[i]) / 3600000);
                if (hour[i] < 24) {
                    $scope.a[i].createAt = hour[i] + "小时内";
                } else {
                    var temp = [];
                    temp[i] = new Date(Number(oldDate[i]));
                    $scope.a[i].createAt = temp[i].toLocaleDateString();
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

            //点击获取信息按钮的次数
            var times = 0;


            //点击获取更多信息
            $scope.moreMsg = function () {
                times++;
                $http({
                    method:"get",
                    url:'/a/u/video/list',
                    params:{
                        "type":2,
                        "subject":subject,
                        "gradeId":grade,
                        "page":++res.data.page
                    }
                }).then (function (res) {
                    console.log(res.data);

                    $scope.b = res.data.data;
                    console.log($scope.a);

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
                        $scope.nowLength.push($scope.sum[10*times+i].length);                  //存储每项摘要字数
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


                    $scope.a = $scope.a.concat($scope.b);
                    if (res.data.page==Math.ceil($scope.a.length/10)){
                        $scope.morem = 0
                    }
                })
            }
        })
    };

    //轮播图插件
    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [];

    console.log($scope.slides);

    //渲染bannerList信息
    $http({
        method:'get',
        url:'/a/u/video/list',
        params:{
            "type":1,
            "subject":0,
            "gradeId":0
        }
    }).then (function (res) {
        $scope.banner = res.data;
        console.log($scope.banner);

        var num = ($scope.banner.total<=6)?$scope.banner.total:6;
        function addSlide() {
            for (var i=0; i<num; i++){
                $scope.slides.push({
                    image: $scope.banner.data[i].picture,
                    id: $scope.banner.data[i].id,
                    num: i
                });
            }
        }

        addSlide();

        console.log($scope.slides);

    });

    //点击banner图跳转
    $scope.goBanner = function (x) {
        $state.go('video',{targetId:x});
    };

    $scope.a = {};

    //渲染cardList信息
    $http({
        method:'get',
        url:'/a/u/video/list',
        params:{
            "type":2,
            "subject":0,
            "gradeId":0
        }

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

        console.log($scope.a);
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


        //点击获取更多信息
        $scope.moreMsg = function () {
            times++;
            $http({
                method:"get",
                url:'/a/u/video/list',
                params:{
                    "type":2,
                    "subject":subject,
                    "gradeId":grade,
                    "page":++res.data.page
                }
            }).then (function (res) {
                console.log(res.data);

                $scope.b = res.data.data;
                console.log($scope.a);

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
                    $scope.nowLength.push($scope.sum[10*times+i].length);                  //存储每项摘要字数
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


                $scope.a = $scope.a.concat($scope.b);
                if (res.data.page==Math.ceil($scope.a.length/10)){
                    $scope.morem = 0
                }
            })
        }



    });

    $scope.morem=1;
    console.log($scope.a);


    // console.log($scope.sum);
    // console.log($scope.nowLength);
    // console.log($scope.newSummary);
    // console.log($scope.a[0].summary);
    // console.log($scope.a[0].more);

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
        $state.go('video',{targetId:x});
    };




});

