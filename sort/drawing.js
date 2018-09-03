let x = 0,y = 0;
let arrLength = 37;
let lineWidth = 40.5;
let status;
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const restart = document.getElementById("restart");
const createArr = function (num){
    this.arr = Object.keys(Array.from({
        length: num
    })).map(function (item) {
        return +item;
    });

};

createArr.prototype.FisherYatesShuffle = function () {
    for (let i = 1; i < this.arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [this.arr[i], this.arr[random]] = [this.arr[random], this.arr[i]];
    }
};

function BubbleSort(arr) {
    let process = [arr.slice()];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                process.push(arr.slice());
            }
        }
    }
    return process;
}
function drawLine(context,arr) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#e1edff";
    context.fillRect(0,0,context.canvas.width, context.canvas.height);
    for (let i = 0; i < arr.length; i++) {
        y = (arrLength*arrLength)-arrLength * arr[i];
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = '#000';
        context.moveTo(x,arrLength*arrLength);
        context.lineTo(x, y);
        context.stroke();
        x+=lineWidth;
    }
}

function draw(func1,func2) {
    const drawing = document.getElementById("box");
    const context = drawing.getContext("2d");
    let newArr = new createArr(arrLength);
    newArr.FisherYatesShuffle();
    let process =func1(newArr.arr) ;
    console.log(process);
    func2(process[0]);
    if (status = 1) {
        process.forEach((item,index)=>{
            setTimeout(function () {
                func2(context,item);
                x = 0;y = 0;
            },index*50);
        })
    }
}
window.onload = function () {
    const drawing = document.getElementById("box");
    const context = drawing.getContext("2d");
    context.fillStyle = "#c4dbff";
    context.fillRect(0,0,context.canvas.width, context.canvas.height);
};
function switchButt (value) {
    switch (value) {
        case "bubbleSort":
            draw(BubbleSort,drawLine);
            break;
        case "selectionSort":
            draw();
            break;
        default:return;

    }
}
