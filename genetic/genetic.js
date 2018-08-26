const Gene = function (code) {
    if (code) this.code = code;
    this.cost = 9999;

};

Gene.prototype.code = '';
Gene.prototype.random = function (length) {
    while (length--) {
        this.code += String.fromCharCode(Math.floor(Math.random() * (60 - 34) + 34))
    }
};
Gene.prototype.mutate = function (change) {
    if (Math.random() > change) return;
    let index = Math.floor(Math.random() * this.code.length);
    let upordown = Math.random() > 0.5 ? -1 : 1;
    let newChar = String.fromCharCode(this.code.charCodeAt(index) + upordown);
    let newString = '';
    for (let i = 0; i < this.code.length; i++) {
        if (i === index) {
            newString += newChar;
        } else {
            newString += this.code[i]
        }
    }
    this.code = newString;
};

Gene.prototype.mate = function (gene) {
    let pivot = Math.floor(Math.random()*(this.code.length))+1;
    let childfirst = this.code.substr(0, pivot) + gene.code.substr(pivot);
    let childsecond = gene.code.substr(0, pivot) + this.code.substr(pivot);
    return [new Gene(childfirst), new Gene(childsecond)]
};

Gene.prototype.genecast = function (compareTo) {
    let total = 0;
    for (let i = 0; i < this.code.length; i++) {
        total += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) * (this.code.charCodeAt(i) - compareTo.charCodeAt(i))
    }
    this.cost = total
};

const Population = function (goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationnumber = 0;
    while (size--) {
        let gene = new Gene();
        gene.random(this.goal.length);
        this.members.push(gene)
    }
};

Population.prototype.sort = function () {
    this.members.sort(function (a, b) {
        return a.cost - b.cost;
    })
};

Population.prototype.display = function(){
    document.body.innerHTML = '';
    document.body.innerHTML += ("<h2>Generation: " + this.generationnumber + "</h2>");
    document.body.innerHTML += ("<ul>");
    for (var i = 0; i < this.members.length; i++) {
        document.body.innerHTML += ("<li>" + this.members[i].code + " (" + this.members[i].cost + ")");
    }
    document.body.innerHTML += ("</ul>");
};

Population.prototype.mating = function(){
    let temp = 0;
    for (let i = 0; i < this.members.length/2-2; i++) {
        let child = this.members[temp].mate(this.members[temp+1]);
        this.members.splice(this.members.length-(temp+2),2,child[0],child[1]);
        temp += 2;
    }
};

Population.prototype.generation = function () {
    for (let i = 0;i<this.members.length;i++){
        this.members[i].genecast(this.goal)
    }

    this.sort();
    this.display();
    this.mating();
    for (let i = 0; i < this.members.length; i++) {
        this.members[i].mutate(0.5);
        this.members[i].genecast(this.goal);
        if (this.members[i].code===this.goal){
            this.sort();
            this.display();
            return true;
        }
    }
    this.generationnumber++;
    let scopt = this;
    setTimeout(function () {
        scopt.generation();
    },0)
};
let population = new Population("HELLO WORLD",75);
population.generation();
