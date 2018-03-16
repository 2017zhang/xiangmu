/**
 * Created by Administrator on 2017/12/11 0011.
 */
angular.module('myApp')
    .controller("studentCompile",function($scope,$state,$http,$rootScope){

        // 获取用户id
        $scope.UserParams={};
        var userId = sessionStorage.getItem('userId');


        //获取用户id
        $http({
            method:'get',
            url:'/a/u/user/'+ userId,
        }).then(function successCallback(response){
            $scope.UserParams=response.data.data;
            console.log(response.data.data)
            console.log($scope.UserParams.gradeId)
            console.log($scope.UserParams.name)


        //插件配置
        $("#sex-list_dummy").click(function () {

            $("#sex-list").mobiscroll().treelist({
//            theme: "android-ics",
                theme:"android-ics white",
                lang: "zh",
                defaultValue:[$scope.UserParams.gradeId],
                display: 'bottom',
                inputClass: 'tmp',
                onSelect: function (valueText) {
                    $scope.UserParams.gradeId=valueText;//选择编辑编号赋值
                    console.log($scope.UserParams.gradeId)
                    var m = $(this).find("li").eq(valueText).html();
                    console.log(m);
                    document.getElementById("sex-list_dummy").value=$(this).find("li").eq(valueText).html();
                }
            });
            $("input[id^=sex-list]").focus();
        });
//put请求保存编辑内容
            $scope.SaveChanges=function(){
                console.log("保存");
                console.log($scope.UserParams);
                console.log($scope.UserParams.gradeId);
                console.log($scope.UserParams.name);
                console.log($scope.UserParams.id);
                $http({
                    method:'put',
                    url:'/a/u/user/' + userId,
                    // headers:{'Content-type': 'application/json'},
                    data:$scope.UserParams
                })
                    .then(function success(mes){
                        console.log("保存成功");
                        $state.go("studentCard",{reload:true});
                    })
            }

        });



        // alert(location.href.split('#')[0]);
        $scope.head = function () {


            if ($rootScope.mobile == "android") {
                $http({
                    method: "post",
                    url: "/a/register/token",
                    params: {
                        "url": location.href.split('#')[0],
                        "id": Number(userId)
                    }
                }).then(function (res) {
                    console.log(res.data);
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx2750055a558bbe86', // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        wx.chooseImage({
                            count: 1,
                            success: function (res) {
                                console.log(res);
                                var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                wx.uploadImage({
                                    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                    success: function (res) {
                                        console.log(res);
                                        var mediaId = res.serverId; // 返回图片的服务器端ID

                                        $http({
                                            method: "put",
                                            url: "/a/user/" + userId,
                                            params: {
                                                "mediaId": mediaId
                                            }
                                        }).then(function (res) {
                                            console.log(res.data);
                                            $scope.UserParams.img = res.data.url;
                                        })
                                    }
                                });

                            }
                        });
                    });

                });

            } else {
               alert("aa");
                wx.chooseImage({
                    count: 1,
                    success: function (res) {
                        console.log(res);
                        var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        wx.uploadImage({
                            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                            success: function (res) {
                                console.log(res);
                                var mediaId = res.serverId; // 返回图片的服务器端ID

                                $http({
                                    method: "put",
                                    url: "/a/user/" + userId,
                                    params: {
                                        "mediaId": mediaId
                                    }
                                }).then(function (res) {
                                    console.log(res.data);
                                    $scope.UserParams.img = res.data.url;
                                })
                            }
                        });

                    }
                });
            }

            // $timeout(function () {
            //
            // },1000);







        }








    })
.filter('grade',function(){
    return function(text) {
        var retext = ["未选择", "初一", "初二", "初三","高一","高二","高三"];
        return retext[text];
    }
});
