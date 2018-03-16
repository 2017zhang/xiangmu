/**
 * Created by hasee on 2017/12/14.
 */
angular.module('myApp')
    .run(function ($http,$rootScope) {

             function GetQueryString(name) //获取query
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }

        var code = sessionStorage.getItem("code");
        console.log(co);

        var code = GetQueryString("code");
        console.log(code);

        var id =sessionStorage.getItem("userId");
        if (!id){

            sessionStorage.setItem('code',code);
            console.log("aa");

            function login () {
                var WxURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
                    'appid=wx2750055a558bbe86' +
                    '&redirect_uri=' +'http://student.home.academy.ptteng.com/index'+
                    '?type=wx' +
                    '&response_type=code' +
                    '&scope=snsapi_userinfo' +
                    '&state=STATE' +
                    '#wechat_redirect';
                window.location.href = WxURL
            }
            login();
            console.log("zzz");
            $http({
                method:"post",
                url:"/a/register",
                params:{
                    "code":code
                }
            }) .then (function (res) {
                console.log(res.data);

                var name = res.data.name;
                sessionStorage.setItem('name',name);

                var userId = res.data.userId;
                sessionStorage.setItem('userId',userId);

            });

        }




        function mobile() {
            if (navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/iPhone/i)) {
                $rootScope.mobile = "ios"
            } else {
                $rootScope.mobile = "android"
            }
        }

        mobile();

        if($rootScope.mobile == "ios") {

            var count=sessionStorage.getItem("reloadCount");
            count?true:count=0;

            $http({
                method: "post",
                url: "/a/register/token",
                params: {
                    "url": location.href.split('#')[0],
                    "id": id
                }
            }).then(function (res) {
                console.log(res.data);
                if(res.data.code==0) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx2750055a558bbe86', // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    wx.error(function (res) {
                        //iosSDK配置出问题执行刷新，尝试2次

                        if (count < 2) {
                            location.reload();
                            sessionStorage.setItem("reloadCount", ++count);
                        } else {
                            alert("SKD config error");
                            sessionStorage.setItem("reloadCount", 0);
                        }

                    });
                }
            });


        }

    });




