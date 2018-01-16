

angular.module('userApp')
.controller('indexCtrl',function ($scope,$http,$state) {
    $scope.enter=function () {
        $http({
            method:"post",
            url:"/carrots-admin-ajax/a/login",
            params:{
                name:$scope.name,
                pwd:$scope.pwd
            }
        })
            .then(
                function successCallback(reponse) {
                    console.log(reponse)
                    //.判断接口返回参数是否正确，正确则跳转，错误弹出警示框
                    if (reponse.data.code == 0){
                        // window.location.href="../../html/background.html";
                        $state.go('backstage.info');
                        // alert("message")
                    }else {
                        // alert(s"错误的帐户名或密码！")
                        alert(reponse.data.message)
    }
                },
                function errorCallback(reponse) {
                    if(reponse.data.code !=0 )
                        alert("登陆失败："+reponse.status)
                }
            )
    }
});








//
// //获取输入值
//
// window.onload = function(){
//     post();
// };
//
//          //ajax
//          var post = function () {
//                      var login = document.getElementById("submit");
//                      var ax = new XMLHttpRequest();
//                      login.onclick = function () {
//                          console.log("name:" + document.getElementById("name").value);
//                          console.log("password:" +document.getElementById("password").value);
//                          ax.open('POST', '/carrots-admin-ajax/a/login', true);
//                          ax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                          var data = "name=" + document.getElementById("name").value + "&pwd=" +
//                              document.getElementById("password").value;
//                          ax.send(data);
//                          console.log("成功");
//                      }
//                      ax.onreadystatechange  = function () {
//                          if (ax.readyState === 4) {
//                              if (ax.status == 200) {
//                                  console.log("返回值");
//                                  feedback = JSON.parse(ax.responseText);
//                                  if (feedback.message == "success") {
//                                      console.log(feedback.message);
//                                      window.location.href = "#/administer";//跳转页面
//                                  }
//                                  else {
//                                      alert("账号密码有误，请重新输入！");
//                                      document.getElementById("result").innerHTML = "未通过验证！";
//                                  }
//                              }
//                              else {
//                                  alert("出现错误:" + JSON.parse(ax.responseText).code + "," + JSON.parse(ax.responseText).message);
//                              }
//                          }
//              }
//      }
