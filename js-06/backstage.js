angular.module('routingDemoApp',['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/0', {
            templateUrl: '0.html',
            controller: 'loginCtrl'
        })
    .when('/1', {
            templateUrl: '1.html',
            controller: '1Ctrl'
        })
            .when('/2', {
            templateUrl: '2.html',
            controller: '2Ctrl'
        })
            .when('/3', {
            templateUrl: '3.html',
            controller: '3Ctrl'
        })
            .when('/4', {
            templateUrl: '4.html',
            controller: '4Ctrl'
        })
            .when('/5', {
            templateUrl: '5.html',
            controller: '5Ctrl'
        }).otherwise({redirectTo: '/login'});
    }]);