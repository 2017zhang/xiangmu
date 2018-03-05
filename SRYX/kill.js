/**
 *Created by fei.no 2017/7/25/001.
//  **/

var Group=JSON.parse(sessionStorage.getItem("oStatus1"));
if(sessionStorage.getItem("diegroup")){
    var diedNum=JSON.parse(sessionStorage.getItem("diegroup"));
    var day=JSON.parse(sessionStorage.getItem("day"));
}else{ var diedNum=[];
       var day=0;
}

console.log(diedNum);
var oStatus = Group;
// var Group=JSON.parse(oStatusAll);
console.log(oStatus);
var play="";

// /*判断是否添加属性*/
for(var a=0;a<Group.length;a++){
    if(Group[a].status!=="killed"){
    /*添加玩家属性*/
            $(".js4-1main").eq(0).html(play);
}}

/*加入方框--1*/
for(var i=0;i<Group.length;i++){
    play += "<div class='news'><p class='civilian'>"+Group[i].identity+
        "</p><div class='news-foot'>"+(i+1)+"号"+"</div></div>";
    $(".identity").eq(0).html(play);
}

/*检查状态*/
var statusClass=$(".civilian");//获取人物身份的class
var x;
var killPeople;//死亡玩家号码

for(var j=0;j<oStatus.length;j++){
    if(oStatus[j].status=="killed"||oStatus[j].status=="voted"){
        statusClass[j].style.background="#9b9b9b";
    }
}
{

    /*选择被杀对象*/
    for (x = 0; x < statusClass.length; x++) {
        statusClass[x].index = x;//动态变化statusClass的下标
        statusClass[x].onclick = function () {
            if (Group[this.index].identity == "杀手") {//如果选择的对象是杀手
                alert("自己人别开枪");
            } else {
                if (Group[killPeople] != undefined) {
                    statusClass[killPeople].style.background = "#F5C970";
                    oStatus[killPeople].status = "alive";
                }
                statusClass[this.index].style.background = "red";
                Group[this.index].status = "killed";
                killPeople = this.index;
                window.diedNum1=Group[this.index];//全局变量
                console.log(diedNum1);
            }
        }
    }
}
function js4Btn(){
              if(  killPeople ==undefined){
                  alert("杀手必须杀死一人")
              }else{
                  day++;
                  diedNum1.day=(day);
                  diedNum.push(diedNum1);//添加被杀人物
                  sessionStorage.setItem("diegroup",JSON.stringify(diedNum));//保存被杀人物
                  sessionStorage.setItem("oStatus1",JSON.stringify(oStatus));
                  sessionStorage.setItem("day",JSON.stringify(day));
                  window.location.href="decryption.html ";
              }
}
