var readlineSync = require('readline-sync');

var weight = readlineSync.questionFloat("Please enter your weight in kg: ");
var height = readlineSync.questionFloat("Please enter your height in cm: ");

// 計算 BMI
var bmi = weight / ((height / 100) ** 2);

// 宣告結果變數
var judgment = "";

// 判斷 BMI 狀況
if (bmi < 18.5) 
    {judgment = "過輕.";}
 else if (bmi < 24) 
    {judgment = "正常.";}
 else if (bmi < 27) 
    {judgment = "過重.";}
 else if (bmi < 30) 
    {judgment = "輕度胖.";}
 else if (bmi < 35) 
    {judgment = "中度胖.";}
 else 
    {judgment = "重度胖.";}


// 顯示 BMI 值和判斷結果
console.log("Your BMI is: " + bmi.toFixed(2) + ". " + judgment);