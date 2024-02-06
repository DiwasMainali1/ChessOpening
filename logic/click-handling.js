const allSquares = document.getElementsByClassName("square");
var isClicked = false;

const clickedElements = [];
const pawnElements = [];
for(const i of allSquares) {
    i.addEventListener("click", function() {
        if(clickedElements.length > 0) {
            clickedElements[0].removeAttribute("style");
        }
        if(pawnElements.length > 0) {
            pawnElements[0].removeAttribute("style");
            pawnElements[1].removeAttribute("style");
        }
        const idOfElement = i.getAttribute("id");
        const innerHTMLOfEl = document.getElementById(idOfElement).innerHTML;
        const images = this.getElementsByTagName("img");
        if(
            (innerHTMLOfEl.includes("black") ||
            innerHTMLOfEl.includes("white")) && i !== clickedElements.pop()) {
                document.getElementById(idOfElement).style.backgroundColor = '#BBCC43';
                clickedElements.push(i);
        }
        for(const img of images) {
            if(img.src.includes("pawn")) {
                console.log(idOfElement, "Pawn!");
                pawnMoves(idOfElement, pawnElements);            
            }
        }
        console.log(pawnElements.length, "pawn length");

    });
}

function pawnMoves(elementId, pawnElements) {
    const lastElement = pawnElements.pop();
    const secondLastElement = pawnElements.pop();
    if (elementId.includes("7") && document.getElementById(elementId[0] + "5") !== lastElement && document.getElementById(elementId[0] + "6") !== secondLastElement) {
        const firstMove = document.getElementById(elementId[0] + "6");
        const secondMove = document.getElementById(elementId[0] + "5");
        
        firstMove.style.backgroundColor = "yellow";
        firstMove.style.border = "0.1px solid black";
        firstMove.style.boxSizing = "border-box";
        secondMove.style.backgroundColor = "yellow";
        secondMove.style.border = "0.1px solid black";
        secondMove.style.boxSizing = "border-box";
        pawnElements.push(firstMove, secondMove);
    }
};