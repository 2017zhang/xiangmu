/**
 * Created by Administrator on 2017/11/30 0030.
 */
angular.module("myApp").factory('signDateUtil',function($http){
    return {
        // 判断当前年份是否是闰年(闰年2月份有29天，平年2月份只有28天)
        isLeap: function isLeap(year) {
            return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
        },
        //创建月份数组
        createMonthArray: function (y) {
            return new Array(31, 28 + this.isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)//创建月份数组
        },
        //确定日期表格所需的行数
        CalendarOfRows: function (dayOfWeek, month, m) {
            return Math.ceil((dayOfWeek + month[m]) / 7);
        },

        signInState: function (dateArray, days) {
            console.log("$scope.dateArray:"+ dateArray);
            console.log("是否存在"+!dateArray);
            console.log(dateArray.length);
            if(!dateArray.length==0) {
                console.log("签到数组有值");
                for (x = 0; x < dateArray.length; x++) {      //  判断是否已签到
                    if (days !== dateArray[x]) {
                        //如果当天没有签到，添加当天时间，签到按钮参数
                        console.log("true");
                        SignState = "签到";
                        console.log(SignState);
                        ClickState = "";
                    } else {
                        console.log("false");
                        SignState = "已签到";
                        console.log(SignState);
                        ClickState = "1";                            //ClickState有值时为true禁用
                        document.all("sign-bt").id = "sign-bt-1";     //改变id样式
                        return
                    }
                }
            }else{
                console.log("签到数组为空");
                SignState = "签到";
                console.log(SignState);
                ClickState = "";
            }
        },
        // 添加日历中日期
        appDate: function (str_nums, dayOfWeek, days_per_month, m, dateArray) {
            for (i = 0; i < str_nums; i += 1) {           //二维数组创建日期表格,行数
                angular.element("tbody").append('<tr id="CalendarTr' + i + '"></tr>');  //添加行数
                var tri = "CalendarTr" + i;
                for (k = 0; k < 7; k++) { //星期
                    var idx = 7 * i + k; //为每个表格创建索引,从0开始
                    var date = idx - dayOfWeek + 1; //将当月的1号与星期进行匹配
                    (date <= 0 || date > days_per_month[m]) ? date = ' ' : date = idx - dayOfWeek + 1; //索引小于等于0或者大于月份最大值就用空表格代替
                    //高亮显示
                    for (j = 0; j < dateArray.length; j++) {
                        if (date == dateArray[j]) {
                            var mark = (dateArray[j])
                        }
                    }
                    //添加tri是变量
                    date == mark ? angular.element("#" + tri).append('<td class="today">' + date + '</td>') : angular.element("#" + tri).append('<td>' + date + '</td>');
                }
            }
        },
        NoMovingPictures:function(){
        return angular.element('body')[0].setAttribute("style","overflow:hidden;");
    angular.element('html')[0].setAttribute("style","overflow:hidden;");
}
    }

})
// signDateUtil.goToTheHomePage($scope.SignBlank,$state.go, $scope.SignCalender,$event.stopPropagation,$scope.signOn);