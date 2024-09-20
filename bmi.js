function calcBmi() {
    var weight = Number(document.getElementById("weight").value);
    var height = Number(document.getElementById("height").value);
    var bmi = weight / ((height / 100) ** 2);
    document.getElementById("bmi").innerHTML = bmi;
    console.log("Hello, Your BMI is:" + bmi);
}
IPO