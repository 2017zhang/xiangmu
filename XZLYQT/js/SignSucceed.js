/**
 * Created by Administrator on 2017/11/22 0022.
 */

angular.module("myApp")
    .controller("calendarSucceed",function($scope,$state,$interval,$timeout,$stateParams){

           $scope.bean=$stateParams.bean;
            console.log($scope.bean);
        // 禁止移动背景图片
        angular.element('body')[0].setAttribute("style","overflow:hidden;");
        angular.element('html')[0].setAttribute("style","overflow:hidden;");

        //奖励页面
        $scope.SignBlank=function(){                       //点击空白处跳转主页
            // console.log("奖励1");
            $state.go("background",{reload:true});
        }
        $scope.SignCe=function($event){
            $event.stopPropagation();
            // console.log("奖励2");
            $state.go("background",{reload:true});
        }
        $scope.SignBimg=function($event){
            $event.stopPropagation();
            // console.log("奖励3");
        }
        $scope.SignSdBn=function($event){
            $event.stopPropagation();
            // console.log("奖励4");
        }
        // 通过id判断，显示的页面
        // 奖励页面显示3秒后，关闭
            console.log('3秒后关闭页面');
            $scope.timer = $interval( function(){  //定时循环
                $state.go("background");
            }, 3000,1);  //时间，循环次数


        
        
        })
