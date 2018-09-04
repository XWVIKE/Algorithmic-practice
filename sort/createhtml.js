/*  canvas box  */

function createHtml () {
    let width = 1523;
    let height = 600;
    let newCanvas = document.createElement("canvas");
    newCanvas.id = "box";
    newCanvas.setAttribute("width",width);
    newCanvas.setAttribute("height",height);
    document.body.appendChild(newCanvas);
}
createHtml();