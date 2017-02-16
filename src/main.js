System.register(["./calculator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    //let result = c.getResult("2*3+6/2-4");
    //let result = c.getResult("2.5*2+6/3");
    //let result = c.getResult("-2.5*2-4*-5");
    //console.log(result);
    function clickBtn(id) {
        var exp;
        switch (id) {
            case "reset":
                console.log("reset");
                c.reset();
                exp = init_data;
                break;
            case "result":
                console.log("getResult");
                var result = c.getResult();
                exp = result;
                break;
            case "reverse":
                console.log("reverse");
                c.reverse();
                exp = c.getExp();
                break;
            case "percentage":
                percentage();
                break;
            default:
                var value = document.getElementById(id).attributes["value"].value;
                c.setExp(value);
                exp = c.getExp();
                break;
        }
        document.getElementById("mainExp").textContent = exp;
    }
    function percentage() {
    }
    var calculator_1, init_data, c, lis, i;
    return {
        setters: [
            function (calculator_1_1) {
                calculator_1 = calculator_1_1;
            }
        ],
        execute: function () {
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
