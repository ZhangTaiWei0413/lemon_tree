/*var MAZE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]; //1,1  end:8,10

class Point {
    constructor(_row, _col) {
        this.row = _row;
        this.col = _col;
    }
    isEnd() {
        return this.row === end.row && this.col === end.col;
    }
}

var start = new Point(1, 1);
var end = new Point(8, 10);
var Stack = [];
var step = start;

function go() {
    Stack.push(step);
    MAZE[step.row][step.col] = 2; 

    while (Stack.length > 0) {
        step = Stack[Stack.length - 1]; //要讓step等於Stack最後一個元素，所以要用Stack[Stack.length - 1]，因為陣列從0開始

        if (step.isEnd()) {
            console.log("Done!");
            Stack.forEach((point) => console.log(`(${point.row}, ${point.col})`));
            return;
        }

        if (MAZE[step.row - 1][step.col] == 0) { // 如果步數上方為0
            step = new Point(step.row - 1, step.col);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else if MAZE[step.row + 1][step.col] == 0) { // 如果步數下方為0
            step = new Point(step.row + 1, step.col);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else if (MAZE[step.row][step.col - 1] == 0) { // 
            step = new Point(step.row, step.col - 1);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else if (MAZE[step.row][step.col + 1] == 0) { // 
            step = new Point(step.row, step.col + 1);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else // 如果四個方向都無法前進
            Stack.pop();
        }
    console.log("No solution!");
    }

go();*/

class Point {
    constructor(_row, _col) {
        this.row = _row; 
        this.col = _col; 
    }
    isEnd() {
        return this.row === end.row && this.col === end.col; // 判斷當前位置是否為終點位置
    }
}

const mazeoriginal = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  
];

var MAZE = JSON.parse(JSON.stringify(mazeoriginal)); // mazeoriginal迷宮的初始狀態
var start = new Point(1, 1); 
var end = new Point(8, 10); 
var Stack = []; // 記錄路徑的堆疊
var step = start; // 定義當前步驟為起點
var mazeDiv = document.getElementById("maze"); // 獲取迷宮的 HTML 容器元素
var intervalId; // 計時器 ID

var cellSize = 40; // 控制迷宮網格的大小

function drawMaze() {// 繪製迷宮
    mazeDiv.style.gridTemplateColumns = `repeat(${MAZE[0].length}, ${cellSize}px)`; // 設置迷宮列數為第0個陣列的長度
    mazeDiv.style.gridTemplateRows = `repeat(${MAZE.length}, ${cellSize}px)`; // 設置迷宮行數為地圖陣列的數量
    mazeDiv.innerHTML = ''; // 清空之前的迷宮內容

    for (var row = 0; row < MAZE.length; row++) { // 遍歷每一行
        for (var col = 0; col < MAZE[row].length; col++) { // 遍歷每一列
            const cell = document.createElement('div'); // 定義cell(格子)為一個名為div的元素，用以表示迷宮中的一個格子
            cell.classList.add('cell'); // 為cell添加一個名為cell的class，用以設置cell的樣式
            cell.style.width = `${cellSize}px`; // 設置cell的寬度，而前面是設置mazeDiv的寬度，前者是迷宮中的格子的寬度，後者是設置迷宮的寬度
            cell.style.height = `${cellSize}px`; 

            if (MAZE[row][col] === 1) { // 如果該位置是牆壁
                cell.classList.add('wall'); // 為該格子添加 wall 類別
            }
            cell.dataset.row = row; // 設置格子的行屬性
            cell.dataset.col = col; // 設置格子的列屬性
            mazeDiv.appendChild(cell); // 將格子添加到迷宮容器中
        }
    }
}

