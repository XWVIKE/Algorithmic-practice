let x = 0,y = 0;

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
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

function drawLine(context,arr) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i = 0; i < arr.length; i++) {
        y = 640 - arr[i];
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = '#000';
        context.moveTo(x,640);
        context.lineTo(x, y);
        context.stroke();
        x+=3;
    }
}

(function draw() {
    const drawing = document.getElementById("box");
    const context = drawing.getContext("2d");
    let newArr = new createArr(640);
    newArr.FisherYatesShuffle();

    setInterval(function () {
        drawLine(context,newArr.arr);
        bubbleSort(newArr.arr);
        x = 0;y  = 0;
    }, 1000)
})();

