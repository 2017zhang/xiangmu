/**
 * Created by Master on 2017/3/22.
 */
'use strict';
angular.module('userApp')//改成自己的ng-app名字，

    /*传图片*/
        .directive('upLoader',[//这句话是说注册一个html标签“uploader”
        'FileUploader',
        function (
            FileUploader
        ) {
    return {
        restrict: 'E',
        templateUrl: '../upload.html',//自己的upload.html地址
        scope: {
            logoUrl: '=ngModel',//图片上传后地址
            labelName: '@',
            tip:'@'//提示语
        },
        replace: 'true',
        link: function (scope) {
            // scope.class = attrs.class;
            // scope.leftClass = attrs.leftClass||'col-xs-2';
            // scope.labelClass = attrs.labelClass;
            scope.uploader = new FileUploader({//实例化
                url: '/carrots-admin-ajax/a/u/img/task',//改为自己的接口，
                queueLimit: 1
            });
            scope.clearItem = function () {//清空队列
                scope.uploader.
                clearQueue();
            };
            scope.remove = function () {
                scope.logoUrl = '';
                $('#imgdel').removeAttr("src","");
            }
            scope.getUrl = function (files) {
                scope.fileList = files;
                scope.imgURL = window.URL.createObjectURL(scope.fileList[0]);//考虑性能用后清除
            };
            scope.uploader.onSuccessItem = function (item, response) {//上传成功返回地址
                scope.logoUrl = response.data.url;
                console.log(scope.logoUrl);

        }
            //  scope.uploader.onCompleteItem=function(item,response){
            //     console.log(scope.logoUrl);
            // }
        }
    } 
}]);
