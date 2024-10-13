//var ary2d=[
    //[1,2,3], //index 0
    //[4,5,6], //index 1
    //[7,8,9]  //index 2
//];
//row
//ary2d[1][2]
//var Ans=[0,1,2,3,4,5,6,7,8,9];
 //get index 0 at Ans:   Ans[0]
 //get 6 in ary2d?
//  ary2d[1].push("N");
//  [
//     [1,2,3], //index 0
//     [4,5,6,"N"], //index 1
//     [7,8,9]  //index 2

// ];
//  ary2d.push("N")
//  [
//     [1,2,3], //index 0
//     [4,5,6], //index 1
//     [7,8,9],  //index 2
//     "N"
// ];

//push ["A","B","C"] to ary2d?
//ary2d.push(["A","B","C"])
// ary2d[3].push("A");
// ary2d[3].push("B");
// ary2d[3].push("C");
//console.log(ary2d)

//使用加法讓陣列內容逐漸變大
var row = 9, col = 7;//子陣列個數，子陣列內容個數
var dynaAry2d = [];//主陣列
var x = 0;//行樹逐漸增加

for (var _row = 0; _row < row; _row++) {
    dynaAry2d.push([]);
    for (var _col = 0; _col < col; _col++) {
        dynaAry2d[_row].push(_col + x);//可以改成:dynaAry2d[_row].push(_row * col + _col);
    }
    x += 7;
}

console.log("使用加法讓陣列內容逐漸變大");
console.log(JSON.stringify(dynaAry2d));//使輸出結果不要換行

//使輸出變成在其陣列裡的位址
var row = 9, col = 7;//子陣列個數，子陣列內容個數
var dynaAry2d = [];//主陣列

for (var _row = 0; _row < row; _row++) {
    dynaAry2d.push([]);
    for (var _col = 0; _col < col; _col++) {
        dynaAry2d[_row].push(`${_row},${_col}`);//可以改成:dynaAry2d[_row].push(_row + ',' + _col);
    }
}

console.log("使輸出變成在其陣列裡的位址");
console.log(JSON.stringify(dynaAry2d));//使輸出結果不要換行

//使輸出結果隨機遞增
var row = 9, col = 7;
var dynaAry2d = [];
var baseValue = 0;//隨機累加變數

for (var _row = 0; _row < row; _row++) {
    dynaAry2d.push([]);
    for (var _col = 0; _col < col; _col++) {
        var randomIncrement = Math.floor(Math.random() * 5); // 生成0到4的隨機增量
        baseValue += randomIncrement; // 在基礎值上增加隨機增量
        dynaAry2d[_row].push(baseValue); // 把結果放入二維陣列中
    }
}

console.log("使輸出結果隨機遞增");
console.log(JSON.stringify(dynaAry2d));

//使輸出內容個數隨機
var row = 9;
var dynaAry2d = [];
var currentValue = 0; //累加變數

for (var _row = 0; _row < row; _row++) {
    var randomCol = Math.floor(Math.random() * 10) + 1; 
    dynaAry2d.push([]);
    for (var _col = 0; _col < randomCol; _col++) {
        dynaAry2d[_row].push(currentValue);
        currentValue++; // 變數內容遞增
    }
}

console.log("使輸出內容個數隨機");
console.log(JSON.stringify(dynaAry2d));

