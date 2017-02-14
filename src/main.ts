import { Calculator } from "./calculator";

let exp_temp:string = "";
let init_data:string = "0";
let c:Calculator = new Calculator();

//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//let result = c.getResult("-2.5*2-4*-5");
//console.log(result);

function clickBtn(id:string) {
    if(id == "reset") {
        reset();
    } else if(id == "result") {
        getResult();
    } else {
        var value = document.getElementById(id).attributes["value"].value;
        exp_temp += value;
        document.getElementById("mainExp").textContent = exp_temp; 
    }
}

function getResult() {
    console.log("getResult");
    let result = c.getResult(exp_temp);
    exp_temp = result;
    document.getElementById("mainExp").textContent = exp_temp;
}

function reset() {
    console.log("reset");
    exp_temp = "";        
    document.getElementById("mainExp").textContent = init_data; 
}

var lis = document.getElementById("table").getElementsByTagName('td');
for (var i=0; i<lis.length; i++) {
        lis[i].addEventListener('click', function(e) {
            clickBtn(this.id); 
        }, false);
}