function markCell(row, col, className) {// 標記格子
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`); // 定義cell為一個名為cell的元素等於document的查詢選擇器，用以選擇迷宮中的一個格子
    if (cell) {// 如果cell存在
        cell.classList.add(className); // 為cell添加一個名為className的class，用以設置cell的樣式
    }
}

function startSolving() {// 當點擊「go」按鈕時觸發
    resetMaze(); // 重置迷宮狀態
    Stack.push(step); // 將起點加入堆疊
    MAZE[step.row][step.col] = 2; // 標記起點為已訪問(js程式使用)
    markCell(step.row, step.col, 'visited'); // 標記起點格子為已訪問(html方格使用)

    if (intervalId) {
        clearInterval(intervalId); // 如果已經有計時器，則清除它
    }

    intervalId = setInterval(solveStep, 500); // 每隔 500 毫秒執行一次 solveStep 來尋找下一步
}

function solveStep() {// 解決步驟
    if (Stack.length === 0) { // 如果堆疊為空，表示無法找到解決方案
        console.log("No solution!"); // 輸出「無解」信息
        clearInterval(intervalId); // 停止計時器
        return;
    }

    step = Stack[Stack.length - 1]; // 步驟等於堆疊的最後一個元素，意思是step等於當前步驟

    if (step.isEnd()) { // 如果當前步驟是終點
        console.log("Done!"); // 輸出「完成」信息
        Stack.forEach((point) => markCell(point.row, point.col, 'solution')); // 將解決路徑標記為「解決方案」
        clearInterval(intervalId); // 停止計時器
        return;
    }

    var directions = shuffleDirections([//定義方向為打亂順序的方向
        { r: -1, c: 0 }, // 上
        { r: 1, c: 0 },  // 下
        { r: 0, c: -1 }, // 左
        { r: 0, c: 1 }   // 右
    ]);

    var moved = false; // 記錄是否移動的標誌
    for (var dir of directions) { // 遍歷每個方向
        const newRow = step.row + dir.r; // 計算新行的位置
        const newCol = step.col + dir.c; // 計算新列的位置
        if (isValidMove(newRow, newCol)) { // 如果新位置是有效的移動
            step = new Point(newRow, newCol); // 創建新點作為當前步驟
            MAZE[newRow][newCol] = 2; // 標記該位置為已訪問
            Stack.push(step); // 將新步驟添加到堆疊
            markCell(newRow, newCol, 'visited'); // 標記該格子為已訪問
            moved = true; // 設置已移動標誌為 true
            break; // 結束方向遍歷
        }
    }

    if (!moved) { // 如果四個方向都無法前進
        Stack.pop(); // 從堆疊中移除當前步驟（退回）
        markCell(step.row, step.col, 'dead-end'); // 標記該格子為死路
    }
}

function shuffleDirections(directions) {
    for (var i = directions.length - 1; i > 0; i--) { // 從最後一個元素開始遍歷
        const j = Math.floor(Math.random() * (i + 1)); // 隨機選擇一個索引
        [directions[i], directions[j]] = [directions[j], directions[i]]; // 把隨機選擇的方向與當前方向交換
    }
    return directions; // 返回打亂順序的方向數組
    //先選擇一個隨機方向，然後將該方向與最後一個方向交換，然後繼續選擇隨機方向，直到所有方向都被選擇過
}
function isValidMove(row, col) {
    return row >= 0 && row < MAZE.length && col >= 0 && col < MAZE[0].length && MAZE[row][col] === 0; // 檢查是否在邊界內且未訪問
}

function resetMaze() {
    MAZE = JSON.parse(JSON.stringify(mazeoriginal)); // 重置迷宮為初始狀態
    Stack = []; // 清空堆疊
    step = new Point(1, 1); // 重置步驟為起點
    drawMaze(); // 重新繪製迷宮
}

document.addEventListener("DOMContentLoaded", () => {
    drawMaze(); // 當 DOM 完全加載後繪製迷宮
    const goButton = document.getElementById("goButton"); // 獲取「開始解決」按鈕
    goButton.addEventListener("click", startSolving); // 為按鈕添加點擊事件，觸發 startSolving
});


//說明一下兩個程式碼的差異:
//第一個程式碼是用JavaScript語言實現的，是一個簡單的迷宮解決算法，通過堆疊來記錄路徑，並且使用遞歸的方式來尋找下一步。
//第二個程式碼除了新增html的部分，還修改了迷宮移動的方式(原本是使用push和pop的方式，現在新增了一個solveStep函數，並且使用setInterval來實現每隔500毫秒執行一次solveStep來尋找下一步)。