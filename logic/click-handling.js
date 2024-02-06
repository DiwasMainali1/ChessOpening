const allSquares = document.getElementsByClassName("square");

const clickedElements = [];
const pawnElements = [];
const prevSquare = [];

for(const i of allSquares) {
    i.addEventListener("click", function() {
        //Initialisation
        const idOfElement = i.getAttribute("id");
        const innerHTMLOfEl = i.innerHTML;
        const images = this.getElementsByTagName("img");

        //Removing highlighted squares if there is one
        const poppedElement = removeClickedEl(clickedElements);
        //Removing highlighted possible pawn squares
        removePawnEl(pawnElements);

        //If pieces are selected then adding highlight
        setHighlightColor(i, clickedElements, innerHTMLOfEl, poppedElement);
        
        //moving the pawn if the selected rank and file is correct
        movePawn(idOfElement, prevSquare, pawnElements);
        
        //adding highlights to possible pawn moves if pawn is clicked
        pawnClick(images, idOfElement, pawnElements, clickedElements);

        //Chaning the prev square to curr square popping and pushing
        prevSquare.pop();
        prevSquare.push(idOfElement);
    });
}

function pawnClick(images, id, pawnElements, clickedElements) {
    for(const img of images) {
        if(img.src.includes("pawn")) {
            pawnMoves(id, pawnElements, clickedElements);            
        } else {
            pawnElements.pop();
            pawnElements.pop();
        }
    }
}

function setHighlightColor(element, clickedElement, color, poppedElement) {
    if(color.includes("black") || color.includes("white") && element !== poppedElement) {
        element.style.backgroundColor = '#BBCC43';
        clickedElement.push(element); 
    }
}

function removeClickedEl(elements) {
    if(elements.length > 0) {
        elements[0].removeAttribute("style");
    }
    return elements.pop();
}

function removePawnEl(pawnElements) {
    if(pawnElements.length > 0) {
        document.querySelector(`#${pawnElements[0]} .dot`)?.remove();
        document.querySelector(`#${pawnElements[1]} .dot`)?.remove();
    }
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