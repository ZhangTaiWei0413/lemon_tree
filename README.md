9/27
每天上課安裝git&node，安裝後點選終端機>新增終端 打node跟git啟用
在程式登入github帳號
點選終端機>新增終端 輸入:
git config --global user.name 張泰瑋
git config --global user.email tlrzhang@gmail.com

完成後下載需要的附件，課堂舉例:readline-sync
終端機輸入:
npm init
npm install readline-sync
完成後點選執行與偵錯 新增launch.json
修改"program":"${file}",
"console": "integratedTerminal"

最後在gitignore裡面新增node_modules/

寫完程式後點選原始檔控制>填寫訊息>提交>同步變更