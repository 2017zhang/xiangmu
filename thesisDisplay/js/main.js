/*global XLSX */
//-------------------------
function gain() {
    rankingTitle = [{   //排名结果标题
        "field": "teamName",
        "title": "球队"
    }, {
        "field": "rankingNum",
        "title": "预测排名"
    }];
    syntheticaValueTitle = [{       //综合值标题
        "field": "teamName",
        "title": "球队"
    }, {
        "field": "mainPlayerComprehensiveVal",
        "title": "主力综合值"
    }, {
        "field": "secondPassComprehensiveVal",
        "title": "二传综合值"
    }, {
        "field": "freeManComprehensiveVal",
        "title": "自由人综合值"
    }, {
        "field": "substituteComprehensiveVal",
        "title": "替补综合值"
    }, {
        "field": "weightComprehensiveVal",
        "title": "加权综合值"
    }];
    QueteletTitle = [{          //克托莱指数、HB、HS标题
        "field": "teamName",
        "title": "球队"
    }, {
        "field": "standarQuetelet",
        "title": "标准化克托莱指数"
    }, {
        "field": "standardHB",
        "title": "标准化HB"
    }, {
        "field": "standardHS",
        "title": "标准化HS"
    }];
    competitiveAbilityTitle = [{            //竞技能力标题
        "field": "teamName",
        "title": "球队"
    }, {
        "field": "num",
        "title": "号码"
    }, {
        "field": "name",
        "title": "姓名"
    }, {
        "field": "TOPSIS",
        "title": "TOPSIS(竞技能力)"
    }];
    //计算出的表格参数赋值，在遍历表格时引用
    rankingData = arr1;
    syntheticaValueData = arr2;
    QueteletData = arr3;
    competitiveMainData = arr4[0];
    competitiveTossData = arr4[1];
    freedomFreedomData = arr4[2];
    freedomSubstitutionData = arr4[3];
}
//获取表格标题和内容，遍历添加表格
function navtable(headline, parameter) {
    var dataA = headline;
    var dataB = parameter;
    var rowCount = dataB.length;
    var cellCount = dataA.length;
    var table = $("<table border=\"1\" class='table table-striped table-hover table-bordered'>");
    table.appendTo($("#createtable")); //把table添加到#createtable后面
    var trHeader = $("<therder><tr></tr></therder>");
    trHeader.appendTo(table);
    //            遍历表格标题
    for (var j = 0; j < cellCount; j++) {
        var i = 1;
        var td = $("<th style>" + dataA[j].title + "</th>");

        td.appendTo(trHeader);
        $("th").each(function () {
            $(this).attr("id", "th" + i++);
        });
    }

    //            表格内容
    for (var i = 0; i < rowCount; i++) {
        var tbody = $("<tbody></tbody>");
        var tr = $("<tr></tr>");
        tbody.appendTo(table);
        for (var j = 0; j < cellCount; j++) {
            var field = dataA[j].field;
            var val = "";
            if (dataB[i][field] != null) {
                val = dataB[i][field];
            }
            var td = $("<td>" + val + "</td>");
            td.appendTo(tr);
            tr.appendTo(trHeader);
        }
    }
    $("#createtable").append("</table>");

}
//点击查看的表格，清除之前的选择样式，添加当前选择表格选项的样式
function selected(x) {
    //            清除样式，内容
    $(".title-bar").css("color", "#000");
    $("#role").remove();
    $("table").remove();

    if (x == 1) {
        $(".Ranking").css("color", "#7ce45c");

    }
    if (x == 2) {
        $(".synthetical").css("color", "#7ce45c");
    }
    if (x == 3) {
        $(".exponent").css("color", "#7ce45c");
    }
    if (x == 4) {
        $(".competitive").css("color", "#7ce45c");
    }
}
//展示结果，获取表格的位置，默认遍历第一个表格
function PredictRanking(a) {
    selected(a);
    navtable(rankingTitle, rankingData);
}

//判断文件格式，添加文件名到页面，移除上一张表格的内容和计算的数据，当前选着的样式回到初始状态
$("#file").change(function (e) {
    var file = e.target.files[0];
    $(".title-bar").css("color", "#000");
    $("#fileName").empty();
    $('a').unbind("click");

    $('#createtable').empty();

    $("#fileName").empty();

    $("#fileName").append(file.name);
});

