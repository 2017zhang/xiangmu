/**
 * Created by Administrator on 2017/11/6 0006.
 */
//点击签到发送用户id到后端
angular.module("myApp")
    .controller("calendar",function($scope,$state,$interval,$timeout,$http,signDateUtil){
        // 保存id
        sessionStorage.setItem('userId',68);
        $scope.params={};
        $scope.params.id = JSON.parse(sessionStorage.getItem('userId'));
        $scope.params.status = JSON.parse(sessionStorage.getItem('status'));    //获取用户状态
       console.log("用户id" +$scope.params.id);
        console.log(typeof($scope.params.id));

// 判断当前年份是否是闰年(闰年2月份有29天，平年2月份只有28天)
    $scope.today = new Date(), //获取当前日期
    $scope.y = $scope.today.getFullYear(), //获取日期中的年份
    $scope.m = $scope.today.getMonth(), //获取日期中的月份(需要注意的是：月份是从0开始计算，获取的值比正常月份的值少1)
    $scope.d = $scope.today.getDate(), //获取日期中的日期
    $scope.firstday = new Date($scope.y, $scope.m, 1), //获取当月的第一天
    $scope.dayOfWeek = $scope.firstday.getDay() //判断第一天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
    $scope.days_per_month = signDateUtil.createMonthArray($scope.y),//创建月份数组
        $scope.str_nums=signDateUtil.CalendarOfRows($scope.dayOfWeek,$scope.days_per_month,$scope.m),
    $http({
        method:'get',
        url:' /a/u/'+$scope.params.id+'/sign'
        // url:'http://academy.home.grapes.ptteng.com/a/u/user/68
    })
        .then(function success(res){

            console.log(res);
            $scope.userParams=res.data.data;     //获取信息列表
            console.log($scope.userParams);
            $scope.SignNumber=parseInt($scope.userParams.dayCount);
            $scope.dateArray=$scope.userParams.dayList;
console.log("$scope.dateArray"+$scope.dateArray)
        for (var i = 0; i < $scope.dateArray.length; i++){
            $scope.dateArray[i]=parseInt($scope.dateArray[i]);
        }
            console.log("$scope.dateArray:"+ $scope.dateArray);
            console.log("$scope.d:"+ $scope.d);
        signDateUtil.signInState($scope.dateArray,$scope.d);//判断是否签到
        $scope.SignState=SignState;
        console.log($scope.SignState);
        //按钮显示的内容（签到、已签到）
        $scope.ClickState=ClickState;//阻止点击事件
        //是否可以点击
        signDateUtil.appDate($scope.str_nums,$scope.dayOfWeek,$scope.days_per_month,$scope.m,$scope.dateArray);                 //添加日历中日期
            // 使用ng-cilick
            $scope.SignBlank=function(){
                console.log("1")
                //点击空白处返回到主页
                $state.go("background",{reload:true});
            }
            $scope.SignCalender=function($event){       //$event防止冒泡事件
                $event.stopPropagation();
            }
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
                                bootbox.alert({
                                    message: "账号已冻结！"
                                })
                            }
                        });
            }();

            $scope.signOn=function($event) {        //签到
                console.log($scope.params.status)
                if ($scope.params.status == 0) {     //判断用户已冻结判断
                    bootbox.alert({
                        message: "账号已冻结！",
                    })
                } else {
                    $event.stopPropagation();
                    console.log(typeof($scope.params.id));
                    console.log($scope.params.id);
                    $http({
                        method:"put",
                        url: "/a/u/" + $scope.params.id + "/sign",
                    })
                        .then(function success(res) {
                            console.log(res.data.code);
                            if(res.data.code==0){
                            var beanNumber = res.data.data;
                            console.log(beanNumber);
                            $state.go("background.SignSd", {bean: beanNumber});
                            }

                        })
                }
            }
    })
    })