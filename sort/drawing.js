const drawing = document.getElementById("box");
const context = drawing.getContext("2d");
let x = 0,
    y = 100;
const arr = Object.keys(Array.from({
    length: 100
})).map(function (item) {
    return +item;
});

function FisherYatesShuffle(arr) {
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
}

let newArr = FisherYatesShuffle(arr);


function bubbleSort(arr) {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (arr[j] > arr[i]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

function drawLine(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = 0; i < newArr.length; i++) {
        if ()
            }

}

function draw() {
    context.beginPath();
    context.fillStyle = "#000";
    context.fillRect(0, 0, 1500, 500);
    for (let i = 0; i < newArr.length; i++) {
        drawLine(context, x, y - arr[i], 3, "#fff", 0);
        x += 3;
    }
}

draw();
bubbleSort(newArr);