//   显示结果按钮添加样式和click事件，添加选择click事件传递位置和遍历表格的=标题内容的参数。
function showClick() {
    gain();
    $("#presentation").css("background", "#0099cc");
    $("#presentation").click(function () {
        // 添加点击事件
        $(".Ranking").click(
            function () {
                selected(1);
                navtable(rankingTitle, rankingData);
            }
        );

        $(".synthetical").click(function () {

            selected(2);
            navtable(syntheticaValueTitle, syntheticaValueData);
        });
        $(".exponent").click(function () {
            selected(3);

            navtable(QueteletTitle, QueteletData);
        });
        $(".competitive").click(
            function () {
                selected(4);

                $("#createtable").css("display", "");

                //        下拉框
                $("#createtable").append("<div id=\"role\"><select><option>主力球员</option><option>二传手</option><option>自由人</option><option>替补</option></select></div>");
                navtable(competitiveAbilityTitle, competitiveMainData);
                $("select").change(function () {
                    $("table").remove();
                    var check = $("select").get(0).selectedIndex;
                    console.log(check);
                    if (check == 0) {
                        navtable(competitiveAbilityTitle, competitiveMainData);
                    }
                    if (check == 1) {
                        navtable(competitiveAbilityTitle, competitiveTossData);
                    }
                    if (check == 2) {
                        navtable(competitiveAbilityTitle, freedomFreedomData);
                    }
                    if (check == 3) {
                        navtable(competitiveAbilityTitle, freedomSubstitutionData);
                    }
                });
            }
        );
        //点击展示结果默认渲染第一个表格
        PredictRanking(1);
    });
}

//------------计算模块-------------

var arr1 = [],
    arr2 = [],
    arr3 = [],
    arr4 = [];

