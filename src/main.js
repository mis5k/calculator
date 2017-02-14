System.register(["./calculator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    //let result = c.getResult("2*3+6/2-4");
    //let result = c.getResult("2.5*2+6/3");
    //let result = c.getResult("-2.5*2-4*-5");
    //console.log(result);
    function clickBtn(id) {
        if (id == "reset") {
            reset();
        }
        else if (id == "result") {
            getResult();
        }
        else {
            var value = document.getElementById(id).attributes["value"].value;
            exp_temp += value;
            document.getElementById("mainExp").textContent = exp_temp;
        }
    }
    function getResult() {
        console.log("getResult");
        var result = c.getResult(exp_temp);
        console.log("result : " + result);
        exp_temp = result;
        document.getElementById("mainExp").textContent = exp_temp;
    }
    function reset() {
        console.log("reset");
        exp_temp = "";
        document.getElementById("mainExp").textContent = init_data;
    }
    var calculator_1, exp_temp, init_data, c, lis, i;
    return {
        setters: [
            function (calculator_1_1) {
                calculator_1 = calculator_1_1;
            }
        ],
        execute: function () {
            exp_temp = "";
            init_data = "0";
            c = new calculator_1.Calculator();
            lis = document.getElementById("table").getElementsByTagName('td');
            for (i = 0; i < lis.length; i++) {
                lis[i].addEventListener('click', function (e) {
                    clickBtn(this.id);
                }, false);
            }
        }
    };
});
