const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let GameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initGame(){
    currentPlayer="X";
    GameGrid=["","","","","","","","",""];
    

    // UI KO BHi kahli Krna Padega Na
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //Ek chiz Bachi Hai Abhi
        // boxes.classList.remove="win";
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`current Player - ${currentPlayer}`;
};
initGame();
function swapPLayer(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`current Player - ${currentPlayer}`;

};

function checkGameOver(){
   let ans="";
   winningPosition.forEach((position)=>{
    if((GameGrid[position[0]]!==""||GameGrid[position[1]]!==""||GameGrid[position[2]]!=="")&&
    ((GameGrid[position[0]]===GameGrid[position[1]])&&(GameGrid[position[1]]===GameGrid[position[2]]))){

      //check who is present in this
      if(GameGrid[position[0]]==="X")
        ans="X";
    else
    ans="0";

    boxes.forEach((box)=>{
        box.style.pointerEvents="none";
    })

    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
    }
   });

   //hame winner mil chuka hoga
   if(ans!==""){
    gameInfo.innerText=`Winner player-${ans}`;
    newGameBtn.classList.add("active");
    return;

   }

//    lets check whether there is tie

let fillCount=0;
GameGrid.forEach((box)=>{
    if(box!=="")
        fillCount++;
});
if(fillCount===9){
    gameInfo.innerText="Game tied!";
    newGameBtn.classList.add("active");
}
};
function handleClick(index){
    if(GameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        GameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        //swap karo player ko 
        swapPLayer();

        //Game end hui ki nhi uska code

        checkGameOver();
    }
};
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
newGameBtn.addEventListener("click",initGame);