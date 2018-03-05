/**
 * Created by Administrator on 2017/8/5 0005.
 */

var Group=JSON.parse(sessionStorage.oStatus1);
var diedNum=JSON.parse(sessionStorage.diegroup);
var day=JSON.parse(sessionStorage.day);
// var play="";
/*设置状态，写方框。*/
for (var i=0;i<Group.length;i++) {/*i初始化为0，i小于数组的长度时i加1.*/
    $('.identity').eq(0).append(
   "<div class='news'><p class='civilian'>" + Group[i].identity +
        "</p><div class='news-foot'>" + (i + 1) + "号" + "</div></div>"
     )
    // $(".js4-1main").eq(0).html(play);//获取。js4-1main的索引0 。写入play
}
/*检查状态*/
var statusClass=$(".civilian");//获取显示的那个身份class
var x;
var killPeople;//死亡玩家号码

for(var j=0; j<Group.length;j++){//先检查玩家状态是killed或voted，再改变背景。
    if(Group[j].status=="killed"||Group[j].status=="voted"){
        statusClass[j].style.background="#9b9b9b";
    }
}
/*投票*/
for(x=0;x<statusClass.length;x++){
    statusClass[x].index=x;//动态变化statusClass的下标
    statusClass[x].onclick=function(){
        if(Group[this.index].status=="killed"||Group[this.index].status=="voted"){
            alert("我都死了，你还闹哪样？");//玩家被杀之后不能再被选择
        }else{
            if(Group[killPeople]!=undefined){
                statusClass[killPeople].style.background="#f5c97b";
                Group[killPeople].status="alive";//改回他们的身份状态和背景
                // console.log(diedNum);
            }
            statusClass[this.index].style.background="red";
            killPeople=this.index;
            Group[this.index].status="voted";
            console.log(Group);
            window.diedNum1=Group[this.index];//全局变量
            console.log(diedNum1);
            }}
            /*foot按钮*/
            function js4Btn(){
                if(killPeople==undefined){
                    alert("请投一个人物")
                }else{
                    diedNum1.day=(day);
                    diedNum.push(diedNum1);
                    sessionStorage.setItem("diegroup",JSON.stringify(diedNum));//保存被杀人物
                    sessionStorage.setItem("oStatus1",JSON.stringify(Group));
                    sessionStorage.setItem("day",JSON.stringify(day));
                    window.location.href="decryption.html";
                }
            }
}




