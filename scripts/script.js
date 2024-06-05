const wordDisplay = document.querySelector(".word-display")
const gussesText = document.querySelector(".guesses-text b")
const keyboardDiv = document.querySelector(".keyboard")
const hangmanImage = document.querySelector(".hangman-box img")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector("button")
const hintword = document.querySelector(".hint-text b")


let currentWord , wrongGuessCount , correctLetters;
const maxGuesses = 6;

const reset = () =>{
    correctLetters=[];
    wrongGuessCount = 0 ;
    hangmanImage.src="images/hangman-0.svg";
    gussesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled =false);
    gameModal.classList.remove("show");
}
const randomWord = () =>{
    const {word , hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word;
    // console.log(word)
    // hintword.innerText=hint;
    
    document.querySelector(".hint-text b").innerText = hint;
    reset();

}
const gameOver = (isVictory) =>{
    const modalText = isVictory ? 'You guessed correct word' :  'the correct word was:';
    gameModal.querySelector("img").src= `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("p").innerHTML= `${modalText} <b>${currentWord}</b>`;
    gameModal.querySelector("h4").innerText= isVictory ? 'Congrats' : 'Game Over';
    gameModal.classList.add("show");
}

const initGame = (button , clickedletter) =>{
    if(currentWord.includes(clickedletter)){
        [...currentWord].forEach((letter , index)=>{
            if(letter === clickedletter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

            }
        });
    }else{
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        
       
    }   
    button.disabled = true;
    gussesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
    if(currentWord.length === correctLetters.length){
        return gameOver(true);
    } 
    if(wrongGuessCount === maxGuesses) {
        return gameOver(false);
    }

    
}
for(let i = 97; i<=122 ; i++){
    const btn= document.createElement("button");
    btn.innerText=String.fromCharCode(i)
    keyboardDiv.appendChild(btn);
    btn.addEventListener("click" , (e) => initGame(e.target , String.fromCharCode(i)) )
}

randomWord();
playAgainBtn.addEventListener("click" , randomWord);