let x = 0,y = 0;
const drawing = document.getElementById("box");
const context = drawing.getContext("2d");
let arrLength = 600;
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
            j--
        }
        arr[j] = temp;
        process.push(arr.slice())
    }
    return process;
}

/*function MergeSort(arr) {
    let process = [arr.slice()];
    mergeSortRec(arr,process);
    return process;
}
function mergeSortRec(arr, process) {
    let length = arr.length;
    if (length === 1) {
        return arr;
    }
    let mid = Math.floor(length/2),left = arr.slice(0,mid),right = arr.slice(mid,length);
    return merge(mergeSortRec(left,process),mergeSortRec(right,process));
}
function merge(left,right) {
    let result = [],il = 0,ir = 0;
    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        }else {
            result.push(right[ir++]);
        }
    }
    while (il < right.length) {
        result.push(left[il++]);
    }
    while (ir < right.length) {
        result.push(right[ir++]);
    }

    return result;
}
*/
function MergeSort(array) {
    let process = [array.slice()];
    function sort(array, first, last) {
        first = (first === undefined) ? 0 : first
        last = (last === undefined) ? array.length - 1 : last
        if (last - first < 1) {
            return;
        }
        var middle = Math.floor((first + last) / 2);
        sort(array, first, middle);
        sort(array, middle + 1, last);
        var f = first,
            m = middle,
            i,
            temp;
        while (f <= m && m + 1 <= last) {
            if (array[f] >= array[m + 1]) { // 这里使用了插入排序的思想
                temp = array[m + 1];
                for (i = m; i >= f; i--) {
                    array[i + 1] = array[i];
                }
                array[f] = temp;
                process.push(array.slice());
                m++
            } else {
                f++
            }
        }
        return array;
    }
    sort(array);
    return process;
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

function HeapSort(arr) {
    let process = [arr.slice()];
    let heapSize = arr.length;
    buildHeap(arr);
    while (heapSize > 1) {
        heapSize--;
        [arr[0],arr[heapSize]] = [arr[heapSize],arr[0]];
        process.push(arr.slice());
        heapify(arr,heapSize,0)
    }
    return process;
}

function buildHeap(arr) {
    let heapSize = arr.length;
    for (let i = Math.floor(arr.length/2);i>=0;i--) {
        heapify(arr,heapSize,i)
    }
}

function heapify(arr,heapSize,i) {
    let left = i*2+1,right = i*2+2,largest = i;
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[i],arr[largest]] = [arr[largest],arr[i]];
        heapify(arr,heapSize,largest);
    }
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
        case "heapSort":
            draw(HeapSort,drawLine);
            break;
        default:return;

    }
}
