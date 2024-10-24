var canvas = document.getElementById('gameCanvas');//畫紙
var ctx = canvas.getContext('2d');//畫筆

var rows = 30;
var cols = 30;//預設長寬
var cellSize = canvas.width / cols;//計算畫紙切割
var grid = [];//存取生命狀態
var gameRunning = 0;  //Bool
var gameSpeed = 100;

initializeGrid();//建立空畫紙

document.getElementById('gridSizeInput').addEventListener('input', function() {//addEventListener監聽器，只要('條件',成立就會執行function()
    var size = this.value;//this為當前觸發事件的元素(此為輸入欄).value為欄內當前值
    var errorElement = document.getElementById('gridSizeError');//獲取gridSizeError
    if (isNaN(size) || size <= 0 || parseInt(size) != size) {//是否「不是數字」||是否小於等於 0||整數化後是否有變化
        this.setCustomValidity('必須是正整數');//氣泡警告欄
        errorElement.textContent = '必須是正整數';//gridSizeError警告語
    } else {
        this.setCustomValidity('');
        errorElement.textContent = '';
        rows = parseInt(size);
        cols = rows;
        cellSize = canvas.width / cols;//轉化細胞大小
        initializeGrid();
        this.value = size;//自動修正xx.0=xx
    }
});

document.getElementById('speedInput').addEventListener('input', function() {
    var speed = this.value;//this為當前觸發事件的元素(此為輸入欄).value為欄內當前值
    var errorElement = document.getElementById('speedError');
    if (isNaN(speed) || speed <= 0 || parseInt(speed) != speed) {//是否「不是數字」||是否小於等於 0||整數化後是否有變化
        this.setCustomValidity('必須是正整數');
        errorElement.textContent = '必須是正整數';
    } else {
        this.setCustomValidity('');
        errorElement.textContent = '';
        gameSpeed = parseInt(speed);
        this.value = speed;//自動修正xx.0=xx
    }
});

document.getElementById('densityInput').addEventListener('input', function() {
    var density = this.value;//this為當前觸發事件的元素(此為輸入欄).value為欄內當前值
    var errorElement = document.getElementById('densityError');
    if (isNaN(density) || density < 0 || density > 100 || parseInt(density) != density) {//是否「不是數字」||是否小於 0||是否大於100||整數化後是否有變化
        this.setCustomValidity('必須是 0 到 100 之間的正整數');
        errorElement.textContent = '必須是 0 到 100 之間的正整數';
    } else {
        this.setCustomValidity('');
        errorElement.textContent = '';
        this.value = density;//存活率，自動修正xx.0=xx
    }
});

document.getElementById('generateButton').addEventListener('click', function() {
    gameRunning = 0; // 停止遊戲
    var density = parseInt(document.getElementById('densityInput').value);
    if (isNaN(density) || density < 0 || density > 100) {
        document.getElementById('densityError').textContent = '必須是 0 到 100 之間的正整數';
        return;
    }
    grid = createRandomGrid(density / 100);
    drawGrid();
});

document.getElementById('startButton').addEventListener('click', function() {
    gameRunning = !gameRunning;
    if (gameRunning) {
        gameLoop();
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    gameRunning = 0;
    initializeGrid();
});

canvas.addEventListener('click', function(event) {//監聽，如果畫紙被點擊
    var rect = canvas.getBoundingClientRect();//獲取畫紙位置信息
    var x = event.clientX - rect.left;//使用者點擊的位置相對於畫紙左側的水平距離
    var y = event.clientY - rect.top;//使用者點擊的位置相對於畫紙上側的垂直距離
    var col = Math.floor(x / cellSize);//水平距離在畫紙上對應第幾列
    var row = Math.floor(y / cellSize);//垂直距離在畫紙上對應第幾行
    grid[row][col] = grid[row][col] == 0 ? 1 : 0;//切換格子狀態
    drawGrid();
});

function initializeGrid() {//清除
    grid = createEmptyGrid();
    drawGrid();
}

function createEmptyGrid() {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];//生成水平行
        for (var j = 0; j < cols; j++) {
            arr[i][j] = 0;//生成垂直列
        }
    }
    return arr;
}

function createRandomGrid(density) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
        for (var j = 0; j < cols; j++) {
            arr[i][j] = Math.random() < density ? 1 : 0;//成立表示"活"，反之為"死"
        }
    }
    return arr;
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//清空畫紙
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            ctx.fillStyle = grid[row][col] == 1 ? 'red' : 'white';//從grid判斷該格子的狀態並賦予顏色
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function updateGrid() {
    var newGrid = createEmptyGrid();
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var neighbors = countNeighbors(row, col);//確認該格附近還活著的鄰居
            if (grid[row][col] == 1) {//若該格為活
                newGrid[row][col] = (neighbors == 2 || neighbors == 3) ? 1 : 0;//若鄰居數為2/3則活 反之死
            } else {//若該格為死
                newGrid[row][col] = (neighbors == 3) ? 1 : 0;//若鄰居數為3則活 反之死
            }
        }
    }
    grid = newGrid;//更新狀態至新grid陣列
}

function countNeighbors(row, col) {
    var count = 0;
    for (var i = -1; i <= 1; i++) {//y座標
        for (var j = -1; j <= 1; j++) {//x座標
            if (i == 0 && j == 0) continue;//0.0為目標格本身 跳過計算
            var newRow = row + i;
            var newCol = col + j;//依次標記並判斷鄰居座標
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {//確保不會超出上下左右(邊界)
                count += grid[newRow][newCol];//若鄰居為活則+1
            }
        }
    }
    return count;//回傳並統計
}

function gameLoop() {
    if (!gameRunning) return;//如果遊戲停止則不繼續程式
    drawGrid();//繪製當前畫紙內容
    updateGrid();//更新網格狀態
    setTimeout(function() {//在一段指定的延遲時間後執行
        requestAnimationFrame(gameLoop);//在下一次畫面更新時調用指定函數
    }, gameSpeed);//會受到玩家設置速度影響
}
