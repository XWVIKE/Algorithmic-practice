class Gene {
    constructor(code) {
        this.code = code;
        this.cost = 9999;
    }

    random(length) {
        while (length--) {
            this.code += String.fromCharCode(Math.floor(Math.random() * (60 - 34) + 34))
        }
    }

    mutate(change) {
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
    }

     mate(gene) {
        let pivot = Math.round(this.code.length / 2) - 1;
        let childFirst = this.code.substr(0, pivot) + gene.code.substr(pivot);
        let childSecond = gene.code.substr(0, pivot) + this.code.substr(pivot);
        return [new Gene(childFirst), new Gene(childSecond)]
    }

     genecast(compareTo) {
        let total = 0;
        for (let i = 0; i < this.code.length; i++) {
            total += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) * (this.code.charCodeAt(i) - compareTo.charCodeAt(i))
        }
        this.cost = total
    }

}

class Population {
    constructor(goal,size){
        this.goal = goal;
        this.size = size;
        this.members = [];
        this.generationnumber = 0;
        while (this.size--) {
            let gene = new Gene();
            gene.random(this.goal.length);
            this.members.push(gene)
        }
    }
    sort(){
        this.members.sort(function (a, b) {
            return a.cost - b.cost;
        })
    }
    display(){
        //document.getElementById("control").innerText=(this.members[0].code);
        document.body.innerHTML = '';
        document.body.innerHTML += ("<h2>Generation: " + this.generationnumber + "</h2>");
        document.body.innerHTML += ("<ul>");
        for (var i = 0; i < this.members.length; i++) {
            document.body.innerHTML += ("<li>" + this.members[i].code + " (" + this.members[i].cost + ")");
        }
        document.body.innerHTML += ("</ul>");
    }
    generation(){
        for (let i = 0;i<this.members.length;i++){
            this.members[i].genecast(this.goal)
        }

        this.sort();
        this.display();
        let child = this.members[0].mate(this.members[1]);
        this.members.splice(this.members.length-2,2,child[0],child[1]);

        for (let i = 0; i < this.members.length; i++) {
            this.members[i].mutate(0.3);
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
    }
}

let population = new Population("XWVIKE IS YOU FRIEND",30);
population.generation();