// ToDo Part 1: Requirements

// Create a simple guessing game that pushes users toward the correct answer in some iterative way. The game does not need to be practical or complicated.
// Use window object methods to gather input from the user and display information to the user.
// Use DOM manipulation to give a visual indication of the game's progress in some way.

const maxCount = 100;

// ToDo Part 2: Examples and Hints
// The answer to your game can be static or dynamic. You can set one answer that is always the answer, regardless of page reloads or other conditions, or you could randomly generate the answer using something like Math.random() and/or a list of set answers.

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
//ToDo Part 3: Building the Game
//you will encounter an issue with rendering while using alerts and prompts from the window object. These issues come into play due to a concept known as the Event Loop
// As a temporary workaround, you can delay your prompts and alerts using another window method, setTimeout

    strMessage = `Guess number between 1 and ${maxCount}!`;
    strMessage += "\nYou have "+ (numberOfTries - counter) + " guesses left!"; 
    setTimeout(() => {number = parseInt(window.prompt(strMessage));
    compareGuessWithAnswer();},500);   
    
//------------------------------------------------------------------------------
//if guess is equal to answer, show congratulations and guess is correct, else prompt user for other number until it reaches maximum tries
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
//----------------------------------------------------------------------------
//if guess is higher or less than answer, prompt user to input higher or less than guess number to reach answer
    function GetUserInput()
    {
        //if guess is not valid number, then prompt for 1-100, not deducting number of guesses, allow the user for valid guess
        //if it is valid, then check with answer and give hint to user for higher or less than guess
        if (IsValidNumber(number))
        {  
            strHighLow = number < answer ? "higher" : "less"; 
            strMessage = `Try Again!! Guess number ${strHighLow} than ${number}`;            
            strMessage += "\nYou have "+ (numberOfTries - counter) + " guesses left!";   
        }
        else
        {
            strMessage = `Guess number between 1 and ${maxCount}!`;
            strMessage += "\nYou have "+ (numberOfTries - counter) + " guesses left!";
        }


        if(counter < numberOfTries)
        {         
            setTimeout(() => {number = parseInt(window.prompt(strMessage));
            compareGuessWithAnswer(); },500);           
        }
        else{
            alert(`Answer is ${answer}`); 
        } 
        h3.textContent = `You have ${numberOfTries - counter} guesses remaining.`; 
        ChangeTDBackground(strHighLow);       
    } 
//----------------------------------------------------------------------------- 
//ToDo Part 2- The game uses DOM manipulation to change the CSS attributes of the picture based on the remaining number of guesses. 

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
//To validate the number and check if its <=100 & > 0
function IsValidNumber(num)
{
    return typeof(num) === "number" && !isNaN(num) && num <= maxCount && num > 0;
}