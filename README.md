9/20
每天上課安裝git&node，安裝後點選終端機>新增終端 打node跟git啟用
在程式登入github帳號
點選終端機>新增終端 輸入:
git config --global user.name 張泰瑋
git config --global user.email tlrzhang@gmail.com

(網頁基礎)
點選檔案總管，新增檔案，重新命名:檔名.html
輸入html:5建構網頁基礎
在head跟body之間
新增script，在script裡打程式or在script後面加src:"檔名.js"

<input type="資料型態:數字,字串..." id="變數名稱">:創建一個擁有變數名稱的輸入欄，但資料型態不一定限制
<label for="變數名稱">:在擁有該變數名稱的物件前面創建文字
<button onclick="函數名稱()">:創建一個按鍵，並在點擊時激活該函數名稱裡的程式碼
<p id="變數名稱">:段落，可以簡單理解成把變數名稱的內容顯示出來

Number(document.getElementById("變數名稱").value);
Number:將字串改為數字
document:代表整個html物件
getElementById("變數名稱"):獲取指定變數的元素
.value:指定要獲取的元素的值，如果不加就會獲得整個元素本身
.innerHTML:取得或設置指定元素的內容
.toFixed(x):代表要取到小數點後的x位

寫完程式後點選原始檔控制>填寫訊息>提交>同步變更