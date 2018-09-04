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

function MergeSort(arr) {
    function merge(left, right) {
        let result = [];
        while (left.length && right.length) {
            result.push(left[0] <= right[0] ? left.shift() : right.shift())
        }
        return result.concat(left.concat(right));
    }

    let len = arr.length, mid = parseInt(len / 2);
    if (len < 2) return arr;
    return merge(MergeSort(arr.slice(0, mid)), MergeSort(arr.slice(mid)));
}


function QuickSort(arr) {
    let process = [arr.slice()];
    quick(arr,0,arr.length - 1,process);
    return process;
}
function quick(arr, left, right,process) {
    let index;
    if (arr.length > 1) {
        index = partition(arr,left,right,process);
        if (left < index - 1) {
            quick(arr,left,index-1,process)
        }
        if (index < right) {
            quick(arr,index,right,process)
        }
    }
}
function partition(arr, left, right,process) {
    let pivot = arr[Math.floor((left+right)/2)],
    i = left,j = right;
    while (i <= j) {
        while (arr[i] < pivot) {
            i++
        }
        while (arr[j] > pivot) {
            j--
        }
        if (i <= j) {
            [arr[i],arr[j]] = [arr[j],arr[i]];
            process.push(arr.slice());
            i++;
            j--;
        }
    }
    return i;
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
        case "mergeSort":
            draw(MergeSort,drawLine);
            break;
        case "quickSort":
            draw(QuickSort,drawLine);
            break;
        default:return;

    }
}