$("#file").change(function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var workbook = XLSX.read(e.target.result, {
            type: "binary"
        });

        var col = [];
        var row = 0;
        var dataVal = [];
        var colW = [];
        var rowW = 0;
        var weightVal = [];

        //提取表格各sheet数据
        var sheets = [];
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                sheets.push(workbook.Sheets[sheet]);
            }
        }
      
        var playerData = XLSX.utils.sheet_to_formulae(sheets[0]);
        var weightData = XLSX.utils.sheet_to_formulae(sheets[1]);

        //第 min行到第max行数据计算构造函数
        function Player(min, max) {
            this.players = [];
            this.averageHB = averageHB(min, max);
            this.averageHS = averageHS(min, max);
            this.averageQuetelet = averageQuetelet(min, max);
            this.averageTopsis = averageTopsis(min, max);
            for (var i = 0; i <= max - min; i++) {
                this.players[i] = {
                    team: dataVal[min].B.replace(/[^\u4e00-\u9fa5]/gi, "").substring(0, 2),
                    num: dataVal[i + min].C,
                    name: dataVal[i + min].D,
                    HB: HBVal(i + min),
                    HS: HSVal(i + min),
                    Quetelet: queteletVal(i + min),
                    TOPSIS: topsisVal(i + min)
                };
            }
        }

        //数组取最大值和最小值方法
        function arrMaxNum(arr) {
            var maxNum = -Infinity;
            for (var i = 0; i < arr.length; i++) {
                arr[i] > maxNum ? maxNum = arr[i] : null;
            }
            return maxNum;
        }

        function arrMinNum(arr) {
            var minNum = Infinity;
            for (var i = 0; i < arr.length; i++) {
                arr[i] < minNum ? minNum = arr[i] : null;
            }
            return minNum;
        }

        //数组sort排序比较规则
        function compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value2 - value1; // 降序
            };
        }

        //检测计算过程，计算错误显示提示信息
        try {
            $.each(playerData, function (i, val) {
                var list = val.split("='");
                row = /^[A-Z]+(\d+)$/.exec(list[0])[1];
                col.indexOf(/^([A-Z]+)\d+$/.exec(list[0])[1]) == -1 ? col.push(/^([A-Z]+)\d+$/.exec(list[0])[1]) : "";
            });

            col = col.sort();

            for (var i = 0; i < Number(row) + 5; i++) {
                var obj = {};
                $.each(col, function (i, val) {
                    obj[val] = "";
                });
                dataVal[i] = obj;
            }

            $.each(playerData, function (i, val) {
                var list = val.split("='");
                var code = /^([A-Z]+)\d+$/.exec(list[0])[1];
                row = /^[A-Z]+(\d+)$/.exec(list[0])[1];
                dataVal[row - 1][code] = list[1];
            });

            $.each(weightData, function (i, val) {
                var list = val.split("='");
                rowW = /^[A-Z]+(\d+)$/.exec(list[0])[1];
                colW.indexOf(/^([A-Z]+)\d+$/.exec(list[0])[1]) == -1 ? colW.push(/^([A-Z]+)\d+$/.exec(list[0])[1]) : "";
            });

            colW = colW.sort();

            for (var w = 0; w < Number(rowW); w++) {
                var objW = {};
                $.each(col, function (i, val) {
                    objW[val] = "";
                });
                weightVal[w] = objW;
            }

            $.each(weightData, function (i, val) {
                var list = val.split("='");
                var code = /^([A-Z]+)\d+$/.exec(list[0])[1];
                rowW = /^[A-Z]+(\d+)$/.exec(list[0])[1];
                weightVal[rowW - 1][code] = list[1];
            });

            dataVal.unshift(col);
            weightVal.unshift(colW);
           
            //获取第i行的HB、HS、Quetelet、TOPSIS
            var HBVal = function (i) {
                return parseFloat(dataVal[i].H) - parseFloat(dataVal[i].E);
            };

            var HSVal = function (i) {
                return dataVal[i].G - dataVal[i].E;
            };

            var queteletVal = function (i) {
                return 1000 * dataVal[i].F / dataVal[i].E;
            };

            var topsisVal = function (i) {
                var spikeScorePTC = (parseFloat(dataVal[i].I) + parseFloat(dataVal[i].J) + parseFloat(dataVal[i].K)) === 0 ? 0 : parseFloat(dataVal[i].I) / (parseFloat(dataVal[i].I) + parseFloat(dataVal[i].J) + parseFloat(dataVal[i].K)),
                    spikeMisPTC = (parseFloat(dataVal[i].I) + parseFloat(dataVal[i].J) + parseFloat(dataVal[i].K)) === 0 ? 0 : parseFloat(dataVal[i].J) / (parseFloat(dataVal[i].I) + parseFloat(dataVal[i].J) + parseFloat(dataVal[i].K)),
                    spikeOrdPTC = (parseFloat(dataVal[i].I) + parseFloat(dataVal[i].J) + parseFloat(dataVal[i].K)) === 0 ? 0 : parseFloat(dataVal[i].K) / (parseFloat(dataVal[i].I) + parseFloat(dataVal[i].J) + parseFloat(dataVal[i].K));

                var blockScorePTC = (parseFloat(dataVal[i].L) + parseFloat(dataVal[i].M) + parseFloat(dataVal[i].N)) === 0 ? 0 : parseFloat(dataVal[i].L) / (parseFloat(dataVal[i].L) + parseFloat(dataVal[i].M) + parseFloat(dataVal[i].N)),
                    blockMisPTC = (parseFloat(dataVal[i].L) + parseFloat(dataVal[i].M) + parseFloat(dataVal[i].N)) === 0 ? 0 : parseFloat(dataVal[i].M) / (parseFloat(dataVal[i].L) + parseFloat(dataVal[i].M) + parseFloat(dataVal[i].N)),
                    blockOrdPTC = (parseFloat(dataVal[i].L) + parseFloat(dataVal[i].M) + parseFloat(dataVal[i].N)) === 0 ? 0 : parseFloat(dataVal[i].N) / (parseFloat(dataVal[i].L) + parseFloat(dataVal[i].M) + parseFloat(dataVal[i].N));

                var serveScorePTC = (parseFloat(dataVal[i].O) + parseFloat(dataVal[i].P) + parseFloat(dataVal[i].Q)) === 0 ? 0 : parseFloat(dataVal[i].O) / (parseFloat(dataVal[i].O) + parseFloat(dataVal[i].P) + parseFloat(dataVal[i].Q)),
                    serveMisPTC = (parseFloat(dataVal[i].O) + parseFloat(dataVal[i].P) + parseFloat(dataVal[i].Q)) === 0 ? 0 : parseFloat(dataVal[i].P) / (parseFloat(dataVal[i].O) + parseFloat(dataVal[i].P) + parseFloat(dataVal[i].Q)),
                    serveOrdPTC = (parseFloat(dataVal[i].O) + parseFloat(dataVal[i].P) + parseFloat(dataVal[i].Q)) === 0 ? 0 : parseFloat(dataVal[i].Q) / (parseFloat(dataVal[i].O) + parseFloat(dataVal[i].P) + parseFloat(dataVal[i].Q));

                var defenseScorePTC = (parseFloat(dataVal[i].R) + parseFloat(dataVal[i].S) + parseFloat(dataVal[i].T)) === 0 ? 0 : parseFloat(dataVal[i].R) / (parseFloat(dataVal[i].R) + parseFloat(dataVal[i].S) + parseFloat(dataVal[i].T)),
                    defenseMisPTC = (parseFloat(dataVal[i].R) + parseFloat(dataVal[i].S) + parseFloat(dataVal[i].T)) === 0 ? 0 : parseFloat(dataVal[i].S) / (parseFloat(dataVal[i].R) + parseFloat(dataVal[i].S) + parseFloat(dataVal[i].T)),
                    defenseOrdPTC = (parseFloat(dataVal[i].R) + parseFloat(dataVal[i].S) + parseFloat(dataVal[i].T)) === 0 ? 0 : parseFloat(dataVal[i].T) / (parseFloat(dataVal[i].R) + parseFloat(dataVal[i].S) + parseFloat(dataVal[i].T));

                var passScorePTC = (parseFloat(dataVal[i].U) + parseFloat(dataVal[i].V) + parseFloat(dataVal[i].W)) === 0 ? 0 : parseFloat(dataVal[i].U) / (parseFloat(dataVal[i].U) + parseFloat(dataVal[i].V) + parseFloat(dataVal[i].W)),
                    passMisPTC = (parseFloat(dataVal[i].U) + parseFloat(dataVal[i].V) + parseFloat(dataVal[i].W)) === 0 ? 0 : parseFloat(dataVal[i].V) / (parseFloat(dataVal[i].U) + parseFloat(dataVal[i].V) + parseFloat(dataVal[i].W)),
                    passOrdPTC = (parseFloat(dataVal[i].U) + parseFloat(dataVal[i].V) + parseFloat(dataVal[i].W)) === 0 ? 0 : parseFloat(dataVal[i].W) / (parseFloat(dataVal[i].U) + parseFloat(dataVal[i].V) + parseFloat(dataVal[i].W));

                var serveBallScorePTC = (parseFloat(dataVal[i].X) + parseFloat(dataVal[i].Y) + parseFloat(dataVal[i].Z)) === 0 ? 0 : parseFloat(dataVal[i].X) / (parseFloat(dataVal[i].X) + parseFloat(dataVal[i].Y) + parseFloat(dataVal[i].Z)),
                    serveBallMisPTC = (parseFloat(dataVal[i].X) + parseFloat(dataVal[i].Y) + parseFloat(dataVal[i].Z)) === 0 ? 0 : parseFloat(dataVal[i].Y) / (parseFloat(dataVal[i].X) + parseFloat(dataVal[i].Y) + parseFloat(dataVal[i].Z)),
                    serveBallOrdPTC = (parseFloat(dataVal[i].X) + parseFloat(dataVal[i].Y) + parseFloat(dataVal[i].Z)) === 0 ? 0 : parseFloat(dataVal[i].Z) / (parseFloat(dataVal[i].X) + parseFloat(dataVal[i].Y) + parseFloat(dataVal[i].Z));
                var a, b;
                // 二传topsis

                if (i >= 51 && i <= 66) {
                    a = weightVal[12].B * (Math.pow((serveScorePTC - weightVal[14].B), 2) + Math.pow((serveMisPTC - weightVal[14].C), 2) + Math.pow((serveOrdPTC - weightVal[14].D), 2)) +
                        weightVal[12].E * (Math.pow((defenseScorePTC - weightVal[14].E), 2) + Math.pow((defenseMisPTC - weightVal[14].F), 2) + Math.pow((defenseOrdPTC - weightVal[14].G), 2)) +
                        weightVal[12].H * (Math.pow((passScorePTC - weightVal[14].H), 2) + Math.pow((passMisPTC - weightVal[14].I), 2) + Math.pow((passOrdPTC - weightVal[14].J), 2));

                    b = weightVal[12].B * (Math.pow((serveScorePTC - weightVal[15].B), 2) + Math.pow((serveMisPTC - weightVal[15].C), 2) + Math.pow((serveOrdPTC - weightVal[15].D), 2)) +
                        weightVal[12].E * (Math.pow((defenseScorePTC - weightVal[15].E), 2) + Math.pow((defenseMisPTC - weightVal[15].F), 2) + Math.pow((defenseOrdPTC - weightVal[15].G), 2)) +
                        weightVal[12].H * (Math.pow((passScorePTC - weightVal[15].H), 2) + Math.pow((passMisPTC - weightVal[15].I), 2) + Math.pow((passOrdPTC - weightVal[15].J), 2));
                    //自由人topsis
                } else if (i >= 67 && i <= 82) {

                    a = weightVal[20].B * (Math.pow((defenseScorePTC - weightVal[22].B), 2) + Math.pow((defenseMisPTC - weightVal[22].C), 2) + Math.pow((defenseOrdPTC - weightVal[22].D), 2)) +
                        weightVal[20].E * (Math.pow((passScorePTC - weightVal[22].E), 2) + Math.pow((passMisPTC - weightVal[22].F), 2) + Math.pow((passOrdPTC - weightVal[22].G), 2)) +
                        weightVal[20].H * (Math.pow((serveBallScorePTC - weightVal[22].H), 2) + Math.pow((serveBallMisPTC - weightVal[22].I), 2) + Math.pow((serveBallOrdPTC - weightVal[22].J), 2));

                    b = weightVal[20].B * (Math.pow((defenseScorePTC - weightVal[23].B), 2) + Math.pow((defenseMisPTC - weightVal[23].C), 2) + Math.pow((defenseOrdPTC - weightVal[23].D), 2)) +
                        weightVal[20].E * (Math.pow((passScorePTC - weightVal[23].E), 2) + Math.pow((passMisPTC - weightVal[23].F), 2) + Math.pow((passOrdPTC - weightVal[23].G), 2)) +
                        weightVal[20].H * (Math.pow((serveBallScorePTC - weightVal[23].H), 2) + Math.pow((serveBallMisPTC - weightVal[23].I), 2) + Math.pow((serveBallOrdPTC - weightVal[23].J), 2));
                    //主力和替补topsis
                } else {

                    a = weightVal[4].B * (Math.pow((spikeScorePTC - weightVal[6].B), 2) + Math.pow((spikeMisPTC - weightVal[6].C), 2) + Math.pow((spikeOrdPTC - weightVal[6].D), 2)) +
                        weightVal[4].E * (Math.pow((blockScorePTC - weightVal[6].E), 2) + Math.pow((blockMisPTC - weightVal[6].F), 2) + Math.pow((blockOrdPTC - weightVal[6].G), 2)) +
                        weightVal[4].H * (Math.pow((serveScorePTC - weightVal[6].H), 2) + Math.pow((serveMisPTC - weightVal[6].I), 2) + Math.pow((serveOrdPTC - weightVal[6].J), 2)) +
                        weightVal[4].K * (Math.pow((defenseScorePTC - weightVal[6].K), 2) + Math.pow((defenseMisPTC - weightVal[6].L), 2) + Math.pow((defenseOrdPTC - weightVal[6].M), 2)) +
                        weightVal[4].N * (Math.pow((passScorePTC - weightVal[6].N), 2) + Math.pow((passMisPTC - weightVal[6].O), 2) + Math.pow((passOrdPTC - weightVal[6].P), 2)) +
                        weightVal[4].Q * (Math.pow((serveBallScorePTC - weightVal[6].Q), 2) + Math.pow((serveBallMisPTC - weightVal[6].R), 2) + Math.pow((serveBallOrdPTC - weightVal[6].S), 2));

                    b = weightVal[4].B * (Math.pow((spikeScorePTC - weightVal[7].B), 2) + Math.pow((spikeMisPTC - weightVal[7].C), 2) + Math.pow((spikeOrdPTC - weightVal[7].D), 2)) +
                        weightVal[4].E * (Math.pow((blockScorePTC - weightVal[7].E), 2) + Math.pow((blockMisPTC - weightVal[7].F), 2) + Math.pow((blockOrdPTC - weightVal[7].G), 2)) +
                        weightVal[4].H * (Math.pow((serveScorePTC - weightVal[7].H), 2) + Math.pow((serveMisPTC - weightVal[7].I), 2) + Math.pow((serveOrdPTC - weightVal[7].J), 2)) +
                        weightVal[4].K * (Math.pow((defenseScorePTC - weightVal[7].K), 2) + Math.pow((defenseMisPTC - weightVal[7].L), 2) + Math.pow((defenseOrdPTC - weightVal[7].M), 2)) +
                        weightVal[4].N * (Math.pow((passScorePTC - weightVal[7].N), 2) + Math.pow((passMisPTC - weightVal[7].O), 2) + Math.pow((passOrdPTC - weightVal[7].P), 2)) +
                        weightVal[4].Q * (Math.pow((serveBallScorePTC - weightVal[7].Q), 2) + Math.pow((serveBallMisPTC - weightVal[7].R), 2) + Math.pow((serveBallOrdPTC - weightVal[7].S), 2));
                }
                var topsis = (Math.sqrt(a) + Math.sqrt(b)) === 0 ? 0 : 10 * Math.sqrt(b) / ((Math.sqrt(a) + Math.sqrt(b)));
                return topsis;
            };

            console.log(topsisVal(3)); //eslint-disable-line

            //获取第min行到第max行的HB、HS、Quetelet、TOPSIS的平均值
            var averageHB = function (min, max) {
                var sum = 0;
                var emptyNum = 0;
                for (var i = min; i <= max; i++) {
                    if (HBVal(i)) {
                        sum += HBVal(i);
                    } else {
                        emptyNum += 1;
                    }
                }
                return sum / (max - min + 1 - emptyNum);
            };

            var averageHS = function (min, max) {
                var sum = 0;
                var emptyNum = 0;
                for (var i = min; i <= max; i++) {
                    if (HSVal(i)) {
                        sum += HSVal(i);
                    } else {
                        emptyNum += 1;
                    }
                }
                return sum / (max - min + 1 - emptyNum);
            };

            var averageQuetelet = function (min, max) {
                var sum = 0;
                var emptyNum = 0;
                for (var i = min; i <= max; i++) {
                    if (queteletVal(i)) {
                        sum += queteletVal(i);
                    } else {
                        emptyNum += 1;
                    }

                }
                return sum / (max - min + 1 - emptyNum);
            };

            var averageTopsis = function (min, max) {
                var sum = 0;
                var emptyNum = 0;
                for (var i = min; i <= max; i++) {
                    if (isNaN(topsisVal(i))) {
                        emptyNum += 1;

                    } else {
                        sum += topsisVal(i);
                    }

                }
                return sum / (max - min + 1 - emptyNum);
            };

            //定义各球队对象和球队所在数组
            var teamArr = [{}, {}, {}, {}, {}, {}, {}, {}];

            //定义数据中第n行开始，规定主力球员6人，二传和自由人各2人，替补5人；excel表格从n行开始按主力、二传、自由人顺序排布；
            var n = 3; //主力球员数据起始行
            var m = 3 + teamArr.length * 6; //二传球员数据起始行
            var x = 3 + teamArr.length * 8; //自由人球员数据起始行
            var y = 3 + teamArr.length * 10; //替补球员数据起始行
            var z = 3; //球队名

            //定义所有球队各球员平均值数据数组
            var mainPlayerHB = [], // 所有球队主力球员HB平均值数组
                mainPlayerHS = [],
                mainPlayerQuetelet = [],
                mainPlayerTopsis = [];

            var secondPassHB = [],
                secondPassHS = [],
                secondPassQuetelet = [],
                secondPassTopsis = [];

            var freeManHB = [],
                freeManHS = [],
                freeManQuetelet = [],
                freeManTopsis = [];

            var substituteHB = [],
                substituteHS = [],
                substituteQuetelet = [],
                substituteTopsis = [];

            //对各球队赋值；
            for (var l = 0; l < teamArr.length; l++) {
                teamArr[l].teamName = dataVal[z].B.replace(/[^\u4e00-\u9fa5]/gi, "").substring(0, 2);
                z += 6;
                teamArr[l].mainPlayer = new Player(n, n += 5);
                n++;
                teamArr[l].secondPass = new Player(m, m += 1);
                m++;
                teamArr[l].freeMan = new Player(x, x += 1);
                x++;
                teamArr[l].substitute = new Player(y, y += 4);
                y++;

                mainPlayerHB[l] = teamArr[l].mainPlayer.averageHB;
                mainPlayerHS[l] = teamArr[l].mainPlayer.averageHS;
                mainPlayerQuetelet[l] = teamArr[l].mainPlayer.averageQuetelet;
                mainPlayerTopsis[l] = teamArr[l].mainPlayer.averageTopsis;

                secondPassHB[l] = teamArr[l].secondPass.averageHB;
                secondPassHS[l] = teamArr[l].secondPass.averageHS;
                secondPassQuetelet[l] = teamArr[l].secondPass.averageQuetelet;
                secondPassTopsis[l] = teamArr[l].secondPass.averageTopsis;

                freeManHB[l] = teamArr[l].freeMan.averageHB;
                freeManHS[l] = teamArr[l].freeMan.averageHS;
                freeManQuetelet[l] = teamArr[l].freeMan.averageQuetelet;
                freeManTopsis[l] = teamArr[l].freeMan.averageTopsis;

                substituteHB[l] = teamArr[l].substitute.averageHB;
                substituteHS[l] = teamArr[l].substitute.averageHS;
                substituteQuetelet[l] = teamArr[l].substitute.averageQuetelet;
                substituteTopsis[l] = teamArr[l].substitute.averageTopsis;
            }
        } catch (error) {
            alert("表格数据格式错误");
            return false;
        }

        //计算各球队各类型球员的各项数据标准值、球员综合值以及球队权重综合值

        for (var a = 0; a < teamArr.length; a++) {
            teamArr[a].mainPlayer.standardHB = (arrMaxNum(mainPlayerHB) - arrMinNum(mainPlayerHB)) === 0 ? 0 : (teamArr[a].mainPlayer.averageHB - arrMinNum(mainPlayerHB)) / (arrMaxNum(mainPlayerHB) - arrMinNum(mainPlayerHB));
            teamArr[a].mainPlayer.standardHS = (arrMaxNum(mainPlayerHS) - arrMinNum(mainPlayerHS)) === 0 ? 0 : (teamArr[a].mainPlayer.averageHS - arrMinNum(mainPlayerHS)) / (arrMaxNum(mainPlayerHS) - arrMinNum(mainPlayerHS));
            teamArr[a].mainPlayer.standarQuetelet = (arrMaxNum(mainPlayerQuetelet) - arrMinNum(mainPlayerQuetelet)) === 0 ? 0 : (teamArr[a].mainPlayer.averageQuetelet - arrMinNum(mainPlayerQuetelet)) / (arrMaxNum(mainPlayerQuetelet) - arrMinNum(mainPlayerQuetelet));
            teamArr[a].mainPlayer.standarTopsis = (arrMaxNum(mainPlayerTopsis) - arrMinNum(mainPlayerTopsis)) === 0 ? 0 : (teamArr[a].mainPlayer.averageTopsis - arrMinNum(mainPlayerTopsis)) / (arrMaxNum(mainPlayerTopsis) - arrMinNum(mainPlayerTopsis));
            teamArr[a].mainPlayerComprehensiveVal = teamArr[a].mainPlayer.standardHB + teamArr[a].mainPlayer.standardHS + teamArr[a].mainPlayer.standarQuetelet + teamArr[a].mainPlayer.standarTopsis;

            teamArr[a].secondPass.standardHB = (arrMaxNum(secondPassHB) - arrMinNum(secondPassHB)) === 0 ? 0 : (teamArr[a].secondPass.averageHB - arrMinNum(secondPassHB)) / (arrMaxNum(secondPassHB) - arrMinNum(secondPassHB));
            teamArr[a].secondPass.standardHS = (arrMaxNum(secondPassHS) - arrMinNum(secondPassHS)) === 0 ? 0 : (teamArr[a].secondPass.averageHS - arrMinNum(secondPassHS)) / (arrMaxNum(secondPassHS) - arrMinNum(secondPassHS));
            teamArr[a].secondPass.standarQuetelet = (arrMaxNum(secondPassQuetelet) - arrMinNum(secondPassQuetelet)) === 0 ? 0 : (teamArr[a].secondPass.averageQuetelet - arrMinNum(secondPassQuetelet)) / (arrMaxNum(secondPassQuetelet) - arrMinNum(secondPassQuetelet));
            teamArr[a].secondPass.standarTopsis = (arrMaxNum(secondPassTopsis) - arrMinNum(secondPassTopsis)) === 0 ? 0 : (teamArr[a].secondPass.averageTopsis - arrMinNum(secondPassTopsis)) / (arrMaxNum(secondPassTopsis) - arrMinNum(secondPassTopsis));
            teamArr[a].secondPassComprehensiveVal = teamArr[a].secondPass.standardHB + teamArr[a].secondPass.standardHS + teamArr[a].secondPass.standarQuetelet + teamArr[a].secondPass.standarTopsis;

            teamArr[a].freeMan.standardHB = (arrMaxNum(freeManHB) - arrMinNum(freeManHB)) === 0 ? 0 : (teamArr[a].freeMan.averageHB - arrMinNum(freeManHB)) / (arrMaxNum(freeManHB) - arrMinNum(freeManHB));
            teamArr[a].freeMan.standardHS = (arrMaxNum(freeManHS) - arrMinNum(freeManHS)) === 0 ? 0 : (teamArr[a].freeMan.averageHS - arrMinNum(freeManHS)) / (arrMaxNum(freeManHS) - arrMinNum(freeManHS));
            teamArr[a].freeMan.standarQuetelet = (arrMaxNum(freeManQuetelet) - arrMinNum(freeManQuetelet)) === 0 ? 0 : (teamArr[a].freeMan.averageQuetelet - arrMinNum(freeManQuetelet)) / (arrMaxNum(freeManQuetelet) - arrMinNum(freeManQuetelet));
            teamArr[a].freeMan.standarTopsis = (arrMaxNum(freeManTopsis) - arrMinNum(freeManTopsis)) === 0 ? 0 : (teamArr[a].freeMan.averageTopsis - arrMinNum(freeManTopsis)) / (arrMaxNum(freeManTopsis) - arrMinNum(freeManTopsis));
            teamArr[a].freeManComprehensiveVal = teamArr[a].freeMan.standardHB + teamArr[a].freeMan.standardHS + teamArr[a].freeMan.standarQuetelet + teamArr[a].freeMan.standarTopsis;

            teamArr[a].substitute.standardHB = (arrMaxNum(substituteHB) - arrMinNum(substituteHB)) === 0 ? 0 : (teamArr[a].substitute.averageHB - arrMinNum(substituteHB)) / (arrMaxNum(substituteHB) - arrMinNum(substituteHB));
            teamArr[a].substitute.standardHS = (arrMaxNum(substituteHS) - arrMinNum(substituteHS)) === 0 ? 0 : (teamArr[a].substitute.averageHS - arrMinNum(substituteHS)) / (arrMaxNum(substituteHS) - arrMinNum(substituteHS));
            teamArr[a].substitute.standarQuetelet = (arrMaxNum(substituteQuetelet) - arrMinNum(substituteQuetelet)) === 0 ? 0 : (teamArr[a].substitute.averageQuetelet - arrMinNum(substituteQuetelet)) / (arrMaxNum(substituteQuetelet) - arrMinNum(substituteQuetelet));
            teamArr[a].substitute.standarTopsis = (arrMaxNum(substituteTopsis) - arrMinNum(substituteTopsis)) === 0 ? 0 : (teamArr[a].substitute.averageTopsis - arrMinNum(substituteTopsis)) / (arrMaxNum(substituteTopsis) - arrMinNum(substituteTopsis));
            teamArr[a].substituteComprehensiveVal = teamArr[a].substitute.standardHB + teamArr[a].substitute.standardHS + teamArr[a].substitute.standarQuetelet + teamArr[a].substitute.standarTopsis;

            teamArr[a].standardHB = (teamArr[a].mainPlayer.standardHB + teamArr[a].secondPass.standardHB + teamArr[a].freeMan.standardHB + teamArr[a].substitute.standardHB) / 4;
            teamArr[a].standardHS = (teamArr[a].mainPlayer.standardHS + teamArr[a].secondPass.standardHS + teamArr[a].freeMan.standardHS + teamArr[a].substitute.standardHS) / 4;
            teamArr[a].standarQuetelet = (teamArr[a].mainPlayer.standarQuetelet + teamArr[a].secondPass.standarQuetelet + teamArr[a].freeMan.standarQuetelet + teamArr[a].substitute.standarQuetelet) / 4;
            teamArr[a].standarTopsis = (teamArr[a].mainPlayer.standarTopsis + teamArr[a].secondPass.standarTopsis + teamArr[a].freeMan.standarTopsis + teamArr[a].substitute.standarTopsis) / 4;

            teamArr[a].weightComprehensiveVal = teamArr[a].mainPlayerComprehensiveVal * weightVal[28].B + teamArr[a].secondPassComprehensiveVal * weightVal[28].C + teamArr[a].freeManComprehensiveVal * weightVal[28].D + teamArr[a].substituteComprehensiveVal * weightVal[28].E;
            if (isNaN(teamArr[a].weightComprehensiveVal)) {
                alert("球员数据缺失");
                break;

            }

        }


        //球队排名
        var teamRanking = teamArr.sort(compare("weightComprehensiveVal"));

        arr1 = [{}, {}, {}, {}, {}, {}, {}, {}];
        arr2 = [{}, {}, {}, {}, {}, {}, {}, {}];
        arr3 = [{}, {}, {}, {}, {}, {}, {}, {}];
        arr4 = [
            [],
            [],
            [],
            []
        ];

        $.each(teamRanking, function (i, val) {
            arr1[i].teamName = val.teamName;
            arr1[i].rankingNum = i + 1;
            arr2[i].teamName = val.teamName;
            arr2[i].mainPlayerComprehensiveVal = val.mainPlayerComprehensiveVal.toFixed(7);
            arr2[i].secondPassComprehensiveVal = val.secondPassComprehensiveVal.toFixed(7);
            arr2[i].freeManComprehensiveVal = val.freeManComprehensiveVal.toFixed(7);
            arr2[i].substituteComprehensiveVal = val.substituteComprehensiveVal.toFixed(7);
            arr2[i].weightComprehensiveVal = val.weightComprehensiveVal.toFixed(7);
            arr3[i].teamName = val.teamName;
            arr3[i].standarQuetelet = val.standarQuetelet.toFixed(7);
            arr3[i].standardHB = val.standardHB.toFixed(7);
            arr3[i].standardHS = val.standardHS.toFixed(7);

            for (var e = 0; e < 6; e++) {
                var mainPlayerObj = {};
                if (val.mainPlayer.players[e].num) {
                    mainPlayerObj.teamName = val.mainPlayer.players[e].team;
                    mainPlayerObj.num = val.mainPlayer.players[e].num;
                    mainPlayerObj.name = val.mainPlayer.players[e].name;
                    mainPlayerObj.TOPSIS = val.mainPlayer.players[e].TOPSIS.toFixed(7);

                }
                arr4[0].push(mainPlayerObj);
            }
            for (var f = 0; f < 2; f++) {
                var secondPassObj = {};
                var freeManObj = {};
                if (val.secondPass.players[f].num) {
                    secondPassObj.teamName = val.secondPass.players[f].team;
                    secondPassObj.num = val.secondPass.players[f].num;
                    secondPassObj.name = val.secondPass.players[f].name;
                    secondPassObj.TOPSIS = val.secondPass.players[f].TOPSIS.toFixed(7);

                    freeManObj.teamName = val.freeMan.players[f].team;
                    freeManObj.num = val.freeMan.players[f].num;
                    freeManObj.name = val.freeMan.players[f].name;
                    freeManObj.TOPSIS = val.freeMan.players[f].TOPSIS.toFixed(7);
                }
                arr4[1].push(secondPassObj);
                arr4[2].push(freeManObj);
            }
            for (var g = 0; g < 5; g++) {
                var substituteObj = {};
                if (val.substitute.players[g].num) {
                    substituteObj.teamName = val.substitute.players[g].team;
                    substituteObj.num = val.substitute.players[g].num;
                    substituteObj.name = val.substitute.players[g].name;
                    substituteObj.TOPSIS = val.substitute.players[g].TOPSIS.toFixed(7);
                }
                arr4[3].push(substituteObj);
            }
        });
        
        // 计算完毕执行显示结果
        showClick();
    };

    reader.readAsBinaryString(file);
});