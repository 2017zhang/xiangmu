
app.filter('replacetype',function(){
    return function(text) {
        var retext = ["首页banner", "找职位banner", "找精英banner", "行业大图"];
        return retext[text];
    }
});
app.controller('myCtrl', function($timeout,$scope,$http,$state,$stateParams,type,industry) {
    // $scope.params = {};
    // $scope.params.type = $stateParams.type;
    // $scope.params.status = $stateParams.status;
    // $scope.params.page = $stateParams.page;
    // // $scope.inputNum = $stateParams.page;
    // $scope.params.size=$stateParams.size;
    $scope.params=$stateParams;
    getList();
    $scope.addParams = {};
    $scope.type= type;
    $scope.industry= industry;
    function getList() {
        $scope.startAt = new Date(parseInt($stateParams.startAt));
        $scope.endAt = new Date(parseInt($stateParams.endAt-(86400000-1)));
        $scope.params=$stateParams;
        $http({
            method: 'get',
            url: '/carrots-admin-ajax/a/article/search',
            params: $scope.params
        }).then(function successCallback(response) {   //服务器回复数据是个对象，并传递给response
            $scope.params.size=response.data.data.size;
            if(response.data.code===0){
                // alert('成功');
                $scope.article = response.data.data.articleList;//名称
                $scope.articleNum = Math.ceil((response.data.data.total) / $scope.params.size);//总页数向上取整
                $scope.articlePage = [];//创建一个空数组
                $scope.total = response.data.data.total;//总个数

                $scope.n = $scope.inputNum = response.data.data.page;
                // console.log($scope.article);
                // console.log("总个数：" + $scope.total);//打印出总个数
                var pageid = parseInt($stateParams.page);
                // console.log(pageid);
                //页数省略判断
                if($scope.articleNum<6){ //判断总也数小于6时，for循环每个页数

                    for (var i = 1; i < ($scope.articleNum + 1); i++) {
                        $scope.articlePage[i - 1] = i;  //需要遍历的页数
                        // console.log("显示出的页数"+i);
                    }
                }
                else{ //总页数大于6
                    if(pageid<3){       //当前页数小于3时
                        for (var n = 0; n < ($scope.articleNum >5? 5 : $scope.articleNum); n++) { //n小于（总页数小于5时，为5，大于5时，为总页数）
                            $scope.articlePage.push(n+1)  //需要遍历的页数（页数没有0，所以加1）
                            // console.log("显示出的页数"+n+1);
                        }
                    }else{ //总页数大于6 ，当前页数大于3，取出当前页前1 页和后3页
                        if(($scope.articleNum-pageid)>2){//总页数减当前页小于三时，比较最后一页提前三页时页数。判断页快到末页时显示的大于的范围
                                                            //到末页的距离大于三时，显示大于当前页的的范围（当前页加3）否则等于总页数
                            for (var m = pageid-2; m < ((pageid+2)<$scope.articleNum? (pageid+3) : $scope.articleNum); m++) {
                                $scope.articlePage.push(m)    //需要遍历的页数（页数没有0，所以加1）
                                // console.log("显示出的页数"+m);
                            }
                        }
                        else{               //总页数减当前页小于三时，取出总页数减5的数，遍利出
                            for(var x=$scope.articleNum-5;x<$scope.articleNum;x++){
                                $scope.articlePage.push(x+1)
                                // console.log("显示出的页数" +( x+1));
                            }

                        }
                    }
                }

                $scope.n = $scope.inputNum = response.data.data.page;
                console.log($scope.n)
            }else{
                console.log(response);
                alert("请求服务器失败，请重试！")
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
        })
    }
    if ($stateParams.page == 1) {//判断首页和上一页的禁用，
        $scope.firstPage = true;
        $scope.endPage = false;
    } else
        if ($stateParams.page == $stateParams.total) {
        $scope.endPage = true;
        $scope.firstPage = false;
    } else {
            $scope.firstPage = false;//隐藏
            $scope.endPage = false;
        }
        if ($stateParams.page == undefined) {
            $scope.firstpage = true;
            $scope.endPage = false;
        }
    $scope.changeStatus = function (id, status) {
        if (status == 1) {
            bootbox.confirm("上线后该图片将在轮播图banner中展示。是否执行上线操作？")
        }
    }
    // 上下线
    $scope.changeStatus= function(x,y){

    if(y==1){
        y=2
        z="上线"
    }else{
        y=1
        z="下线"
    }

        c=confirm('是否确认'+ z +"!")
        if(c==true){
    $http({
        method:"PUT",
        url:"/carrots-admin-ajax/a/u/article/status",
        params:{id:x,status:y}
    })
        .then(function success(mes){
           if(mes.data.code===0){
               // alert('修改成功');
               $state.go('backstage.list',{
                   page: 1,
               },{reload:true});
           }else{
               console.log(mes);
               alert("出现错误！")
           }
            location.reload();
        })
}
    }
// 删除
    $scope.delete=function(id) {
        console.log("点击删除！")
        d = confirm("是否确认删除！")
        if (d == true) {
            $http({
                method: "delete",
                url: "/carrots-admin-ajax/a/u/article/" + id
            })
                .then(function () {
                    $state.go(".", "", {reload: true})
                    console.log(id);
                })
        }

        $scope.isActivepage = function (x) {
            // console.log($stateParams.page)
            return $stateParams.page == x     //如果x值等于page就为true,否则为false
            $scope.page = $stateParams.page;
        }
    }
    //编辑
    $scope.CeCk=function(id){
        // console.log(id);
        $state.go("backstage.bianji",{id});//传递id,服务器端重新载入页面
    }
    //搜索、清空
    $scope.search=function(){
        $scope.params.startAt=Date.parse($scope.startAt);  //把时间转化为时间戳
        $scope.params.endAt=Date.parse($scope.endAt);
        $scope.params.page=1;
        if($scope.params.endAt!==undefined){
            $scope.params.endAt=$scope.params.endAt+86400000-1; //给结束时间添加24小时减一秒
        }
        console.log($scope.params);
        if(isNaN($scope.params.startAt)){   //isNaN() 函数用于检查其参数是否是非数字值返回false、true
            $scope.params.startAt="";       //如果是数字，执行
        };
        if(isNaN($scope.params.endAt)){
            $scope.params.endAt="";
        }
               if(($scope.endAt<$scope.startAt)||(typeof($scope.params.startAt)!==typeof($scope.params.endAt))){
                alert("请选择正确的时间！")
            }
            else{
                $state.go('backstage.list',$scope.params       //$scope.params是一个对象等于包含里面的全部属性
                    // { //向url传递page。
                    // type:$scope.params.type,
                    // startAt:$scope.params.startAt,
                    // endAt:$scope.params.endAt,
                    // status:$scope.params.status,
                    // total: $scope.articleNum,
                    // size:$scope.params.size,
                    // page:1,
                // }
                )
                   {reload:true};
            }
            console.log("搜索")
            console.log($scope.params);
        }
    //翻页
    $scope.goPage= function (x) {//获取的页数
        console.log($scope.params.endAt);
        console.log($scope.params);
        console.log("类型："+$scope.params.type);
        console.log("状态："+$scope.params.status);
        console.log("当前页数"+(Math.ceil(($scope.total) / $scope.params.size)));
        if(parseInt($scope.params.size)==0){
            alert("请输入正确的每页显示数量！")
        }else
        if(parseInt($scope.params.size)>parseInt($scope.total)){
            alert("每页显示的条数不能大于总条数！")
        }else
        if (x >  (Math.ceil(($scope.total) / $scope.params.size))) {
            alert("请不要超过最大页数！");
        } else {
            $scope.params.page = x;

        console.log($scope.params);
        $state.go('backstage.list',{ //向url传递page。
            page: $scope.params.page,
            size:$scope.params.size,
        },{reload:true});
        }
    };
    //输入页数
    $scope.jum=function() {
        console.log(Math.ceil(($scope.total) / $scope.params.size));
        console.log($scope.jumPage);
        console.log($scope.articleNum);
        if(parseInt($scope.params.size)>parseInt($scope.total)){
            alert("每页显示的条数不能大于总条数！")
        }else
            if(parseInt($scope.params.size)==0){
            alert("请输入正确的每页显示数量！")
        }else
            if(parseInt($scope.jumPage)==0){
            alert("请输入正确的页数！")
            }else
             if ($scope.jumPage > (Math.ceil(($scope.total) / $scope.params.size))) {
                 alert("输入页数大于当前页数！")
                } else {
                  if ($scope.jumPage < ($scope.articleNum + 1)) {
                     $scope.params.page = parseInt($scope.jumPage);
                     $state.go('backstage.list', { //向url传递page。
                    page: $scope.params.page,
                    size: $scope.params.size,
                }, {reload: true});
            }
            else {
                alert("请输入跳转页数！")
            }
        }
    }
    //清除
    $scope.reset=function(){
        console.log($scope.params);
        $scope.startAt="";
        $scope.endAt="";
        $scope.params="";
        $stateParams="";
        $state.go('backstage.list',{ //向url传递page。
            type:$scope.params.type,
            startAt:$scope.params.startAt,
            endAt:$scope.params.endAt,
            status:$scope.params.status,
            total: $scope.articleNum,
            size:$scope.params.size,
            page:1,
        },{reload:true});
    }

})
    app.filter('state',function(){
    return function(text) {
        var aaa=["", "草稿","上线"];
        return aaa[text];
    }
});
    app.filter('btnFilter',function(){
    return function(text){
        return(text == 2)? "下线":"上线";
    }
})

