let x = 0,y = 0;
let arrLength = 37;
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

function bubbleSort(arr) {
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
    for (let i = 0; i < arr.length; i++) {
        y = (arrLength*arrLength)-arrLength * arr[i];
        context.beginPath();
        context.lineWidth = 40;
        context.strokeStyle = '#000';
        context.moveTo(x,arrLength*arrLength);
        context.lineTo(x, y);
        context.stroke();
        x+=40.5;
    }
}

function draw() {
    const drawing = document.getElementById("box");
    const context = drawing.getContext("2d");
    let newArr = new createArr(arrLength);
    newArr.FisherYatesShuffle();
    let process =bubbleSort(newArr.arr);
    console.log(process);
    process.forEach((item,index)=>{
        setTimeout(function () {
            drawLine(context,item);
            x = 0;y = 0;
        },index*50);

    })
}

let select = document.getElementById("select");
select.addEventListener(function () {

})
