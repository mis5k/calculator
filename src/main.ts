import { Calculator } from "./calculator";

let init_data = "0";
let c:Calculator = new Calculator();

//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//let result = c.getResult("-2.5*2-4*-5");
//console.log(result);

function clickBtn(id:string) {
    if(id == "reset") {
        console.log("reset");
        c.reset();     
        document.getElementById("mainExp").textContent = init_data; 
    } else if(id == "result") {
        console.log("getResult");
        let result = c.getResult();
        document.getElementById("mainExp").textContent = result;
    } else if(id == "reverse") {
        console.log("reverse");
        c.reverse();
        document.getElementById("mainExp").textContent = c.getExp(); 
    } else if(id == "percentage") {
        percentage();
    } else {
        var value = document.getElementById(id).attributes["value"].value;
        c.setExp(value);
        document.getElementById("mainExp").textContent = c.getExp();
    }
}

function percentage() {

}

let lis = document.getElementById("table").getElementsByTagName('td');
for (var i=0; i<lis.length; i++) {
        lis[i].addEventListener('click', function(e) {
            clickBtn(this.id); 
        }, false);
}
