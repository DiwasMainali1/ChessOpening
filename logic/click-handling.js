const allSquares = document.getElementsByClassName("square");
var isClicked = false;

const clickedElements = []
for(const i of allSquares) {
    i.addEventListener("click", function() {
        const idOfElement = i.getAttribute("id");
        const innerHTMLOfEl = document.getElementById(idOfElement).innerHTML;
        if(clickedElements.length > 0) {
            clickedElements[0].removeAttribute("style");
        }
        console.log(clickedElements.length);
        if(
            (innerHTMLOfEl.includes("black") ||
            innerHTMLOfEl.includes("white")) && i !== clickedElements.pop()) {
                document.getElementById(idOfElement).style.backgroundColor = '#BBCC43';
                clickedElements.push(i);
        }
    });
}