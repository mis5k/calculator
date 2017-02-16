System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Calculator;
    return {
        setters: [],
        execute: function () {
            Calculator = (function () {
                function Calculator() {
                    this.exp_temp = "";
                    this.old_data = "";
                }
                Calculator.prototype.init = function () {
                    this.exp = [];
                    this.stack = [];
                };
                Calculator.prototype.reset = function () {
                    this.exp_temp = "";
                    this.old_data = "";
                };
                Calculator.prototype.getStackTop = function () {
                    return this.stack[this.stack.length - 1];
                };
                Calculator.prototype.isStackEmpty = function () {
                    return (this.stack.length > 0) ? false : true;
                };
                Calculator.prototype.isOperator = function (str) {
                    return (['+', '-', '*', '/'].indexOf(str) >= 0);
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
                            if (!this.isStackEmpty()
                                && (this.precedence(this.getStackTop()) >= this.precedence(input[i]))) {
                                while (!this.isStackEmpty()) {
                                    this.exp.push(this.stack.pop());
                                }
                            }
                            this.stack.push(input[i]);
                        }
                    }
                    while (!this.isStackEmpty()) {
                        this.exp.push(this.stack.pop());
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
                            var right = parseInt(this.stack.pop());
                            var left = parseInt(this.stack.pop());
                            var val = this.evaluateOperator(this.exp[i], left, right);
                            this.stack.push(val.toString());
                        }
                        else {
                            this.stack.push(this.exp[i]);
                        }
                    }
                };
                Calculator.prototype.setExp = function (str) {
                    this.exp_temp += str;
                    this.old_data = (this.isOperator(str)) ? "" : this.old_data + str;
                };
                Calculator.prototype.getExp = function () {
                    return this.exp_temp;
                };
                Calculator.prototype.getLastNum = function () {
                    var str = this.exp_temp.substring(this.exp_temp.length - this.old_data.length, this.exp_temp.length);
                    this.exp_temp = this.exp_temp.slice(0, -1 * this.old_data.length);
                    return parseInt(str);
                };
                Calculator.prototype.reverse = function () {
                    var num = this.getLastNum() * -1;
                    this.old_data = num.toString();
                    this.exp_temp += this.old_data;
                };
                Calculator.prototype.percent = function () {
                    var num = this.getLastNum() / 100;
                    this.old_data = num.toString();
                    this.exp_temp += this.old_data;
                };
                Calculator.prototype.getResult = function () {
                    this.postfix(this.exp_temp);
                    this.calc();
                    this.reset();
                    return this.stack.pop();
                };
                return Calculator;
            }());
            exports_1("Calculator", Calculator);
        }
    };
});
