/*  canvas box  */

function createHtml () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let newCanvas = document.createElement("canvas");
    newCanvas.id = "box";
    newCanvas.setAttribute("width",width);
    newCanvas.setAttribute("height",height);
    document.body.appendChild(newCanvas);
}
createHtml();