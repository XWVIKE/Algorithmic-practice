/*  canvas box  */

function createHtml () {
    let width = 1525;
    let height = 1414;
    let newCanvas = document.createElement("canvas");
    newCanvas.id = "box";
    newCanvas.setAttribute("width",width);
    newCanvas.setAttribute("height",height);
    document.body.appendChild(newCanvas);
}
createHtml();