const allSquares = document.getElementsByClassName("square");
var isClicked = false;

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
            document.querySelector(`#${pawnElements[0]} .dot`).remove();
            document.querySelector(`#${pawnElements[1]} .dot`).remove();
        }
        const idOfElement = i.getAttribute("id");
        const innerHTMLOfEl = i.innerHTML;
        const images = this.getElementsByTagName("img");
        if(
            (innerHTMLOfEl.includes("black") ||
            innerHTMLOfEl.includes("white")) && i !== poppedElement) {
                i.style.backgroundColor = '#BBCC43';
                clickedElements.push(i);
        } else {
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
        for(const img of images) {
            if(img.src.includes("pawn")) {
                console.log(idOfElement, "Pawn!");
                firstpawnMoves(idOfElement, pawnElements);            
            } else {
                pawnElements.pop();
                pawnElements.pop();
            }
        }
        console.log(pawnElements.length, "pawn length");
        prevSquare.pop();
        prevSquare.push(idOfElement);
    });
}

function addDot(targetElement) {
    var span = document.createElement('span');
    span.className = 'dot';
    targetElement.appendChild(span);
}

function firstpawnMoves(elementId, pawnElements) {
    const lastElement = pawnElements.pop();
    const secondLastElement = pawnElements.pop();

    const file = elementId[0];
    const rank = elementId[1];
    let moveOne, moveTwo;

    if(rank === "7") {
        moveOne = "6";
        moveTwo = "5";
    } else if(rank == "2") {
        moveOne = "3";
        moveTwo = "4";
    } //else {

    //}
    if(moveOne && moveTwo && (file + moveTwo) !== lastElement && (file + moveOne) !== secondLastElement) {
        const firstMove = document.getElementById(file + moveOne);
        const secondMove = document.getElementById(file + moveTwo); 
        addDot(firstMove);
        addDot(secondMove);
        pawnElements.push(firstMove.id, secondMove.id);
    }
};