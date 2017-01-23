var Calculator = (function () {
    function Calculator() {
    }
    Calculator.prototype.init = function () {
        this.exp = [];
        this.stack = [];
    };
    Calculator.prototype.getStackTop = function () {
        return this.stack[this.stack.length - 1];
    };
    Calculator.prototype.isStackEmpry = function () {
        return true;
    };
    Calculator.prototype.isOperator = function (str) {
        return (str == '+') || (str == '-') || (str == '*') || (str == '/');
    };
    Calculator.prototype.precedence = function (op) {
        if (op == '+' || op == '-') {
            return 0;
        }
        else if (op == '*' || op == '/') {
            return 1;
        }
        else {
            return 2;
        }
    };
    Calculator.prototype.postfix = function (input) {
        this.init();
        for (var i = 0; i < input.length; i++) {
            if (this.isOperator(input[i])) {
                if (this.stack.length > 0
                    && (this.precedence(this.getStackTop()) >= this.precedence(input[i]))) {
                    while (this.stack.length > 0) {
                        this.exp.push(this.stack.pop());
                    }
                }
                this.stack.push(input[i]);
            }
            else if (input[i] >= '0' && input[i] <= '9') {
                var temp = input[i];
                for (var j = i + 1; j < input.length; j++) {
                    if (this.isOperator(input[j])) {
                        i = j - 1;
                        break;
                    }
                    temp += input[j];
                }
                this.exp.push(temp);
            }
        }
        if (this.stack.length > 0) {
            while (this.stack.length > 0) {
                this.exp.push(this.stack.pop());
            }
        }
    };
    Calculator.prototype.evaluateOperator = function (op, left, right) {
        switch (op) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
        }
    };
    Calculator.prototype.calc = function () {
        this.stack = [];
        for (var i = 0; i < this.exp.length; i++) {
            if (this.exp[i] >= '0' && this.exp[i] <= '9') {
                this.stack.push(this.exp[i]);
            }
            else if (this.isOperator(this.exp[i])) {
                var right = Number(this.stack.pop());
                var left = Number(this.stack.pop());
                var val = this.evaluateOperator(this.exp[i], left, right);
                this.stack.push(String(val));
            }
        }
    };
    Calculator.prototype.getResult = function (str) {
        this.postfix(str);
        this.calc();
        return this.stack.pop();
    };
    return Calculator;
}());
var exp_temp = "";
function clickBtn(input) {
    console.log("A");
    exp_temp += input;
    document.getElementById("mainExp").innerHTML = exp_temp;
}
function getResult() {
    console.log("getResult");
    var c = new Calculator();
    var result = c.getResult(exp_temp);
    console.log("result : " + result);
    exp_temp = result;
    document.getElementById("mainExp").innerHTML = exp_temp;
}
function reset() {
    console.log("reset");
    exp_temp = "";
    document.getElementById("mainExp").innerHTML = exp_temp;
}
//let c:Calculator = new Calculator();
//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//console.log(result); 
