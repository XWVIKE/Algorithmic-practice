const drawing = document.getElementById("box");
const context = drawing.getContext("2d");
let x = 0, y = 500;
const arr = Object.keys(Array.from({length: 500})).map(function (item) {
    return +item;
});
let newArr = FisherYatesShuffle(arr);
function FisherYatesShuffle(arr) {
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
}

function bubbleSort (arr) {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (arr[j] > arr[i]) {
                swap(arr,j,j+1)
            }
        }
    }
}
function drawLine(context, x, y,width,color,time) {
    setTimeout(function () {
        context.beginPath();
        context.save();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.moveTo(x*width,y);
        context.lineTo(x,y);
        context.restore();
    },time)

}

function draw() {
    context.beginPath();
    context.fillStyle = "#000";
    context.fillRect(0, 0, 1500, 500);
    for (let i = 0; i < newArr.length; i++) {
        drawLine(context,x,y-arr[i],3,"#fff",0);
        x+=3;
    }
}
function swap(array,index1,index2){
    let aux = array[index1];
    array[index1] = array[index2];
    drawLine(context,index1,y-array[index1],3,"#fff",0);
    array[index2] = aux;
    drawLine(context,index2,y-array[index2],3,"#fff",0);
}
draw();
bubbleSort(newArr);
