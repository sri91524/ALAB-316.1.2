// Part 1: Requirements

// Create a simple guessing game that pushes users toward the correct answer in some iterative way. The game does not need to be practical or complicated.
// Use window object methods to gather input from the user and display information to the user.
// Use DOM manipulation to give a visual indication of the game's progress in some way.

const myNumber = 7;
const numberOfTries = 3;
let counter = 0;
let strMessage = "";
let number = 0
let bFlag = false;
//parseInt(window.prompt("Guess number between 1 an 10!"));

const frag = document.


    while(number != myNumber && counter < numberOfTries)
    {    
        if(!IsValidNumber(number))
        {
            alert("Please enter valid number between 1 and 10");
            break;   
        }         
        if(number === 0)
        {
            strMessage = "Guess number between 1 an 10!";
        }
        else if (IsValidNumber(number))
        {
            strMessage = number < myNumber ? "Guess number higher than " + number : "Guess number less than " + number;
            strMessage += "\nYou have "+ (numberOfTries - counter) + " guesses left!"; 
        }       
            
        number = parseInt(window.prompt(strMessage)); 

        if (IsValidNumber(number))
        {
            console.log(numberOfTries);
            console.log(number);
            counter ++;             

            if (number === myNumber){
                bFlag = true;
                alert("Congratulations!! You guessed correctly!");
                break;
            }
        }
        else
        {
            alert("Please enter valid number between 1 and 10")
        }
    }

        if(!bFlag)
        {
            alert(`Answer is ${myNumber}`);            
        }

    

//ToDo -- Helper Functions --------------------------------
//To validate 
function IsValidNumber(num)
{
    return typeof(num) === "number" && !isNaN(num) && num < 10 && num >= 0;
}