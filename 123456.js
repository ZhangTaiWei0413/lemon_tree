/*function bracketMatch(inputString) {
    var opening = [];//創建陣列
    var isMatched = true;//對應:布林值
    var i = 0;//定義i為0
    var symbol = inputString.charAt(i);//定義symbol為字串的第一個字元

    while (isMatched && i < inputString.length) {//當isMatched為真且i小於字串長度
        console.log(`Before increment, i: ${i - 1}, symbol: '${symbol}'`);//輸出字串
        if (symbol == '{' || symbol == '(' || symbol == '[') {//如果symbol={.(.[
            opening.push(symbol);  //推入陣列
        }
        if (symbol == '}' || symbol == ')' || symbol == ']') {//如果symbol=}.).]
            if (opening.length == 0) {  //如果陣列長度=0
                isMatched = false; //isMatched為假
            } else {
                let match = opening.pop(); //將陣列最後一個元素推出陣列並回傳
                isMatched = (symbol == '}' && match == '{') ||//判斷括號是否皆為對應
                            (symbol == ')' && match == '(') ||
                            (symbol == ']' && match == '['); 
            }
        }
        symbol = inputString.charAt(++i); //切換到下一個字元，不可為i++，否則導致第一字元重複抓取
}
if (opening.length > 0 || !isMatched) {//如果陣列長度大於0或isMatched為假
    return 'unmatched';//回傳"不匹配"
} else {
    return 'matched';//回傳"匹配"
}
}*/

function bracketMatch(inputString) {
    var opening = [];
    var left = "{[(<";  // 左括號集合
    var right = "}])>"; // 右括號集合

    for (let i = 0; i < inputString.length; i++) {//迴圈:從零計數直到字串長度極值
        let symbol = inputString[i];//symbol為字串的第i個字元
        console.log(`Before increment, i: ${i - 1}, symbol: '${symbol}'`);//輸出字串
        if (left.includes(symbol)) {//如果left陣列中包含symbol
            opening.push(symbol);//推入陣列
        } else if (right.includes(symbol)) {//如果right陣列中包含symbol
            if (opening.length === 0) {//如果陣列長度為0
                return 'unmatched'; //回傳"不匹配"
            }
            let match = opening.pop();//再將陣列最後一個元素推出陣列並回傳到match
            if (left.indexOf(match) !== right.indexOf(symbol)) {//如果左集合中包含match的括號不等於右集合中包含symbol的括號
                return 'unmatched'; //回傳"不匹配"
            }
        }
    }
    return opening.length === 0 ? 'matched' : 'unmatched';//三元運算子:如果陣列長度為0，回傳"匹配"，否則回傳"不匹配"
}


console.log(bracketMatch("{[()]}")); //matched
console.log(bracketMatch("{[(])}")); //unmatched
console.log(bracketMatch("{[}")); //unmatched
console.log(bracketMatch("{[]}")); //matched