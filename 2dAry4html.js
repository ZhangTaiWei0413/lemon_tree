var ary2d=[
    [1,1,0,1,1,1], //index 0
    [1,0,1,1,0,0], //index 1
    [1,0,1,0,0,1], //index 2
    [1,0,1,1,0,0], //index 3
    [1,0,1,0,0,1]   //index 4
];

var row=ary2d.length;
var col=ary2d[0].length;

//draw map
var canvas = document.getElementById("map").getContext("2d");
var size=Math.min(canvas.canvas.height/row, canvas.canvas.width/col);
//var size=canvas.width/row

for(var _row=0;_row<row;_row++)
    {
        for(var _col=0;_col<col;_col++)
        {
        //ar2d[_row][_col]=>0,1
        if(ary2d[_row][_col]==1){
            canvas.fillStyle="#ffffff"
        }else{
            canvas.fillStyle="#000000"
        }
        //600/5=>120  coordinate, width, heigth
        canvas.fillRect(_col*size,_row*size,size,size);
        canvas.strokeRect(_col*size,_row*size,size,size);
        }
    }

