/**
 *Created by .no 2017/7/25/001.
 **/

var wordGroup1=JSON.parse(sessionStorage.getItem("oStatus"));//把JSON字符串转换成数组。

console.log(wordGroup1);
/*新建*/
var oStatus=[];//存放单个玩家的生存状态的数组
for(var i=0;i<wordGroup1.length;i++){
    oStatus[i]={};//数组中的每个元素都是一个对象，包括身份，号码，状态
    oStatus[i].num=i+1;
    oStatus[i].identity=wordGroup1[i];//每个人的身份都是Group数组里面，下标[i]所对应的元素，水民或者杀手
    oStatus[i].status="alive";//默认每个人的生存状态都是alive
    oStatus.day=1;
}
for (var i=0;i<oStatus.length;i++) {//i初始化为0，i小于数组的长度时i加1.
    $('.identity').eq(0).append(
        "<div class='news'><p class='civilian'>"+oStatus[i].identity+"" +
        "</p><div class='news-foot'>"+(i+1)+"号"+"</div></div>"
    )
}
sessionStorage.setItem("oStatus1",JSON.stringify(oStatus));
