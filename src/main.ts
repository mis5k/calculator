import { Calculator } from "./calculator";

let init_data = "0";
let c:Calculator = new Calculator();

//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//let result = c.getResult("-2.5*2-4*-5");
//console.log(result);

function clickBtn(id:string) {
    let exp;

    switch(id) {
        case "reset":
            console.log("reset");
            c.reset();     
            exp = init_data;
            break;
        case "result":
            console.log("getResult");
            let result = c.getResult();
            exp = result;
            break;
        case "reverse":
            console.log("reverse");
            c.reverse();
            exp = c.getExp();
            break;
        case "percent":
            c.percent();
            exp = c.getExp();
            break;
        default:
            let value = document.getElementById(id).attributes["value"].value;
            c.setExp(value);
            exp = c.getExp();
            break;
    }
    document.getElementById("mainExp").textContent = exp; 
}

let lis = document.getElementById("table").getElementsByTagName('td');
for (var i=0; i<lis.length; i++) {
        lis[i].addEventListener('click', function(e) {
            clickBtn(this.id); 
        }, false);
}
