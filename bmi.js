function calcBmi() {
    var weight = Number(document.getElementById("weight").value);
    var height = Number(document.getElementById("height").value);
    
    // 計算 BMI
    var bmi = weight / ((height / 100) ** 2);

    // 宣告結果變數
    var judgment = "";

    // 判斷 BMI 狀況
    if (bmi < 18.5) 
        {judgment = "You are underweight.";}
     else if (bmi >= 18.5 && bmi < 24.9) 
        {judgment = "You are in the normal range.";}
     else if (bmi >= 25 && bmi < 29.9) 
        {judgment = "You are overweight.";}
     else 
        {judgment = "You are obese.";}
    

    // 顯示 BMI 值和判斷結果
    document.getElementById("bmi").innerHTML = "Your BMI is: " + bmi.toFixed(2) + "." + judgment;

    // 將結果輸出到控制台
    console.log("Your BMI is: " + bmi.toFixed(2) + ". " + judgment);
    }