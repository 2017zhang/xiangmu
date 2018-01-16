/**
 * Created by Administrator on 2017/9/26 0026.
 */
angular.module("userApp")
    .constant("type",[
            {value: 0,text: "首页Banner"},
            {value: 1,text: "找职位Banner"},
            {value: 2,text: "找精英Banner"},
            {value: 3,text: "行业大图"}
        ]
    )
    .constant("industry",[
            {value: 0,text: "移动互联网"},
            {value: 1,text: "电子商务"},
            {value: 2,text: "企业服务"},
            {value: 3,text: "O2O"},
            {value: 4,text: "教育"},
            {value: 5,text: "金融"},
            {value: 6,text: "游戏"}
        ]
    );