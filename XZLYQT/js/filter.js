/**
 * Created by hasee on 2017/11/25.
 */
var app = angular.module("myApp");

    app.filter("urlFilter", function ($sce) {
        return function (url) {
            if (url) {
                return $sce.trustAsResourceUrl(url);
            }
        }
    });

