
var app=angular.module('userApp',['ui.router','angularFileUpload', 'meta.umeditor']);
app.config(
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:"../login.html",
                controller:'indexCtrl'
            })
            .state('backstage.info',{
                    url:'/info',
                    templateUrl:"",
                    template:'<h2 style="margin-left:30px;margin-bottom:20px;">信息管理</h2>'
                }
            )
            .state("backstage", {
                url: "/backstage",
                templateUrl: "backstage.html",
                controller:"quit"
            })
            .state("backstage.list", {
                url:"/list?/:page/:type/:status/:startAt/:endAt/:size/",//获取params对象的参数,写入键值，能按需要获取
                templateUrl: "list.html",
                controller:"myCtrl"
            })
            .state("backstage.AeAn", {
                url:"/AeAn",
                templateUrl: "AeAn.html",
            })
            .state("backstage.an",{
                url:"/an",
                templateUrl:" ",
                template:'<h2 style="margin-left:30px;margin-bottom:20px;">后台管理</h2>'
            })
            .state("backstage.bianji",{
                url:"/bianji?id",
                templateUrl:"bianji.html",
                controller:"mybianji",
            })
    });
