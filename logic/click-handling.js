const allSquares = document.getElementsByClassName("square");

const clickedElements = [];
const pawnElements = [];
const prevSquare = [];
const capturedElements = [];

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
        capturePawn(idOfElement, prevSquare, capturedElements, pawnElements);
        //adding highlights to possible pawn moves if pawn is clicked
        pawnClick(images, idOfElement, pawnElements, clickedElements, capturedElements);

        //Chaning the prev square to curr square popping and pushing
        prevSquare.pop();
        prevSquare.push(idOfElement);
    });
}

function pushcaptureElement(id, capturedElements) {
    if (!capturedElements.includes(id)) {
        capturedElements.push(id);
    }
}

function addcaptureElement(id, pawnElements, clickedElements, capturedElements) {

    let pawn = document.getElementById(id);
    let blknextRank = (parseInt(id[1]) + 1).toString();
    let blknextfile_1 = String.fromCharCode(id[0].charCodeAt(0) + 1);
    let blknextfile_2 = String.fromCharCode(id[0].charCodeAt(0) - 1);

    let firstPawnId = blknextfile_1 + blknextRank;
    let secondPawnId = blknextfile_2 + blknextRank;
    
    let firstPawn = document.getElementById(firstPawnId);
    let secondPawn = document.getElementById(secondPawnId);

    if (secondPawn) {
        let innerHTMLofPawn = secondPawn.innerHTML;
        if (pawn && pawn.innerHTML.includes("black") && innerHTMLofPawn.includes("white")) {
            pushcaptureElement(secondPawnId, capturedElements);
        } 
    } 
    if (firstPawn) {
        let innerHTMLofPawn = firstPawn.innerHTML;
        if (pawn && pawn.innerHTML.includes("black") && innerHTMLofPawn.includes("white")) {
            pushcaptureElement(firstPawnId, capturedElements);
        }   
    }

}

function pawnClick(images, id, pawnElements, clickedElements, capturedElements) {
    for(const img of images) {
        if(img.src.includes("pawn")) {
            addcaptureElement(id, pawnElements, clickedElements, capturedElements);
            pawnMoves(id, pawnElements, clickedElements);            
        } else {
            pawnElements.pop();
            pawnElements.pop();
        }
    }
}

function setHighlightColor(element, clickedElement, color, poppedElement) {
    if((color.includes("black") || color.includes("white")) && element !== poppedElement) {
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
    pawn = document.getElementById(elementId);

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
    addDot(onlyMove);
    pawnElements.push(onlyMove.id);
}

function movePawn(idOfElement, prevSquare, pawnElements) {
    if(pawnElements.includes(idOfElement)) {
        const initialSquare = document.getElementById(prevSquare[0]);
        const targetSquare = document.getElementById(idOfElement);
        const pawn = initialSquare.querySelector("img");
        if(pawn) {
            targetSquare.appendChild(pawn);
        }
    }
}

function capturePawn(id, prevSquare, capturedElements, pawnElements) {
    if(capturedElements.includes(id) && clickedElements.length === 1) {
        console.log("Accessed!");
        const initialSquare = document.getElementById(prevSquare[0]);
        const targetSquare = document.getElementById(id);
        const pawn = initialSquare.querySelector("img");
        const capturedPawn = targetSquare.querySelector("img");
        if(pawn && capturedPawn) {
            targetSquare.removeChild(capturedPawn);
            targetSquare.appendChild(pawn);
            capturedElements.pop();
        }
    }
}