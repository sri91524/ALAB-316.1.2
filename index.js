// Part 1: Requirements

// Create a simple guessing game that pushes users toward the correct answer in some iterative way. The game does not need to be practical or complicated.
// Use window object methods to gather input from the user and display information to the user.
// Use DOM manipulation to give a visual indication of the game's progress in some way.

const maxCount = 100;
const answer = Math.round(Math.random()*100);
const numberOfTries = 10;

let counter = 0;
let strMessage = "";
let number = 0
let bFlag = false;
let strHighLow = "";

//table -- to show the game board
const app = document.getElementById("app");
const frag = document.createDocumentFragment();

const h1 = document.createElement("h1");
h1.textContent ="Guess the number!";
frag.appendChild(h1);

const h3 = document.createElement("h3");
h3.textContent = `You have ${numberOfTries - counter} remaining.`;
frag.appendChild(h3);

//------------------------------------------------------------
BuildGameBoard();

//-------------------------------------
function BuildGameBoard()
{
    const rows = 10;
    const cols = 10;
    let numToTableCell = 1;

    const table = document.createElement("table");
    for(let i = 0; i < rows; i++)
    {
        const tr = document.createElement("tr");   
        for(let j = 0; j < cols; j++){
            const td= document.createElement("td"); 
            td.setAttribute("id", "td"+numToTableCell);
            td.textContent =  numToTableCell;      
            tr.appendChild(td);
            numToTableCell ++;
            console.log(td.getAttribute("id"));
        }
        table.appendChild(tr);    
    }
    frag.appendChild(table);
    app.appendChild(frag);
}
//--------------------------------------------------------------------------
    strMessage = `Guess number between 1 and ${maxCount}!`;
    strMessage += "\nYou have "+ (numberOfTries - counter) + " guesses left!"; 
    setTimeout(() => {number = parseInt(window.prompt(strMessage));
    compareGuessWithAnswer();},500);   
    

    function compareGuessWithAnswer()
    {
        if (IsValidNumber(number))
        {     
            if (number === answer){
                bFlag = true;                                  
            }
            counter ++; //number of guesses done
        }
        else{       
            alert("Please enter valid number between 1 and 10");}

        if(bFlag){     
            h3.textContent = `You have ${numberOfTries - counter} guesses remaining.`;
            strHighLow ="";
            ChangeTDBackground(strHighLow);
            alert("Congratulations!! You guessed correctly!");}         
        else{
            GetUserInput();}
    }

    function GetUserInput()
    {
        strHighLow = number < answer ? "higher" : "less"; 

        if(counter < numberOfTries)
        {                       
            strMessage = `Try Again!! Guess number ${strHighLow} than ${number}`;            
            strMessage += "\nYou have "+ (numberOfTries - counter) + " guesses left!";                     

            setTimeout(() => {number = parseInt(window.prompt(strMessage));
            compareGuessWithAnswer(); },500);           
        }
        else{
            alert(`Answer is ${answer}`); 
        } 
        h3.textContent = `You have ${numberOfTries - counter} guesses remaining.`; 
        ChangeTDBackground(strHighLow);       
    } 
    
    function ChangeTDBackground(strIndicator)
    {
        let initialValue = 0;
        let finalValue = 0;

        if(strIndicator === "higher"){
            initialValue = 1;
            finalValue = number;
        }
        else if(strIndicator === "less"){      
            initialValue = number;
            finalValue = 100;
        }
        else
        {
            initialValue = number;
            finalValue = number;
        }
        for(let i = initialValue; i <= finalValue; i++)
        {
            if(strIndicator !== "")
            {document.getElementById("td"+i).style.backgroundColor = "red";  }
            else
            {document.getElementById("td"+i).style.backgroundColor = "green";}                      
        }
       
    }

//ToDo -- Helper Functions --------------------------------
//To validate 
function IsValidNumber(num)
{
    return typeof(num) === "number" && !isNaN(num) && num <= maxCount && num > 0;
}