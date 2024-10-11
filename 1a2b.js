var readline = require("readline-sync");

function generateAnswer() {
  var Ans = []; // 存放生成的四位數答案
  while (Ans.length < 4) { // 當答案中還不到 4 個數字時
    var randNum = Math.floor(Math.random() * 10); // 生成 0 到 9 之間的隨機數字
    if (!Ans.includes(randNum)) { // 確保不重複
      Ans.push(randNum); // 把隨機數字加入答案
    }
  }
  return Ans; // 返回生成的四位數答案

  /*var Ans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 建立一個包含 0 到 9 的數字陣列
  for (var i = 0; i < 4; i++)
  {
    var rand = Math.floor(Math.random() * (10 - i)) + i; // 生成一個從 i 到 9 的隨機索引
    // 交換 i 和 rand 的值
    var temp = Ans[i]; // 將索引 i 的值存到暫存變數中
    Ans[i] = Ans[rand]; // 將索引 rand 的值賦給索引 i
    Ans[rand] = temp; // 將暫存的值賦給索引 rand
  }
  return Ans.slice(0, 4)*/
}

do {
  var Ans = generateAnswer(); // 生成新的四位數答案
  console.log("[DEBUG] Generated Answer: ", Ans); // Debug：顯示生成的答案
  var isWin = false; // 初始化勝利狀態
  var nubofguess = 0; // 初始化猜測次數
  do {
    // 輸入驗證，確保為四位數且數字不重複
    var G;
    var isValidInput = false;
    do {
      G = readline.question("Please input 4 unique digits: ");
      if (G.length !== 4) { // 是不是四位數
        console.log("Invalid input: Please enter exactly 4 digits.");
        continue;
      }
      isValidInput = true;
      for (var i = 0; i < 4; i++) {
        if (G[i] < '0' || G[i] > '9') { // 是不是數字
          console.log("Invalid input: Please enter only numeric digits.");
          isValidInput = false;
          break;
        }
        for (var j = i + 1; j < 4; j++) { // 是否有重複數字
          if (G[i] === G[j]) {
            console.log("Invalid input: Digits cannot be repeated.");
            isValidInput = false;
            break;
          }
        }
        if (!isValidInput) {
          break;
        }
      }
    } while (!isValidInput); // 重複直到輸入為有效的四位不重複數字

    var Gstr = G.toString(); // 將輸入的數字轉為字串

    // 判斷 ?A?B
    var countA = 0, countB = 0; // 初始化 A / B 
    for (var i = 0; i < 4; i++) {
      if (Ans[i] == parseInt(Gstr[i])) { // 如果數字和位置都相同
        countA++; // A 的計數加一
      } else if (Ans.includes(parseInt(Gstr[i]))) { // 如果數字相同但位置不同
        countB++; // B 的計數加一
      }
    }
    nubofguess++; // 猜測次數加一

    console.log(`${countA}A${countB}B`); // 輸出 A 和 B 的結果

    if(nubofguess === 3) // 猜測次數超過 3 次
    {
      console.log("You have exceeded the maximum number of guesses. The answer is " + Ans.join('') + "."); // 顯示答案
      break; // 跳出迴圈
    }
    
    // 檢查玩家是否勝利
    if (countA === 4) {
      console.log("Congratulations! You've guessed the correct number!"); 
      isWin = true; // 設定勝利狀態為 true
    }
  } while (!isWin); // 如果未勝利則繼續

  var playAgain;
  do {
    playAgain = readline.question("Do you want to play again? (y/n): "); // 問玩家是否想再玩一次
    playAgain = playAgain.toLowerCase(); // 將輸入轉換為小寫
    if (playAgain !== 'y' && playAgain !== 'n') {
      console.log("Invalid input: Please enter 'y' to play again or 'n' to quit.");
    }
  } while (playAgain !== 'y' && playAgain !== 'n'); // 重複詢問直到輸入 y 或 n

} while (playAgain === 'y'); // 玩家輸入 y則重新開始