let x = 0,y = 0;
const drawing = document.getElementById("box");
const context = drawing.getContext("2d");
let arrLength = 500;
let lineWidth = context.canvas.width/arrLength;
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

function SelectionSort(arr) {
    let process = [arr.slice()];
    let indexMin;
    for (let i = 0; i < arr.length; i++) {
        indexMin = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[indexMin] > arr[j]) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            [arr[i],arr[indexMin]] = [arr[indexMin],arr[i]];
            process.push(arr.slice())
        }

    }
    return process;
}
function InsertionSort(arr) {
    let j,temp,process = [arr.slice()];
    for (let i = 1; i < arr.length; i++) {
        j = i;
        temp = arr[i];
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j-1];
            //process.push(arr.slice());
            j--
        }
        arr[j] = temp;
        process.push(arr.slice())
    }
    return process;
}

function f() {

}

function MergeSort(arr) {
    let array = mergeSortRec(arr);
}
function mergeSortRec(arr) {
    let length = arr.length;
    if (length === 1) {
        return arr
    }
    let mid = Math.floor(length/2),
    left = arr.slice(0,mid),
        right = arr.slice(mid,length);
    return merge(mergeSortRec(left),mergeSortRec(right));
}
function merge(left, right) {
    let result = [],
    il = 0,ir = 0;
    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left++);
        }else {
            result.push(right[ir++])
        }
    }
    while (il < left.length) {
        result.push(left[il++])
    }
    while (ir < right.length) {
        result.push(right[ir++])
    }
    return result;
}
function drawLine(context,arr) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#e1edff";
    context.fillRect(0,0,context.canvas.width, context.canvas.height);
    for (let i = 0; i < arr.length; i++) {
        y = context.canvas.height- arr[i];
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = '#000';
        context.moveTo(x,context.canvas.height);
        context.lineTo(x, y);
        context.stroke();
        x+=lineWidth;
    }
}

function draw(func1,func2) {
    let newArr = new createArr(arrLength);
    newArr.FisherYatesShuffle();
    let process =func1(newArr.arr) ;
    console.log(process);
    if (status = 1) {
        process.forEach((item,index)=>{
            setTimeout(function () {
                func2(context,item);
                x = 0;y = 0;
            },index*5);
        })
    }
}
window.onload = function () {
    context.fillStyle = "#c4dbff";
    context.fillRect(0,0,context.canvas.width, context.canvas.height);
};
function switchButt (value) {
    switch (value) {
        case "bubbleSort":
            draw(BubbleSort,drawLine);
            break;
        case "selectionSort":
            draw(SelectionSort,drawLine);
            break;
        case "insertionSort":
            draw(InsertionSort,drawLine);
            break;
        default:return;

    }
}
