const radioButtons = document.querySelectorAll("input[type='radio']");
const game = document.querySelector("#game");
const NUMBER_OF_IMAGES = 30;
const win=document.createElement("h1");

let pictures = [];
let timer;
let delay;
let selectedValue = 0, ratio = 0, clickedCards = [], openedCards = [];
let alreadyOpened1 = false, alreadyOpened2 = false, canOpenNext = true;

document.querySelector("#newGame").addEventListener("click", () => {
    for (let rb of radioButtons) {
        if (rb.checked) {
            selectedValue = rb.value;
            ratio = rb.getAttribute("ratio");
            break;
        }
    }
    resetVariables();
    generateCards();
    chooseRandomPictures();
});

function resetVariables() {
    clearTimeout(timer);
    clearTimeout(delay);
    canOpenNext = true;
    clickedCards = [];
    openedCards = [];
    alreadyOpened1 = false;
    alreadyOpened2 = false;
    document.querySelector("#winnerHolder").innerHTML="";
}

function generateCards() {
    game.innerHTML = "";
    for (let i = 0; i < selectedValue; i++) {
        game.innerHTML += `<div class="card" onclick="revealCard(${i})"></div>`;
        game.lastChild.style.width = (game.clientWidth - 25) / ratio + "px";
        game.lastChild.style.height = game.lastChild.clientWidth + "px";
    }
}

function chooseRandomPictures() {
    pictures = [];
    let chosenNumbers = [];
    let randInt = 0;

    for (let i = 0; i < selectedValue / 2; i++) {
        randInt = Math.floor(Math.random() * NUMBER_OF_IMAGES);
        if (!chosenNumbers.includes(randInt)) {
            pictures.push(`images/img${randInt}.png`);
            pictures.push(`images/img${randInt}.png`);
            chosenNumbers.push(randInt);
        }
        else {
            i--;
        }
    }

    //shuffle array of pictures

    for (let i = 0; i < pictures.length; i++) {
        randInt = Math.floor(Math.random() * (pictures.length - i) + i);
        let temp = pictures[i];
        pictures[i] = pictures[randInt];
        pictures[randInt] = temp;
    }

}

function revealCard(br) {
    if (!canOpenNext)
        return;

    if (clickedCards.includes(br) || openedCards.includes(br))
        return;

    clickedCards.push(br);

    if (clickedCards.length > 2) {
        game.children[clickedCards[0]].style.backgroundImage = "url(images/background.png)";
        game.children[clickedCards[1]].style.backgroundImage = "url(images/background.png)";
        alreadyOpened1 = false;
        alreadyOpened2 = false;
        clickedCards.shift();
        clickedCards.shift();
        clearTimeout(timer);
    }


    if (!alreadyOpened1) {
        game.children[br].style.backgroundImage = `url(${pictures[br]})`;
        alreadyOpened1 = true;
    }
    else if (alreadyOpened1 && !alreadyOpened2) {
        game.children[br].style.backgroundImage = `url(${pictures[br]})`;
        alreadyOpened2 = true;

        if (game.children[clickedCards[0]].style.backgroundImage !== game.children[clickedCards[1]].style.backgroundImage) {
            timer = setTimeout(() => {
                for (let i of clickedCards) {
                    game.children[i].style.backgroundImage = `url(images/background.png)`;
                }
                clickedCards.length = 0;
            }, 4000);
            canOpenNext = false;
            delay = setTimeout(() => {
                canOpenNext = true;
            }, 800);
        }
        else {
            openedCards.push(clickedCards[0]);
            openedCards.push(clickedCards[1]);
            fadeOut(game.children[clickedCards[0]]);
            fadeOut(game.children[clickedCards[1]]);
            /*game.children[clickedCards[0]].style.opacity="0.5";
            game.children[clickedCards[1]].style.opacity="0.5";*/
            clickedCards.length = 0;
            canOpenNext = true;
        }

        alreadyOpened1 = false;
        alreadyOpened2 = false;

        if (openedCards.length >= Number(selectedValue)) {
            winGame(`Congrats, you matched all the images!`);
            return;
        }
    }
}

function winGame(text) {
    win.innerText=text;
    win.classList.add("winner");
    for (let child of game.children) {
        child.style.opacity=1;
        child.style.animation="fadeIn 1s ease-in-out";
    }
    document.querySelector("#winnerHolder").append(win);
}

function fadeOut(card) {
    card.style.animation = "fadeOut 1s ease-in-out";
    card.style.opacity = 0;
}
//*casual i competitive mod
//*dodati animacije za okretanje

/*
function open90(){
    game.firstChild.classList.add("halfOpenedCard");
}

function openAnother90(){
    game.firstChild.classList.add("fullOpenedCard");
}
*/