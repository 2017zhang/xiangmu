/**
 * Created by Administrator on 2017/12/6 0006.
 */
angular.module("myApp").controller("emlPhoneBg",function($scope,$state,$http,$timeout) {


    $scope.UserParams = {};
    $scope.UserParams.id=JSON.parse(sessionStorage.getItem('userId'));  //获取用户userId
    // $scope.UserParams.id = 3;
    $scope.TimingTime=60;   //验证延时/秒
    $scope.UserParams.phone = "";//手机号
    $scope.UserParams.verify = "";//手机号验证码
    $scope.heardL = function () {  //手机
        $scope.UserParams.phone = "";
        $scope.UserParams.verify = "";
        $scope.heardLWire = {
            "display": "block",
        }
        $scope.heardRWire = {     //右侧隐藏线划线
            "display": "none",
        }
        $scope.PtMail = {             //隐藏邮箱
            "display": "none",
        }
        $scope.PtPhone = {
            "display": "block",
        }
        $scope.PtSe = {               //隐藏提示信息
            "display": "none",
        }
    }
    $scope.heardR = function () {        //  邮箱
        $scope.UserParams.mail = "";
        $scope.UserParams.verify = "";
        $scope.heardLWire = {     //左侧隐藏线划线
            "display": "none",
        }
        $scope.heardRWire = {
            "display": "block",
        }
        $scope.PtPhone = {             //隐藏手机
            "display": "none",
        }
        $scope.PtMail = {
            "display": "block",
        }
        $scope.mlSe = {               //隐藏提示信息
            "display": "none",
        }

    }
    // 隐藏全部提示信息
    $scope.concealHint = function () {
        $scope.nkPeEr=false;
        $scope.PtPeEr=false;
        $scope.ptSucceed=false;
        $scope.ptEPeVacancy=false;
        $scope.ptEr=false;
        $scope.ptPeBd=false;
    }
    //手机号验证
    $scope.send=1;
    $scope.sendTime=0;
    $scope.peVerify = function () {
        $scope.concealHint();
        var peFormat = /^[1][3,4,5,7,8][0-9]{9}$/;
        console.log($scope.UserParams);
        if(!$scope.UserParams.phone == "") {
            if (peFormat.test($scope.UserParams.phone)) {
                $http({
                    method: 'post',
                    url: '/a/u/bind/phone/' + $scope.UserParams.id,
                    params: $scope.UserParams,
                })
                    .then(function success(mes) {
                        console.log("返回的code：" + mes.data.code);
                        console.log(typeof(mes.data.code));
                        if (mes.data.code === 0) {
                            console.log("验证码发送成功")
                            //显示发送验证码
                            $scope.ptSucceed = 1;
                            $timeout(function () {
                                $scope.ptSucceed =0;
                            }, 3000);
                            //countdown
                            $scope.Countdown = $scope.TimingTime;
                            ($scope.peDelaySend = function () {
                                $scope.send = 0;
                                $scope.sendTime = 1;
                                if ($scope.Countdown == 1) {
                                    $scope.send = 1;
                                    $scope.sendTime = 0;
                                    $scope.Countdown = $scope.TimingTime;
                                    return;
                                } else {
                                    $scope.Countdown--;
                                    console.log($scope.Countdown);
                                }
                                $timeout(function () {
                                    $scope.peDelaySend()
                                }, 1000)
                            })()
                        } else {
                            if (mes.data.code == -1003) {
                                console.log("验证码发送达到三次，明天再试")
                                $scope.ptPeBd = 1;
                                $timeout(function () {
                                    $scope.ptPeBd = 0;
                                }, 3000);
                            } else {
                                console.log("其他错误")
                                $scope.nkPeEr =1;
                                $timeout(function () {
                                    $scope.nkPeEr = 0;
                                }, 3000);
                            }
                        }
                    })
            } else {
                console.log("手机格式错误")
                $scope.emPePromptIf=1;
                $timeout(function () {
                    $scope.emPePromptIf=0;
                }, 3000);

            }
        }else{
            console.log("手机号为空")
            $scope.PtPeEr=1;
            $timeout(function () {
                $scope.PtPeEr=0;
            }, 3000);
        }

    }
//绑定，手机发送验证码验证
    $scope.peBindingBt=function(str){
        $scope.concealHint();
        $scope.UserParams.type=str;
        console.log($scope.UserParams.type);
        console.log($scope.UserParams);
        console.log(typeof($scope.UserParams.phone));
        var peFormat=/^[1][3,4,5,7,8][0-9]{9}$/;
        var peVerify=/^[a-zA-Z0-9]{6}$/;
        if(peFormat.test($scope.UserParams.phone)) {
            console.log("手机号：" + peFormat.test($scope.UserParams.phone));
            console.log("手机号格式正确");
            $scope.UserParams.account = $scope.UserParams.phone;
            $scope.UserParams.type = 1;       //1表示手机，2 表示邮箱
            if(!$scope.UserParams.verify == "") {
                console.log("有验证码")
            if (peVerify.test($scope.UserParams.verify)) {
                console.log("验证码格式正确")
                console.log(peVerify.test($scope.UserParams.verify));
                $http({
                    method: 'put',
                    url: '/a/u/bind/' + $scope.UserParams.id,
                    params: $scope.UserParams,
                })
                    .then(function success(mes) {
                        console.log("返回的code：" + mes.data.code);
                        console.log(typeof(mes.data.code));
                        if (mes.data.code === 0) {
                            //绑定手机号成功
                            console.log("绑定成功")
                            console.log($scope.UserParams);
                            $state.go("binding.bindingCd",{reload:true});
                        }
                        else {
                            if (mes.data.code === -1003) {
                                console.log("验证超过三次，明天再试")
                                $scope.ptErBd = 1;
                                $timeout(function () {
                                    $scope.ptErBd = 0;
                                }, 3000);
                            }

                        else {
                            if (mes.data.code === -1001) {
                                console.log("------//-1001");
                                $scope.ptEr =1;
                                console.log("执行完毕")
                                $timeout(function () {
                                    $scope.ptEr = 0;
                                }, 3000);
                            }
                        else {
                            console.log("未知错误")
                            $scope.nkPeEr =1;
                            $timeout(function () {
                                $scope.nkPeEr = 0;
                            }, 3000);
                        }

                        }
                        }
                    })
                console.log($scope.UserParams);
                console.log(peVerify.test($scope.UserParams.verify));
                console.log("正确")
            } else {
                console.log("验证码格式错误")
                $scope.ptEPeVacancy =1;
                $timeout(function () {
                    $scope.ptEPeVacancy = 0;
                }, 3000);
            }
            }else{  //验证码输入为空时
                console.log("验证码为空")
                $scope.ptEPeVacancy = 1;
                $timeout(function () {
                    $scope.ptEPeVacancy = 0;
                }, 3000);
            }
        }else{
            console.log("手机格式错误")
            $scope.PtPeEr = 1;
            $timeout(function () {
                $scope.PtPeEr = 0;
            }, 3000);
        }
    }

    //邮箱绑定发验证码
    $scope.sendMl=1;
    $scope.sendTimeMl=0;
    $scope.mlVerify=function(str){
        $scope.ptEmEr=0;
        $scope.navPtEmEr=0;
        $scope.ptSucceed=0;
        $scope.ptErVacancy=0;
        $scope.ptEr=0;
        $scope.ptErBd=0;
        $scope.nkEnEr=0;

        // 隐藏全部提示信息
        $scope.concealHint();
        console.log("邮箱发发送验证");
        $scope.UserParams.type=str;
        var mlFormat=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        console.log($scope.UserParams);
        if(mlFormat.test($scope.UserParams.mail)){
            console.log("邮箱格式正确");
            $http({
                method:'post',
                url:'/a/u/bind/mail/' + $scope.UserParams.id,
                params:$scope.UserParams,
            })
                .then(function success(mes){
                    console.log("返回的code："+ mes.data.code);
                    console.log(typeof(mes.data.code));
                    if(mes.data.code===0){                      //验证码发送成功
                        $scope.ptSucceed = 1;
                        $timeout(function () {
                            $scope.ptSucceed = 0;
                        }, 3000);
                        //countdown
                        $scope.mlCountdown = $scope.TimingTime;;
                        ($scope.mlDelaySend = function () {
                            $scope.sendMl = 0;
                            $scope.sendTimeMl = 1;
                            if ($scope.mlCountdown == 1) {
                                $scope.sendMl = 1;
                                $scope.sendTimeMl = 0;
                                $scope.mlCountdown = $scope.TimingTime;
                                return;
                            } else {
                                $scope.mlCountdown--;
                                console.log( $scope.mlCountdown)
                            }
                            $timeout(function () {
                                $scope.mlDelaySend()
                            }, 1000)
                        })()
                    }else{
                        console.log("验证码发送失败")
                        $scope.nkEnEr = 1;
                        $timeout(function () {
                            $scope.nkEnEr = 0;
                        }, 3000);

                    }
                })
            console.log("邮箱格式正确")
        }else{
            console.log("邮箱格式错误");

            $scope.ptEmEr=1;
            $timeout(function () {
                $scope.ptEmEr=0;
            }, 3000);
            console.log("邮箱格式不对")
        }

    }


    //绑定，邮箱发送验证码验证
    $scope.mlBindingBt=function(str){
        // 隐藏全部提示信息
        $scope.concealHint();
        console.log("邮箱验证绑定");
        console.log($scope.UserParams)
        $scope.UserParams.type=str;
        var mlFormat=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var mlVerify=/^[a-zA-Z0-9]{6}$/;
        if(mlFormat.test($scope.UserParams.mail)) {
            console.log("邮箱格式正确");

            $scope.UserParams.account = $scope.UserParams.mail;
            console.log($scope.UserParams.verify);
            if(!$scope.UserParams.verify == "") {
                console.log("验证码有值");

                if (mlVerify.test($scope.UserParams.verify)) {
                    console.log("验证码格式正常");
                    // console.log(mlVerify.test($scope.UserParams.verify));
                    $http({
                        method: 'put',
                        url: '/a/u/bind/' + $scope.UserParams.id,
                        params: $scope.UserParams,
                    })
                        .then(function success(mes) {
                            console.log("返回的code：" + mes.data.code);
                            console.log(typeof(mes.data.code));
                            if (mes.data.code === 0) {
                                //绑定成功
                                console.log("绑定邮箱成功")
                                $state.go("background", {reload: true});

                            } else {
                                console.log("绑定邮箱意外情况")
                                $scope.nkEnEr = 1;
                                $timeout(function () {
                                    $scope.nkEnEr = 0;
                                }, 3000);
                            }
                        })
                } else {
                    console.log("验证码格式不正确")
                    $scope.ptErVacancy = 1;
                    $timeout(function () {
                        $scope.ptErVacancy = 0;
                    }, 3000);
                }
            }else{
                console.log("222")
                console.log("验证码为空")
                $scope.ptErVacancy = 1;
                $timeout(function () {
                    $scope.ptErVacancy = 0;
                }, 3000);
            }

        }else{
            console.log("邮箱格式不正确")
            $scope.ptEmEr = 1;
            $timeout(function () {
                $scope.ptEmEr = 0;
            }, 3000);
        }

    }
})