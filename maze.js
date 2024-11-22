/*// var MAZE = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
//     [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
//     [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
//     [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
//     [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
//     [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
//     [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];//1,1  end:8,10

MAZE=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1],
    [1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
    [1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    //end:20,20
    
    //object oriented
    class Point{
      constructor(_row, _col){
        this.row = _row;
        this.col = _col;
      }
      isEnd = function(){
        return this.row==end.row && this.col==end.col
      }
    }
    var start= new Point(1,1);//{row:1,col:1}
    var end = new Point(19,19);//[8,10]
    var Stack=[];
    var step = start;
    var rollBack=false;
    function go(){
         Stack.push(step);
         
         while(! step.isEnd()){
            MAZE[step.row][step.col]=2;
            
            //up
            if(MAZE[step.row-1][step.col] == 0)
            {
               if(rollBack){
                Stack.push(step);
                rollBack=false;
               }
                step = new Point(step.row-1, step.col);
                Stack.push(step);
                
            }else if(MAZE[step.row+1][step.col] == 0){ //down
              if(rollBack){
                Stack.push(step);
                rollBack=false;
               }
                
               step = new Point(step.row+1, step.col);  
                Stack.push(step);
            }else if(MAZE[step.row][step.col-1] == 0){//left
              if(rollBack){
                Stack.push(step);
                rollBack=false;
               }
                step = new Point(step.row, step.col-1); 
                Stack.push(step);
            }else if(MAZE[step.row][step.col+1] == 0){//right
              if(rollBack){
                Stack.push(step);
                rollBack=false;
               }
                step = new Point(step.row, step.col+1);
                Stack.push(step);
            }else{
                if(Stack.length>0){
                  step = Stack.pop();
                  rollBack=true;
                }
                else
                  break;
            }
         }
         if(Stack.length>0)
            console.log("Done!");
         else 
            console.log("No solution!");
    }
    
    go()*/
     

var MAZE = [
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

        if (/*step.row - 1 >= 0 && */MAZE[step.row - 1][step.col] == 0) { // 如果步數上方為0
            step = new Point(step.row - 1, step.col);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else if (/*step.row + 1 < MAZE.length && */MAZE[step.row + 1][step.col] == 0) { // 如果步數下方為0
            step = new Point(step.row + 1, step.col);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else if (/*step.col - 1 >= 0 && */MAZE[step.row][step.col - 1] == 0) { // 
            step = new Point(step.row, step.col - 1);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else if (/*step.col + 1 < MAZE[0].length && */MAZE[step.row][step.col + 1] == 0) { // 
            step = new Point(step.row, step.col + 1);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
        } else // 如果四個方向都無法前進
            Stack.pop();
        }
    console.log("No solution!");
    }

go();

