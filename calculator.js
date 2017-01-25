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
    Calculator.prototype.isDigit = function (str) {
        return (str >= '0' && str <= '9');
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
            if (this.isDigit(input[i])
                || (input[i] == '-' && (i == 0 || !this.isDigit(input[i - 1])))) {
                var temp = "";
                do {
                    temp += input[i++];
                } while (i < input.length && !this.isOperator(input[i]));
                i--;
                this.exp.push(temp);
            }
            else if (this.isOperator(input[i])) {
                if (this.stack.length > 0
                    && (this.precedence(this.getStackTop()) >= this.precedence(input[i]))) {
                    while (this.stack.length > 0) {
                        var a = this.stack.pop();
                        this.exp.push(a);
                    }
                }
                this.stack.push(input[i]);
            }
        }
        if (this.stack.length > 0) {
            while (this.stack.length > 0) {
                var a = this.stack.pop();
                this.exp.push(a);
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
            if (this.isOperator(this.exp[i])) {
                var right = Number(this.stack.pop());
                var left = Number(this.stack.pop());
                var val = this.evaluateOperator(this.exp[i], left, right);
                this.stack.push(String(val));
            }
            else {
                this.stack.push(this.exp[i]);
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
var init_data = "0";
var c = new Calculator();
function clickBtn(input) {
    exp_temp += input;
    document.getElementById("mainExp").innerHTML = exp_temp;
}
function getResult() {
    console.log("getResult");
    var result = c.getResult(exp_temp);
    console.log("result : " + result);
    exp_temp = result;
    document.getElementById("mainExp").innerHTML = exp_temp;
}
function reset() {
    console.log("reset");
    exp_temp = "";
    document.getElementById("mainExp").innerHTML = init_data;
}
//let result = c.getResult("2*3+6/2-4");
//let result = c.getResult("2.5*2+6/3");
//let result = c.getResult("-2.5*2-4*-5");
//console.log(result);
