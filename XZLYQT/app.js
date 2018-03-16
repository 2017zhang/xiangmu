/**
 * Created by titi on 2017/11/13.
 */
var myApp = angular.module("myApp", ['ui.router', 'oc.lazyLoad','ngSanitize']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
    // myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // $urlRouterProvider.when("", "/background");
    $urlRouterProvider.otherwise("/background");
    // $locationProvider.html5Mode(true);

    $stateProvider
        .state("background",{
            url:"/background",
            templateUrl:"html/background.html",
            controller:"backgroundCtrl",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({

                        files:[
                            'sass/background.css',
                            'js/background.js'
                        ]
                    })
                }
            }
        })
        .state("background.announcement",{
            url:"/announcement",
            templateUrl:"html/announcement.html",
            controller:"announceCtrl",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/announcement.css',
                            'js/announcement.js'
                        ]
                    })
                }
            }
        })
        .state("articleList",{
            url:"/articleList",
            templateUrl:"html/articleList.html",
            controller:"articleListCtrl",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/articleList.css',
                            'js/articleList.js'
                        ]
                    })
                }
            }

        })
        .state("article",{
            url:"/article?articleid",
            templateUrl:"html/article.html",
            controller:"articleCtrl",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/article.css',
                            'js/article.js'
                        ]
                    })
                }
            }

        })
        .state("videoList",{
            url:"/videoList",
            controller:"videoListCtrl",
            templateUrl:"html/videoList.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/videoList.css',
                            'js/videoList.js'
                        ]
                    })
                }
            }
        })
        .state("video",{
            url:"/video?:/targetId",
            controller:"videoCtrl",
            templateUrl:"html/video.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/video.css',
                            'js/video.js'
                        ]
                    })
                }
            }
        })
        //签到
        .state("background.Sign",{
            url:"/Sign",
            controller:"calendar",
            templateUrl:"html/Sign.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/Sign.css',
                            'js/Sign.js'
                        ]
                    })
                }
            }
        })
        //逆袭豆
        .state("background.SignSd",{
            url:"/SignSd/?bean",
            controller:"calendarSucceed",
            templateUrl:"html/SignSucceed.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/Sign.css',
                            'js/SignSucceed.js'
                        ]
                    })
                }
            }
        })
        //学生卡
    .state("studentCard",{
        url:"/studentCad",
        controller:"studentCard",
        templateUrl:"html/studentCard.html",
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files:[
                        'sass/student.css',
                        'js/studentCard.js'
                    ]
                })
            }
        }
    })
        //学生卡编辑
    .state("studentCompile",{
        url:"/studentCompile",
        controller:"studentCompile",
        templateUrl:"html/studentCompile.html",
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files:[
                        'sass/studentCompile.css',
                        'js/studentCompile.js',
                        'sass/mobiscroll-2.13.2.full.min.css',
                        'js/mobiscroll-2.13.2.full.min.js'
                    ]
                })
            }
        }
    })
        // 绑定页
        .state("binding",{
            url:"/binding",
            controller:"binding",
            templateUrl:"html/binding.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/binding.css',
                            'js/binding.js',
                        ]
                    })
                }
            }
        })
        // 绑定手机/邮箱页
        .state("emlPhoneBinding",{
            url:"/emlPhoneBinding",
            controller:"emlPhoneBg",
            templateUrl:"html/emlPhoneBinding.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/emlPhoneBinding.css',
                            'js/emlPhoneBinding.js'
                        ]
                    })
                }
            }

        })
        // 绑定成功
        .state("binding.bindingCd",{
            url:"/bindingCd",
            controller:"bindingCs",
            templateUrl:"html/bindingSuccess.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/bindingSuccess.css',
                            'js/bindingSuccess.js',
                        ]
                    })
                }
            }

        })

        // 我的收藏
        .state("studentCollect",{
            url:"/studentCollect",
            controller:"collect",
            templateUrl:"html/studentCollect.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/studentCollect.css',
                            'js/studentCollect.js',
                        ]
                    })
                }
            }

        })
        // 文章收藏详情
        .state("CollectArticle",{
            url:"/CollectArticle?articleid&targetType",
            templateUrl:"html/CollectArticle.html",
            controller:"articleCtrl",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/article.css',
                            'js/CollectArticle.js'
                        ]
                    })
                }
            }

        })
        .state("store",{
            url:"/store",
            templateUrl:"html/store.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/store.css'
                        ]
                    })
                }
            }
        })
        .state("gym",{
            url:"/gym",
            templateUrl:"html/gym.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/gym.css'
                        ]
                    })
                }
            }

        })
        .state("dormitory",{
            url:"/dormitory",
            templateUrl:"html/dormitory.html",
            resolve: {
                loadMyCtrl:function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files:[
                            'sass/dormitory.css'
                        ]
                    })
                }
            }

        })


});
