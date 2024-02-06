const allSquares = document.getElementsByClassName("square");

const clickedElements = [];
const pawnElements = [];
const prevSquare = [];

for(const i of allSquares) {
    i.addEventListener("click", function() {
        if(clickedElements.length > 0) {
            clickedElements[0].removeAttribute("style");
        }
        const poppedElement = clickedElements.pop();
        if(pawnElements.length > 0) {
            document.querySelector(`#${pawnElements[0]} .dot`)?.remove();
            document.querySelector(`#${pawnElements[1]} .dot`)?.remove();
        }
        const idOfElement = i.getAttribute("id");
        const innerHTMLOfEl = i.innerHTML;
        const images = this.getElementsByTagName("img");
        if(
            (innerHTMLOfEl.includes("black") ||
            innerHTMLOfEl.includes("white")) && i !== poppedElement) {
                i.style.backgroundColor = '#BBCC43';
                clickedElements.push(i);
        } 
        movePawn(idOfElement, prevSquare, pawnElements);
        for(const img of images) {
            if(img.src.includes("pawn")) {
                console.log(idOfElement, "Pawn!");
                pawnMoves(idOfElement, pawnElements, clickedElements);            
            } else {
                pawnElements.pop();
                pawnElements.pop();
            }
        }
        prevSquare.pop();
        prevSquare.push(idOfElement);
    });
}

function addDot(targetElement) {
    var span = document.createElement('span');
    span.className = 'dot';
    targetElement.appendChild(span);
}

function pawnMoves(elementId, pawnElements, clickedElements) {
    console.log(clickedElements.length, "pawn Element length");
    pawn = document.getElementById(elementId);

    console.log(pawn.innerHTML);
    const file = elementId[0];
    const rank = elementId[1];
    let moveOne, moveTwo;

    if(rank === "7") {
        moveOne = "6";
        moveTwo = "5";
    } else if(rank == "2") {
        moveOne = "3";
        moveTwo = "4";
    } else {
        if(clickedElements.length > 0) {
            console.log("Hi!");
            if(pawn.innerHTML.includes("black")) {
                moveOne = (parseInt(rank) + 1).toString();
                initPawn(file, moveOne);
            } else {
                moveOne = (parseInt(rank) - 1).toString();
                initPawn(file, moveOne);
            }
            return;
        }
    }
    const lastElement = pawnElements.pop();
    const secondLastElement = pawnElements.pop();
    if(moveOne && moveTwo && (file + moveTwo) !== lastElement && (file + moveOne) !== secondLastElement) {
        const firstMove = document.getElementById(file + moveOne);
        const secondMove = document.getElementById(file + moveTwo); 
        addDot(firstMove);
        addDot(secondMove);
        pawnElements.push(firstMove.id, secondMove.id);
    }
};

function initPawn(file, move) {
    const onlyMove = document.getElementById(file + move);
    console.log(file + move);
    addDot(onlyMove);
    pawnElements.push(onlyMove.id);
}

function movePawn(idOfElement, prevSquare, pawnElements) {
    if(pawnElements.includes(idOfElement)) {
        const initialSquare = document.getElementById(prevSquare[0]);
        const targetSquare = document.getElementById(idOfElement);
        const pawn = initialSquare.querySelector("img");
        console.log("This is working?")
        if(pawn) {
            targetSquare.appendChild(pawn);
        }
    }
}