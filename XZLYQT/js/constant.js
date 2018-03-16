/**
 * Created by hasee on 2017/11/6.
 */
var app= angular.module("myApp");


app.constant('classCons',
    [
        {name:"全部"},
        {name:"初一",grade:"1"},
        {name:"初二",grade:"2"},
        {name:"初三",grade:"3"},
        {name:"高一",grade:"4"},
        {name:"高二",grade:"5"},
        {name:"高三",grade:"6"}
    ]);




app.constant('subCons',
    [
        {name:"全部"},
        {name:"语文",sub:"1"},
        {name:"数学",sub:"2"},
        {name:"英语",sub:"3"},
        {name:"物理",sub:"4"},
        {name:"化学",sub:"5"},
        {name:"生物",sub:"6"}
    ]);