// 取得畫布和繪圖上下文
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// 初始化遊戲參數
var rows = 30;
var cols = 30;
var cellSize = canvas.width / cols;
var grid = [];
var gameRunning = 0;
var gameSpeed = 100;

// 初始化網格
initializeGrid();

// 監聽網格大小輸入框的變化
document.getElementById('gridSizeInput').addEventListener('input', function() {
 var size = this.value;
 var errorElement = document.getElementById('gridSizeError');
 if (isNaN(size) || size <= 0 || parseInt(size) != size) {
 this.setCustomValidity('必須是正整數');
 errorElement.textContent = '必須是正整數';
 } else {
 this.setCustomValidity('');
 errorElement.textContent = '';
 rows = parseInt(size);
 cols = rows;
 cellSize = canvas.width / cols;
 initializeGrid();
 this.value = size;
 }
});

// 監聽速度輸入框的變化
document.getElementById('speedInput').addEventListener('input', function() {
 var speed = this.value;
 var errorElement = document.getElementById('speedError');
 if (isNaN(speed) || speed <= 0 || parseInt(speed) != speed) {
 this.setCustomValidity('必須是正整數');
 errorElement.textContent = '必須是正整數';
 } else {
 this.setCustomValidity('');
 errorElement.textContent = '';
 gameSpeed = parseInt(speed);
 this.value = speed;
 }
});

// 監聽密度輸入框的變化
document.getElementById('densityInput').addEventListener('input', function() {
 var density = this.value;
 var errorElement = document.getElementById('densityError');
 if (isNaN(density) || density < 0 || density > 100 || parseInt(density) != density) {
 this.setCustomValidity('必須是 0 到 100 之間的正整數');
 errorElement.textContent = '必須是 0 到 100 之間的正整數';
 } else {
 this.setCustomValidity('');
 errorElement.textContent = '';
 this.value = density;
 }
});

// 監聽「產生」按鈕的點擊事件
document.getElementById('generateButton').addEventListener('click', function() {
 gameRunning = 0; // 停止遊戲
 var density = parseInt(document.getElementById('densityInput').value);
 if (isNaN(density) || density < 0 || density > 100) {
 document.getElementById('densityError').textContent = '必須是 0 到 100 之間的正整數';
 return;
 }
 grid = createRandomGrid(density / 100);
 drawGrid(); // 繪製整個網格
});

// 監聽「開始/暫停」按鈕的點擊事件
document.getElementById('startButton').addEventListener('click', function() {
 gameRunning = !gameRunning;
 if (gameRunning) {
 gameLoop();
 }
});

// 監聽「清除」按鈕的點擊事件
document.getElementById('clearButton').addEventListener('click', function() {
 gameRunning = 0;
 initializeGrid();
});

// 監聽畫布的點擊事件
canvas.addEventListener('click', function(event) {
 var rect = canvas.getBoundingClientRect();
 var x = event.clientX - rect.left;
 var y = event.clientY - rect.top;
 var col = Math.floor(x / cellSize);
 var row = Math.floor(y / cellSize);
 if (row >= 0 && row < rows && col >= 0 && col < cols) {
 grid[row][col] = grid[row][col] == 0 ? 1 : 0;
 drawCell(row, col); // 只繪製被點擊的細胞
 }
});

// 初始化網格函數
function initializeGrid() {
 grid = createEmptyGrid();
 drawGrid();
}

// 建立空網格
function createEmptyGrid() {
 var arr = [];
 for (var i = 0; i < rows; i++) {
 arr[i] = [];
 for (var j = 0; j < cols; j++) {
 arr[i][j] = 0;
 }
 }
 return arr;
}

// 建立隨機網格
function createRandomGrid(density) {
 var arr = [];
 for (var i = 0; i < rows; i++) {
 arr[i] = [];
 for (var j = 0; j < cols; j++) {
 arr[i][j] = Math.random() < density ? 1 : 0;
 }
 }
 return arr;
}

// 繪製單一細胞
function drawCell(row, col) {
 var x = col * cellSize;
 var y = row * cellSize;
 ctx.fillStyle = grid[row][col] == 1 ? 'red' : 'white';
 ctx.fillRect(x, y, cellSize, cellSize);
 ctx.strokeRect(x, y, cellSize, cellSize);
}

// 繪製整個網格
function drawGrid() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 for (var row = 0; row < rows; row++) {
 for (var col = 0; col < cols; col++) {
 drawCell(row, col);
 }
 }
}

// 更新網格狀態
function updateGrid() {
 var newGrid = createEmptyGrid();
 var cellsToUpdate = []; // 記錄狀態改變的細胞
 for (var row = 0; row < rows; row++) {
 for (var col = 0; col < cols; col++) {
 var neighbors = countNeighbors(row, col);
 var currentState = grid[row][col];
 var newState = currentState;
 if (currentState == 1) {
 newState = (neighbors == 2 || neighbors == 3) ? 1 : 0;
 } else {
 newState = (neighbors == 3) ? 1 : 0;
 }
 newGrid[row][col] = newState;
 if (newState != currentState) {
 cellsToUpdate.push({ row: row, col: col });
 }
 }
 }
 grid = newGrid;
 // 只繪製狀態改變的細胞
 for (var i = 0; i < cellsToUpdate.length; i++) {
 var cell = cellsToUpdate[i];
 drawCell(cell.row, cell.col);
 }
}

// 計算指定細胞的活鄰居數量
function countNeighbors(row, col) {
    var count = 0;
    for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
    if (i == 0 && j == 0) continue;
    var newRow = row + i;
    var newCol = col + j;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
    count += grid[newRow][newCol];
    }
    }
    }
    return count;
   }
   
   // 遊戲主循環
   function gameLoop() {
    if (!gameRunning) return;
    updateGrid();
    setTimeout(function() {
    requestAnimationFrame(gameLoop);
    }, gameSpeed);
   }