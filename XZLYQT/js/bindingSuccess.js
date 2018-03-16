/**
 * Created by Administrator on 2017/12/6 0006.
 */
/**
 * Created by Administrator on 2017/11/22 0022.
 */

angular.module("myApp")
    .controller("bindingCs",function($scope,$state,$interval,$timeout,$http){
        $scope.UserParams={};
        $scope.UserParams.bean=20; //默认奖励20bean

            console.log($scope.UserParams.bean);

        // })
        // 禁止移动背景图片
        angular.element('body')[0].setAttribute("style","overflow:hidden;");
        angular.element('html')[0].setAttribute("style","overflow:hidden;");

        //奖励页面
        $scope.bindingBlank=function(){                       //点击空白处跳转主页
            // console.log("奖励1");
            $state.go("background",{reload:true});
        }
        $scope.bindingCe=function($event){
            $event.stopPropagation();
            // console.log("奖励2");
            $state.go("background",{reload:true});
        }
        $scope.bindingBimg=function($event){
            $event.stopPropagation();
            // console.log("奖励3");
        }
        $scope.bindingSdBn=function($event){
            $event.stopPropagation();
            // console.log("奖励4");
        }
        //通过id判断，显示的页面
        //奖励页面显示3秒后，关闭
        console.log('3秒后关闭页面');
        $scope.timer = $interval( function(){  //定时循环
            $state.go("background");
        }, 3000,1);  //时间，循环次数




    })

