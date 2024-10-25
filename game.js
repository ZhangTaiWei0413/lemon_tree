
const Live = 1;
const Dead = 0;

class Life{
   constructor(_row, _col){
        this.row = _row;
        this.col = _col;
        this.grid=[];//new Array()
        //2d array
        for(var _row=0;_row < this.row;_row++){
            this.grid.push([]);
            for(var _col=0;_col < this.col;_col++){
                this.grid[_row].push(Dead);
            }
        }
        
    }
    initialize = function(){
        this.grid[1][1] = Live;
        this.grid[1][2] = this.grid[1][3] = this.grid[1][4] =Live; 
    }

    update = function(){
          var nextGrid = JSON.parse(JSON.stringify(this.grid));
          //travse all elements, count its neighbor
          var neighbor;
          for (let _row = 0; _row < this.row; _row++) {
            for (let _col = 0; _col < this.row; _col++) {
                neighbor = this.neighborCount(_row, _col);
                // update by 4 rules
                if(this.getStatusAt(_row,_col)==Live && (neighbor<=1 || neighbor>=4)){
                    nextGrid[_row][_col] = Dead;
                }
                if(this.getStatusAt(_row,_col)==Dead && neighbor==3){
                    nextGrid[_row][_col] = Live;
                }

            }
            
          }

          this.grid = null;
          this.grid = nextGrid;
    } 


    neighborCount = function(row, col){
        var count=0;
        count += this.getStatusAt(row-1, col-1);
        count += this.getStatusAt(row-1, col); 
        count += this.getStatusAt(row-1, col+1); 
        
        count += this.getStatusAt(row, col-1);

        count += this.getStatusAt(row, col+1); 
        
        count += this.getStatusAt(row+1, col-1); 
        count += this.getStatusAt(row+1, col); 
        count += this.getStatusAt(row+1, col+1);      
        return count;   
    }
    getStatusAt = function(row, col){
        if(row<0 || col<0 || row >= this.row || col >= this.col){
           return Dead;
        }else{
            return this.grid[row][col];
        }
    }
}

// Life.prototype.update= function(){

// }


var myGame = new Life(10,10);
var myGame2 = new Life(100,100);

myGame.initialize();
myGame.update();
