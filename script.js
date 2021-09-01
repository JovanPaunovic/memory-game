const radioButtons = document.querySelectorAll("input[type='radio']");
const game = document.querySelector("#game");
const NUMBER_OF_IMAGES = 30;

let pictures = [];
let selectedValue = 0, ratio = 0, clickedCards = [], openedCards = [];
let alreadyOpened1 = false, alreadyOpened2 = false;

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
    clickedCards = [];
    openedCards = [];
    alreadyOpened1 = false;
    alreadyOpened2 = false;
}

function generateCards() {
    game.innerHTML = "";
    for (let i = 0; i < selectedValue; i++) {
        game.innerHTML += `<div class="card" onclick="revealCard(${i})"></div>`;
        game.lastChild.style.width = (game.clientWidth - 30) / ratio + "px";
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
    if (clickedCards.includes(br) || openedCards.includes(br))
        return;
    clickedCards.push(br);
    if (clickedCards.length > 2)
        return
    if (!alreadyOpened1) {
        game.children[br].style.backgroundImage = `url(${pictures[br]})`;
        alreadyOpened1 = true;
    }
    else if (alreadyOpened1 && !alreadyOpened2) {
        game.children[br].style.backgroundImage = `url(${pictures[br]})`;
        alreadyOpened2 = true;

        if (game.children[clickedCards[0]].style.backgroundImage !== game.children[clickedCards[1]].style.backgroundImage) {
            setTimeout(() => {
                for (let i of clickedCards) {
                    game.children[i].style.backgroundImage = `url(images/background.jpg)`;
                }
                clickedCards.length = 0;
            }, 2000);
        }
        else {
            openedCards.push(clickedCards[0]);
            openedCards.push(clickedCards[1]);
            fadeOut(game.children[clickedCards[0]]);
            fadeOut(game.children[clickedCards[1]]);
            /*game.children[clickedCards[0]].style.opacity="0.5";
            game.children[clickedCards[1]].style.opacity="0.5";*/
            clickedCards.length = 0;
        }
        
        alreadyOpened1 = false;
        alreadyOpened2 = false;

    }
}

function fadeOut(card){
    card.style.animation="fadeOut 1s ease-in-out";
    card.style.opacity=0;
}
//*dodati kraj igre
//*casual i competitive mod
//*povezane slike da se izblede

/*
function open90(){
    game.firstChild.classList.add("halfOpenedCard");
}

function openAnother90(){
    game.firstChild.classList.add("fullOpenedCard");
}
*/