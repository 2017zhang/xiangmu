/**
 * Created by Administrator on 2017/7/12 0012.
 */
function loseFous(){
    var killer=document.getElementById("killer");
    var civilian=document.getElementById("civilian");
    killer.innerhTML=0;
    civilian.innerHTML=0;
    var txt =document.getElementById("txt").value;
    if(parseInt(txt)<4 || parseInt(txt) >18){
        alert("输入无效，请按提示信息输入");
        return false;
    }
    killer.innerHTML=Math.floor(txt/4);
    civilian.innerHTML=txt-killer.innerHTML;
}
function rel() {
    var a = [];
    var txt =document.getElementById("txt").value;
    var killer=Math.floor(txt/4);
    for (var i = 0; i < txt; i++) {
        a[i] = "平民"
    }
    // console.log(a)
    var b = killer;
    for (var c = 0; c < b; c++) {
        a[c] = "杀手"
    }
    // console.log(a)
    //开始打乱身份
    var res=[a];
    len=a.length;//获取a数组的长度。这个最好单独拎出来，不然写在for里i<arr.length会出错
    for(var i=0;i<len;i++){ //for循环语句,定义i是一个变量，赋值0，for循环结束条件只要i的值小于len变量，每循环一次i+1.
        var j=Math.floor(Math.random()*a.length);//向下取整，求随机数。a的数组长度
        res[i]=a[j];
        a.splice(j,1);
    }
    console.log(res);
var txt =document.getElementById("txt").value;
    if(parseInt(txt)<4||parseInt(txt)>18){
        alert("输入无效");
    }
    else{
        sessionStorage.setItem("oStatus",JSON.stringify(res));
        //res转化为json字符串，保存在sessionStorage.
        console.log(sessionStorage)
        window.location.href="draw.html";
    }

}
//
var roleNumber = document.getElementById("playerNum");
var roleBar = document.getElementById("playBar")
function getValue() {
    if (roleNumber.value >= 4 && roleNumber.value <= 18) {
        roleBar.value=roleNumber.value;
    } else {
        alert('请输入4-18之间的数字！');
        roleBar.value = 4;
        roleNumber.value = 4;
    }
}

function change() {
    roleNumber.value = roleBar.value;
}
//加号连接range取数
function minus() {
    roleBar.value--;
    roleNumber.value = roleBar.value;
    if (roleNumber.value < 4) {
        roleBar.value = 4;
    } else {
        roleNumber.value = roleBar.value;
    }
}
//减号连接range取数
function plus() {
    roleBar.value++;
    roleNumber.value = roleBar.value;
    if (roleNumber.value > 18) {
        roleBar.value = 18;
    } else {
        roleNumber.value = roleBar.value;
    }
}

var killer = [];
