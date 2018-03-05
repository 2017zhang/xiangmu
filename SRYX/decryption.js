/**
 * Created by Administrator on 2017/8/3 0003.
 */
var oStatusAll=sessionStorage.oStatus1;
console.log(oStatusAll);
var playerGroup=JSON.parse(oStatusAll);//把JSON字符串转换成数组；
console.log(playerGroup);
var mainContanter="";//加空字符串，因为+=，第一次相加要做有个空字符串的赋值
var killerLive=0;
var peopleLive=0;
var diedNum=0;
/*显示死亡玩家信息*/
for(var n=0;n<playerGroup.length;n++){
    if(playerGroup[n].status=="killed"){
        mainContanter += n+1+"号被杀死了，真实身份是"+playerGroup[n].identity+"<br/>";
        console.log(mainContanter);
        $(".js4-dayBlack-container").html(mainContanter);//每次都写下HTML，这是一个循环，所以不用担心会被
    }
    if(playerGroup[n].status=="voted"){
        mainContanter += n +1+"号被投死了，真实身份是"+playerGroup[n].identity+"<br/>"
        console.log(mainContanter);
        $(".js4-dayBlack-container").html(mainContanter);
    }
}
console.log(mainContanter);
/*判断胜利*/
for(var n=0;n<playerGroup.length;n++){
    if(playerGroup[n].status=="killed"||playerGroup[n].status=="voted"){
        diedNum++;//死亡玩家数量
    }
}
console.log(diedNum);
for(var n=0;n<playerGroup.length;n++){//当n小于数组长度时，n加一
    if (playerGroup[n].status=="alive"){
        if (playerGroup[n].identity=="平民"){
            peopleLive++ ;//存活的水民数量
        }else {
            killerLive++;//存活的杀手数量
        }
    }
}
console.log(peopleLive,killerLive);
var water=["水民获胜，查看结果"];
var killer=["杀手获胜，查看结果"];
var water1=["水民获胜"];
var killer1=["杀手获胜"];
if(killerLive==0){
    sessionStorage.setItem("notice",JSON.stringify(water1));
    console.log(killer1);
    $("#js4-dayBlackBtn").text(water).click(function(){
        window.location.href="finish.html";//结果页
    })
}else if(killerLive>=peopleLive){
    sessionStorage.setItem("notice",JSON.stringify(killer1));
    $("#js4-dayBlackBtn").text(killer).click(function(){
        window.location.href="finish.html";
    })
}else if((diedNum+2)%2==0){
    $("#js4-dayBlackBtn").text("第"+(diedNum+2)/2+"天").click(function(){
        window.location.href="kill.html";
        })
}else{
    $("#js4-dayBlackBtn").text("去投票").click(function(){
        window.location.href="people.html";
    })
}
