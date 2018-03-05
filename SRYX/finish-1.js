/**
 * Created by Administrator on 2017/8/10 0010.
 */


var group=JSON.parse(sessionStorage.getItem("oStatus1"));//获取人物属性信息
var deathNum=JSON.parse(sessionStorage.getItem("diegroup"));//获取被杀人物属性信息
var figure=JSON.parse(sessionStorage.getItem("figure"));//人物名称
var notice=JSON.parse(sessionStorage.getItem("notice"));//获胜信息
// var killed=0;//杀手人数
//判断胜利
var killed=0;//活着的杀手
var peopleAll=0;//水民总数
for(var n=0;n<group.length;n++){
    if(group[n].identity=="杀手"&&group[n].status=="alive"){
        killed++;
    }else if(group[n].identity=="平民"){
        peopleAll++;
    }
}
var killAll=group.length-peopleAll;
console.log("玩家总人数:"+group.length,"水民总数:"+peopleAll,"杀手人数:"+killAll);
if(killed==0){
    $("#top-txt").html("平民胜利");
    $(".text-left").html("太棒了！你打败了杀手！在杀人游戏中取得了游戏最终的胜利哦！");

}else {//否则杀手胜利，要找到判断的条件，函数就好写了
    $("#top-txt").html("杀手胜利");
    $(".text-left").html("太棒了！你知道么？在杀人游戏中只有20%的杀手取得游戏最终的胜利哦！");
}
$("#killed").html(killAll);
$("#people").html(peopleAll);
//游戏记录

var details="";
for(var n=0;n<deathNum.length;n++) {
    if (deathNum[n].status == "killed") {
        details += '<div class="content2-1"><span class="content2-span1">' + "第" + deathNum[n].day + "天" +
            "</span><span class='content2-span2'>0小时07分</span><p>" +"白天：" + deathNum[n].num +
            "号，被杀手杀死，真实身份是" + deathNum[n].identity + "</p><p>"+"黑夜:"+ deathNum[n+1].num +
            "号，选民投死，真实身份是" + deathNum[n+1].identity + '</p></div>';
        console.log(details);
    }
    $(".content2").html(details);
}






































