var readline = require("readline-sync");

//Generate 4 digit randomly
var Ans=[0,1,2,3,4,5,6,7,8,9]; //permutation
for(var i=0;i<4;i++){
  var rand = Math.floor(Math.random()*10);
  //swap i, rand
  var temp= Ans[i];
  Ans[i] = Ans[rand];
  Ans[rand] = temp;
}

do{
   var G=readline.questionInt("Please input 4 digits? ");
}while(G<1000 || G>=10000);
var Gstr = G.toString();
//adjuge ?A?B
var countA=0,countB=0;
for(){//Ans[0]~A[3]
    for(){//Gstr[0]!Gstr[3]

    }
}
//Win?