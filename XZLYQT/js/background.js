/**
 * Created by titi on 2017/11/14.
 */
angular.module("myApp").controller("backgroundCtrl",function ($scope, $rootScope,$http) {
    // // 保存id

    sessionStorage.setItem("userId",68)
    console.log("保存id")
    $rootScope.x=true;
        var h = $(".back").height(); //获取背景高度
        console.log(h);
        $(".back").width(h*1.68);  //

            var imgratio=wrapper.offsetWidth/3726; //计算页面和实际图片比例
            console.log(imgratio);
            console.log(wrapper.offsetWidth);
            var myscroll;
            myscroll=new IScroll("#wrapper",{
                scrollX: true,
                scrollY:true,
                startX:-(2250*imgratio),   //初始x轴偏移
                zoom: true,
                mouseWheel: true,
                wheelAction: 'zoom',
                click:true
            });

    //用户状态
    $scope.judgeStatus=function(){
        var userId=JSON.parse(sessionStorage.getItem('userId'))
        $http({
            method:'get',
            url:'/a/u/user/'+ userId
        }).then(function successCallback(response){
            $scope.params=response.data.data;
            console.log( $scope.params)
            console.log("用户是冻结：" + $scope.params.status);
            if ($scope.params.status == 0) {     //用户已冻结判断
                // angular.element("#msd").append('<div class="eml" style="width:100px; height:100px background-color:red; z-index:999;">8888<div>');
                console.log("添加--------------")

                //     bootbox.alert({
            //         message: "账号已冻结！"
            //     })
            }

        });
    }();

    // $scope.notice = function () {
    //     $scope.x=true;
    // };
    $scope.disappear = function () {
        $rootScope.x=false;      //定义一个全局变量x，点击后隐藏学生证和签到图标
    };


    // var code = sessionStorage.getItem('code');
    //
    // console.log(code);
    // var x = sessionStorage.getItem('name');
    // console.log(x);
    // if(x==''||null){
    // var i = sessionStorage.getItem('i');
    // console.log(i);
    // if(i==null){
    //     $http({
    //         method:"post",
    //         url:"/a/register",
    //         params:{
    //             "code":code
    //         }
    //     }) .then (function (res) {
    //         console.log(res.data);
    //
    //         var name = res.data.name;
    //         sessionStorage.setItem('name',name);
    //
    //         var userId = res.data.userId;
    //         sessionStorage.setItem('userId',userId);
    //
    //         // i = 0;
    //         // sessionStorage.setItem('i',i);
    //
    //         var openId = res.data.openId;
    //         sessionStorage.setItem('openId',openId);
    //
    //     });

    // }

    // var url = window.location.href;
    // console.log(url);
    //
    // $http({
    //     method:"get",
    //     url:"/a/wx/signature",
    //     params:{"url":url}
    // }).then (function (res) {
    //     console.log(res.data);
    //     var timestamp = res.data.data.timestamp;
    //     var nonceStr = res.data.data.nonceStr;
    //     var signature = res.data.data.signature;
    //
    //     wx.config({
    //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: 'wx2750055a558bbe86', // 必填，公众号的唯一标识
    //         timestamp: timestamp, // 必填，生成签名的时间戳
    //         nonceStr: nonceStr, // 必填，生成签名的随机串
    //         signature: signature,// 必填，签名，见附录1
    //         jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });

    // });















});